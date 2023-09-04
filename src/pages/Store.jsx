import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import {ImCart} from "react-icons/im"
import notFound from "../assets/notfound.svg";
import { addToCart } from '../features/cartSlice';



const Store = ({isDark}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {productList,isLoading,status}=useSelector(state=>state.products)


  const [search, setSearch] = useState("")
  
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const filteredResult = productList.filter(product => (
      ((product.name).toLowerCase()).includes(search.toLowerCase()) ||
       ((product.category).toLowerCase()).includes(search.toLowerCase())
    ))

    setSearchResult(filteredResult)
  },[search,productList])
  return (
    <div >
      <div className=' p-2 md:my-2  flex justify-start items-center fixed z-20 top-[59px] left-0 right-0 h-10 bg-white'>
        <input className=' w-full md:w-2/5 md:m-auto focus:border-2 focus:outline-none focus:border-b-blue-500 h-8 outline-none rounded-sm text-center text-blue-500' placeholder='Search products' type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>

      <div className=' mt-20'>
        <button onClick={()=>navigate('/productcategory')} className=' flex items-center gap-3 border-[1px] border-blue-500 hover:bg-blue-500 p-2 rounded-sm md:ml-7 ml-14 hover:text-white duration-500'><ImCart/> Shop By Category</button>
   </div>

      {isLoading ?(
              <div className=' h-screen flex items-center flex-col justify-center'>
                  <Spinner />
                  <p>fetching products...</p>
              </div>
          ) : (
        <div className="flex flex-wrap justify-center my-10 md:my-16">
          {searchResult.length? searchResult.map(product => (
            <div className={`flex justify-center flex-col items-center w-full min-w-[180px] max-w-[180px] md:min-w-[200px] md:max-w-[200px]  border-[1px] py-5 px-4 overflow-hidden ${isDark && 'bg-black'}`} key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                <div className=' h-28 '>
                  <img className='h-full hover:scale-110 duration-500' loading='lazy' src={product.image} alt="" />
                  </div>
                </Link>
              <p className=' text-slate-500 font-thin'>{product.category}</p>
              <Link to={`/productdetails/${product._id}`}>
                <p className=' text-blue-600  '>{(product.name).slice(0,40)}</p>
                </Link>
              <p className=' text-yellow-500'><span>$</span>{product.price}</p>
             <button onClick={()=>dispatch(addToCart(product))} className=' hover:bg-blue-600 w-full bg-blue-500 text-white  mt-2 rounded-sm py-1'>Add to cart</button>
              
          </div>
          )) : (<div className=' flex justify-center items-center flex-col'>
                <img src={notFound} alt="" />
                      <p className=' text-3xl font-bold text-blue-500'>No such product</p>
            </div>)}
        </div>
      )}
         
    </div>
  )
}

export default Store