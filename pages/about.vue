<template>
    <div>
        <h3 class="text-red-900">About</h3>
        <p class="text-blue-500">This is the about page.</p>
        <p>{{ data }}</p>
    </div>
</template>

<script setup>
const {data} = await useFetch('/api/product')
</script>