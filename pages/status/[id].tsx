import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React from 'react'
import Layout from '../../components/Layout'
import Topbar from '../../components/Topbar'
import { fetchOneItem } from '../../util/fetchOneItem'
interface Props {
  item: Item
}

const Item = ({item}: Props) => {
  console.log(item)
  return (
    <Layout title={item.name}>
      <div className='inline-block m-20  lg:flex'>
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
          <button className='px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 hover:opacity-80 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 lg:w-auto'>カートに入れる</button>
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
      item
    },
  };
}