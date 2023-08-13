import { AddCategory } from "@/components/todo/category/AddCategory"
import { CategoryCard } from "@/components/todo/category/CategoryCard"
import { getCategories } from "@/queries/server/category"
import { Ticket } from "@prisma/client"

type Category = {
  title: string
  id: string
  tickets: Ticket[]
}

export default async function Page() {
  const categories: Category[] = await getCategories()

  return (
    <div className="flex items-start grow p-4 gap-3 overflow-x-auto">
      {categories.map((i, index) => <div key={index} className="basis-64 shrink-0 grow-0 h-full"><CategoryCard {...i} /></div>)}
      <AddCategory />
    </div>
  )
}
