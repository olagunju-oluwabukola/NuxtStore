<template>
    <section class="bg-gradient-to-br from-green-50 to-white px-4 py-20 md:py-28">

        <div class="flex flex-col md:flex-row items-center justify-between  ">
            <div class="md:px-16 px-3 space-y-2 md:space-y-6 w-full">
        <p class="uppercase text-green-600 tracking-wide font-semibold text-sm md:text-base">
          Welcome to Nuxt Store
        </p>
  
        <h1 class="text-3xl
         md:text-6xl font-extrabold text-green-800 leading-tight">
          Are you ready to <br />
          <span class="text-green-600">lead the way</span>?
        </h1>
  
        <p class="text-green-700 text-sm 
        mt-6 md:mt-0
        md:text-base  md:leading-relaxed font-medium  max-w-xl mx-auto">

          Discover affordable, modern, and quality items — designed to elevate your lifestyle.
        </p>
  
        <NuxtLink
          to="/shop"
          class="
        flex items-center justify-center md:inline-block
           mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full text-sm md:text-base font-medium shadow-lg transition"
        >
          Buy Now
        </NuxtLink>
      </div>
 
      <div>
        <img
          src="~/assets/images/hero.webp"
          alt="Hero Image"
          class="hidden md:block  h-auto  rounded-lg shadow-lg border-2 border-green-600"
        />
      </div>
        </div>
     
  
      <!-- Feature Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 px-4">
        <div class="bg-white shadow-lg p-6 rounded-xl text-center space-y-3">
          <div class="w-10 h-10 bg-green-100 mx-auto rounded-full flex items-center justify-center font-bold text-green-700">A</div>
          <p class="font-semibold text-green-800">Affordable Quality</p>
          <p class="text-green-600 text-sm">Starting at $25.00</p>
        </div>
        <div class="bg-white shadow-lg p-6 rounded-xl text-center space-y-3">
          <div class="w-10 h-10 bg-green-100 mx-auto rounded-full flex items-center justify-center font-bold text-green-700">B</div>
          <p class="font-semibold text-green-800">Fast Delivery</p>
          <p class="text-green-600 text-sm">Ships in 24hrs</p>
        </div>
        <div class="bg-white shadow-lg p-6 rounded-xl text-center space-y-3">
          <div class="w-10 h-10 bg-green-100 mx-auto rounded-full flex items-center justify-center font-bold text-green-700">C</div>
          <p class="font-semibold text-green-800">Eco Friendly</p>
          <p class="text-green-600 text-sm">Sustainable Products</p>
        </div>
      </div>
    </section>

    <HomeCard/>
  </template>
  