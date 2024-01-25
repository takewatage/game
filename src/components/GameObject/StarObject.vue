<script setup lang="ts">
import { inject } from "vue";
import { Sprite, Phavuer, Body, Container, useScene, StaticBody, Rectangle } from "phavuer";
import Star from "../../class/StarClass"

const props = defineProps<{
  star: Star
}>()

props.star.on('hit', () => {
  console.log("hit!!!")
})

const createStar = (star) => {
  props.star.gameOb = star
}

</script>

<template>
  <Sprite
    v-model:x="star.x"
    v-model:y="star.y"
    v-model:visible="star.active"
    texture="star"
    @create="createStar"
  >
    <Body
      :velocityX="star.velocityX"
      :velocityY="star.velocityY"
      :bounceY="star.bounceY"
    />
  </Sprite>
</template>
