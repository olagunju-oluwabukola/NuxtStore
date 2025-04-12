<template>
    <div>
        <p>Products home page here</p>
        <div v-for="p in product" :key="p.id">
           <productCard :product = 'p' />
        </div> 
    </div>

</template>

<script setup>
definePageMeta({
    layout:'products'
})

useHead({
    title:'prooduct page ',
    meta:[
        { content: 'overifing meta tag'}
    ],
    link:[]
})
const { data: product } = await useFetch('https://fakestoreapi.com/products')
</script>