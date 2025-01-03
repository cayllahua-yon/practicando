const API_PRIMERA_CATFACT = 'https://catfact.ninja/fact'

export const getRamdomFact = async () => {
  const result = await fetch(API_PRIMERA_CATFACT)
  if (!result.ok) throw new Error('No se puede recuperar la cita')
  const data = await result.json()
  const { fact } = data
  return fact
}
