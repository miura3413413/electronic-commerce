import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
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
  const { data: session } = useSession()
  const logoutHandler = () => {
    signOut({ callbackUrl: "/login" })
  }
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
        <input className='outline-none border-2 rounded-lg px-2'/>
        <AiOutlineSearch className='w-5 h-5 cursor-pointer text-white'/>
      </div>
      <div className='flex justify-center items-center'>
      <Link href={"/cart"}>
        <div className='relative hover:opacity-50 transition-opacity'>
          <SlBasket className=' w-7 h-7 mr-5 cursor-pointer text-white'/>
          <span className='absolute right-1 -top-2 h-5 w-5 flex items-center justify-center cursor-pointer rounded-full bg-blue-500 text-white'>
            {items.length}
          </span>
        </div>
      </Link>
      {session?
        <div className='flex items-center'>
          {session.user?.image?
            <div className='relative w-10 h-10 rounded-full mr-2 border-2 border-white'>
              <Image src={session.user.image} alt="" layout='fill' objectFit='cover' className='rounded-full'></Image>
            </div>
            :<BsFillPersonFill className='w-7 h-7 cursor-pointer mr-5 text-white '/>
          }
            <button
              className='px-2 py-2 mr-2 h-8 text-sm flex items-center font-semibold text-center text-white hover:opacity-80 transition-opacity rounded-lg bg-gradient-to-br from-purple-600 to-blue-500'
             onClick={logoutHandler}     
            >
            ログアウト
            </button>
        </div>

        :<div className='flex'>  
          <Link href={"/login"}>
            <button className='px-2 py-2 mr-2 h-8 text-sm flex items-center font-semibold text-center text-white hover:opacity-80 transition-opacity rounded-lg bg-gradient-to-br from-purple-600 to-blue-500'>
              ログイン
            </button>
          </Link>
          <Link href={"/register"}>
            <button className='px-2 py-2 mr-2  h-8 text-sm flex items-center font-semibold text-center text-white hover:opacity-80 transition-opacity rounded-lg bg-gradient-to-br from-purple-600 to-blue-500'>
                登録
              </button>
          </Link>
        </div>
      }

      


      </div>

    </div>
  )
}

export default Topbar