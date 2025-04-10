<template>
<div>{{ error.statusCode }}</div>
<p>oops...</p>
<p>{{ error.message }}</p>
<botton @submit = 'handleError'>Back to home...</botton>
</template>

<script setup>
defineProps(['error'])

const handleError = () => clearError({
    redirect: '/'
})
</script>