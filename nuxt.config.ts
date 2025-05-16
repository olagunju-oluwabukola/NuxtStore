// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app:{
    head:{
      title: 'Nuxt-product',
      meta:[
        {name:'product', content: 'nuxt tutorial'}

      ],
      link: [
        {rel:'stylesheet', href:'icon link here'}
      ]
    },

  },

  modules: ['@nuxt/image']
})