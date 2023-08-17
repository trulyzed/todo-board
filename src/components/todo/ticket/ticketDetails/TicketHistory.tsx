import { FC, useCallback, useState } from "react"
import { Button } from "@/components/interactive/Button"
import { Spinner } from "@/components/layout/loader/Spinner"
import { HistoryList } from "@/components/todo/history/HistoryList"
import { getTicketHistories } from "@/queries/client/ticket"
import { Eye, EyeClosed } from "@phosphor-icons/react"

type TicketHistoryProps = {
  id: string
  show: boolean
  onToggle?: () => void
}

export const TicketHistory:FC<TicketHistoryProps> = ({id, show, onToggle}) => {
  const [loading, setLoading] = useState(false)

  const handleToggleHistory = useCallback(() => {
    onToggle?.()
  }, [onToggle])

  return (
    <>
      <Button onClick={handleToggleHistory} disabled={loading} className={`text-right ml-auto mt-2`}>
        {loading ?
          <Spinner className="w-8 h-8" />
          : <>
            {show ? <EyeClosed /> : <Eye />}
            {show ? "Hide History" : "Show History"}
          </>
        }
      </Button>
      {show ? <HistoryList className="max-h-[50vh] overflow-y-auto vertical-scrollbar" query={getTicketHistories} refId={id} onLoading={setLoading} /> : null}
    </>
  )
}
