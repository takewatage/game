<script setup lang="ts">
import { Game } from 'phavuer'
import { provide, ref, computed } from "vue"
import { useWindowSize } from '@vueuse/core'

import TitleScene from "@/components/Scenes/TitleScene.vue"
import config from "./config"
import GameScene from "@/components/Scenes/GameScene.vue";
import UIScene from "@/components/Scenes/UIScene.vue";

const { width, height } = useWindowSize()
const gameScene = ref(null)
const score = ref(0)

provide('score', score)

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
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, // 中央配置
  },
  audio: {
    disableWebAudio: true
  },
  input: {
    activePointers: 3
  },
  backgroundColor: '#4488aa',
}

</script>

<template>
  <div>
    <div class="menu">
      <h1>window</h1>
      <p>{{ width }}</p>
      <p>{{ height }}</p>
    </div>
    <Game :auto-start="false" :config="gameConfig">
      <TitleScene />

      <GameScene />

      <UIScene />
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
