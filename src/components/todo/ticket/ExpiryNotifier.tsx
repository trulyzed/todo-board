'use client'

import { DataContext } from "@/context/dataProvider/DataProvider"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Alert } from "@/components/layout/alert/Alert"
import { Ticket } from "@prisma/client"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { getCurrentTime, isExpired } from "@/lib/utils/dateUtils"
import dayjs from "dayjs"

const CHECK_INTERVAL = 5000 // in milliseconds
const NOTIFY_AHEAD = 120 // in minutes

export const getAddressmentId = (id: string) => `addressment__${id}`
const isAddressed = (id: string): boolean => !!localStorage.getItem(getAddressmentId(id))

export const ExpiryNotifier = () => {
  const { categories, setCategories } = useContext(DataContext)
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const [alertableTickets, setAlertableTickets] = useState<Ticket[]>([])
  
  useEffect(() => {
    const timer = timerRef
    
    const getAlertableTickets = () => {
      const data = (categories as CategoryWithTickets[]).reduce((a, c) => {
        a.push(...c.tickets.filter(i => !isExpired(i.expiresAt) && !isAddressed(i.id)))
        return a
      }, [] as Ticket[])

      return data.filter(i => {
        const now = getCurrentTime()
        const expiry = dayjs(i.expiresAt as unknown as string, undefined, true)
        return now.isAfter(expiry.subtract(NOTIFY_AHEAD, 'minute'))
      })
    }

    setAlertableTickets(getAlertableTickets())
    timer.current = setInterval(() => {
      const result = getAlertableTickets()
      setAlertableTickets(result)
    }, CHECK_INTERVAL)

    return () => {
      clearInterval(timer.current)
    }
  }, [categories])

  const handleClose = useCallback((id: string) => () => {
    localStorage.setItem(getAddressmentId(id), id)
    setCategories([...categories])
  }, [categories, setCategories])

  return (
    <>
      {alertableTickets.map(i => (
        <Alert key={i.id} onClose={handleClose(i.id)}>
          <p className="bold">{i.title}</p> is nearing the expiry date
        </Alert>
      ))}
    </>
  )
}