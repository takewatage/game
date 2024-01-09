<script setup lang="ts">
import { Scene, Rectangle, Text, useGame } from 'phavuer'

const game = useGame()

const preload = () => {

}

</script>

<template>
  <Scene name="GameScene" :autoStart="false" @preload="preload">
    <Text text="Scene2" :x="15" :y="15" />
    <Rectangle
      :x="200"
      :y="110"
      :width="135"
      :height="30"
      :strokeColor="0x42B883"
      :lineWidth="1"
    />
    <Text
      text="GameScene!!!!"
      :x="200"
      :y="110"
      :origin="0.5"
    />
  </Scene>
</template>
