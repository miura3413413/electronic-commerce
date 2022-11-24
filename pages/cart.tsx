import { NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import CartItem from '../components/CartItem'
import Layout from '../components/Layout';
import { RootState } from '../redux/store';
const Cart: NextPage = () => {
  const  paymentTotal = useSelector((state: RootState) => {
    return state.cart.items.reduce((total: number, item: Item) => (total += item.price),0)
  })

  const  items = useSelector((state: RootState) => state.cart.items )
  const [groupedItemsInCart, setGroupedItemsInCart] = useState( {} as { [key: string]: Item[] });

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Item[] });
    setGroupedItemsInCart(groupedItems);
  }, [items]);
  
  return (
    <Layout title="ショッピングカート">
      {items.length > 0 ?
            <div className='bg-gray-200 min-h-screen pb-10'>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <h1 className='p-10 font-bold text-xl'>ショッピングカート</h1>
            <div className='flex flex-col gap-3 md:flex-row md:justify-around m-10'>
              <div className='divide-y divide-gray-400 bg-white p-7 md:w-[1000px]'>
                <h3 className='text-right'>価格</h3>
                {Object.entries(groupedItemsInCart).map(([key, items]) => (
                    <CartItem key={key} items={items} id={key} />
                  ))}
                <div className='flex justify-end'>
                  <h2>合計： </h2>
                  <h2>&yen;{paymentTotal.toLocaleString()}</h2>
                </div>
    
                
              </div>
              <div className='bg-white h-48 md:w-[300px] p-7 '>
                <div className='flex mb-2'>
                    <h2>合計： </h2>
                    <h2>&yen;{paymentTotal.toLocaleString()}</h2>
                  </div>
                  <button className='px-5 py-2 text-lg font-semibold text-center text-white transition duration-300 hover:opacity-80 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 lg:w-auto'>
                    レジに進む
                  </button>
                </div>
            </div>
          </div> 
            :
          <div className="h-screen w-screen flex flex-col justify-center items-center gap-2">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <h1 className='text-lg'>カートが空です</h1>
            <Link href={"/"}>
              <button className='text-lg hover:underline'>→買い物をする</button>
            </Link>

          </div>

          }

    </Layout>


  )
}

export default Cart