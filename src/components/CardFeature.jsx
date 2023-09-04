import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';

const CardFeature = ({ image, price, name, category,el, _id,isDark }) => {
    
    const dispatch = useDispatch();


  return (
      <div>
 <div className={`flex justify-center flex-col items-center w-full h-full min-w-[180px] max-w-[180px] md:min-w-[200px] md:max-w-[200px]  border-[1px] py-5 px-4 overflow-hidden ${isDark && 'bg-black'}`}>
              <Link to={`/productdetails/${_id}`}>
                <div className=' h-28 '>
                  <img className='h-full hover:scale-110 duration-500' loading='lazy' src={image} alt="" />
                  </div>
                </Link>
              <p className=' text-slate-500 font-thin'>{category}</p>
              <Link to={`/productdetails/${_id}`}>
                <p className=' text-blue-600  '>{(name)}</p>
                </Link>
              <p className=''><span>$</span>{price}</p>
             <button onClick={()=>dispatch(addToCart(el))} className=' hover:bg-blue-600 w-full bg-blue-500 text-white  mt-2 rounded-sm py-1'>Add to cart</button>
              
          </div>          

    </div>
  )
}

export default CardFeature