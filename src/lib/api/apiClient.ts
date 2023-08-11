import { Axios } from "axios"


export const apiClient = (cookie: string) => new Axios({
  baseURL: process.env.API_URL,
  headers: {
    Cookie: cookie
  }
})