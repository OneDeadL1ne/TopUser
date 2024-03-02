
export interface User {
    user_uuid: string
    person_uuid: string
    rating: number
    credits: number
    phone: string
    prefered_categories: unknown[]
    createdAt: string
    updatedAt: string
    person: Person
    role: Role
    user_status: UserStatus
    order_count: number
    avg_evaluation: number
    rating_status: string
  }
  
  export interface Person {
    person_uuid: string
    first_name: string
    last_name: string
    patronymic: string
    bio: unknown
    shop_name: unknown
    shop_address: unknown
    work_images: unknown
    birthday: string
    createdAt: string
    updatedAt: string
    city: City
  }
  
  export interface City {
    city_id: number
    city_name: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Role {
    role_id: number
    role_name: string
    createdAt: string
    updatedAt: string
  }
  
  export interface UserStatus {
    user_status_id: number
    user_status_name: string
    createdAt: string
    updatedAt: string
  }
  