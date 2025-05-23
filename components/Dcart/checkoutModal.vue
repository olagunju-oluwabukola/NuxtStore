<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="$emit('close')">✕</button>
      <div v-if="!paid">
        <h2 class="text-xl font-semibold mb-4">Payment Details</h2>
        <form @submit.prevent="pay">
          <input v-model="name" required placeholder="Name on card" class="w-full border p-2 mb-3 rounded" />
          <input v-model="card" required placeholder="Card number" class="w-full border p-2 mb-3 rounded" />
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
            Pay ${{ total.toFixed(2) }}
          </button>
        </form>
      </div>
      <div v-else class="text-center">
        <div class="text-green-500 text-5xl mb-4 animate-bounce">✔️</div>
        <p class="text-lg font-semibold">Payment Successful!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close', 'paid'])
const name = ref('')
const card = ref('')
const paid = ref(false)

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
})

function pay() {
  paid.value = true
  setTimeout(() => {
    emit('paid')
    emit('close')
  }, 2000)
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
.animate-bounce {
  animation: bounce 0.6s ease-in-out;
}
</style>
