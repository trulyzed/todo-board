import { Category } from "@/components/todo/category/Category"

export default async function Page() {
  const categories = [
    {
      title: 'Category 1',
    },
    {
      title: 'Category 2',
    },
  ]
  return (
    <div className="flex grow p-4 gap-3 overflow-x-auto">
      {categories.map((i, index) => <div key={index} className="basis-64 shrink-0 grow-0"><Category {...i} /></div>)}
    </div>
  )
}
