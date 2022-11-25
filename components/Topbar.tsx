import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Topbar = ({open, setOpen}:Props) => {
  const items = useSelector((state: RootState) => state.cart.items)
  return (
    <div className="h-16 z-10 flex items-center justify-between bg-gray-700  sticky top-0">
      <div className='flex items-center'>
      <AiOutlineBars 
        className='h-5 w-5 cursor-pointer ml-10 text-white hover:opacity-50 transition-opacity'
        onClick={()=>  setOpen(!open)}
      />
      <Link href={"/"}>
        <h2 className='ml-2 hidden cursor-pointer md:inline-block text-white hover:opacity-50 transition-opacity'>electronic-commerce</h2>
      </Link>

      </div>

      <div className="flex items-center">
        <input className='outline-none border-2 rounded-lg'/>
        <AiOutlineSearch className='w-5 h-5 cursor-pointer text-white'/>
      </div>
      <div className='flex'>
      <Link href={"/cart"}>
        <div className='relative hover:opacity-50 transition-opacity'>
          <SlBasket className=' w-5 h-5 mr-5 cursor-pointer text-white'/>
          <span className='absolute right-1 -top-2 h-5 w-5 flex items-center justify-center cursor-pointer rounded-full bg-blue-500 text-white'>
            {items.length}
          </span>
        </div>
      </Link>
        <BsFillPersonFill className='w-5 h-5 cursor-pointer mr-10 text-white '/>
      </div>

    </div>
  )
}

export default Topbar