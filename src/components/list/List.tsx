import { FC, ReactNode } from "react"

export type ListProps = {
  className?: string
  data: {id: string; value: ReactNode}[]
}

export const List: FC<ListProps> = ({
  className,
  data
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {data.map(i => (
        <div key={i.id} className="px-2 py-4 rounded bg-white">{i.value}</div>
      ))}
    </div>
  )
}