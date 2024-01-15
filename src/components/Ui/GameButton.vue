<script setup lang="ts">
import { Container, Rectangle, Text } from 'phavuer'
import config from '../../config'

const props = defineProps<{
  x: number,
  y: number,
  width: number,
  height: number,
}>()

defineEmits<{
  'onClick': [void],
}>()

</script>

<template>
  <Container>
    <Rectangle
      id="titleBtn"
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :strokeColor="0x42B883"
      :lineWidth="1"
      poin
      @pointerdown="$emit('onClick')"
      @pointerover=""
    />
    <Text
      text="ゲーム開始"
      :style="{
              fontFamily: 'Helvetica, Arial',
              color: '#42B883',
              fontSize: '26px',
              fontStyle: 'bold',
              strokeThickness: 8,
              stroke: '#213547',
            }"
      :x="config.WIDTH / 2"
      :y="config.HEIGHT / 2"
      :origin="0.5"
    />
  </Container>
</template>
