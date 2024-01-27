<script setup lang="ts">
import { Game } from 'phavuer'
import { provide, ref } from "vue"
import { useWindowSize } from '@vueuse/core'

import TitleScene from "@/components/Scenes/TitleScene.vue"
import config from "./config"
import GameScene from "@/components/Scenes/GameScene.vue";
import UIScene from "@/components/Scenes/UIScene.vue";

const { width, height } = useWindowSize()

const gameRef = ref<Phaser.Game>()
const score = ref(0)
const result = ref(false)

const onGameOver = () => {
  gameRef.value?.scene.pause('GameScene')
  result.value = true
}
const onReset = () => {
  gameRef.value?.scene.stop('GameScene')
  gameRef.value?.scene.stop('UIScene')
  gameRef.value?.scene.start('TitleScene')
  result.value = false
}

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
      debug: config.GAME.DEBUG
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

const onReady = (v: Phaser.Game) => {
  gameRef.value = v
  config.BLEND_MODES.OVERLAY = (v.renderer as Phaser.Renderer.WebGL.WebGLRenderer).addBlendMode([WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE], WebGLRenderingContext.FUNC_ADD)
  window.addEventListener('resize', () => v.scale.refresh())
}

</script>

<template>
  <div>
    <Game @ready="onReady" :auto-start="false" :config="gameConfig">
      <TitleScene />

      <GameScene @gameOver="onGameOver" />

      <UIScene :result="result" @reset="onReset" />
    </Game>
  </div>
</template>
