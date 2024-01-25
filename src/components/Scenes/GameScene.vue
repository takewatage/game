<script setup lang="ts">
import { Scene, Image } from 'phavuer'
import { ref, nextTick, provide, inject, Ref } from "vue"
import config from "../../config"
import PlatForm from "@/components/GameObject/PlatForm.vue"
import Repository from "../../class/Repository"
import Star from "../../class/StarClass"
import GameButton from "@/components/Ui/GameButton.vue"
import StarObject from "@/components/GameObject/StarObject.vue"

const player = ref<Phaser.Physics.Arcade.Sprite>()
const cursors = ref(null)
const stars = ref()
const group = ref(null)
const _stars = new Repository<Star>()
// const bombs = ref()

const score = inject('score') as Ref<number>

const PLATFORM = [
  { id: 'platform1', x: 50, y: 290, width: 320, height: 50 },
  { id: 'platform2', x: config.WIDTH - 320, y: 440, width: 320, height: 50 },
  { id: 'platform3', x: 0, y: config.HEIGHT, width: config.WIDTH, height: 50 },
]

provide('player', player)

const create = (scene: Phaser.Scene) => {
  group.value = scene.add.group()
  stars.value = scene.physics.add.group()
  // bombs.value = scene.physics.add.group()

  player.value = scene.physics.add.sprite(100, 450, 'dude');
  player.value.setBounce(0.2)
  player.value.setCollideWorldBounds(true) // 衝突判定する
  player.value.setDepth(1)

  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  cursors.value = scene.input.keyboard.createCursorKeys();

  // const p = scene.physics.add.group({
  //   key: 'bomb',
  //   repeat: 1,
  //   setXY: { x: 50, y: 0, stepY: 50 }
  // });

  createStarObject(config.GAME.STAR_DEFAULT_NUM)

  // stars.value = scene.physics.add.group({
  //   key: 'star',
  //   repeat: 1,
  //   setXY: { x: 50, y: 0, stepX: 70 }
  // })
  //
  // // 個々でバウンド率を変える
  // stars.value.children.iterate(function (child) {
  //   //  Give each star a slightly different bounce
  //   child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
  //
  // });


  nextTick(() => {
    scene.physics.add.collider(player.value, group.value)
    scene.physics.add.collider(stars.value, group.value)
    // scene.physics.add.collider(stars.value, player.value)
    // scene.physics.add.collider(bombs.value, group.value)

    // プレイヤー当たり判定
    // scene.physics.add.overlap(player.value, stars.value, collectStar)
    // scene.physics.add.collider(player.value, bombs.value, hitBomb, null);

    console.log(_stars.list)
  })
}

const createStarObject = (count) => {
  for (let i=0; i<count; i++) {
    const step = i * 70
    const star = new Star({
      x: 12 + step,
      y: 0,
      target: player.value
    })
    star.on('destroy', () => {
      score.value += 10
    })
    _stars.add(star)
    console.log(_stars.list)
  }
}

const update = () => {
  _stars.list.forEach(s => s.update())

  if (cursors.value.left.isDown) {
    player.value.setVelocityX(-160);

    player.value.anims.play('left', true);
  } else if (cursors.value.right.isDown) {
    player.value.setVelocityX(160);

    player.value.anims.play('right', true);
  } else {
    player.value.setVelocityX(0);

    player.value.anims.play('turn');
  }

  // UPキーでplayerが地面に接しているとき
  if (cursors.value.up.isDown && player.value.body.touching.down) {
    player.value.setVelocityY(-330);
  }

  // 全部のstarを取ったら
  if(_stars.list.length === 0) {
    createStarObject(config.GAME.STAR_DEFAULT_NUM)
  }
}

const hitBomb = (player, bomb) => {
  // console.log(scene)
  // console.log(test)
  // scene.physics.pause();
  // player.value.setTint(0xff0000);
  // player.value.anims.play('turn');
}

const createPlatform = (ob) => {
  group.value.add(ob)
}

const createStar = (ob) => {
  stars.value.add(ob)
}

const addStar = () => {
  createStarObject(1)
}

</script>

<template>
  <Scene name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image
      :x="config.WIDTH / 2"
      :y="config.HEIGHT / 2"
      texture="stage1"
      :scale="0.6"
      :depth="-1"
    />

    <PlatForm
      v-for="v in PLATFORM"
      :data="v"
      :key="v.id"
      @create="createPlatform"
    />

    <StarObject
      v-for="v in _stars.list"
      :key="v.id"
      :star="v"
      @create="createStar"
    />

    <GameButton
      :x="config.WIDTH / 2"
      :y="config.HEIGHT / 2"
      :width="155"
      :height="50"
      @on-click="addStar"
    />

  </Scene>
</template>
