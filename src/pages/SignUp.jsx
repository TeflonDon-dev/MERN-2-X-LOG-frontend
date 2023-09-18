import React, { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import hello from "../assets/hello.gif";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { signUpUser } from '../features/authSlice';
import { imgTobase64 } from '../utils/imgTobase64';
import Spinner from '../components/Spinner';

const SignUp = () => {

      const dispatch = useDispatch();

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
    
  });

  const handlechange = (e) => {
    const { name, value } = e.target;

    setUser(prevstate => {
      return {
        ...prevstate,
        [name]:value
      }
    })
    
  }

    const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  
  useEffect(() => {
    if (auth.registerStatus === "success") {
       toast.success("signup successful")
        navigate("/")
    }
  },[auth.registerStatus,navigate])

  const handleSubmit = (e) => {
    const { password, confirmpassword } = user;

     e.preventDefault();
    if (password ===confirmpassword) {
      dispatch(signUpUser(user))
    } else {
      toast.error("password and confirm password must match")
    }
  }

    const handleUploadProfile=async (e) => {
      
        const data = await imgTobase64(e.target.files[0]);
        console.log(data);
        setUser(prevstate => {
            return {
                ...prevstate,
                image:data

            }
        })
}

  
  return (
   <>
        {auth.registerStatus === "pending" ? (
              <div className=' h-screen flex items-center flex-col justify-center'>
                  <Spinner />
                  <p>submiting...</p>
              </div>
          ) : (
        
           <div className='mt-10 grid items-center w-5/6  m-auto max-w-md bg-white p-5 rounded-md drop-shadow-lg text-black'>
      <div className='relative w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md mx-auto'>
                  <img src={user.image?user.image:hello} className=' w-full h-full' alt="" />
                 <label htmlFor="profileImage">
                  <div className="cursor-pointer absolute bottom-0 h-1/3 bg-slate-500 w-full text-center opacity-50">
                      <p className=' text-sm p-1 text-white'>upload</p>
                      </div>
                      <input accept='image/' onChange={handleUploadProfile} className='hidden ' type="file" name="" id="profileImage" />
                      </label>
              </div>
       
      <form className=' mt-5' onSubmit={handleSubmit} >
        <label  className=' w-full block mb-5' htmlFor='firstname'>FirstName</label>
        <input  className=' mb-5 focus:border-blue-500 w-full border-2 border-solid p-1 rounded-md focus:outline-none ' value={user.firstname} onChange={handlechange} type="text" name='firstname' id='firstname' placeholder='Enter Name' />
        <label className=' w-full block mb-5' htmlFor="lastname">LastName</label>
        <input  className=' mb-5 focus:border-blue-500 w-full border-2 border-solid p-1 rounded-md focus:outline-none ' value={user.lastname} onChange={handlechange} type="text" name='lastname' id='lastname' placeholder='Enter Last Name' />
              <label className=' w-full block mb-5' htmlFor="email">Email</label>
              <input className=' mb-5 focus:border-blue-500 w-full border-2 border-solid p-1 rounded-md focus:outline-none ' value={user.email} onChange={handlechange} type="email" id='email' name='email' placeholder='Enter Email' />
              <div className=' relative'>
              <label className=' w-full' htmlFor="password">Password</label>
              <input className=' mt-5 rounded-md focus:outline-none focus:border-blue-500  w-full border-2 p-1 border-solid ' value={user.password} onChange={handlechange} type={showPassword?"password":"text"} name="password" id="password" placeholder='Enter Password' />
                  <span onClick={()=>setShowPassword(prevstate=>!prevstate)} className='absolute top-14 right-2 cursor-pointer'>{showPassword ? <BsEyeSlash /> : <BsEye />}</span>
              </div>
              <div className=' relative mt-5'>
              <label className=' w-full' htmlFor="confirmpassword">Confirm Password</label>
              <input className=' mt-5 rounded-md focus:outline-none focus:border-blue-500  w-full border-2 p-1 border-solid ' value={user.confirmpassword} onChange={handlechange} type={showConfirmPassword?"password":"text"} name="confirmpassword" id="confirmpassword" placeholder='Re-enter Password' />
                  <span onClick={()=>setShowConfirmPassword(prevstate=>!prevstate)} className='absolute top-14 right-2 cursor-pointer'>{showConfirmPassword ? <BsEyeSlash /> : <BsEye />}</span>
            </div>
            {auth.registerStatus === "rejected" && <p className=' mt-2 text-sm text-red-500'>{auth.registerError}</p>}
              <button className='w-full bg-blue-500 py-1 my-5 px-3 text-white text-base rounded-sm hover:bg-blue-900 transition-all active:scale-105 '>Submit</button>
              <p>Already have an account?<span><Link to={"/login"} className=' underline capitalize ml-1 text-blue-400 text-sm'>Log In</Link></span></p>
          </form>
          </div>
      )}
        </>
  )
}

export default SignUp