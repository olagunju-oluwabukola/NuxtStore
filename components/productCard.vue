<template>
    <div>
        <img :src="product.image"/>
        <p class="truncate">{{ product. title }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product. description }}</p>
    <NuxtLink :to = '`/products/${product.id}`' > ViewDetails </NuxtLink>
    </div>
</template>

<script setup>
const { product } = defineProps(['product'])

definePageMeta({
    layout:'products'
})
</script>