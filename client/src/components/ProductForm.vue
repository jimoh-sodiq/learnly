<script setup lang="ts">
import { ref, reactive, nextTick } from "vue"
import GlobalButton from '@/components/GlobalButton.vue'
import GlobalInput from '@/components/GlobalInput.vue'
import { useAppStore } from '@/store/appStore';
import { errorMessages } from 'vue/compiler-sfc';

type Product = {
    id: string, name: string; description: string; price: number; imageURL: string
}

const appStore = useAppStore()
const emit = defineEmits<{
    (event: 'close'): void
    (event: 'success'): void

}>()

const props = defineProps<{
    editing: boolean;
    product?: Product
}>()

const screenState = reactive({
    isLoading: false
})

const productData = reactive({
    name: props.product?.name ?? "",
    description: props.product?.description ?? "",
    price: props.product?.price ?? 0,
    imageURL: props.product?.imageURL ?? ""
})

async function handleUpdateProduct() {
    screenState.isLoading = true
    const { success, error } = await appStore.updateProduct({ id: props.product!.id, name: productData.name, price: productData.price, description: productData.description, imageURL: productData.imageURL })
    if (success) {
        emit("success")
        await nextTick()
        alert("Product Updated Successfully")
    } else {
        console.log(error)
        alert(error)
    }
    screenState.isLoading = false
}

async function handleCreateProduct() {
    screenState.isLoading = true
    const { success, error } = await appStore.createProduct({ name: productData.name, price: productData.price, description: productData.description, imageURL: productData.imageURL })
    if (success) {
        emit("success")
        await nextTick()
        alert("Product Created Successfully")
    } else {
        console.log(error)
        alert(error)
    }
    screenState.isLoading = false
}

async function handleSubmit() {
    if (props.editing) {
        handleUpdateProduct()
    } else {
        handleCreateProduct()
    }
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-2">
        <div class="text-gray-600 flex items-center gap-2.5 justify-between">
            <p class="text-sm  font-medium">{{ editing ? "Edit" : "Create" }} Product</p>
            <button type="button" @click="emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                    <path fill="currentColor"
                        d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88" />
                </svg>
            </button>
        </div>
        <GlobalInput label="Name" required v-model="productData.name" />
        <GlobalInput label="Description" required v-model="productData.description" />
        <GlobalInput label="Price (min of 100)" type="number" :min="100" required v-model="productData.price" />
        <GlobalInput label="Image URL" required v-model="productData.imageURL" />
        <GlobalButton type="submit" :loading="screenState.isLoading"
            :text="editing ? 'Update Product' : 'Create New Product'" class="shrink-0" grow />
    </form>
</template>