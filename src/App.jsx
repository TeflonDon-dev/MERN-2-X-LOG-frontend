import React, { useState } from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';

const App = () => {

    const { isOpen } = useSelector(state => state.modal);

  const[isDark,setIsDark]=useState(false)

  return (
    <>
      <Toaster
  position="top-center"
  reverseOrder={true}
      />
      {isOpen && <Modal/>}
      <Nav isDark={isDark} setIsDark={setIsDark}/>
      <main className={` ${isDark && 'bg-black text-white transition-all ease-in duration-500 '} pb-10 pt-16 min-h-[calc(100vh)] `}>
        <Outlet />
       
      </main>
       <Footer isDark={isDark}/>
      </>
  )
}

export default App