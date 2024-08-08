<script setup lang="ts">
import type { Product } from '@/types';
import { RouterLink } from 'vue-router'

defineProps<{
  product: Product
}>()

let priceInNaira = new Intl.NumberFormat('en-NG', {
    currency: 'NGN',
    style: 'currency',
});

</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="inline-block shrink-0">
    <div class="aspect-square w-full relative rounded-lg overflow-clip bg-gray-300">
      <img class="object-cover w-full h-full" :src="product.imageURL" />
      <div
        class="bg-white rounded-xl w-fit ring-[1.5px] absolute top-3 right-3 ring-gray-400 py-1 px-2.5 text-xs font-semibold space-x-2">
        <span class="inline-block w-3 h-3 rounded-full bg-red-400" />
        <span class="inline-block">Just In</span>
      </div>
    </div>
    <p class="line-clamp-1 text-gray-700 mt-2 text-sm font-semibold uppercase">{{ product.name }}</p>
    <p class="font-bold text-lg mt-1 text-green-700">{{ priceInNaira.format(product.price) }}</p>
  </RouterLink>
</template>
