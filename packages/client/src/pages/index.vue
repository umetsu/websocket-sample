<script setup lang="ts">
import { computed, ref } from "vue"
import { useWebSocket } from "@/composables/useWebSocket"

const name = ref("")
const age = ref<number | undefined>(undefined)

const { send } = useWebSocket("ws://localhost:8080", (event) => {
  console.log("message", event.data)

  const data = JSON.parse(event.data)
  name.value = data.name
  age.value = data.age
})

const confirmButtonDisabled = computed(() => !name.value || !age.value)

function confirm() {
  send({ name: name.value, age: age.value, confirmed: true })
}
</script>

<template>
  <main>
    <div>
      <div>名前: {{ name }}</div>
      <div>年齢: {{ age }}</div>
      <button :disabled="confirmButtonDisabled" @click="confirm">OK!</button>
    </div>
  </main>
</template>
