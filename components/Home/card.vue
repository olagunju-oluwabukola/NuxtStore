<template>
  <section class="container mx-auto px-4 py-12">
    <h2 class=" mb-12 text-2xl md:text-3xl font-semibold text-gray-900">Shop by Category</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <HomeCategoryCard 
        v-for="category in categories"
        :key="category.slug"
        :title="category.title"
        :image-url="category.imageUrl"
        :button-text="category.buttonText"
        :slug="category.slug"
        @category-click="handleCategoryClick"
      />
    </div>
  </section>
</template>

<script setup>
const categories = ref([
  {
    title: 'Clothing',
    slug: 'clothing',
    imageUrl: 'https://t3.ftcdn.net/jpg/04/29/08/92/240_F_429089217_Rqvm801iXsTW6mrQPMG4lZYuRXUpALiR.jpg',
      buttonText: 'Clothing'
  },
  {
    title: 'Bags',
    slug: 'bags',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSa6_IGDLB-SnyZuiQ5sEfMLqlc9NOtffuA&s',
      buttonText: 'Bags'
  },
  {
    title: 'Shoes',
    slug: 'shoes',
    imageUrl: 'https://img.drz.lazcdn.com/static/np/p/06c417d0d69708c1934913f438a6b3ab.jpg_720x720q80.jpg',
    buttonText: 'Shoes'
  },
  {
    title: 'Accessories',
    slug: 'accessories',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrLRR-KvGmbFLtjQ4Gx8tsBhFNtYLb8LD6gw&s',
    buttonText: 'View All'
  }
])

const handleCategoryClick = (categoryName) => {
 
  console.log(`Category clicked: ${categoryName}`)
}
</script>

<style>
/* You can add any custom styles here if needed */
</style>