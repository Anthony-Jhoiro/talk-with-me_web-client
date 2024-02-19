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
  formInput.value
  await sendMessage(data.value!.companion.id, formInput.value);
  await refresh();
  sendingMessage.value = null;
}

const waitingForResponse = computed(() => sendingMessage.value !== null);


</script>

<template>Ò
  <div v-if="pending">
    <LoadingIndicator />
  </div>

  <p v-if="error" class="text-maroon">
    {{error.message}}
  </p>

  <template v-if="status === 'success'">

    <p class="text-subtext0 border-l-4 p-5 border-subtext0 mb-5">
      {{data.companion.background}}
    </p>

    <section id="discussion">
      <div v-for="(message, index) in messages" class="border-l-4 px-5 py-2 my-1" :class="index % 2 === 0 ? 'border-blue' : 'border-green'">
        {{message.message}}
      </div>
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
