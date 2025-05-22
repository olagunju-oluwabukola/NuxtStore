<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()

const router = useRouter()

function checkout() {
  alert(`Payment successful! Total: $${cart.total.toFixed(2)}`)
  cart.clearCart()
  router.push('/products')
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.items.length === 0" class="text-gray-600">
      Your cart is empty.
    </div>

    <div v-else>
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex items-center justify-between border-b py-4"
      >
        <div class="flex items-center gap-4">
          <img :src="item.image" alt="" class="w-16 h-16 object-contain" />
          <div>
            <h2 class="font-semibold">{{ item.title }}</h2>
            <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-green-600 font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="cart.removeItem(item.id)" class="text-red-500 text-sm mt-1 hover:underline">
            Remove
          </button>
        </div>
      </div>

      <div class="mt-8 flex justify-between items-center border-t pt-4">
        <p class="text-xl font-bold">Total: ${{ cart.total.toFixed(2) }}</p>
        <button
          @click="checkout"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template> 

