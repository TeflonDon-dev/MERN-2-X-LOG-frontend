import React from 'react';
import spinner from "../assets/spinner.svg"

const Spinner = () => {
  return (
      <div className=' flex justify-center items-center'>
          <div className=''>
              <img className='' src={spinner} alt="" />
          </div>
    </div>
  )
}

export default Spinner;