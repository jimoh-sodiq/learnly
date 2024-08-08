import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'
import type { ApiResponse, Product } from '@/types'
import { useRouter } from 'vue-router'

export const useAppStore = defineStore('appStore', () => {

  const router = useRouter()
  const userIsLoggedIn = ref(false)

  async function showCurrentUser() {
    try {
      const response = await axios.get('/api/v1/users/show')
      userIsLoggedIn.value = true
      return { success: true, data: response.data, error: null }
    } catch (error) {
      userIsLoggedIn.value = false
      return { success: false, data: null, error: error }
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password
      })
      userIsLoggedIn.value = true
      return { success: true, data: response.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      const response = await axios.post('/api/v1/auth/register', {
        username,
        email,
        password
      })
      return { success: true, data: response.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }
  async function logout() {
    try {
      const response = await axios.delete('/api/v1/auth/logout')
      userIsLoggedIn.value = false
      router.push('/')
      return { success: true, data: response.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }

  async function createProduct(data: {
    name: string
    price: number
    description: string
    imageURL: string
  }) {
    try {
      const response = await axios.post('/api/v1/products', data)
      return { success: true, data: response.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }

  async function updateProduct(data: {
    id: string
    name: string
    price: number
    description: string
    imageURL: string
  }) {
    try {
      const response = await axios.patch(`/api/v1/products/${data.id}`, data)
      return { success: true, data: response.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }


  async function getAllProducts(searchTerm: string = '') {
    try {
      const response: AxiosResponse<ApiResponse<{ products: Product[]; count: number }>> =
        await axios.get('/api/v1/products', {
          params: {
            searchTerm
          }
        })

      return { success: true, data: response.data.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }

  async function getSingleProduct(productId: string) {
    try {
      const response: AxiosResponse<ApiResponse<{ product: Product }>> = await axios.get(
        `/api/v1/products/${productId}`
      )
      return { success: true, data: response.data.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }

  async function deleteProduct(productId: string) {
    try {
      const response: AxiosResponse<ApiResponse<{ product: Product }>> = await axios.delete(
        `/api/v1/products/${productId}`
      )
      return { success: true, data: response.data.data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error }
    }
  }

  return { login, logout, createProduct, updateProduct, getAllProducts, getSingleProduct, register, userIsLoggedIn, showCurrentUser, deleteProduct }
})
