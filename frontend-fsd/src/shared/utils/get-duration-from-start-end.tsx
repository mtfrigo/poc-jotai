import { differenceInMilliseconds } from "date-fns"

type Props = {
    finishedAt: Date,
    startAt: Date
}


export const getDuration = ({ finishedAt, startAt }: Props) => {

    return differenceInMilliseconds(finishedAt, startAt)
}