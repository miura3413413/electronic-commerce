import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import { BsXLg } from "react-icons/bs";

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({open, setOpen}:Props) => {
  return (
    <div className='h-screen w-64 z-30 bg-gray-700 fixed top-0 p-5 opacity-90'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold text-white'>メニュー</h1>
          <BsXLg className='cursor-pointer text-white hover:opacity-50 transition-opacity' onClick={()=>setOpen(!open)}/>
        </div>
        <div className='mt-5'>
        <Link href={"/animal"}>
          <h2 className='cursor-pointer text-xl mb-3 hover:underline text-white'>動物</h2>
        </Link>
        <Link href={"/food"}>
          <h2 className='cursor-pointer text-xl hover:underline text-white'>食べ物</h2>
        </Link>
        </div>

    </div>
  )
}

export default Sidebar