<script setup lang="ts">
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/solid';

import {useListCompanions} from "~/api/companions";

const { data, pending, error, refresh } = await useListCompanions()

</script>

<template>


  <div v-if="pending">
    <LoadingIndicator />
  </div>

  <p v-if="error" class="text-maroon">
    {{error.message}}
  </p>


  <section id="companions" v-if="data" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <div class="h-[500px]" v-for="companion in data._embedded.companions">
      <CompanionCard :companion="companion">
        <template #action-row>
          <div class="flex justify-end gap-3">
            <NuxtLink :to="'/' + companion.id + '/talk'" class="py-3 px-5 bg-teal hover:bg-teal-700 text-white flex items-center gap-2 rounded transition-colors">
              <ChatBubbleOvalLeftEllipsisIcon class="h-5" />
              <span>Start Talking</span>
            </NuxtLink>
          </div>
        </template>
      </CompanionCard>
    </div>
  </section>
</template>

<style scoped>

</style>
