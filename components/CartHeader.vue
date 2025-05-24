
<template>
  <nav class="bg-white shadow-md  py-3">
    <div class="max-w-7xl  px-4 md:px-10 lg:px-16">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">Nuxt Store</NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 text-lg font-semibold">
          <NuxtLink to="/products" class="text-gray-700 hover:text-green-600">Products</NuxtLink>
          <NuxtLink to="/cart" class="text-gray-700 hover:text-green-600">Cart</NuxtLink>
          <NuxtLink to="/checkout" class="text-gray-700 hover:text-green-600">Checkout</NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isOpen" class="md:hidden px-4 pb-4 space-y-2">
     <NuxtLink to="/cart" class="text-gray-700 hover:text-green-600">Cart</NuxtLink>
      <NuxtLink to="/Products" class="block text-gray-700 hover:text-green-600">Products</NuxtLink>
      <NuxtLink to="/checkout" class="block text-gray-700 hover:text-green-600">Checkout</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () =>{
  isOpen.value = !isOpen.value
}
</script>
