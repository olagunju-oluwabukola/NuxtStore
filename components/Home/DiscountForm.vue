<template>
<section class="mx-auto md:mx-10 px-4 py-10">
<div class="bg-green-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
  
    <img
      src="https://www.pngitem.com/pimgs/m/161-1618022_bag-girl-with-shopping-bags-png-transparent-png.png"
      alt="leaf background"
      class="absolute bottom-0 left-0 w-1/3 opacity-10"
    />

    
    <div class="w-full md:w-1/2 text-left z-10  md:p-6 lg:p-10">
      <h2 class="text-xl md:text-3xl lg:text-6xl font-bold text-green-900 leading-tight">
        Get <span class="text-green-500">25%</span>
        <span class="text-green-600">Discount</span> on your
        <span class="text-green-900">first purchase</span>
      </h2>
     <p class="text-green-800 mt-4 w-full md:w-6/7
      lg:W-5/7 text-[12px] md:text-sm ">
  Sign up today and unlock exclusive deals straight to your inbox. Join our community and make the most of your first purchase with a special discount crafted just for you.
</p>

    </div>

    <!-- Form Section -->
    <div class="md:w-1/2 w-full mt-6 md:mt-0 z-10">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-green-800 mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Name"
            class="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label class="block text-green-800 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="abc@mail.com"
            class="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div class="flex items-center">
          <input
            v-model="form.subscribe"
            type="checkbox"
            id="subscribe"
            class="mr-2 text-green-600 focus:ring-green-500"
          />
          <label for="subscribe" class="text-green-800">Subscribe to the newsletter</label>
        </div>

        <button
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
    </section>
 
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  subscribe: false,
});

const submitForm = () => {
  console.log('Form submitted:', form);
  
};
</script>

<style scoped>
</style>
