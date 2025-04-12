<script setup>
const route = useRoute()
const id = route.params.id

const { data: product} = await useFetch(`https://fakestoreapi.com/products/${id}`)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
    fatal: true
  })
}

definePageMeta({
  layout: 'products'
})
</script>

<template>

  <Head>
    <title>
      {{ product.title }}
    </title>
    <meta name="description" :content="product.description"/>
  </Head>
  <div v-if="product">
    <img :src="product.image" class="w-40 h-40 object-cover" />
    <p class="font-bold">{{ product.title }}</p>
    <p class="text-green-600">${{ product.price }}</p>
    <p>ID: {{ product.id }}</p>
  </div>
</template>

 <!-- Todo: 
 add a cart button and add to cart functionality  -->