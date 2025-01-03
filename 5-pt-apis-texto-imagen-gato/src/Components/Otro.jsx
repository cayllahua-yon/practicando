import { useCatImage } from '../hooks/useCatImage.js'

export function Otro ({ valor }) {
  const fact = valor || 'Perú comida'
  const { urlImage } = useCatImage({ fact })
  return (
    <>
      {urlImage && <img src={urlImage} />}
    </>
  )
}
