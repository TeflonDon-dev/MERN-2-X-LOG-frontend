import React from 'react';
import { closeModal } from '../features/modalSlice';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';

const Modal = () => {

    const dispatch = useDispatch();

  return (
      <aside className=' flex flex-col items-center justify-center fixed bg-black opacity-80 top-0 z-50 left-0 h-screen w-full  '>
          <div className=' py-6 flex flex-col justify-center items-center bg-white  w-60 rounded-md'>
              <p className=' mb-3'>Clear cart container?</p>
              <div className=' flex items-center gap-4'>
                  <button onClick={()=>dispatch(closeModal())} className=' hover:bg-yellow-500 duration-500 hover:text-white px-3 border-[1px] border-yellow-500 rounded-sm py-1'>Cancel</button>
                  <button onClick={() => {
                      dispatch(clearCart())
                      dispatch(dispatch(closeModal()))
                  }
                  } className=' px-3 py-1 border-[1px] bg-blue-600 hover:bg-red-500 rounded-sm text-white'>Confirm</button>
                  </div>
          </div>

    </aside>
  )
}

export default Modal