import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

dayjs.extend(customParseFormat)
import { DATE_FORMAT } from "@/components/form/constants"

export const formatDate = (date: string | Date, format=DATE_FORMAT, fromFormat?: string) => {
  return date ? dayjs(date, fromFormat, true).format(format) : undefined
}

export const parseDate = (date: string, format=DATE_FORMAT) => {
  return date ? dayjs(date, format, true) : undefined
}

export const isExpired = (value: any): boolean => {
  return value ? dayjs(value).isBefore() : true
}

export const getCurrentTime = () => {
  return dayjs()
}