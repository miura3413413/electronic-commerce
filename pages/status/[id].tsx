import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../../components/Layout'
import Topbar from '../../components/Topbar'
import { addToCart } from '../../redux/cartSlice'
import { fetchOneItem } from '../../util/fetchOneItem'
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  item: Item | null
}

const Item = ({item}: Props) => {
  const [selected, setSelected] = useState(1)
  const dispatch = useDispatch()

  const addItemToCart = () => {
    for(let i=0; i < selected; i++){
      dispatch(addToCart(item!))
    }
    toast.success(`${item!.name}を${selected}つカートに入れました。`)

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
            <li className='text-xl font-bold'>{item.name}</li>
            <li>種類: {item.category}</li>
            <li>説明: {item.text}</li>
            <li className='text-xl font-bold mt-10'>価格: {item.price}円</li>
          </ul> 
          <div>
            <button
              onClick={addItemToCart}
              className='px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 hover:opacity-80 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 lg:w-auto'
            >
              カートに入れる
            </button>
            <select
              className='w-12 h-12 ml-5 focus:outline-none'
              value={selected} onChange={ (e: React.ChangeEvent<HTMLSelectElement>)  => setSelected(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
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