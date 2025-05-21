<template>
  <div class="leading-loose">
    <img :src="product.image" alt="product img"  class=" h-50 w-full object-contain" />
    <p class="truncate font-semibold">{{ product.title }}</p>
   
    <p>
      <span>
        {{ isExpanded ? product.description : product.description.slice(0, 20) }}
        <span v-if="!isExpanded && product.description.length > 20">...</span>
      </span>
      <button 
        v-if="product.description.length > 20"
        @click="toggleDescription"
        class="text-green-400 ml-1"
      >
        {{ isExpanded ? 'See less' : 'See more' }}
      </button>
    </p>
    <p class="font-bold"> ${{ product.price }}</p>
     
     <div class="flex justify-between items-center">
         <p class="text-green-400">Rating - {{ product.rating.rate }}</p>
         <NuxtLink :to="`/products/${product.id}`" class="bg-green-400 rounded-md text-white p-2">View Details</NuxtLink>
    </div>
    
  </div>
</template>


<script setup>
import { ref } from 'vue'
const { product } = defineProps(['product'])

definePageMeta({
    layout:'products'
})

const isExpanded = ref(false)

const toggleDescription =() =>{
    isExpanded.value = !isExpanded.value
}

</script>