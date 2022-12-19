import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "../util/fetchCategory";
import Layout from "../components/Layout";
import Link from "next/link";
interface Props {
  items: Item[];
}
const Animal: NextPage<Props> = ({ items }: Props) => {
  const [selected, setSelected] = useState("価格:昇順");

  useEffect(() => {
    switch (selected) {
      case "価格:昇順":
        items.sort((a, b) => b.price - a.price);
        break;
      case "価格:降順":
        items.sort((a, b) => a.price - b.price);
        break;
    }
  }, [selected]);

  return (
    <Layout title="動物">
      <div className="bg-gray-200 h-full ">
        <div className="flex items-center">
          <h1 className="pt-10 pl-10 text-xl font-bold">動物</h1>
          <h2 className="pt-10 ml-10">並び替え: </h2>
          <select
            className="mt-10 ml-2 w-21 h-6 shadow-md shadow-gray-400  rounded-lg focus:outline-none text-sm"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelected(e.target.value)
            }
            value={selected}
          >
            {/* <option value="デフォルト">デフォルト</option> */}
            <option value="価格:昇順">価格:昇順</option>
            <option value="価格:降順">価格:降順</option>
          </select>
        </div>
        <div className="flex flex-wrap divide-y sm:divide-y-0 divide-gray-400 p-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex p-5 sm:flex-col sm:bg-white bg-gray-200 sm:m-10 m-0"
            >
              <Link href={`/status/${item._id}`}>
                <div className="relative h-48 w-48 z-0 cursor-pointer">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              <div className="sm:flex mt-5 sm:m-0 ml-5 items-center">
                <Link href={`/status/${item._id}`}>
                  <h1 className="hover:underline cursor-pointer text-lg font-semibold sm:mr-2 m-0">
                    {item.name}
                  </h1>
                </Link>
                <h2 className="">&yen;{item.price.toLocaleString()}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Animal;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const items = await fetchCategory("animal");
  return {
    props: {
      items: items,
    },
  };
};
