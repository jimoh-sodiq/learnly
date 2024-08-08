<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNav from '@/components/TheNav.vue'
import { onMounted } from 'vue';
import { useAppStore } from './store/appStore';


onMounted(() => {
  useAppStore().showCurrentUser()
})
</script>

<template>
  <div class="min-h-[100dvh] h-full w-full flex flex-col">
    <TheNav />
    <RouterView class="" />
  </div>
</template>
