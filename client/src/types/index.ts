export interface ApiResponse<T> {
    success: boolean
    data: T
    message: string
  }
  
  export interface Product {
    _id: string
    name: string
    description: string
    price: number
    imageURL: string
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: number
    id: string
  }