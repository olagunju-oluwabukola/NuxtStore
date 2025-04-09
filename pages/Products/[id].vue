
<script  setup>
const { id } = useRoute().params
const { data:product } = await useFetch ('https://fakestoreapi.com/products/' + id)
definePageMeta({
    layout:'products'
})
</script>

<template>
    <div>
    <img :src="product.image" />
    <p>{{ product.title }}</p>
    <p>{{ product.price }}</p>
    <p>{{ product.id }}</p>

    </div>
</template>
 <!-- Todo: 
 add a cart button and add to cart functionality  -->