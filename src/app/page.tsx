'use client'

import { useContext, useEffect } from "react"
import { AddCategory } from "@/components/todo/category/AddCategory"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { getCategories } from "@/queries/client/category"
import { useQuery } from "@/hooks/useQuery"
import { Category } from "@prisma/client"
import { HomePageSkeleton } from "@/components/layout/loader/skeletons/HomePageSkeleton"
import { CategoryList } from "@/components/todo/category/CategoryList"
import { ExpiryNotifier } from "@/components/todo/ticket/ExpiryNotifier"
import { useAuthorized } from "@/hooks/useAuthorized"

export default function Page() {
  useAuthorized()
  const { data, loading } = useQuery<Category[]>({query: getCategories})
  const { setCategories } = useContext(DataContext)
  
  useEffect(() => {
    setCategories(data || [])
  }, [setCategories, data])

  return loading ?
    <HomePageSkeleton />
    : (
      <div className="flex items-start grow p-4 gap-3 overflow-x-auto">
        <CategoryList />
        <AddCategory />
        <ExpiryNotifier />
      </div>
    )
}
