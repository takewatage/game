<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from "vue"
import { Sprite, Phavuer, Body, Container, useScene, Image, refObj, refTo } from "phavuer"
import Player from "../../class/Player"
import PlatForm from "../../components/GameObject/PlatForm.vue";
import PlayerComponent from "../../components/GameObject/Player.vue";
import config from "../../config";

defineProps<{
  playerClass: Player
}>()


const PLATFORM = [
  { id: 'platform1', x: 0, y: 300, width: 320, height: 50 },
  { id: 'platform2', x: config.WIDTH - 320, y: 300, width: 320, height: 50 },
  { id: 'platform3', x: 0, y: config.HEIGHT, width: 960, height: 50 },
]

const scene = useScene()
const playerRef = refTo(null, 'playerRef')

const createPlayer = (_player) => {

}


</script>

<template>
  <div>
    <Image
      :x="960 / 2"
      :y="540 / 2"
      texture="stage1"
      :scale="0.5"
    />
<!--    <Container ref="playerRef">-->
      <PlayerComponent
        ref="playerRef"
        :player="playerClass"
        @create="createPlayer"
      />

<!--    </Container>-->
<!--      <Container ref="platform">-->
<!--        <PlatForm-->
<!--          v-for="v in PLATFORM"-->
<!--          :data="v"-->
<!--          :key="v.id"-->
<!--        />-->
<!--      </Container>-->
  </div>
</template>
