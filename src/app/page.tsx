import { Category } from "@/components/todo/category/Category"

export default async function Page() {
  const categories = [
    {
      title: 'Category 1',
    },
    {
      title: 'Category 2',
    },
    {
      title: 'Category 3',
    },
    {
      title: 'Category 4',
    },
    {
      title: 'Category 5',
    },
    {
      title: 'Category 6',
    },
    {
      title: 'Category 7',
    },
    {
      title: 'Category 8',
    },
    {
      title: 'Category 9',
    },
    {
      title: 'Category 10',
    }
  ]
  return (
    <div className="flex grow p-4 gap-4 overflow-x-auto">
      {categories.map((i, index) => <div key={index} className="basis-64 shrink-0 grow-0"><Category {...i} /></div>)}
    </div>
  )
}
