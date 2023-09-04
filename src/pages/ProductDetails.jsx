import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { addToCart } from '../features/cartSlice';
import {FaShare } from "react-icons/fa"


const ProductDetails = () => {
  const dispatch=useDispatch()

  const navigate = useNavigate();

    const { id } = useParams();

    const productData = useSelector(state => state.products.productList);

  const productToDisplay = productData.filter(el => el._id === id)[0];


  return (
    <div className=' flex flex-col md:flex-row w-4/5 mx-auto mt-10 gap-10'>
      <div className=' flex flex-col gap-2 flex-1 items-center'>
        <div className=' overflow-hidden'>
          <img className=' w-full object-cover hover:scale-110 duration-500 ease-in' src={productToDisplay.image} alt="" />
        </div>
       
      </div>
      <div className=' flex flex-col gap-7 flex-1 items-start'>
        <p className=' text-4xl text-blue-500 font-medium'>{productToDisplay.name}</p>
        <p className=' font-medium text-2xl text-yellow-500'><span className=' text-blue-500 font-medium text-2xl mr-2'>Price:</span>${productToDisplay.price}</p>
        <div>
        <p className=' text-2xl text-blue-500 font-medium'>Description</p>
        <p className=' text-lg text-justify'>{productToDisplay.description}</p>
        </div>
          <div className='flex flex-col gap-4 md:flex-row w-full items-center justify-center'>
          <button onClick={()=>dispatch(addToCart(productToDisplay))} className=' px-10 py-3 bg-yellow-500 text-white font-medium hover:bg-opacity-80 duration-300 w-full'>Add To Cart</button>
          <button onClick={() => { dispatch(addToCart(productToDisplay));  navigate("/cart")}} className=' px-10 py-3 bg-blue-500 text-yellow-500 hover:bg-opacity-80 duration-300 w-full font-medium'>Buy It Now</button>
        </div>
        <div onClick={()=>navigate("/store")} className=' flex gap-2 items-center cursor-pointer text-blue-500 hover:text-blue-800 duration-500'><BiArrowBack/> Back to store</div>
      </div>
  
    </div>
  )
}

export default ProductDetails