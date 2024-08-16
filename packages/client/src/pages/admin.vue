<script setup lang="ts">
import { useWebSocket } from "@/composables/useWebSocket"
import { onUnmounted, ref, watch } from "vue"

const name = ref("")
const age = ref<number | undefined>(undefined)
const confirmed = ref<boolean | undefined>(undefined)

const { send } = useWebSocket("ws://localhost:8080", (event) => {
  // 送受信するときのJSONの型は決めておかないと壊れそう
  const data = JSON.parse(event.data)
  console.log("message", data)

  confirmed.value = data.confirmed
})
</script>

<template>
  <form @submit.prevent="send({ name, age })">
    <label for="name">名前<input type="text" v-model="name" /></label>
    <label for="age"
      >年齢
      <input type="number" v-model="age" />
    </label>
    <button>送信</button>

    <div>確認状態: {{ confirmed ? "確認とれました！" : "未確認" }}</div>
  </form>
</template>
