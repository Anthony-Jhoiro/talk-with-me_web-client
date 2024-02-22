<script setup lang="ts">

import type {Companion} from "~/api/companions";

const {companion} = defineProps<{
  companion: Companion
}>()

</script>

<template>

  <div class="border-teal border-2 rounded p-5 flex flex-col h-full w-full space-y-5">
    <div class="h-80 w-full bg-crust rounded">
      <Scene3D object-file="/vulpis.obj" texture-file="/vulpis.png"/>
    </div>
    <h3 class="font-bold">{{ companion.name }}</h3>

    <div class="text-subtext0 overflow-y-auto h-full">
      {{ companion.background }}
    </div>

    <div>
      <slot name="action-row" />
    </div>
  </div>

</template>

<style scoped>

</style>
