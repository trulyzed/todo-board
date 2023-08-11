import { Category } from "@/components/todo/category/Category"
import { getCategories } from "@/queries/client/category"

type Category = {
  title: string
}

export default async function Page() {
  const categories: Category[] = await getCategories()

  return (
    <div className="flex grow p-4 gap-3 overflow-x-auto">
      {categories.map((i, index) => <div key={index} className="basis-64 shrink-0 grow-0"><Category {...i} /></div>)}
    </div>
  )
}
