import { Axios } from "axios"


export const apiClient = (cookie?: string, isClientSide?: boolean) => new Axios({
  baseURL: isClientSide ? '/api' : process.env.API_URL,
  headers: {
    ...cookie && {Cookie: cookie}
  },
})