<script setup lang="ts">
import { defineComponent } from 'vue'
import { Scene, useGame, Text } from 'phavuer'
import loadAssets from '../../loadAssets'
import GameButton from "@/components/Ui/GameButton.vue";


const props = defineProps<{
  x: number,
  y: number,
  width: number,
  height: number,
}>()
const game = useGame()

const preload = (scene: Phaser.Scene) => {
  loadAssets(scene)
}

const onStart = () => {
  game.scene.start('GameScene')
  game.scene.stop('TitleScene')
}

</script>

<template>
  <Scene name="TitleScene" @preload="preload">
    <GameButton
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      @on-click="onStart"
    />
  </Scene>
</template>
