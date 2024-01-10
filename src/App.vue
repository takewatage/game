<script setup lang="ts">
import { Game } from 'phavuer'
import { onMounted } from "vue"
import { useWindowSize } from '@vueuse/core'

import TitleScene from "@/components/Scenes/TitleScene.vue"
import config from "./config"
import GameScene from "@/components/Scenes/GameScene.vue";

const { width, height } = useWindowSize()

const gameConfig = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  audio: {
    disableWebAudio: true
  },
  input: {
    activePointers: 3
  },
  backgroundColor: '#4488aa',
}

onMounted(() => {

})

</script>

<template>
  <div>
    <div class="menu">
      <h1>window</h1>
      <p>{{ width }}</p>
      <p>{{ height }}</p>
    </div>
    <Game :config="gameConfig">
      <TitleScene
        :x="config.WIDTH / 2"
        :y="config.HEIGHT / 2"
        :width="155"
        :height="50"
      />

      <GameScene />
    </Game>
  </div>
</template>

<style lang="scss">
  .menu {
    position: fixed;
    bottom: 10px;
    left: 10px;
    border: 1px solid white;
    padding: 10px 25px;
    color: white;
  }
</style>
