import { useState } from 'react'
import './App.css'

function App() {

  const [counter , setcounter] = useState(5)
  
    // let counter =5

    const addvalue = () =>{
      if(counter<=19){  
        // counter = counter + 1 
        setcounter(counter + 1)
      }else{
        alert("you can not add value above 20")
      }
     
      
    }

    const removevalue =() =>{
       if(counter>=1){
        setcounter(counter - 1)
       }else{
        alert("you can not remove value bellow 0")
       }
      
    }

  return (
    <>
      <h1> dishant rudani</h1>
      <h2>counter value : {counter}</h2>

      <button onClick={addvalue}>add value : {counter}</button>
      <br/>
      <button onClick={removevalue}>remove value : {counter}</button>
    </>
  )
}

export default App
