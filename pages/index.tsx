import type { NextPage } from 'next'
import Topbar from '../components/Topbar'
import Items from '../components/Items';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';


const Home: NextPage = () => {
  const [open, setOpen] = useState(false)
  const images = [
    "/animal1.jpg",
    "/animal2.jpg",
    "/animal3.jpg",
    "/animal4.jpg",
    "/animal5.jpg",
  ]
  return (
    <div className='h-full'>
      <Topbar open={open} setOpen={setOpen}/>
      {open && <Sidebar  open={open} setOpen={setOpen}/>}
      <main className='min-h-screen top-0 bg-gray-200'>
      <Items title={"人気の商品"} images={images}/>
      <Items title={"新しい商品"} images={images}/>
      <Items title={"期間限定"} images={images}/>

      </main>

    </div>
  )
  }
export default Home