import React, { useEffect } from 'react'

export default function Home() {
  useEffect(()=>{
    document.title = 'Home'
  })


  return (
    <div>Este es el home</div>
  )
}
