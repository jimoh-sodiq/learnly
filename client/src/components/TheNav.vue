<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { onClickOutside, refDebounced } from '@vueuse/core'
import { MagnifyingGlass, UserCircle } from '@/icons'
import { useAppStore } from '@/store/appStore'
import type { Product } from '@/types';

const appStore = useAppStore()

const products = ref<Array<Product>>([])

const screenState = reactive({
  searching: false
})

const searchString = ref('')

const debouncedSearchString = refDebounced(searchString, 500)

const searchDivRef = ref(null)

onClickOutside(searchDivRef, () => resetSearchString())

function resetSearchString() {
  searchString.value = ''
}

async function getProducts() {
  screenState.searching = true
  const { data, success } = await appStore.getAllProducts(debouncedSearchString.value)
  if (success && data) {
    products.value = data?.products
  }
  screenState.searching = false
}

watch(debouncedSearchString, () => {
  getProducts()
})
</script>

<template>
  <nav class="p-4 md:p-6 h-20 sticky top-0 bg-white z-50 shadow-sm shadow-gray-100">
    <div class="max-w-[1400px] mx-auto flex items-center justify-between">
      <RouterLink to="/">
        <div class="flex items-center gap-x-1 select-none">
          <p class="text-2xl uppercase">J<span class="text-base">Market</span></p>
        </div>
      </RouterLink>
      <div class="hidden md:flex items-center gap-x-8 w-full max-w-[400px]">
        <div class="relative w-full" ref="searchDivRef">
          <label :class="searchString
            ? 'rounded-t-xl bg-white border-t border-x border-gray-300'
            : 'rounded-xl bg-[#F2F4F5]'
            " class="px-4 py-2.5 w-full flex items-center gap-x-4">
            <MagnifyingGlass class="cursor-pointer" />
            <input v-model.trim="searchString" type="search" placeholder="Search products"
              class="flex-auto text-gray-600 bg-transparent outline-none text-sm" />
          </label>
          <div v-if="searchString"
            class="absolute bg-white rounded-b-xl w-full border-t-[1px] border border-gray-300 p-2.5">
            <p class="jfont-label-normal text-text-secondary">Top search results:</p>
            <div class="mt-2">
              <p v-if="screenState.searching" class="text-center py-5 text-text-secondary jfont-label-normal">
                searching...</p>
              <p v-else-if="!screenState.searching && products.length == 0" class="text-center py-5 text-text-secondary jfont-label-medium">
                No product found for your search
              </p>

              <div v-else>
                <ul class="space-y-1.5">
                  <li class="line-clamp-1 w-full" v-for="product in products" :key="product.id">
                    <RouterLink @click="resetSearchString" :to="`/product/${product.id}`"
                      class="w-full text-left ups-text-paragraph2-medium flex items-center gap-x-3 p-1 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors line-clamp-1">
                      <img v-if="product.imageURL" loading="lazy" :src="product.imageURL"
                        class="inline-block h-9 w-9 overflow-clip rounded-lg bg-gray-200 object-cover" />
                      <!-- if no image -->
                      <div v-else class="w-fit p-1.5 border rounded-lg bg-white">
                        <MagnifyingGlass class="w-5 h-4 text-text-secondary" />
                      </div>
                      <span class="line-clamp-1 text-sm text-gray-600 font-medium">{{ product.name }}</span>
                    </RouterLink>
                  </li>
                </ul>
                <div class="mt-2">
                  <RouterLink to="/product" @click="resetSearchString">
                    <GlobalButton text="view all products" grow />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="flex items-center gap-x-2.5">
        <div>
          <RouterLink v-if="appStore.userIsLoggedIn" to="/admin" title="account"
            class="font-medium underline underline-offset-2 text-green-600">
            View dashboard
          </RouterLink>
          <RouterLink v-else to="/login" title="account">
            <UserCircle class="w-6 h-6" />
          </RouterLink>
        </div>
      </section>
    </div>
  </nav>
</template>
