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
