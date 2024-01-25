<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue"
import { Sprite, Phavuer, Body, Container, useScene, refObj } from "phavuer"
import Player from "../../class/Player"

const props = defineProps<{
  player: Player
}>()

const emit = defineEmits<{
  'create': [Phaser.GameObjects.Container],
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

const create = (player) => {
  emit('create', player)
}

const scene = useScene()
const object = refObj(null)
const body = refObj(null)

const collideSetting = (ob) => {
  console.log(object.value.object.body)
  console.log(ob)
  // scene.physics.collide(object.value.object.body)
}

onMounted(() => {
  console.log("player mount")
  console.log(object.value)
  // scene.physics.world.enable(object.value)
})

</script>

<template>
<!--  <div>-->
<!--    <h2>title!!!!</h2>-->
<!--  </div>-->
  <Container ref="object" :x="player.x" :y="player.y" @create="create">
    <Sprite
      texture="dude"
      :tint="0xFFFFFF"
    />
    <Body
      ref="object"
      :velocityX="player.velocityX"
      :velocityY="player.velocityY"
      :width="30"
      :height="50"
      :offsetX="-15"
      :offsetY="-25"
      :collideWorldBounds="true"
      :enable="true"
      :immovable="false"
      :moves="true"
      :bounceY="0.2"
    />
  </Container>
</template>
