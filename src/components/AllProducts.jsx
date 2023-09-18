import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FilterProduct from './FilterProduct';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const AllProducts = () => {
    
    const {productList,isLoading} = useSelector(state => state.products);

    const [filterBy, setFilterBy] = useState("");

    const categoryList = [...new Set(productList.map(el => el.category))];
    
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productList);
    },[productList])

    const handleFilterProduct = (category) => {
        setFilterBy(category)

        const filter = productList.filter(el => el.category.toLowerCase() === category.toLowerCase());
        
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }


  return (
      <div className=' mt-10'>
          <div className=" flex  gap-4 justify-center items-start overflow-scroll scrollbar-none  ">
              {isLoading ? <p>loading...</p> : categoryList.map((el, index) => (
                  <FilterProduct
                      key={index}
                      onClick={() => handleFilterProduct(el)}
                      category={el}
                      isActive={el===filterBy}
                  />
              ))}
          </div>
          <div>
              {isLoading ? (
              <div className=' h-screen flex items-center flex-col justify-center'>
                  <Spinner />
                  <p>fetching products...</p>
              </div>
              ) : (
                      <div className="flex flex-wrap justify-center my-10 md:my-16">
                     
                      {
                          dataFilter.map(product => (
                        <div className=' flex justify-center flex-col items-center w-full min-w-[180px] max-w-[180px] md:min-w-[200px] md:max-w-[200px] border-[1px] py-5 px-4 overflow-hidden' key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                <div className=' h-28 '>
                  <img className='h-full hover:scale-110 duration-500' src={product.image} alt="" />
                  </div>
               </Link>
              <p className=' text-slate-500 font-thin'>{product.category}</p>
               <Link to={`/productdetails/${product._id}`}>
                <p className=' text-blue-600  '>{product.name}</p>
                  </Link>
                 
              <p className=' text-orange-400'><span>$</span>{product.price}</p>
             <button className=' hover:bg-blue-600 w-full bg-blue-500 text-white  mt-2 rounded-sm py-1'>Add to cart</button>
              
          </div>
                          ))}   
                           </div>
          ) }
                </div>

      </div>
  )
}

export default AllProducts