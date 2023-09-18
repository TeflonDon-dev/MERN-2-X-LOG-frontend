import React, { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import {toast} from "react-hot-toast"
const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth._id) {
            
        toast.success("login successful")
            navigate("/store")
        }
    },[auth._id,navigate])

    const [user, setUser] = useState({
        email: "",
        password:"",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        
        setUser(prevstate => {
            return {
                ...prevstate,
                [name]:value
            }
        })
    }

    const [showPassword, setShowPassword] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user))
       
       
      
    }

  return (
      <>
          {auth.loginStatus === "pending" ? (
              <div className=' h-screen flex items-center flex-col justify-center'>
                  <Spinner />
                  <p>submiting...</p>
              </div>
          ) : (
          
              <div className='mt-10 grid items-center w-5/6  m-auto max-w-md bg-white text-black p-5 rounded-md drop-shadow-lg'>
                  <form onSubmit={handleSubmit}>
                      <label className=' w-full block mb-5' htmlFor="email">Email</label>
                      <input className=' mb-5 focus:border-blue-500 w-full border-2 border-solid p-1 rounded-md focus:outline-none ' onChange={handleChange} value={user.email} type="email" id='email' name='email' placeholder='Enter Email' />
                      <div className=' relative'>
                          <label className=' w-full' htmlFor="password">Password</label>
                          <input className=' mt-5 rounded-md focus:outline-none focus:border-blue-500  w-full border-2 p-1 border-solid ' value={user.password} onChange={handleChange} type={showPassword ? "password" : "text"} name="password" id="password" placeholder='Enter Password' />
                          <span onClick={() => setShowPassword(prevstate => !prevstate)} className='absolute top-14 right-2 cursor-pointer'>{showPassword ? <BsEyeSlash /> : <BsEye />}</span>
                      </div>
                
                      {auth.loginStatus == "rejected" ? (
             
                          <p className=' text-red-600 mt-2 text-sm'>{auth.loginError}</p>
             
                      ) : null}
                      <button className=' w-full bg-blue-500 py-1 my-5 px-3 text-white text-base rounded-sm hover:bg-blue-900 transition-all active:scale-105 '>Submit</button>
                      <p>Don't have an account?<span><Link to={"/signup"} className=' underline capitalize ml-1 text-blue-400 text-sm'>Sign up</Link></span></p>
            
                  </form>
              </div>)}
              </>
  )
}

export default Login