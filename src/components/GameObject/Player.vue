<script setup lang="ts">
import { ref, reactive } from "vue";
import { Sprite, Phavuer, Body, Container, useScene } from "phavuer";
import { Player } from "../../class/Player";

const props = defineProps<{
  player: Player
}>()

const emit = defineEmits<{
  'createPlayer': [Phaser.Physics.Arcade.Sprite],
}>()

const data = reactive({
  frame: 0,
  hitVisible: false,
  hitX: 0,
  hitY: 0,
  dieTween: undefined as Phavuer.TweenConfig | undefined,
  dx: 50,
  dy: 50,
})

const playerClass = ref(null)

const create = (player) => {
  emit('createPlayer', player)
}

</script>

<template>
  <Container>
    <Sprite
      texture="dude"
      :x="30"
      :y="30"
      :tint="'0xFFFFFF'"
    />
    <Body
      :width="30"
      :height="50"
      :offsetX="15"
      :offsetY="10"
      :collideWorldBounds="true"
      :enable="true"
      :immovable="false"
      :moves="true"
      :bounceY="0.2"
      @create="create"
    />
  </Container>
</template>
