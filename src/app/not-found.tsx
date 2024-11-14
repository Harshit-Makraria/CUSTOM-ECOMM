import  Image404  from '@/assest/404/404.png'
import Image from 'next/image'
import React from 'react'

export default function notfound() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
    
    <div className='grid'>

     <Image src={Image404}  alt='404' className='w-[200px] md:w-[500px] lg:w-[800px]' />
     <span className='text-2xl text-blue-700 place-self-center font-semibold'>Under Constrution!</span>
    </div>
       
    </div>
  )
}
