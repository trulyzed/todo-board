'use client'

import { useContext, useEffect } from "react"
import { AddCategory } from "@/components/todo/category/AddCategory"
import { CategoryCard } from "@/components/todo/category/CategoryCard"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { getCategories } from "@/queries/client/category"
import { useQuery } from "@/hooks/useQuery"
import { Category } from "@prisma/client"
import { HomePageSkeleton } from "@/components/layout/loader/skeletons/HomePageSkeleton"
import { CategoryWithTickets } from "@/context/dataProvider/types"

export default function Page() {
  const { data, loading } = useQuery<Category[]>({query: getCategories})
  const { categories, setCategories } = useContext(DataContext)

  useEffect(() => {
    setCategories(data || [])
  }, [setCategories, data])

  return loading ?
    <HomePageSkeleton />
    : (
      <div className="flex items-start grow p-4 gap-3 overflow-x-auto">
        {categories.map((i, index) => <div key={index} className="basis-64 shrink-0 grow-0 h-full"><CategoryCard {...i as CategoryWithTickets} /></div>)}
        <AddCategory />
      </div>
    )
}
