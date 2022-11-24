import Image from 'next/image'
import React from 'react'
import { removeItemFromCart } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'

interface Props {
  items: Item[]
  id: string
}

function CartItem({id, items }: Props) {
  const dispatch = useDispatch()
  
  const removeItem = () => {
    dispatch(removeItemFromCart({id}))
  }
  
  return (
    <div className='flex'>
      <div className='relative h-40 w-40 z-0'>
        <Image src={items[0].url} alt="" layout='fill' objectFit='contain' />
      </div>
      <div className='mt-4 ml-5 text-lg'>
        <h1>{items[0].name}</h1>
        <h1>数量: {items.length}</h1>
      </div>
      <div className='ml-auto mt-4 '>
        <h1 className='text-xl font-bold'>&yen;{items[0].price.toLocaleString()}</h1>
        <button onClick={removeItem} className=' hover:underline'>削除</button>
      </div>
     

    </div>
  )
}

export default CartItem