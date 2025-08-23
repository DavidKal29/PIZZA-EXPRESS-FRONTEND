import React, { useEffect } from 'react'

export default function Home() {
  useEffect(()=>{
    document.title = 'Home'
  })


  return (
    <div className='mt-[80px] mt:my-[100px]'>
      <div className='w-full flex justify-center items-center'>
        <img src="./banner.png" className='lg:w-full lg:h-[45rem]' alt="" />

      </div>

    </div>
  )
}
