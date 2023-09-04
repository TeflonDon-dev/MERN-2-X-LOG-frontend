import React, { useState } from 'react';
import {BsCloudUpload} from "react-icons/bs"
import { imgTobase64 } from '../utils/ImgTobase64';
import { toast } from 'react-hot-toast';

const Admin = () => {

  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  });

  const handleOnChange = (e) => {
       const { name, value } = e.target
    setData(prevestate => {
      return {
        ...prevestate,
        [name]:value
      }
    })

  }

  const handleSubmit = async(e) => {
    e.preventDefault();


    const{name,image,price,category}=data

    if (name && image && price && category) {
      
      const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/uploadproduct`, {
        method: 'POST',
        headers: {
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const response = await fetchData.json();
      toast(response.message)

      setData({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
      })
    } else {
      toast.error("Enter required fields")
    }
  }

  const uploadImage = async(e) => {
        const data = await imgTobase64(e.target.files[0]);

    
    setData(prevestate => {
      return {
        ...prevestate,
        image:data
      }
    })
}

  return (
    <div className='p-4 mt-10'>
      <form onSubmit={handleSubmit} className=' rounded-md drop-shadow-lg bg-white m-auto w-full max-w-md  flex flex-col gap-2 p-5 text-black'>
        <label className=' text-blue-500' htmlFor="name">Name</label>
        <input value={data.name} onChange={handleOnChange} className=' bg-slate-200 p-1 my-1 rounded-md focus:outline-blue-500' type="text" name='name' id='name' />
        <label className=' text-blue-500' htmlFor="category">Category</label>
        <select value={data.category} onChange={handleOnChange} className=' bg-slate-200 p-1 my-1 rounded-md focus:outline-blue-500' name='category' id='category'>
          <option value={"other"}>select category</option>
          <option value={"Anagelsics"}>Anagelsics</option>
          <option value={"Cough & Cold"}>Cough & Cold</option>
          <option value={"Chronic Diseases"}>chronic Diseases</option>
          <option value={"Vitamins & Supplements"}>Vitamins & Supplements</option>
          <option value={"Reproductive Health"}>Reproductive Health</option>
          <option value={"Medical Accessories"}>Medical Accessories</option>
        </select>
        <label className=' cursor-pointer text-blue-500' htmlFor="image">Image
        <div className=" h-40 w-full bg-slate-200  rounded flex items-center justify-center my-1">
           {!data.image && <span className=' text-5xl'><BsCloudUpload /></span>} 
            <img src={data.image} className='  h-full' alt="" />
          <input  name='image' type="file" accept='image/' id='image'  onChange={uploadImage} className='hidden'/>
          </div>
          </label>
        <label className=' my-1 text-blue-500' htmlFor="price">Price</label>
        <input value={data.price} id='price' name='price' onChange={handleOnChange} type="text" className=' bg-slate-200 p-1 my-1 rounded-md focus:outline-blue-500' />
        <label className=' text-blue-500' htmlFor="description">Description</label>
        <textarea value={data.description} onChange={handleOnChange} className=' bg-slate-200 p-1 my-1 resize-none rounded-md focus:outline-blue-500' name="description" id="description"  rows="2"></textarea>
      <button className='bg-blue-500 hover:bg-blue-600 active:scale-95 active:duration-300 active:transition active:ease-in-out text-white font-semibold text-lg drop-shadow my-2 p-2 rounded-lg'>Upload</button>
      </form>
    </div>
  )
}

export default Admin