import type { NextPage } from 'next'
import Topbar from '../components/Topbar'
import Items from '../components/Items';


const Home: NextPage = () => {
  const images = [
    "/animal1.jpg",
    "/animal2.jpg",
    "/animal3.jpg",
    "/animal4.jpg",
    "/animal5.jpg",
  ]
  return (
    <div className='h-full'>
      <Topbar />
      {/* <Sidebar /> */}
      <main className='min-h-screen bg-gray-200'>
      <Items title={"人気の商品"} images={images}/>
      <Items title={"新しい商品"} images={images}/>
      <Items title={"期間限定"} images={images}/>

      </main>

    </div>
  )
  }
export default Home