  "use client"
  import React from 'react'
  import Landing from '@/components/Landing'  
  import Marquee from '@/components/Marquee'
  import About from '@/components/About'
  import Features from '@/components/Features'
  import Ready from '@/components/Ready'
  import Testimonials from '@/components/testmonials'
  import Chatbot from '@/components/Chatbot'
  import FAQs from '@/components/Faqs'




  const page = () => {

    
    return (
      <div className='min-h-screen bg-[rgb(241, 241, 241)] overflow-hidden'>
    
        <Landing/>
        <Marquee/>
        <About/>
        <Features/>
        <Testimonials/>
        <Ready/>
        <FAQs/>
        <Chatbot/>
      


      </div>
    )
  }

  export default page
