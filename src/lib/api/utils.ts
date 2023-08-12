export const getJSONableError = (message='', key='message') => {
  return JSON.stringify({[key]: message})
}