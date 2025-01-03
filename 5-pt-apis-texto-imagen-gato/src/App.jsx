import './App.css'

import { useCatFact } from './hooks/useCatFact.js'
import { useCatImage } from './hooks/useCatImage.js'
import { Otro } from './Components/Otro.jsx'
import { useState } from 'react'

export function App () {
  const { fact, getRefreshWordCat } = useCatFact()
  const { id, urlImage } = useCatImage({ fact })
  const [inputValue, setInputValue] = useState('')
  const [valueOtro, setValueOtro] = useState('')

  const handleClick = () => {
    getRefreshWordCat()
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleClickWord = () => {
    setValueOtro(inputValue)
  }

  return (
    <>
      {fact && <p>{fact}</p>}
      {id && <p>{`Id unico es ${id}`}</p>}
      {
        urlImage && <img src={urlImage} alt={`Imagen extraida de ${urlImage}`} />
      }
      <button onClick={handleClick}>Actulizar busqueda</button>
      <hr width='100%' size='2' />
      <br />
      <input type='text' name='Word' id='Word' value={inputValue} onChange={handleChange} />
      <button type='button' onClick={handleClickWord}>Nueva Palabra para Otro Componente</button>

      <Otro valor={valueOtro} />
    </>
  )
}
