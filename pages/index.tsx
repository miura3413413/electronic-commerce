import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Topbar from '../components/Topbar'

const Home: NextPage = () => {
  return (
    <div>
      <Topbar />
      {/* <Sidebar /> */}
      <main className='h-screen bg-green-300'>

      </main>

    </div>
  )
  }
export default Home