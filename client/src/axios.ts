import axios, { type AxiosInstance, type AxiosRequestHeaders } from 'axios'
import { useRouter } from 'vue-router'
import { useAppStore } from './store/appStore'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  withCredentials: true 
})
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response) {
      const appStore = useAppStore()
      if (error.response.status === 401) {
        appStore.userIsLoggedIn = false
        useRouter().push('/login')
      } else {
        throw error.response.data.message
      }
    } else {
      return
    }
  }
)

export default axiosInstance
