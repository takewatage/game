<script setup lang="ts">
import { inject } from "vue";
import { Sprite, Phavuer, Body, Container, useScene, StaticBody, Rectangle } from "phavuer";
import Star from "../../class/StarClass"

const props = defineProps<{
  star: Star
}>()

const emit = defineEmits<{
  'create': [Phaser.GameObjects.Sprite],
}>()

const create = (ob: Phaser.GameObjects.Sprite) => {
  ob.setData('id', props.star.id);
  emit('create', ob)
}

</script>

<template>
  <Sprite
    v-model:x="star.x"
    v-model:y="star.y"
    texture="star"
    @create="create"
  >
    <Body
      :velocityX="star.velocityX"
      :velocityY="star.velocityY"
      :bounceY="star.bounceY"
    />
  </Sprite>
</template>
