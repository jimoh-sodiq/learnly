<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import ProductForm from '@/components/ProductForm.vue';
import GlobalButton from '@/components/GlobalButton.vue'
import GlobalModal from '@/components/GlobalModal.vue'
import { useAppStore } from '@/store/appStore';
import type { Product } from '@/types';


const appStore = useAppStore()

const screenState = reactive({
  isLoading: false,
  showProductForm: false,
  editing: false
})

onMounted(() => {
  getProducts()
})

const products = ref<Array<Product>>([])

const selectedProduct = ref<Product>()

function handleCreateProduct() {
  screenState.editing = false
  screenState.showProductForm = true
}


function handleEditProduct(product: Product) {
  selectedProduct.value = product
  screenState.editing = true
  screenState.showProductForm = true
}

async function handleDeleteProduct(product: Product) {
  selectedProduct.value = product
  const ok = confirm("Are you sure you want to delete this product")
  if (ok) {
    const { success, error } = await appStore.deleteProduct(product.id)
    if (success) {
      getProducts()
    } else {
      alert("Error:" + error)
    }
  }
}

async function getProducts() {
  screenState.isLoading = true
  const { data, success } = await appStore.getAllProducts()
  console.log(data)
  if (success && data) {
    products.value = data?.products
  }
  screenState.isLoading = false
}

let priceInNaira = new Intl.NumberFormat('en-NG', {
  currency: 'NGN',
  style: 'currency',
});

function handleFormSuccess() {
  screenState.showProductForm = false
  getProducts()
}
</script>

<template>
  <div class="p-4">
    <div class="max-w-[1400px] mx-auto">
      <div class="flex gap-4 justify-between flex-wrap">
        <div>
          <h1 class="text-lg font-medium text-gray-700">Welcome Admin</h1>
          <p class="text-xs font-medium tracking-wide text-gray-500">
            Manage your products easily here
          </p>
        </div>
        <GlobalButton @click="handleCreateProduct" text="Create New Product" class="shrink-0" />
      </div>
      <div v-if="screenState.isLoading" class="font-medium text-lg text-gray-600 uppercase  w-fit mx-auto mt-10">Loading
      </div>
      <section v-else class="mt-4 w-full overflow-x-hidden">
        <p class="text-sm font-medium text-green-600">{{ products.length }} products available</p>
        <div class="overflow-x-auto">
          <table class="w-full text-xs font-normal mt-5 text-left">
            <thead class="h-11 bg-gray-200 uppercase text-gray-600 whitespace-nowrap">
              <th>Name</th>
              <th>Price</th>
              <th class="">Created Date</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="text-gray-500 font-medium">
                <td class="w-[25%]">{{ product.name }}</td>
                <td>{{ priceInNaira.format(product.price) }}</td>
                <td>{{ new Date(product.createdAt).toDateString() }}</td>
                <td>
                  <div class="flex items-center gap-2.5">
                    <button @click="handleEditProduct(product)"
                      class="px-2 py-1 text-center rounded bg-blue-600 text-white">
                      Edit
                    </button>
                    <button @click="handleDeleteProduct(product)"
                      class="px-2 py-1 text-center rounded bg-red-600 text-white">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <GlobalButton @click="appStore.logout" text="logout" class="shrink-0" />
    </div>
    <GlobalModal v-if="screenState.showProductForm">
      <ProductForm @success="handleFormSuccess" @close="screenState.showProductForm = false"
        :editing="screenState.editing" :product="selectedProduct" />
    </GlobalModal>
  </div>
</template>
<style scoped>
th {
  padding: 16px 16px;
}

td {
  padding: 16px 16px;
}
</style>
