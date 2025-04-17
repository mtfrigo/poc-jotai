import { format } from "date-fns"


export const formatDatetime = (date: Date) => {
    return format(date, "dd/MM/yyyy HH:mm:ss")
}