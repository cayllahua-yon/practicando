import { useEffect, useState } from 'react'
import './App.css'
const API_PRIMERA_CATFACT = 'https://catfact.ninja/fact'
export function App () {
  const [fact, setFact] = useState()
  const [id, setId] = useState()
  const [urlImage, setUrlImage] = useState()
  const [factNew, setFactNew] = useState(false)
  useEffect(() => {
    fetch(API_PRIMERA_CATFACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [factNew])

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

  return (
    <>
      {fact && <p>{fact}</p>}
      {id && <p>{`Id unico es ${id}`}</p>}
      {
        urlImage && <img src={urlImage} alt={`Imagen extraida de ${urlImage}`} />
      }
      <button onClick={() => { setFactNew(!factNew) }}>Actulizar busqueda</button>
    </>
  )
}
