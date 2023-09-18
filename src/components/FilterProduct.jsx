import React from 'react'
import {GiMedicines} from "react-icons/gi"

const FilterProduct = ({ onClick, category,isActive }) => {

  return (
      <div  onClick={onClick}>
          <div  className={` flex items-center justify-center text-xl h-14 w-14  rounded-full border-2 cursor-pointer ${isActive && 'text-white bg-green-500'}`}>
              <GiMedicines />
          </div>
          <p className=' text-xs text-center font-medium my-1 capitalize text-blue-500'>{category.slice(0,10)}...</p>
          
    </div>
  )
}

export default FilterProduct