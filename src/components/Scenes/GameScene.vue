<script setup lang="ts">
import { Scene, Image } from 'phavuer'
import { ref, nextTick } from "vue"
import config from "../../config"
import PlayerComponent from "@/components/GameObject/Player.vue"
import PlatForm from "@/components/GameObject/PlatForm.vue"

const player = ref(null)
const platforms = ref([])

const PLATFORM = [
  {id: 'platform1', x: 0, y: 300, width: 320, height: 50},
  {id: 'platform2', x: config.WIDTH - 320, y: 300, width: 320, height: 50},
  {id: 'platform3', x: 0, y: config.HEIGHT, width: 960, height: 50},
]

const create = (scene: Phaser.Scene) => {
  nextTick(() => {
    platforms.value.forEach(platform => {
      scene.physics.add.collider(player.value, platform)
    })
  })
}

const update = (scene) => {

}

const createPlayer = (_player: Phaser.Physics.Arcade.Sprite) => {
  console.log('createPlayer')
  player.value = _player
}

const createPlatform = layer => {
  platforms.value.push(layer)
}
</script>

<template>
  <Scene name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image
      :x="960 / 2"
      :y="540 / 2"
      texture="stage1"
      :scale="0.5"
    />
    <PlayerComponent
      @createPlayer="createPlayer"
    />
    <PlatForm
      v-for="v in PLATFORM"
      :data="v"
      @create="createPlatform"
    />
  </Scene>
</template>
