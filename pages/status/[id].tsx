import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../../components/Layout'
import { addToCart } from '../../redux/cartSlice'
import { fetchOneItem } from '../../util/fetchOneItem'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

interface Props {
  item: Item | null
}

const Item = ({item}: Props) => {
  const [selected, setSelected] = useState(1)
  const dispatch = useDispatch()
  const [goCart, setGocart] = useState(false)

  const addItemToCart = () => {
    for(let i=0; i < selected; i++){
      dispatch(addToCart(item!))
    }
    toast.success(`${item!.name}を${selected}つカートに入れました。`)
    setGocart(true)

  }

  if(!item) {
    return (
      <Layout title="Product Not Found">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <h1 className="text-lg">
            Product Not Found
          </h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={item.name}>
      <div className='inline-block m-20  lg:flex'>
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
          theme="light"
        />

        <div className='relative h-96 w-96 z-0 cursor-pointer lg:h-[600px] lg:w-[600px]'>
          <Image src={item.url} alt="" layout='fill' objectFit='cover' />
        </div>
        <div className='lg:ml-10 lg:w-1/4'>
          <ul className='leading-9'>
            <li className='text-xl font-bold mt-5 lg:m-0'>{item.name}</li>
            <li>種類: {item.category}</li>
            <li>説明: {item.text}</li>
            <li className='text-xl font-bold my-5'>価格: {item.price}円</li>
          </ul> 
        <div className='flex flex-col'>
          {goCart?
          <Link href={"/cart"}>
            <button className='px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 hover:opacity-80 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 lg:w-auto'>
              "カートへ移動する"
            </button>
          </Link>:
          <button
            onClick={addItemToCart}
            className='px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 hover:opacity-80 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 lg:w-auto'
          >
            "カートに入れる"
          </button>
          }
            <select
              className='w-20 h-8 mt-5 shadow-md shadow-gray-400 bg-gray-200 rounded-lg focus:outline-none'
              value={selected} onChange={ (e: React.ChangeEvent<HTMLSelectElement>)  => setSelected(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <Link href={"/"}>
              <h1 className='mt-8 text-lg mx-12 hover:underline hover:opacity-50 transition-opacity'>&rarr;買い物に戻る</h1>
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}


export default Item

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const id = context.query.id
  const item = await fetchOneItem(id as string)
  return {
    props: {
      item: item? item : null
    },
  };
}