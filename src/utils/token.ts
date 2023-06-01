export function setSessionToken(userToken: string) {
  sessionStorage.setItem("token", JSON.stringify(userToken))
}

export function getSessionToken() {
  const tokenString = sessionStorage.getItem("token")
  const userToken = JSON.parse(tokenString ?? "")
  return userToken?.token
}
