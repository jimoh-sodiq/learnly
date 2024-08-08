<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import GlobalButton from '@/components/GlobalButton.vue'
import GlobalInput from '@/components/GlobalInput.vue'
import { useAppStore } from '@/store/appStore'

const router = useRouter()
const appStore = useAppStore()

const screenState = reactive({
  isLoading: false
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  screenState.isLoading = true
  const { success, error } = await appStore.login(email.value, password.value)
  if (success) {
    router.push('/admin')
  }
  errorMessage.value = error as string
  screenState.isLoading = false
}
</script>

<template>
  <main class="border-t">
    <div class="max-w-[1400px] mx-auto p-4 md:p-6 flex items-center justify-center">
      <form @submit.prevent="handleLogin" class="max-w-lg w-full mx-auto space-y-4 mt-16">
        <h3 class="text-center font-medium uppercase">Login</h3>
        <GlobalInput label="Email" type="email" required v-model="email" />
        <GlobalInput label="password" type="password" required v-model="password" />
        <GlobalButton type="submit" :loading="screenState.isLoading" text="Submit" grow />
        <div
          v-if="errorMessage"
          class="rounded w-full p-2.5 text-sm font-medium text-white bg-red-500"
        >
          <p>{{ errorMessage }}</p>
        </div>
        <p class="text-sm text-center text-gray-600">
          or <RouterLink to="/register" class="underline">Register Here</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
