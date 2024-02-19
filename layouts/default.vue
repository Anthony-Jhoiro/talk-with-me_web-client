<script setup lang="ts">

import {useState} from "#app";

const darkMode = useState('theme', () => false)

const themeClass = computed(() => darkMode.value ? 'macchiato' : 'latte')

</script>

<template>
  <div class="bg-base overflow-x-hidden overflow-y-scroll w-screen h-screen" :class="themeClass">
    <header class="w-screen">
      <nav class="flex px-8 py-3 bg-crust justify-between items-center">

        <NuxtLink to="/">
          <h1 class="text-text text-2xl">Talk With Me</h1>
        </NuxtLink>

        <ThemeSwitch />
      </nav>
    </header>

    <main class="h-full container mx-auto text-text bg-surface0 py-5 px-8">
      <slot/>
    </main>
  </div>
</template>

<style scoped>


</style>
