<script setup lang="ts">

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
};


</script>

<template>

  <div class="size-32" v-bind="gl">
    <TresCanvas
        :alpha="true">
      <TresPerspectiveCamera
          :position="[.4, 1.5, -2]"
          :look-at="[0, .75, 0]"
      />
      <Suspense>
        <Fox />
      </Suspense>
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>


</template>

<style scoped>

</style>
