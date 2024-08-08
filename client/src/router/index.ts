import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '@/views/ProductListView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminRegisterView from '@/views/AdminRegisterView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import NotFound from '@/views/404.vue'
import { useAppStore } from '@/store/appStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductListView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView
    },
    {
      path: '/login',
      name: 'admin-login',
      component: AdminLoginView,
      meta: { onlyUnauthorized: true }
    },
    {
      path: '/register',
      name: 'admin-register',
      component: AdminRegisterView,
      meta: { onlyUnauthorized: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView,
      meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})


router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  if (to.meta.requiresAuth) {
    if (appStore.userIsLoggedIn) {
      next()
    } else {
      next({ path: '/login' })
    }
    return
  } else {
    next()
    return
  }
})

export default router
