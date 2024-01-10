<script setup lang="ts">
import { Scene, Rectangle, Text, useGame, Image } from 'phavuer'
import { ref } from "vue"
import Hit from "@/components/Hit.vue";

const hitVisible = ref(false)
const hitX = ref(0)
const hitY = ref(0)

const onClick = () => {
  hitVisible.value = true
}
</script>

<template>
  <Scene name="GameScene" :autoStart="false">
    <Image
      :originX="960"
      :originY="540"
      texture="stage1"
      :scale="0.5"/>
    <Text text="Scene2" :x="15" :y="15" />
    <Rectangle
      :x="200"
      :y="110"
      :width="135"
      :height="30"
      :strokeColor="0x42B883"
      :lineWidth="1"
      @pointerdown="onClick"
    />
    <Text
      text="GameScene!!!!"
      :x="200"
      :y="110"
      :origin="0.5"
    />
    <Hit v-if="hitVisible" @end="hitVisible = false" :x="hitX" :y="hitY" />
  </Scene>
</template>
