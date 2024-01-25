<script setup lang="ts">
import { inject } from "vue";
import { Sprite, Phavuer, Body, Container, useScene, StaticBody, Rectangle } from "phavuer";

const scene = useScene()
const player = inject('player')

const emit = defineEmits<{
  'create': [Phaser.Physics.Arcade.StaticBody],
}>()

const props = defineProps<{
  data: {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
  }
}>()

// const group = inject('group')

const staticBodyCreate = (body) => {
  emit('create', body)
  // scene.physics.add.collider(props.player, body)
}


</script>

<template>
    <Rectangle
      :x="data.x + (data.width / 2)"
      :y="data.y - (data.height / 2)"
      :width="data.width"
      :height="data.height"
      :fillColor="0x42B883"
      @create="staticBodyCreate"
    >
      <StaticBody
        :x="data.x"
        :y="data.y - data.height"
        :width="data.width"
        :height="data.height"
        :offsetX="0"
        :offsetY="0"
        :enable="true"
      />
    </Rectangle>
</template>
