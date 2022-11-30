import Image from 'next/image'
import React, { ReactNode } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

interface Props {
  reviews:{
    userName: string,
    userImage?: string,
    title: string,
    text: string,
    star: number
  }[]
}

export const startRate = (num: number): ReactNode => {
  const starRate = []
  for(let i = 0; i < num; i++) {
    starRate.push(<AiFillStar key={i}/>);
  }
  for(let i = 0; i < 5 - num; i++) {
    starRate.push(<AiOutlineStar key={i+4}/>);
  }
  return starRate
}

const Review = ({reviews}: Props) => {



  return (
    <div>
      {reviews.map((review, index)=>(
        <div key={index}>
          <div className='flex items-center mt-10'>
            {review.userImage?
              <div className='relative w-8 h-8 rounded-full mr-2 border-2 border-white'>
                <Image src={review.userImage} alt="" layout='fill' objectFit='cover' className='rounded-full'></Image>
              </div>
              :<BsFillPersonFill className='w-7 h-7 cursor-pointer mr-3 '/>
            }
            <h1>{review.userName}</h1>
          </div>
          <div className='flex items-center'>
            { startRate(review.star) }
            <h1 className='ml-2 font-bold'>{review.title}</h1>
          </div>
          <h1>{review.text}</h1>


        </div>
      ))}
    </div>
  )
}

export default Review