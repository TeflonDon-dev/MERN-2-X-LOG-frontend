import React from 'react';
import { BsGithub,BsTwitter,BsLinkedin,BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn,MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = ({isDark}) => {
  return (
      <footer className={`${isDark ? 'bg-black border-t pt-5 transition-all ease-in duration-500  overflow-hidden text-white':'overflow-hidden bg-slate-100 text-gray-700 pt-5'}`} >
          <div className='flex flex-col md:flex-row w-5/6 justify-start md:justify-around md:items-center gap-7 ml-5 md:m-auto'>
              <div className=' flex flex-col gap-7'>
                  <Link to={"/"} className=' text-2xl md:text-3xl font-semibold'>X-LOG</Link>
                  <div className='flex gap-2'>
                      <BsTwitter className='bg-slate-400 rounded-md h-8 w-8 p-1 '/>
                      <BsLinkedin className='bg-slate-400 rounded-md h-8 w-8 p-1 '/>
                      <BsGithub className='bg-slate-400 rounded-md h-8 w-8 p-1 '/>
                    </div>
              </div>
              <div className=' flex flex-col  gap-5'>
                  <div className=' flex items-center gap-3'>
                      <p><MdLocationOn /></p>
                      <p>21 Wulari Jerusalem,Maiduguri</p>
                  </div>
                  <div className=' flex items-center gap-3'>
                      <BsFillTelephoneFill />
                    <a href="tel:+2348148429444"> +2348148429444</a>
                  </div>
                  <div className=' flex items-center gap-3'>
                      <MdEmail />
                      <a href="mailto:joshuaokorie008@gmail.com">joshuaokorie008@gmail.com</a>
                     
                  </div>
              </div>
          </div>
        <small className=' my-5 grid items-center justify-center'>&copy;{new Date().getFullYear()} Teflon-Don dev</small>
    </footer>
  )
}

export default Footer