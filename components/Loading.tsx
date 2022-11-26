import { NextPage } from 'next'
import React from 'react'


const Loading:NextPage = () => {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold'>Loading....</h1>
    </div>
  )
}

export default Loading