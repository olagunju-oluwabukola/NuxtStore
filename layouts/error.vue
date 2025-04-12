<template>
    <div class="p-6 text-center">
      <h1 class="text-4xl font-bold">{{ error?.statusCode || 500 }}</h1>
      <p class="text-lg">Oops...</p>
      <p class="text-gray-600">{{ error?.message || 'Something went wrong' }}</p>
      <button @click="handleError" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back to home...
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps(['error'])
  const { clearError } = useError()
  
  const handleError = () => {
    clearError({ redirect: '/' })
  }
  </script>
  