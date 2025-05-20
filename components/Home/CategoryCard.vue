<template>
  <div class="relative w-full  overflow-hidden rounded-lg shadow-md hover:-translate-y-1 transition-transform duration-300 group">
    <div class="relative w-full h-48 overflow-hidden">
      <img 
        :src="imageUrl" 
        :alt="title" 
        class="w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <button 
        class="flex absolute bottom-4 left-1/3 -translate-x-1/2 px-5 py-2 bg-white bg-opacity-90 text-gray-800 font-bold rounded-full border-none transition-all duration-300 hover:bg-white hover:shadow-md"
        @click="emit('categoryClick', title)"
      >
        {{ buttonText }} 
        <div class='mt-1'>
               <svg width="40" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="7" width="32" height="2" fill="currentColor"/>
            <path d="M40 8L48 0L48 16L40 8Z" fill="currentColor"/>
</svg>

        </div>
     
      </button>
    </div>
    
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Category'
  },
  imageUrl: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300'
  },
  buttonText: {
    type: String,
    default: 'Shop Now'
  }
})

const emit = defineEmits(['categoryClick'])
</script>