<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useAppStore } from '@/store/appStore'
import type { Product } from '@/types';
import { BackArrow } from '@/icons'
import { useRoute } from 'vue-router';

const screenState = reactive({
  isLoading: false
})

const route = useRoute()

const product = ref<Product>()

const appStore = useAppStore()

watchEffect(() => {
  getProductDetail()
})

async function getProductDetail() {
  screenState.isLoading = true
  const { data, success } = await appStore.getSingleProduct(route.params.id as string)
  console.log(data)
  if (success && data) {
    product.value = data?.product
  }
  screenState.isLoading = false
}

let priceInNaira = new Intl.NumberFormat('en-NG', {
  currency: 'NGN',
  style: 'currency',
});


</script>

<template>
  <main class="pt-4 pb-16 px-4">
    <div class="mx-auto max-w-[1400px] w-full flex items-center gap-x-4 justify-between">
      <RouterLink to="/" class="font-medium flex text-gray-600 items-center p-2 gap-x-2 hover:underline transition-all">
        <BackArrow name="ph:arrow-left" class="w-6 h-8" />Go back
      </RouterLink>
    </div>
    <div class="font-medium text-lg text-gray-600 uppercase  w-fit mx-auto mt-10" v-if="screenState.isLoading">Loading
    </div>
    <div v-else>
      <div class="font-medium text-lg text-gray-600 uppercase  w-fit mx-auto mt-10" v-if="!product">
        No product available</div>
      <div v-else class="flex flex-col lg:flex-row gap-6 mx-auto max-w-[1400px] w-full mt-4 md:mt-10">
        <section class="w-full lg:w-2/3 grid ">
          <img class="object-cover w-full max-h-[600px] rounded-lg aspect-square sm:aspect-auto" :src="product.imageURL" />
        </section>
        <section class="w-full md:w-1/2 lg:w-1/3 md:pt-5">
          <div class="">
            <h2 class="font-bold text-4xl capitalize">{{ product.name }}</h2>
            <p class="font-semibold text-2xl flex items-center gap-4 mt-1">
              <span class="text-gray-700">{{ priceInNaira.format(product.price) }}</span>
            </p>
          </div>
          <div class="mt-5">
            <h2 class="font-semibold text-xl">Description</h2>
            <p class="text-sm">
              {{ product.description }}
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
