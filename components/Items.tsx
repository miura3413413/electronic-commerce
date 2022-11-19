import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";

import{ Pagination, Navigation } from 'swiper' 

interface Props {
  title: string
  images: string[]
}

const Items = ({title, images}: Props) => {

  return (
        <div className=''>
          <h1 className='w-52 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black'>{title}</h1>
          <Swiper 
            breakpoints={{
              1150: {slidesPerView: 4},
              760: {slidesPerView: 3},
              0: {slidesPerView: 1}
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {images.map((src: string, index: number) => {
              return (
                <SwiperSlide key={`${index}`} className="">
                  <div className='h-80 w-80 ml-10 bg-white flex justify-center items-center'>
                    <div className='relative h-60 w-60 z-0 cursor-pointer '>
                      <Image src={src} alt='' layout='fill' objectFit='cover'/> 
                    </div>
                    <span className='absolute  bottom-1 cursor-pointer hover:underline'>名前</span>
                  </div>
                 </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
  )
  }
export default Items