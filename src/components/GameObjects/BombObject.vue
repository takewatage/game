<script setup lang="ts">
import { Image, Body, Container } from 'phavuer'
import Bomb from '../../class/BombClass'

const props = defineProps<{
  bomb: Bomb
}>()

const emit = defineEmits<{
  create: [Phaser.GameObjects.Container]
}>()

const create = (ob: Phaser.GameObjects.Container) => {
  ob.setData('id', props.bomb.id)
  emit('create', ob)
}
</script>

<template>
  <Container
    v-model:x="bomb.x"
    v-model:y="bomb.y"
    :depth="bomb.y"
    @create="create"
  >
    <Image
      texture="bomb"
      :x="10"
      :y="10"
    />
    <Body
      :width="15"
      :height="15"
      :offsetX="2.5"
      :offsetY="2.5"
      :collideWorldBounds="true"
      :velocityX="bomb.velocityX"
      :velocityY="bomb.velocityY"
      :bounceX="bomb.bounceX"
      :bounceY="bomb.bounceY"
    />
  </Container>
</template>
