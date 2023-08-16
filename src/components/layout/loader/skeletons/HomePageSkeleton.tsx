import { Spinner } from "@/components/layout/loader/Spinner"

export const HomePageSkeleton = () => {
  return (
    <div className="bg-red w-screen h-content flex items-center justify-center">
      <Spinner large />
    </div>
  )
}