import { useState } from 'react'
import Navbar from './components/navbar'
import Todo from './components/todo'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <div className="relative z-[-2] bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
     </div>
     <Todo/>
     <Footer/>
    </>
  )
}

export default App
