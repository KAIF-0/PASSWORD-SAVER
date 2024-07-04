import { useState } from 'react' 
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'

function App() { 

  return (
    <>
       <Navbar /> 
       <div className="absolute inset-0 -z-10 h-full w-full bg-black-50 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:14px_20px]"><div className="absolute bottom-0 left-0 right-0 top-0 -z-10 m-auto h-[510px] w-[410px] rounded-full bg-white opacity-20 blur-[100px]"></div></div>   
       <Main/> 
    </>
  )
}

export default App
