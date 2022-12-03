import { ErrorMessage } from '@hookform/error-message';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
interface Inputs {
  rate: number |  null,
  title: string,
  text: string
}

const  PostReview = () => {
  const [rate, setRate] = useState<number>(0)
  
  const star: any[] = []
  for (let i = 0; i < 5; i++) {
    if( i < rate ) {
      star.push(1);
    } else {
      star.push(0);
    }
  }

  const HandleStarShine = (rate: number) => {
    setRate( rate + 1 )
    setValue("rate", rate+1)
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: { rate: null, title: "", text: "" },
    reValidateMode: "onSubmit"
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
    setRate(0)
  };
  
  return(
    <form onSubmit={handleSubmit(onSubmit)} className='divide-y divide-gray-400'>
      <div className='flex flex-col'>
        <label className='text-xl' htmlFor='rate'>商品の評価</label>
        <input
          {...register('rate', {
            required: {
              value: true,
              message:"入力が必須の項目です"
            },
          })}
          className="hidden"
        />

        <div className='flex'>
          {star.map((val: boolean, index: number) => {
            return (
              <button
                className='text-3xl my-5 '
                key={index}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  HandleStarShine(index)
                }}
              >
                {val ? <AiFillStar  /> : <AiOutlineStar/>}
              </button>
            )
          })}
        </div>

        <div className='text-red-500 my-2'>
          <ErrorMessage errors={errors} name="rate"/>
        </div>
        
      </div>

      <select className="hidden" name="" id="">
        <option value={rate} ></option>
      </select>


      <div className='flex flex-col pt-5'>
        <label className='mb-2 text-xl' htmlFor='title'>レビューのタイトル</label>
        <input
          {...register('title', {
            required: {
              value: true,
              message:"入力が必須の項目です"
            },
          })}
          className="px-2 my-5 outline-none border-2 border-gray-400 rounded-lg focus:border-black"
        />
        <div className='text-red-500 my-2'>
          <ErrorMessage errors={errors} name="title"/>
        </div>
      </div>

      <div className='flex flex-col pt-5'>
        <label className='mb-2 text-xl' htmlFor='text'>レビューを追加</label>
        <textarea
          {...register('text', {
            required: {
              value: true,
              message:"入力が必須の項目です"
            },
          })}
          className="p-2 my-5  h-48 outline-none border-2 border-gray-400 rounded-lg focus:border-black"
        />
        <div className='text-red-500 my-2'>
          <ErrorMessage errors={errors} name="text"/>
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          className={`my-5 h-10 w-20  py-1 px-3 border-2  border-gray-400  rounded-2xl ${isDirty? "hover:opacity-50 hover:transition-opacity ":"border-gray-400"}`}
          type="submit"
          disabled={!isDirty}
        >
          投稿
        </button>
      </div>

 
    </form>
  )
}

export default PostReview