<script setup lang="ts">

import type {Companion} from "~/api/companions";

const {companion} = defineProps<{
  companion: Companion
}>()

const imageTexture = `https://picsum.photos/id/${(companion.id.length * 12345) %500}/200/300`

</script>

<template>

  <div class="border-teal border-2 rounded p-5 flex flex-col h-full w-full">
    <div class="h-52 w-full">
      <img :src="imageTexture" class="object-cover w-full h-full" alt="">
    </div>
    <h3 class="font-bold">{{ companion.name }}</h3>

    <div class="text-subtext0 my-3 overflow-y-auto h-full">
      {{ companion.background }}
    </div>

    <div>
      <slot name="action-row" />
    </div>
  </div>

</template>

<style scoped>

</style>
