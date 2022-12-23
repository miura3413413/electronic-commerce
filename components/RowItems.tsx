import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { clickedItem } from "../redux/cartSlice";
interface Props {
  items: Item[];
  isRow: boolean;
}
const RowItems = ({ items, isRow }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const clickHandler = (item: Item) => {
    dispatch(clickedItem({ _id: item._id, clicked: 1 }));
    router.push(`/status/${item._id}`);
  };
  return (
    <div className="px-10 pb-10 w-fit">
      <div className={`bg-white ${isRow ? "flex" : ""} flex-wrap p-10`}>
        {items.map((item) => (
          <div
            className="relative h-24 w-24 z-0 m-1 cursor-pointer"
            onClick={() => clickHandler(item)}
            key={item._id}
          >
            <Image
              src={item.url}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RowItems;
