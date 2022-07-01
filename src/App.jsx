import { useState } from "react"
import Logueo from './components/Logueo'
import Home from './components/Home'
import firebaseApp from "../firebase"
import {getAuth, onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null)
  
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase){
      setUsuarioGlobal(usuarioFirebase)
    } else{
      setUsuarioGlobal(null)
    }
  })

  return (
    <>
      {usuarioGlobal ? <Home/> : <Logueo/>}
    </>
  )
}

export default App
