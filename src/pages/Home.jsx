import React, { useRef } from 'react';
import { GrPrevious, GrNext } from "react-icons/gr";
import{ImCart} from "react-icons/im"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { EffectFade,Pagination, Autoplay} from 'swiper/modules';
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";
import { Link } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import placeholder1 from "../assets/placeholder1.jpg";
import placeholder2 from "../assets/placeholder2.jpg";
import placeholder3 from "../assets/placeholder3.jpg";
import placeholder4 from "../assets/placeholder4.jpg";
import placeholder5 from "../assets/placeholder5.jpg";
import { useDispatch, useSelector } from "react-redux";
import CardFeature from '../components/CardFeature';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import { subscribeUser } from '../features/subscriptionSlice';
import { toast } from 'react-hot-toast';



const Home = () => {

  const dispatch = useDispatch();

  const{status,error}=useSelector(state=>state.subscription)

  const [user, setUser] = useState({
    email:""
  })


  
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // setUser(prevState => {
    //   return {
    //     ...prevState,
    //     [name]:value
    //   }
    // })
    
    setUser({
      [name]:value
    })
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(subscribeUser(user));
   
     
    
    if(error) {
    return  toast.error(error)
    }
    
     toast.success("Subscribed successfully!")
    setUser({
      email:""
    })
  
   
  
  }

  const {productList,isLoading} = useSelector(state => state.products);

  const ProductData = productList.slice(8, 18);

 

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  }

  const prevProduct = () => {
    slideProductRef.current.scrollLeft-=200
  }

  const items = [{
    name: "Is X- Log A Registered Pharmacy ?",
    content:"X-Log  an online pharmacy aggregator platform that aggregates different registered retail pharmacies for easy access to those pharmacies and also helps to deliver the medicines that you need."
  },
    {
      name: "How else can I Place an order outside this website?",
      content:"Asides placing your order on the website, you can also place your order by sending an email to joshuaokorie008@gmail.com or a message on Whatsapp to this number - 08148429444."
    },
    {
      name: "Do you deliver outside Maiduguri?",
      content:"No, we don't deliver outside Maiduguri metropolitant council",
  }]

  return (
    <>
      <Swiper
         effect={'fade'}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,

        }}
        modules={[Pagination,Autoplay, EffectFade]}
        className=' w-full md:h-screen h-60 overflow-hidden'
      >
        <SwiperSlide><img className='min-h-full' src={slide1} alt="" /></SwiperSlide>
        <SwiperSlide><img className=' min-h-full'  src={slide2} alt="" /></SwiperSlide>
        <SwiperSlide><img className=' min-h-full'  src={slide3} alt="" /></SwiperSlide>
        <SwiperSlide><img className=' min-h-full' src={slide4} alt="" /></SwiperSlide>
        <SwiperSlide><img className=' min-h-full' src={slide5} alt="" /></SwiperSlide>
      </Swiper>

      <div className=' mt-5 flex flex-col items-center gap-5'>
        <p className=' mx-2 md:text-4xl text-2xl font-bold text-center'>Welcome to the best <span className=' text-red-500'>e-pharmacy</span>  in the city of Maiduguri</p>
        <p className=' mx-2  sm:text-2xl text-md text-center'>Get all your pharmaceutical needs in a click a way! </p>
        <button className=' bg-blue-600 p-3 text-white text-base rounded-lg hover:bg-blue-500 duration-300 active:scale-75'><Link to={"/signup"}>Create A Free account</Link> </button>
      </div>

      {/* featured product */}

      <section className=' my-5'>
        <div  className=' flex items-center my-5'>
        <p className=' ml-5 text-2xl text-blue-500 font-medium'>Featured products</p>

        <div className=" ml-auto flex gap-4 mr-5">
            <button onClick={prevProduct} className=' p-1 rounded bg-slate-300 hover:bg-slate-400 text-lg'><GrPrevious/></button>
            <button onClick={nextProduct} className=' p-1 rounded bg-slate-300 hover:bg-slate-400 text-lg'><GrNext/></button>
          </div>
          </div>

        <div ref={slideProductRef}  className=" scroll-smooth transition-all flex gap-5 overflow-scroll scrollbar-none">
          {isLoading ? <div className=' flex items-center justify-center mx-auto'><Spinner/></div> : ProductData.map(el => (
              <CardFeature
              key={el._id}
              _id={el._id}
              name={el.name}
              category={ElementInternals.category}
              price={el.price}
              image={el.image}
              el={el}
          />
          ))}
        
        </div>

        <div className=' mt-8  mx-auto flex flex-col items-center'>
           <button className=' bg-yellow-500 py-2 px-6 text-white text-base rounded-lg hover:bg-yellow-700 duration-300 active:scale-75 '><Link className=' flex items-center justify-center gap-2' to={"/store"}>See Products<ImCart/></Link> </button>
        </div>

      </section>

      {/* Testimonial section */}

      <section>
        <Swiper
          
           effect={'fade'}
           grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          }}
        
          
           
          
          
      
          modules={[Autoplay, EffectFade]}
          className='md:w-4/5 '
      
      >
          <SwiperSlide >
            <div className=' h-52 text-black bg-slate-100  flex flex-col items-center justify-center w-4/5 sm:w-3/6 mx-auto p-3 rounded-lg drop-shadow-lg m-5'>
              <div className=' h-14 w-14 overflow-hidden my-3'>
                <img className='w-full h-full rounded-full' src={placeholder1} alt="" />
              </div>
              <p className=' text-sm text-center'>
                X-log is next to none❤
              </p>
              <p className=' text-sm my-2'>~Jenkins Banks</p>

            </div>
        </SwiperSlide>
          <SwiperSlide >
            <div className=' h-52 text-black bg-slate-100   flex flex-col items-center justify-center w-4/5 sm:w-3/6 mx-auto p-3 rounded-lg drop-shadow-lg m-5'>
              <div className=' h-14 w-14 overflow-hidden my-3'>
                <img className='w-full h-full rounded-full' src={placeholder2} alt="" />
              </div>
              <p className=' text-sm text-center'>
                X-log is a very reliable e-pharmacy outlet. I fully trust depend for quick delivery of my medical supplies.
              </p>
              <p className=' text-sm my-2'>~Jennifer Banks</p>

            </div>
        </SwiperSlide>
          <SwiperSlide >
            <div  className='h-52 text-black bg-slate-100  flex flex-col items-center justify-center w-4/5 sm:w-3/6 mx-auto p-3 rounded-lg drop-shadow-lg m-5'>
              <div className=' h-14 w-14 overflow-hidden my-3'>
                <img className='w-full h-full rounded-full' src={placeholder3} alt="" />
              </div>
              <p className=' text-sm text-center'>
                X-log is one stop shop for my medical supplies.
              </p>
              <p className=' text-sm my-2'>~Michael Lloyd</p>

            </div>
        </SwiperSlide>
          <SwiperSlide >
            <div className='h-52 text-black bg-slate-100 flex flex-col items-center justify-center w-4/5 sm:w-3/6 mx-auto p-3 rounded-lg drop-shadow-lg m-5'>
              <div className=' h-14 w-14 overflow-hidden my-3'>
                <img className='w-full h-full rounded-full' src={placeholder4} alt="" />
              </div>
              <p className=' text-sm text-center'>
                X-log is my my favorite e-pharmacy outlet❤❤.
              </p>
              <p className=' text-sm my-2'>~Peter Woods</p>

            </div>
        </SwiperSlide>
          <SwiperSlide >
            <div className='h-52 text-black bg-slate-100 flex flex-col items-center justify-center w-4/5 sm:w-3/6 mx-auto p-3 rounded-lg drop-shadow-lg m-5'>
              <div className=' h-14 w-14 overflow-hidden my-3'>
                <img className='w-full h-full rounded-full' src={placeholder5} alt="" />
              </div>
              <p className=' text-sm text-center'>
                X-log is a very reliable e-pharmacy outlet. I fully trust and depend on them for quick delivery of my medical supplies.
              </p>
              <p className=' text-sm my-2'>~Cynthia</p>

            </div>
        </SwiperSlide>
       
      </Swiper>
    
      </section>

      {/* accordion section */}

      <section className=' w-4/5 md:w-3/5 mx-auto mt-10'>
        <p className=' my-5 capitalize text-xl md:text-3xl font-medium'>frequently asked questions</p>
        {
          items.map((item, index) => (
            <div key={index}>
          <Accordion allowZeroExpanded className=''>
            <AccordionItem className=' border-b-2 drop-shadow-sm'>
                <AccordionItemHeading> 
                    <AccordionItemButton >
                    {item.name}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {item.content}
                </AccordionItemPanel>
            </AccordionItem>
              </Accordion>
              </div>

          ))
        }
      </section>

      {/* newsletter section */}
      <section className=' w-4/5 bg-slate-100 text-black rounded-lg mx-auto mt-10 p-2 md:p-5'>
        <div className=' flex md:flex-row flex-col  gap-6 md:items-center md:justify-between p-5'> 
          <div>
            <p className=' text-lg  font-bold mb-3'>Sign Up For Our Newsletter</p>
            <p className=' text-sm '>Get the latest blog and updates delivered straight to your inbox</p>
          </div>
          <form onSubmit={handleSubmit} className=' md:flex md:justify-between  md:basis-3/5'>
            <input required type="email" value={user.email} name='email'  onChange={handleChange} placeholder='Enter Your Email' className=' p-2 outline-none md:w-5/6 mr-5 w-full'/>
            <button className='md:mt-0 mt-3 p-2 text-white bg-blue-500 text-sm rounded-md'>{status == "pending" ? "submitting" : "Subscribe"}</button>
            
          
            
          </form>
        </div>
      </section>
    </>
  )
}

export default Home