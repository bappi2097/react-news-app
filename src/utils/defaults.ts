import { NewsType, RegisterData, UserType } from "./types"

export const initialRegisterData: RegisterData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  password_confirmation: "",
}

export const initialUserSetting: UserType = {
  email: "",
  firstName: "",
  lastName: "",
  preferences: [],
}

export const initialNews: NewsType = {
  author: "",
  description: "",
  url: "",
  publishedAt: new Date(),
  title: "",
}
