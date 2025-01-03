import { useEffect, useState } from 'react'
import { getRamdomFact } from '../services/fact.js'

export function useCatFact () {
  const [fact, setFact] = useState()
  // const [factNew, setFactNew] = useState(false)

  const getRefreshWordCat = () => {
    getRamdomFact().then(newFact => setFact(newFact))
  }
  useEffect(() => {
    getRefreshWordCat()
  }, [])

  return { fact, getRefreshWordCat }
}
