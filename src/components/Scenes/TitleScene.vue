<script setup lang="ts">
import { Scene, useGame } from 'phavuer'
import loadAssets from '../../loadAssets'
import config from '../../config'
import GameButton from '@/components/Ui/GameButton.vue'

const game = useGame()

const preload = (scene: Phaser.Scene) => {
  loadAssets(scene)
}

const onStart = () => {
  game.scene.start('GameScene')
  game.scene.start('UIScene')
  game.scene.stop('TitleScene')
}
</script>

<template>
  <Scene
    name="TitleScene"
    @preload="preload"
  >
    <GameButton
      :x="config.WIDTH / 2"
      :y="config.HEIGHT / 2"
      :width="155"
      :height="50"
      @on-click="onStart"
    />
  </Scene>
</template>
