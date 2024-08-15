import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'

import { useStore } from '@/store/store'

export const Images = () => {
  const { loadingImages, updateLoadingImages, images, updateImages } = useStore(
    (state) => state,
  )

  const { VITE_UNSPLASH_ACCESS_KEY } = import.meta.env

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
    while (loadingImages === false && loadingImages !== undefined) {
      const interval = setInterval(() => {
        fetchImages()
      }, 10000)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingImages])

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {loadingImages && <ReloadIcon className="animate-spin" />}
      {!loadingImages &&
        images?.map(({ id, urls, width, height }) => (
          <img
            key={id}
            src={urls?.small}
            width={width}
            height={height}
            alt=""
            className="aspect-square rounded-xl"
          />
        ))}
    </div>
  )
}
