import { NextPage } from 'next'
import React from 'react'

const Register: NextPage = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
    <div className='bg-gray-200 w-[500px] h-[600px] flex flex-col  items-center rounded-xl border-2 border-gray-400'>
      <h1 className='w-72 flex justify-center mt-5 pb-3 text-2xl border-b-2 border-gray-400 font-semibold'>登録</h1>
      <form className="flex flex-col items-center">
        <div className='flex flex-col items-center mt-10'>
          <label className='mb-2 text-xl border-b-2 border-gray-400' htmlFor='enail'>Email</label>
          <input

            className="px-2 outline-none border-2 border-gray-400 rounded-lg focus:border-black"
          />     
          <div className='text-red-500 mt-2'>
          {/* <ErrorMessage errors={errors} name="password" /> */}
          </div>
        </div>


        <div className='flex flex-col items-center mt-10'>
          <label className='mb-2 text-xl border-b-2 border-gray-400' htmlFor="password">Password</label>
          <input

            className="px-2 outline-none border-2 border-gray-400 rounded-lg focus:border-black"
          />
        </div>
        <div className='text-red-500 mt-2'>
          {/* <ErrorMessage errors={errors} name="password" /> */}
        </div>
        <p className='mt-5 text-red-500'>err</p>
        <button
          className={`mt-10 py-1 px-3 border-2 border-gray-400  rounded-2xl`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  )
}

export default Register