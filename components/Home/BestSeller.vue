<template>
  <div class=" relative">
    

    <div class="relative mx-auto md:mx-10 px-4 py-10">
        <h2 class="mb-12 text-2xl md:text-3xl font-semibold text-gray-900">Best Sellers</h2>

      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }"
        >
          <div
            v-for="(product, index) in products"
            :key="index"
            class="p-4 border rounded-lg mx-2 shadow relative"
            :class="{
              'w-full': visibleCount === 1,
              'w-1': visibleCount === 2,
              'w-2': visibleCount === 4
            }"
            @mouseover="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            <span
              v-if="product.onSale"
              class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              SALE
            </span>
            <img
              :src="hoveredIndex === index && product.images.length > 1 ? product.images[1] : product.images[0]"
              alt="product image"
              class="w-full h-40 object-contain mb-4 transition-all duration-300"
            />
            <h3 class="text-sm font-medium mb-1">{{ product.name }}</h3>
            <div class="text-sm">
              <span v-if="product.onSale" class="line-through text-gray-500 mr-2">
                {{ product.originalPrice }}
              </span>
              <span class="text-green-600 font-semibold">{{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>

      
      <button
        @click="prev"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
        :disabled="currentIndex === 0"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
      >
        &#8592;
      </button>
      <button
        @click="next"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
        :disabled="currentIndex >= maxIndex"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex >= maxIndex }"
      >
        &#8594;
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const products = [
  {
    name: 'Print Joggers Casual Loose ',
    images: ['https://janandjul.com/wp-content/uploads/PWJ-PBG-kids-winter-jogger-1-1.jpg', 
    'https://m.media-amazon.com/images/I/61DghE96nQL._AC_SX342_.jpg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZyB21ocBws6T4ierVjJ2ww6wVTAA8FC04Q&s'],
    price: '$70.00',
    originalPrice: '$85.00',
    onSale: true,
  },
  {
    name: 'Wireless Earbuds',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjtwgpHJ6deRiLqXn0al-N0n3QNSNo3fM81kLk_dPSHWJkLJCT4cGgUBgoB2bulk3e75c&usqp=CAU', 
    'https://m.media-amazon.com/images/I/410uEayAmAL.jpg', 
    'https://freemans.scene7.com/is/image/OttoUK/600w/Our-Pure-Planet-700XHP-True-Wireless-Bluetooth-Earpods~53C779FRSP.jpg'],
    price: '$85.00',
    onSale: false,
  },
  {
    name: 'Bluetooth Speaker',
    images: ['https://m.media-amazon.com/images/I/81YahdTzxoL._AC_UF894,1000_QL80_.jpg', 
    'https://www.sencor.com/getmedia/53d54418-3de4-4fe8-a503-5edb74cac646/35059173.jpg.aspx?width=2100&height=2100&ext=.jpg', 
    'https://laternabooks.ng/late2021rna/public/productimages/33c038516799fed32d2367b1c10532bf.jpeg'],
    price: '$85.00',
    onSale: false,
  },
  {
    name: 'Mini Digital Camera',
    images: ['https://s3-ap-southeast-1.amazonaws.com/media.cameralk.com/10615/Z7II-Body-Only.jpg', 
    'https://image.made-in-china.com/202f0j00yTuvnYMsAQcB/DC306L-Af-Front-and-Rear-Dual-Lens-Digital-Camera-Auto-Focus-16X-Zoom-Vlogging-Camera-for-Teens.webp', 
    'https://example.com/camera3.jpg'],
    price: '$70.00',
    originalPrice: '$85.00',
    onSale: true,
  },
  {
    name: 'Smart Watch Series 10',
    images: ['https://ss7.vzw.com/is/image/VerizonWireless/apple-watch-ultra2-49mm-black-titanium-black-titanium-milanese-loop-small-mx4w3lw-a',
     'https://cdn0.it4profit.com/s3size/rt:fill/w:0/h:0/g:no/el:1/f:webp/plain/s3://cms/category/1e/17/1e171acbdb4b02cecaf14d1197d45f92/frame_2087329438.webp', 
     'https://example.com/watch3.jpg'],
    price: '$120.00',
    onSale: false,
  },
  {
    name: 'Luxury Backpack',
    images: ['https://i.pinimg.com/236x/11/e5/e2/11e5e27e5a02d00e80040f454c28706f.jpg', 
    'https://m.media-amazon.com/images/I/51I7KH58gAL._AC_UY1100_.jpg', 'https://example.com/security3.jpg'],
    price: '$95.00',
    onSale: false,
  },
  {
    name: 'Wireless Gaming Mouse',
    images: ['https://www.u-buy.com.ng/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNDE0NUFKZ3Y4T0wuX1NTNDAwXy5qcGc.jpg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqkQWNDepdDC6uXxoogRJgGPViIcYHKqlGQ&s', 'https://example.com/mouse3.jpg'],
    price: '$45.00',
    originalPrice: '$60.00',
    onSale: true,
  },
  {
    name: 'Generic Stanley cup',
    images: ['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/8029193/1.jpg?6595',
     'https://m.media-amazon.com/images/I/51j4cvjPo7L._AC_UF894,1000_QL80_.jpg', 'https://example.com/fitness3.jpg'],
    price: '$55.00',
    onSale: false,
  },
]

const currentIndex = ref(0)
const hoveredIndex = ref(null)
const visibleCount = ref(4)

const updateVisibleCount = () => {
  const width = window.innerWidth
  if (width < 640) {
    visibleCount.value = 1
  } else if (width < 1024) {
    visibleCount.value = 2
  } else {
    visibleCount.value = 4
  }
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
})

const totalVisibleSegments = computed(() => 
  Math.ceil(products.length / visibleCount.value)
)
const maxIndex = computed(() => 
  Math.max(0, products.length - visibleCount.value)
)
const currentSegment = computed(() => Math.floor(currentIndex.value / visibleCount.value))

const next = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value += 1
  } else {
    currentIndex.value = 0 
  }
}
const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
  } else {
    currentIndex.value = maxIndex.value 
  }
}
const goToSegment = (i) => {
  currentIndex.value = i * visibleCount.value
}
</script>

<style scoped>

.flex {
  transition: transform 0.5s ease-in-out;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

@media (max-width: 640px) {
  .w-full {
    min-width: calc(100% - 1rem);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .w-1 {
    min-width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .w-2 {
    min-width: calc(25% - 1rem);
  }
}
</style>