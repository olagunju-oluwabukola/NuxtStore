<template>
    <div>
        <p>Products decription here</p>
        <p>{{ data }}</p>
    </div>

</template>

<script setup>
definePageMeta({
layout:'products'
})

const {data} = useFetch('/api/product')
</script>