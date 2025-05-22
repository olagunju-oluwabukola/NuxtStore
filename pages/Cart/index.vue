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
</script>

<template>
    <div>
        <div class="mx-auto text-center text-3xl md:text-5xl lg:text-6xl font-bold my-4 md:m-8 lg:my-10"> 
            Products
        </div>
    </div>

    <div class="mx-auto md:mx-10 px-4 py-10">
        <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
             <div v-for="p in product" :key="p.id" class="bg-white rounded shadow-md p-4 " >
                 <productCard :product = 'p' />
            </div>
        </div>
       <DcartCartPage/>
    </div>
    
</template>