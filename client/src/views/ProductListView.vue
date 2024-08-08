<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
import { useAppStore } from '@/store/appStore'
import type { Product } from '@/types';

const appStore = useAppStore()

const products = ref<Array<Product>>([])

onMounted(() => {
  getProducts()
})

const screenState = reactive({
  isLoading: false
})


async function getProducts() {
  screenState.isLoading = true
  const { data, success } = await appStore.getAllProducts()
  console.log(data)
  if (success && data) {
    products.value = data?.products
  }
  screenState.isLoading = false
}
</script>

<template>
  <div class="px-4 pb-10 pt-8 border-t relative grow h-full">
    <div class="font-medium text-lg text-gray-600 uppercase  w-fit mx-auto mt-10" v-if="screenState.isLoading">Loading
    </div>
    <main v-else class="max-w-[1100px] mx-auto">
      <section class="w-full">
        <div class="flex items-center justify-between gap-x-3">
          <h1 class="uppercase font-medium text-lg md:text-xl">Products on sale</h1>
        </div>
        <div class="font-medium text-lg text-gray-600 uppercase  w-fit mx-auto mt-10" v-if="products.length == 0">
          No product available</div>
        <div v-else class="mt-6 gap-4 sm:gap-6 md:gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <ProductItem v-for="product in products" :product="product" :key="product.id" class="grow" />
        </div>
      </section>
    </main>
  </div>
</template>
