interface iRequestInit extends RequestInit {
  body?: any
}

const fetchAPI = (
  input: RequestInfo | URL,
  init?: iRequestInit | undefined,
  token?: string
): Promise<Response> => {
  const url = import.meta.env.VITE_BASE_API_URL + input
  let Authorization = {}
  if (token) {
    Authorization = { Authorization: "Bearer " + token }
  }
  return fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...Authorization,
      ...init?.headers,
    },
    body: JSON.stringify(init?.body),
  })
}

export default fetchAPI
