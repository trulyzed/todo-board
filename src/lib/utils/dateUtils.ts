import dayjs from "dayjs"
import { DATE_FORMAT } from "@/components/form/constants"

export const formatDate = (date: string | Date) => {
  return dayjs(date).format(DATE_FORMAT)
}

export const parseDate = (date: string) => {
  return dayjs(date, DATE_FORMAT, true)
}