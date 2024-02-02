<script setup lang="ts">
import { Scene, Image, Sprite, Body, Container } from 'phavuer'
import { ref, nextTick, inject, Ref } from 'vue'
import config from '../../config'
import PlatFormObject from '@/components/GameObjects/PlatFormObject.vue'
import Repository from '../../class/entities/Repository'
import Star from '../../class/StarClass'
import Bomb from '../../class/BombClass'
import Player from '../../class/PlayerClass'
import StarObject from '@/components/GameObjects/StarObject.vue'
import BombObject from '@/components/GameObjects/BombObject.vue'
import PlatForm from '../../class/PlatFormClass'
import PlayerObject from '@/components/GameObjects/PlayerObject.vue'
import { useObject } from "../../composable/useObject";

const scene = ref()
const player = ref()
const starGroup = ref()
const PlatformGroup = ref()
const bombGroup = ref()
const bulletGroup = ref()

const playerClass = ref<Player>()
const stars = new Repository<Star>()
const bombs = new Repository<Bomb>()
const attackObject = ref()

const score = inject('score') as Ref<number>

const {
  platforms,
  createPlatformObject,
} = useObject()

const emit = defineEmits<{
  gameOver: [void]
}>()

const create = (_scene: Phaser.Scene) => {
  scene.value = _scene
  PlatformGroup.value = _scene.add.group()
  starGroup.value = _scene.physics.add.group()
  bombGroup.value = _scene.physics.add.group()
  score.value = 0
  stars.clear()
  bombs.clear()
  platforms.clear()

  createPlatformObject()
  createPlayerObject()
  createStarObject(config.GAME.STAR_DEFAULT_NUM)

  // 弾丸グループ
  bulletGroup.value = _scene.physics.add.group({
    defaultKey: 'bomb',
    maxSize: 10,
  })

  nextTick(() => {
    // プラットホームの当たり判定
    _scene.physics.add.collider(player.value, PlatformGroup.value)
    _scene.physics.add.collider(starGroup.value, PlatformGroup.value)
    _scene.physics.add.collider(bombGroup.value, PlatformGroup.value)

    // プレイヤー当たり判定
    _scene.physics.add.overlap(player.value, starGroup.value, collectStar)
    _scene.physics.add.collider(player.value, bombGroup.value, hitBomb)
    _scene.physics.add.collider(bulletGroup.value, PlatformGroup.value, bulletHitPlatform, null, _scene);
  })
}

const bulletHitPlatform = (PlatformGroup: any, bullet: any) => {
  bullet.setActive(false).setVisible(false);
}

const hitBomb = (_player: any, _bomb: any) => {
  const bomb = bombs.find(_bomb.getData('id'))
  bomb?.hit()
}

const collectStar = (_player: any, _star: any) => {
  const star = stars.find(_star.getData('id'))
  star?.hit()
}

const createPlayerObject = () => {
  playerClass.value = new Player({
    x: 200,
    y: 450,
  }).create(scene.value)
}

const createStarObject = (count: number) => {
  for (let i = 0; i < count; i++) {
    const step = i * 70
    const star = new Star({
      x: 50 + step,
      y: 0,
      target: player.value,
    })
    star.on('destroy', () => {
      score.value += 10
    })
    stars.add(star)
  }
}

const createBombObject = (count: number) => {
  // プレイヤーの逆に爆弾を出現させる
  let x = player.value?.x || 0 < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
  for (let i = 0; i < count; i++) {
    const step = i * 50
    const bomb = new Bomb({
      x: x + step,
      y: 16,
      target: player.value,
    })
    // ボムに当たった時の処理
    bomb.on('hit', () => {
      player.value.setTint(0xff0000)
      player.value.anims.play('turn')
      emit('gameOver')
    })
    bombs.add(bomb)
  }
}

const fireBullet = () => {
  let bullet = bulletGroup.value.get(player.value.x, player.value.y);

  if (bullet) {
    bullet.setActive(true).setVisible(true);

    // マウスポインターの方向に向かって発射
    let angle = Phaser.Math.Angle.Between(player.value.x, player.value.y, scene.value.input.x, scene.value.input.y);
    if (scene.value.input.x > player.value.x) {
      player.value.anims.play('right', true);
    } else {
      player.value.anims.play('left', true);
    }
    console.log(bullet.body.velocity)
    scene.value.physics.velocityFromRotation(angle, 500, bullet.body.velocity);

    // 発射角度に基づいて弾丸を回転させる（任意）
    bullet.rotation = angle;
  }
}

const update = () => {
  playerClass.value?.update()
  stars.list.forEach((s) => s.update())
  bombs.list.forEach((s) => s.update())

  // 銃を発射
  if (Phaser.Input.Keyboard.JustDown(scene.value.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B))) {
    fireBullet();
  }

  // 全部のstarを取ったら
  if (stars.list.length === 0) {
    createStarObject(config.GAME.STAR_DEFAULT_NUM)
    createBombObject(1)
  }
}

const createPlatform = (ob: Phaser.GameObjects.Rectangle) => {
  PlatformGroup.value.add(ob)
}

const createStar = (ob: Phaser.GameObjects.Sprite) => {
  starGroup.value.add(ob)
}

const createBomb = (ob: Phaser.GameObjects.Container) => {
  bombGroup.value.add(ob)
}

const createPlayer = (ob: Phaser.Physics.Arcade.Sprite) => {
  player.value = ob
}
</script>

<template>
  <Scene
    name="GameScene"
    :autoStart="false"
    @create="create"
    @update="update"
  >
    <Image
      :x="config.WIDTH / 2"
      :y="config.HEIGHT / 2"
      texture="stage1"
      :scale="0.6"
      :depth="-1"
    />

    <PlatFormObject
      v-for="v in platforms.list"
      :data="v"
      :key="v.id"
      @create="createPlatform"
    />

    <PlayerObject
      :player="playerClass"
      @create="createPlayer"
    />

    <StarObject
      v-for="v in stars.list"
      :key="v.id"
      :star="v"
      @create="createStar"
    />

    <BombObject
      v-for="v in bombs.list"
      :key="v.id"
      :bomb="v"
      @create="createBomb"
    />
  </Scene>
</template>
