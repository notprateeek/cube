import { ReloadIcon } from '@radix-ui/react-icons'

import { Images } from '@/components/Images'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/store/store'

export const Content = () => {
  const { activeCustomer } = useStore((state) => state)
  const { loadingImages } = useStore((state) => state)
  const { title, name, address } = activeCustomer

  return (
    <section className="overflow-scroll no-scrollbar w-full py-8 md:py-16 px-8 md:px-24 flex flex-col gap-16">
      {title == '' && name == '' && (
        <div className="flex flex-col gap-8 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[160px] md:w-[250px]" />
            <Skeleton className="h-4 w-[110px] md:w-[200px]" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
            <Skeleton className="h-[160px] w-[160px] xl:w-full max-w-[264px] rounded-xl" />
          </div>
        </div>
      )}
      {title && name && (
        <div className="grid gap-2">
          <span>
            {title} {name}
          </span>
          <span className="flex gap-1 ">
            {address.street} {address.city} {address.zipCode}
          </span>
        </div>
      )}
      {loadingImages && (
        <div className="h-full grid place-items-center">
          <ReloadIcon className="animate-spin" />
        </div>
      )}

      <Images />
    </section>
  )
}
