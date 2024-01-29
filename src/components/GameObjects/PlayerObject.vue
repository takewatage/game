<script setup lang="ts">
import { Body } from "phavuer"
import ArcadeSprite from "@/components/Phavuer/ArcadeSprite.vue"
import Player from "../../class/PlayerClass"

const props = defineProps<{
  player: Player
}>()

const emit = defineEmits<{
  'create': [Phaser.GameObjects.Sprite],
}>()

const createPlayer = (ob: Phaser.Physics.Arcade.Sprite) => {
  props.player.gameOb = ob
  emit('create', ob)
}

</script>

<template>

  <ArcadeSprite
    texture="dude"
    :tint="0xFFFFFF"
    :x="player.x"
    :y="player.y"
    @create="createPlayer"
  >
    <Body
      :width="20"
      :height="33"
      :velocityX="0"
      :velocityY="0"
      :offsetX="5.5"
      :offsetY="13"
      :collideWorldBounds="true"
      :bounceY="0.2"
      :enable="true"
      :immovable="false"
      :moves="true"
    />
  </ArcadeSprite>

</template>
