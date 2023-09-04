import React, { useState } from 'react'
import {FaShare } from "react-icons/fa"

const About = () => {

  const [linkShared, setLinkShared] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setLinkShared(true);
        setTimeout(() => {
           setLinkShared(false) 
        }, 1000);
    }

  return (
    <div className=' mt-10 w-4/5 md:w-4/6 m-auto text-justify text-sm'>
      <p>At X-Log e-Pharmacy, we're committed to revolutionizing the way you access and manage your healthcare needs. We understand that convenience, reliability, and exceptional customer service are paramount when it comes to your health and well-being. That's why we're here to provide you with a seamless and secure online pharmacy experience.</p>
      <p className=' my-5 text-xl font-medium'>Our Mission</p>
      <p>Our mission is to make healthcare accessible and convenient for everyone. We believe that quality healthcare should be within reach of every individual, and our platform is designed to bridge the gap between you and the medications and healthcare products you need. We strive to empower you to take control of your health and live your best life.</p>
      <p className=' my-5 text-xl font-medium'>Our Values</p>
      <ul className=' list-disc'>
        <li className=' mb-5'><span className=' font-medium'>Integrity:</span> We are committed to the highest ethical standards in all our interactions. You can trust us to provide accurate information and safe, genuine products.</li>
        <li className=' mb-5'><span className=' font-medium'>Customer-Centric:</span>Your health and satisfaction are our top priorities. We are dedicated to serving your needs with empathy and professionalism.</li>
        <li className=' mb-5'><span className=" font-medium">Innovation:</span> We embrace technology to streamline the pharmacy experience and continuously improve our services to meet your evolving needs.</li>
        <li className=' mb-5'><span className=' font-medium'>Accessibility:</span> We aim to reach every corner of the world, ensuring that healthcare is accessible to everyone, regardless of their location.</li>
    
      </ul>
      <p className=' my-5 text-xl font-medium'>Our Services</p>
      <ul className=' list-disc'>
        <li className=' mb-5'><span className=" font-medium">Wide Range of Medications:</span> X-Log e-Pharmacy offers an extensive selection of prescription and over-the-counter medications to treat various health conditions. Our products are sourced from reputable manufacturers and undergo stringent quality checks.</li>
        <li className=' mb-5'><span className=" font-medium">Personalized Care:</span> Our team of licensed pharmacists and healthcare professionals is available to answer your questions and provide guidance on your medications and health concerns.</li>
        <li className=' mb-5'><span className=" font-medium">Convenient Ordering:</span> You can order your medications from the comfort of your home, 24/7. Our user-friendly website and mobile app make it easy to browse, select, and purchase the products you need.</li>
        <li className=' mb-5'><span className=" font-medium">Secure and Private:</span>  We take your privacy and security seriously. Your personal information and medical history are protected through advanced encryption and data security measures.</li>
        <li className=' mb-5'><span className=" font-medium">Fast and Reliable Delivery:</span> We offer swift and dependable delivery services, ensuring your medications reach you in a timely manner.</li>
        <li className=' mb-5'><span className=" font-medium">Health Information:</span> Stay informed with our health articles and resources, covering a wide range of topics to help you make informed decisions about your well-being.</li>
      </ul>
      <p className=' my-5 text-xl font-medium'>Join Us in Your Health Journey</p>
      <p>X-Log e-Pharmacy is more than just an online pharmacy; it's your partner in health. We invite you to explore our website, discover our services, and experience the convenience of online healthcare. Whether you have questions about your medications, need advice on managing a health condition, or simply want to stock up on healthcare essentials, we're here to assist you every step of the way.</p>
      <p>Thank you for choosing X-Log e-Pharmacy. We look forward to serving you and being a part of your health and wellness journey.</p>
      <p>For any inquiries or assistance, please don't hesitate to contact our dedicated customer support team. Your health is our priority, and we're here to support you.</p>
      <div className=' text-left my-5'>
        <p className=' my-4'>Sincerely,</p>
        <p className=' font-semibold'>Joshua Okorie</p>
          <p>CEO, X-LOG</p>
      </div>
        <div onClick={handleShare} className=' cursor-pointer z-10 bg-black text-white top-24 w-8 rounded-full flex items-center justify-center h-8 fixed  right-2'>
              <FaShare />
                     
          </div>
             {linkShared && (<p className=' bg-white text-black p-2 fixed font-semibold top-32 z-50 right-4'>Link copied!</p>)}
      
    </div>
  )
}

export default About