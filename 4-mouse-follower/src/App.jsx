import { useEffect, useState } from 'react'
import './App.css'

const Follower = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect(()=>{

    const handleMove = (event) => {
      const {clientX, clientY} = event;
      setPosition({x: clientX, y: clientY})
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  },[enabled])

  // para desactivar el cursor y solo ver el circulo flotando
  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled)
    
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])


  return (
    <>
      <h1>
      Seguidor de mouse
      </h1>
      <div style={{
         position:'absolute',
         backgroundColor: '#09f',
         borderRadius: '50%',
         opacity: 0.8,
         pointerEvents: 'none',
         left: -20,
         top: -20,
         height: 40,
         width: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}>

      </div>

      <button onClick={()=>{setEnabled(!enabled)}}> {enabled ? 'Desactivado': 'Activado'} Seguir puntero </button>
    </>
  )

}


function App() {

  return (
    <main>
      <Follower />   
    </main>
  )
}

export default App