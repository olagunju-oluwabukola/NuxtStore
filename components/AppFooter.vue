<template>
    
  <footer class=" text-dark px-6 py-10">
    <div class=" mx-auto md:mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <div>
        <h2 class="text-lg md:text-3xl lg:text-4xl font-semibold mt-0 md:mt-8 text-green-400">NUXTSTORE</h2>
      </div>

      <div v-for="(section, index) in footerLinks" :key="index">
        <h2 class="text-sm md:text-lg lg:text-xl font-bold mb-2 text-green-400">{{ section.title }}</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="(item, idx) in section.items" :key="idx">
            <router-link :to="item.to" class="hover:underline">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    
    <div class="mt-10 text-center text-sm text-gray-600">
      © {{ currentYear }} by Oluwabukola. 
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const currentYear = new Date().getFullYear()
const footerLinks = [
  {
    title: 'Shop',
    items: [
      { label: 'Clothes', to: '/' },
      { label: 'Gadgets', to: '/' },
      { label: 'Bags', to: '/' },
      { label: 'Acessories', to: '/' },
    ],
  },
  {
    title: 'Helpful Links',
    items: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Refund Policy', to: '/refund' },
      { label: 'Shipping Policy', to: '/shipping' },
      { label: 'Accessibility Statement', to: '/accessibility' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Our Story', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Instagram', to: '/instagram' },
      { label: 'Facebook', to: '/facebook' },
      { label: 'Pinterest', to: '/pinterest' },
    ],
  },
]
</script>
