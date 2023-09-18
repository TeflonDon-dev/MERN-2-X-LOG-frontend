import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeCartItem, deleteCartItem, calculateTotals } from '../features/cartSlice';
import { openModal } from '../features/modalSlice';
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import emptyCart from "../assets/emptycart.svg";
import {loadStripe} from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';
import {RiSecurePaymentFill} from "react-icons/ri"

const Cart = () => {

  const navigate=useNavigate()

  const auth = useSelector(state => state.auth)

  console.log(auth);

    const cart = useSelector(store => store.cart);

    const dispatch = useDispatch(); 

     useEffect(() => {
    dispatch(calculateTotals())
     }, [cart])
  
  const handlePayment = async () => {
    if (auth.email) {
      const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
      
      const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/checkout-payment`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(cart.cartItems)
      });
      if (res.statuscode === 500) {
        return
      }
      const data = await res.json();

      toast("Redirecting to payment gateway...")
      stripePromise.redirectToCheckout({sessionId:data})
    } else {
      toast("Login to continue with checkout")
      setTimeout(() => {
        navigate("/login")
      },2000);
    }
  }

  return (
    <div className=' mt-20 w-5/6 mx-auto overflow-hidden'>
      <h2 className=' mb-5 text-center text-2xl font-bold text-blue-500'>{auth._id ? `${auth.firstname} ${auth.lastname} Shopping Cart` : 'Shopping Cart'}</h2> 
      
          {(cart.cartItems).length < 1 ? (<div className='mt-20 grid gap-2 items-center justify-center text-gray-500'>
              <img src={emptyCart} alt="" />
                <p className=' text-3xl '> Shopping cart is empty</p>
              
        <Link to='/store' className=' flex items-center gap-2'> <BiArrowBack/> Continue Shopping</Link>
            
      </div>) : (<>
          <div className=' my-5 hidden md:flex md:justify-between md:items-center'>
            <p className=' basis-2/4 '>product</p>
            <p >Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <div>
            {cart.cartItems.map(cartItem => (
              <div key={cartItem._id} className=' gap-3 md:mb-5 border-t-[1px] flex flex-col items-start md:items-center md:flex-row md:justify-between'>
                <div className=' mt-3 basis-2/4 flex gap-3 justify-start'>
                  <img className=' w-[100px] max-h-[100px]  max-w-full' src={cartItem.image} alt="" />
                  <div>
                    <p className=' font-medium text-blue-500'><Link to={`/productdetails/${cartItem._id}`}>{cartItem.name}</Link> </p>
                     <button className=' text-red-300 hover:text-red-500 duration-300' onClick={()=>dispatch(deleteCartItem(cartItem))}>Remove</button>
                  </div>
                 
                  </div>
                <p>${cartItem.price}</p>
                <div className=' py-1 px-4 rounded-md border-2 border-gray-500 flex items-center justify-center'>
                  <button onClick={() => {
                    if (cartItem.cartQuantity === 1) {
                      return dispatch(deleteCartItem(cartItem))
                    }
                    dispatch(removeCartItem(cartItem))
                  }
                  } className=' mr-2 '>{ cartItem.cartQuantity===1?<AiOutlineDelete/>:"-"}</button>
                  {cartItem.cartQuantity}
                   <button onClick={()=>dispatch(addToCart(cartItem))} className=' ml-2'>+</button>
                </div>
                <p className=' font-medium'>${(cartItem.price * cartItem.cartQuantity).toFixed(2)}</p>
              </div>
           ))}
          </div>

              <div className=' gap-2 border-t-[1px] mt-5 pt-5 flex flex-col md:flex-row md:justify-between md:items-center'>
        <div>
        <button onClick={()=>dispatch(openModal())}  className=' py-2 px-4 border-[1px] hover:bg-blue-600 duration-500 rounded-md hover:text-white'>
          Clear Cart
        </button></div>
        <div>
          <div className=' flex justify-between my-5'>
            <p className=' font-medium'>SubTotal</p>
                <p className=' font-medium'>$ {(cart.cartTotalAmount).toFixed(2)}</p>
          </div>
          <p className='my-2'>Taxes and shipping cost calculated at checkout</p>
              <button onClick={handlePayment} >{auth._id ? <p className=' py-2 px-20 bg-blue-600 text-white'>CheckOut</p> : <p className=' py-2 px-20 bg-yellow-400 hover:text-white duration-500 hover:bg-yellow-600 text-black'>Login to CheckOut</p>}</button>
              <p className=' my-4 flex items-center gap-2 text-sm'> <RiSecurePaymentFill className=' w-5 h-5'/> Secure Payment Option</p>
        </div>
      </div>
      </>)}

  
    </div>
  )
}

export default Cart