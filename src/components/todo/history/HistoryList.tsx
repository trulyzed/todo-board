import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { List, ListProps } from "@/components/list/List"
import { formatDate } from "@/lib/utils/dateUtils"
import { History } from "@prisma/client"
import { EmptyState } from "@/components/emptyState/EmptyState"
import { DATE_DISPLAY_FORMAT } from "@/components/form/constants"

type HistoryListProps = {
  query: (...args: any[]) => Promise<History[]>
  refId: string
  queryParams?: any
  onLoading?: (status: boolean) => void
  className?: string
}

export const HistoryList = ({
  query,
  refId,
  onLoading,
  className,
}: HistoryListProps) => {
  const [data, setData] = useState<History[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

  const getData = useCallback(async () => {
    setLoading(true)
    const data = await query({id: refId}).finally(() => {
      setLoading(false)
    })
    setData(data)
  }, [query, refId])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    return () => {
      onLoading?.(false)
    }
  }, [onLoading])

  const listData: ListProps["data"] = useMemo(() => data.map(i => ({
    id: i.id,
    value: <HistoryItem {...i} />
  })), [data])

  return !loading && !listData.length ?
    <EmptyState message={'No history available'} /> : (
    <List data={listData} className={`mt-2 ${className}`} />
  )
}

type HistoryItemProps = History & {
  
}

export const HistoryItem:FC<HistoryItemProps> = ({
  message,
  operation,
  createdAt,
  params,
}) => {
  const data = useMemo(() => {
    const parsedData = JSON.parse(params)
    return Object.keys(parsedData).reduce((a, c) => {
      a.push({key: c, value: parsedData[c]})
      return a
    }, [] as {key: string; value: string;}[])
  }, [params])

  return (
    <div className="text-gray-700">
      {<p className="uppercase">{operation} </p>}
      {operation === "move" ? <p>Moved to: <span className="font-semibold">{message}</span></p> 
        :<p>
          {data.map((i, index) => (
            <span key={index} className="">{i.key === 'order' ? `Changed order to` : i.key}: <span className="font-semibold">{i.key === "expiresAt" ? formatDate(i.value, DATE_DISPLAY_FORMAT) : i.value}</span> </span>
          ))}
        </p>
        }
      <p className="italic text-sm mt-1">on {formatDate(createdAt, DATE_DISPLAY_FORMAT)}</p>
    </div>
  )
}