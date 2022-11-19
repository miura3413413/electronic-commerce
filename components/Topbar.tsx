import React from 'react'
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";
function Topbar() {
  return (
    <div className="h-16 flex items-center justify-between  bg-red-50 sticky top-0">
      <div className='flex items-center'>
      <AiOutlineBars className='h-5 w-5 cursor-pointer ml-10'/>
      <h2 className='ml-2 hidden md:inline-block  '>electronic-commerce</h2>
      </div>

      <div className="flex items-center">
        <input className='outline-none border-2 border-orange-200 rounded-lg'/>
        <AiOutlineSearch className='w-5 h-5 cursor-pointer '/>
      </div>
      <div className='flex'>
        <div className='relative'>
          <SlBasket className=' w-5 h-5 mr-5 cursor-pointer'/>
          <span className='absolute right-1 -top-2 h-5 w-5 flex items-center justify-center  rounded-full bg-orange-300 text-white'>
            5
          </span>
        </div>

      <BsFillPersonFill className='w-5 h-5 cursor-pointer mr-10'/>
      </div>

    </div>
  )
}

export default Topbar