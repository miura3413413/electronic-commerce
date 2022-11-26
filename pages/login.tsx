import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

interface Inputs {
  email: string,
  password: string
};

const Login: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '' },
    reValidateMode: "onSubmit"
  });

  const loginUser = async (data: Inputs) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`, 
    }).then((res) => {
      if (res?.error) {
        setError("EmailとPasswordを正しく入力してください");
      } else {
        router.push("/");
      }
    })
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginUser(data)
    reset();
  };
  
  useEffect(()=>{
    if(session){
      router.push("/")
    }
  }, [session])

  return (
    <Layout title="ログイン">
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='bg-gray-200 w-[500px] h-[600px] flex flex-col  items-center rounded-xl border-2 border-gray-400'>
          <h1 className='w-72 flex justify-center mt-5 pb-3 text-2xl border-b-2 border-gray-400 font-semibold'>ログイン</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <div className='flex flex-col items-center mt-10'>
              <label className='mb-2 text-xl border-b-2 border-gray-400' htmlFor='email'>Email</label>
              <input
                {...register('email', {
                  required: {
                    value: true,
                    message:"入力が必須の項目です"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'メールアドレスの形式が不正です',
                  },
                })}
                className="px-2 outline-none border-2 border-gray-400 rounded-lg focus:border-black"
              />     
            </div>
            <div className='text-red-500 mt-2'>
              <ErrorMessage errors={errors} name="email"/>
            </div>

            <div className='flex flex-col items-center mt-10'>
              <label className='mb-2 text-xl border-b-2 border-gray-400' htmlFor="password">パスワード</label>
              <input
                {...register('password', {
                  required: {
                    value: true,
                    message:"入力が必須の項目です"
                  },
                  pattern: {
                    value: /^([a-zA-Z0-9]{8,})$/,
                    message: "8文字以上の半角英数字を入力してください"
                  }
                })}
                className="px-2 outline-none border-2 border-gray-400 rounded-lg focus:border-black"
              />
            </div>
            <div className='text-red-500 mt-2'>
              <ErrorMessage errors={errors} name="password" />
            </div>
            <p className='mt-5 text-red-500'>{error}</p>
            <button
              className={`mt-10 py-1 px-3 border-2  border-gray-400  rounded-2xl ${isDirty? "hover:opacity-50 hover:transition-opacity ":"border-gray-400"}`}
              type="submit"
              disabled={!isDirty}
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </Layout>
    
  )
}
export default Login