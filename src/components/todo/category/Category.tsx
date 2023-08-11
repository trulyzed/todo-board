import { FC } from "react"

type CategoryProps = {
  title: String
}

export const Category:FC<CategoryProps> = ({
  title
}) => {
  return (
    <div className="flex flex-col rounded-xl p-1 bg-gray-950 max-h-full">
      <h4 className="font-bold text-slate-50 p-2">{title}</h4>
      <div className="flex flex-col p-1 mt-1 gap-2 overflow-y-auto max-h-full">
        <div className="rounded-lg shrink-0 h-10 bg-gray-700"></div>
        <div className="rounded-lg shrink-0 h-10 bg-gray-700"></div>
        <div className="rounded-lg shrink-0 h-10 bg-gray-700"></div>
        <div className="rounded-lg shrink-0 h-10 bg-gray-700"></div>
      </div>
    </div>
  )
}
