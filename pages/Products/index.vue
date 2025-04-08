<template>
    <div>
        <p>Products home page here</p>
        <div v-for="p in product" :key="p.id">
            <NuxtLink :to = '`/pproduct/{p.id}`' > {{ p.title}} </NuxtLink>
        </div> 
    </div>

</template>

<script setup>
definePageMeta({
    layout:'products'
})

const { data: product } = await useFetch('https://fakestoreapi.com/products')
</script>