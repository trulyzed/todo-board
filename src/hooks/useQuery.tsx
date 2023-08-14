import { useEffect, useRef, useState } from "react"

type UseQueryArguments<T> = {
  query: (...args: any[]) => Promise<T>
  params?: any
}

export const useQuery = <T,>({
  query,
  params,
}: UseQueryArguments<T>) => {
  const initialized = useRef(false)
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (initialized.current) return
    (async () => {
      setLoading(true)
      const data = await query(params)
      setLoading(false)
      setData(data)
    })()
    initialized.current = true
  }, [query, params])

  return {
    loading,
    data
  }
}