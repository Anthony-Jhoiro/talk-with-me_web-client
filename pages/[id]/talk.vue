<script setup lang="ts">

import {useGetCompanionWithMessages, sendMessage} from "~/api/companions";

const route = useRoute()
const { data, pending, error, refresh, status } = await useGetCompanionWithMessages(route.params.id as string)

const formInput = ref("")
const sendingMessage = ref<string|null>(null)

const messages = computed(() => {
  if (!data.value) {
    return []
  }

  if (!sendingMessage.value) {
    return [...data.value.messages]
  }

  return [
    ...data.value.messages,
    {id: 'unknown', message: sendingMessage, createdAt: new Date().toISOString()}
  ]
});

async function onNewMessage(e: any) {
  e.preventDefault();
  sendingMessage.value = formInput.value;
  await sendMessage(data.value!.companion.id, formInput.value);

  // Reset input
  formInput.value = ""
  await refresh();
  sendingMessage.value = null;
}

const waitingForResponse = computed(() => sendingMessage.value !== null);


</script>

<template>
  <div v-if="pending">
    <LoadingIndicator />
  </div>

  <p v-if="error" class="text-maroon">
    {{error.message}}
  </p>

  <template v-if="status === 'success'">

    <div id="companion-header" class="flex">
      <div class="size-52">
        <Scene3D object-file="/vulpis.obj" texture-file="/vulpis.png"/>
      </div>

      <h2 class="text-4xl font-semibold">{{data.companion.name}}</h2>

    </div>

    <p class="text-subtext0 border-l-4 p-5 border-subtext0 mb-5">
      {{data.companion.background}}
    </p>

    <section id="discussion">
      <Message v-for="message in messages" :message="message" />
    </section>

    <div class="flex justify-center my-5" v-if="waitingForResponse">
      <LoadingIndicator />
    </div>

    <form @submit="onNewMessage">
      <div>
        <input :disabled="waitingForResponse" class="bg-surface1 text-text px-8 py-3 outline-4 outline-crust focus:outline-teal w-full" id="message-input" name="message" type="text" v-model="formInput" placeholder="Your question here" />
      </div>
    </form>

  </template>


</template>

<style scoped>

</style>
