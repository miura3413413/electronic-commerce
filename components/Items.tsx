import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Pagination, Navigation } from "swiper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clickedItem } from "../redux/cartSlice";

interface Props {
  title: string;
  items: Item[];
}

const Items = ({ title, items }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const clickHandler = (item: Item) => {
    dispatch(clickedItem({ _id: item._id, clicked: 1 }));
    router.push(`/status/${item._id}`);
  };
  return (
    <div className="">
      <h1 className="w-52 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
        {title}
      </h1>
      <Swiper
        breakpoints={{
          1150: { slidesPerView: 4 },
          760: { slidesPerView: 3 },
          0: { slidesPerView: 1 },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {items.map((item: Item, index: number) => {
          return (
            <SwiperSlide key={`${index}`} className="">
              <div className="h-80 w-80 ml-10 bg-white flex justify-center items-center">
                <div
                  className="relative h-60 w-60 z-0 cursor-pointer "
                  onClick={() => clickHandler(item)}
                >
                  <Image
                    src={item.url}
                    alt={item.name}
                    sizes=""
                    fill
                    className="object-contain "
                  />
                </div>
                <Link
                  href={`/status/${item._id}`}
                  className="absolute  bottom-1 cursor-pointer hover:underline"
                >
                  <span>{item.name}</span>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Items;
