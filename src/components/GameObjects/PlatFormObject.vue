<script setup lang="ts">
import { StaticBody, Rectangle } from "phavuer";
import PlatForm from "../../class/PlatFormClass";

const emit = defineEmits<{
  'create': [Phaser.GameObjects.Rectangle],
}>()

const props = defineProps<{
  // data: {
  //   id: string,
  //   x: number,
  //   y: number,
  //   width: number,
  //   height: number,
  // },
  data: PlatForm
}>()

const staticBodyCreate = (body: Phaser.GameObjects.Rectangle) => {
  props.data.setGameOb(body)
  emit('create', body)
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
