import Image from 'next/image'
import React from 'react'
import { removeItemFromCart } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  items: Item[]
  id: string
}

function CartItem({id, items }: Props) {
  const dispatch = useDispatch()
  
  
  const removeItem = () => {
    dispatch(removeItemFromCart({id}))
    toast.success(`${items[0].name}を1つ削除しました。`)
  }
  
  return (
    <div className='flex py-5'>
      <div className='relative h-40 w-40 z-0'>
        <Image src={items[0].url} alt="" layout='fill' objectFit='cover' />
      </div>
      <div className='ml-5 text-lg'>
        <h1>{items[0].name}</h1>
        <h1>数量: {items.length}</h1>
      </div>
      <div className='ml-auto'>
        <h1 className='text-xl font-bold'>&yen;{items[0].price.toLocaleString()}</h1>
        <button onClick={removeItem} className=' hover:underline hover:opacity-50'>削除</button>
      </div>
     

    </div>
  )
}

export default CartItem  