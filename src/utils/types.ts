export type Link = {
  url: string
  label: string
}

export type RegisterData = {
  firstName: string
  lastName: string
  email: string
  password: string
  password_confirmation: string
}

export type ErrorType<T> = { [x in keyof T]?: string[] }

export type NewsSourceType = {
  id: number
  key: string
  name: string
  description: string
}

export type UserType = {
  email: string
  firstName: string
  lastName: string
  preferences: number[]
}

export type NewsType = {
  title: string
  description: string
  author: string
  url: string
  publishedAt: Date
}
