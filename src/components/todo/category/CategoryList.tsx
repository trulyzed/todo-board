import { FC, useContext } from "react"
import { CategoryCard } from "./CategoryCard"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { useCategoryDragDrop } from "./hooks/useCategoryDragDrop"

type CategoryListProps = {

}

export const CategoryList:FC<CategoryListProps> = ({

}) => {
  const { sortedCategories } = useContext(DataContext)
  const { dragListeners, dropListeners, getState } = useCategoryDragDrop({})

  return (
    sortedCategories.map(i => (
      <div
        {...dropListeners(i.id)}
        key={i.id}
        className={`basis-64 shrink-0 grow-0 h-full
          ${getState(i.id)?.entered ? "border-dotted border-4 border-white bg-zinc-300 m-1" : ""})
        `}>
        <CategoryCard
          {...dragListeners(i.id)}
          id={i.id} title={i.title}
          tickets={(i as CategoryWithTickets).tickets}
          className={getState(i.id)?.dragging ? "opacity-70" : ""}
        />
      </div>
    ))
  )
}