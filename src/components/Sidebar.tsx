import { randAddress, randFullName, randPersonTitle } from '@ngneat/falso'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

import { useStore } from '@/store/store'

export const Sidebar = () => {
  const {
    loadingCustomers,
    updateLoadingCustomers,
    customers,
    updateCustomers,
  } = useStore((state) => state)
  const { activeCustomer, updateActiveCustomer } = useStore((state) => state)
  const { updateLoadingImages, updateImages } = useStore((state) => state)

  const { VITE_UNSPLASH_ACCESS_KEY } = import.meta.env

  const fetchData = () => {
    const seedCustomers = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: randFullName(),
      title: randPersonTitle(),
      address: randAddress(),
      images: [],
    }))

    try {
      updateCustomers(seedCustomers)
      updateLoadingCustomers(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${VITE_UNSPLASH_ACCESS_KEY}&count=9`,
      )
      const result = await response.json()
      updateImages(result)
      updateLoadingImages(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rowRenderer = ({ index, style }: ListChildComponentProps) => {
    const { title, name, address } = customers[index]
    return (
      <div
        style={style}
        className={`px-4 flex items-center border-b-2 ${
          activeCustomer?.id === index + 1 && 'bg-gray-100'
        }`}
        onClick={() => {
          updateActiveCustomer(customers[index])
          updateLoadingImages(true)
          fetchImages()
        }}
      >
        <div className="grid gap-1">
          <span>
            {title} {name}
          </span>
          <span className="hidden md:flex gap-1 ">
            {address.street} {address.city} {address.zipCode}
          </span>
        </div>
      </div>
    )
  }

  return (
    <aside className="overflow-scroll no-scrollbar min-w-[30vw] w-[30vw] max-w-[30vw]  border-r-2">
      {loadingCustomers && (
        <div className="h-full grid place-items-center">
          <ReloadIcon className="animate-spin" />
        </div>
      )}
      {!loadingCustomers && (
        <div className="grid w-full h-full">
          <AutoSizer>
            {({ width, height }: { width: number; height: number }) => (
              <List
                width={width}
                height={height}
                itemCount={customers?.length}
                itemSize={120}
              >
                {rowRenderer}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </aside>
  )
}
