<script setup>
import { useRoute, useRouter } from 'vue-router'
definePageMeta({
    layout:'cart'
})

useHead({
    title:'cart and checkout',
    meta:[
        { content: 'overifing meta tag'}
    ],
    link:[]
})
const router = useRouter()  
const navBack  = () => router.back()
</script>

<template>
     <div>
    <button @click="navBack" class="text-green-400 my-5 md:my-8 lg:my-10 mx-5 md:mx-10 lg:mx-10 font-semiBold text-lg cursor-pointer"> << Previous </button>
  </div>
    <div >
    </div>

    <div class="mx-auto md:mx-10 px-4 py-10">
       <CheckoutSummary/>
    </div>
    
</template>