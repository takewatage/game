<script setup lang="ts">
import { Game, Scene, Rectangle } from 'phavuer'
const gameConfig = { width: 960, height: 540 }
</script>

<template>
  <main>
    <Game :config="gameConfig">
      <Scene name="MainScene">
        <Rectangle :x="100" :y="100" :width="100" :height="100" :fillColor="0xAAAAAA" />
      </Scene>
    </Game>
  </main>
</template>
