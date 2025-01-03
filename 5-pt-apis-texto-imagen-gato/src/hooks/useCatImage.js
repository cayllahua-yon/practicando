import { useEffect, useState } from 'react'

export function useCatImage ({ fact }) {
  const [id, setId] = useState()
  const [urlImage, setUrlImage] = useState()

  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ', 3).join(' ')
    const API_IMAGEN_TEXT = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
    fetch(API_IMAGEN_TEXT)
      .then(res => res.json())
      .then(data => {
        const { _id } = data
        setId(_id)
        setUrlImage(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`)
      })
  }, [fact])

  return { id, urlImage }
}
