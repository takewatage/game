<script setup lang="ts">
import { Game } from 'phavuer'
import { provide, ref, computed } from "vue"
import { useWindowSize } from '@vueuse/core'

import TitleScene from "@/components/Scenes/TitleScene.vue"
import config from "./config"
import GameScene from "@/components/Scenes/GameScene.vue";

const { width, height } = useWindowSize()
const gameScene = ref(null)

const gameConfig = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }, // 重力
      debug: true
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
provide('player', computed(() => gameScene.value?.player))

</script>

<template>
  <div>
    <div class="menu">
      <h1>window</h1>
      <p>{{ width }}</p>
      <p>{{ height }}</p>
    </div>
    <Game :config="gameConfig">
      <TitleScene />

      <GameScene ref="gameScene" />
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
