<script setup lang="ts">

import Object3D from "~/components/Object3D.vue";

const {objectFile, textureFile} = defineProps<{
  objectFile: string;
  textureFile: string;
}>()

</script>

<template>
  <TresCanvas
      :alpha="true">
    <TresPerspectiveCamera
        :position="[.4, 1.5, -2]"
        :look-at="[0, .75, 0]"
    />
    <Suspense>
      <!-- Object is handled in another component to avoid server-side rendering issues -->
      <Object3D :object-file="objectFile" :texture-file="textureFile"/>
    </Suspense>
    <TresAmbientLight :intensity="2"/>
  </TresCanvas>

</template>

<style scoped>

</style>
