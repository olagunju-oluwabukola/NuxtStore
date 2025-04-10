<template>
    <div>
        <img :src="product.image" alt="product img"/>
        <p class="truncate">{{ product. title }}</p>
        <p>Price - ${{ product.price }}</p>
        <p>Product Description - {{ product. description }}</p>
    <NuxtLink :to = '`/products/${product.id}`' > ViewDetails </NuxtLink>
    </div>
</template>

<script setup>
const { product } = defineProps(['product'])

definePageMeta({
    layout:'products'
})
</script>