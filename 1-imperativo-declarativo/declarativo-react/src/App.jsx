import './App.css'
import {TwitterFollowCard} from './components/TwitterFollowCard'

function App() {
 
  const users = [
    {
      userName: 'cayllahua-yon',
      name: 'Yon Cayllahua',
      isFollowing: true
    },
    {
      userName: 'luz',
      name: 'Luz Cayllahua',
      isFollowing: true
    },
    {
      userName: 'Eli',
      name: 'Eli Palomino',
      isFollowing: true
    }
  ]

  return (
    <section className='App'>     
      {
        users.map((user) => {
          const {userName, name, isFollowing} = user;
          return (
            <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing} >
              {name}
            </TwitterFollowCard>
          )
        })
      }      
    </section>
  )
}

export default App
