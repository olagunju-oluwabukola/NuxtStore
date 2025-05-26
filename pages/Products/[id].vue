<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { createError, definePageMeta, useFetch } from '#imports'

const route = useRoute()
const id = route.params.id
const router = useRouter()
const navBack = () => router.back()
const { data: product } = await useFetch(`https://fakestoreapi.com/products/${id}`)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
    fatal: true
  })
}

definePageMeta({
  layout: 'products'
})

const quantity = ref(1)
const cart = useCartStore()

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  cart.addItem({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value
  })
  router.push('/cart')
}
</script>

<template>
  <Head>
    <title>{{ product.title }}</title>
    <meta name="description" :content="product.description" />
  </Head>
  <div>
    <button @click="navBack" class="cursor-pointer text-green-400 my-5 md:my-8 lg:my-10 mx-5 md:mx-10 lg:mx-10 font-semiBold text-lg"> << Previous </button>
  </div>
  <div
    v-if="product"
    class="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-start"
  >
   
    <div class="w-full h-full flex justify-center">
      <img
        :src="product.image"
        class="max-h-[500px] object-contain rounded-xl shadow-lg"
        alt="Product Image"
      />
    </div>

    <!-- Product Info -->
    <div class="space-y-6">
      <h1 class="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800">{{ product.title }}</h1>
      <p class="text-sm md:text-lg text-gray-700">{{ product.description }}</p>
      <p class="text-sm text-gray-500">Product ID: {{ product.id }}</p>

      <!-- Price & Quantity -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="text-xl font-semibold text-green-600">
          ${{ (product.price * quantity).toFixed(2) }}
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="decreaseQty"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >–</button>
          <span class="text-lg font-medium">{{ quantity }}</span>
          <button
            @click="increaseQty"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >+</button>
        </div>
      </div>

      <button
        @click="addToCart"
        class="bg-green-400 cursor-pointer text-white px-6 py-2 md:py-3 rounded-lg transition"
      >
        Add to Cart 
      </button>
    </div>
  </div>
</template>
