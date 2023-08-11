export const getAbsoluteURL = (endpoint: string) => {
  return `${process.env.API_URL}${endpoint}`
}