import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../components/Layout";
import { addToCart } from "../../redux/cartSlice";
import { fetchOneItem } from "../../util/fetchOneItem";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Review, { startRate } from "../../components/Review";
import PostReview from "../../components/PutReview";
import { BsXLg } from "react-icons/bs";
import { useSession } from "next-auth/react";

interface Props {
  item: Item | null;
}

// const dummyData =[
//   {
//   userName: "user2",
//   userImage: "",
//   title: "test1",
//   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim porro laborum assumenda cum veniam nesciunt facilis atque corporis odio qui libero ducimus consequatur aut hic, impedit, saepe voluptatibus doloribus ut!",
//   star: 1
//   },
//     {
//   userName: "user3",
//   userImage: "/animal5.jpg",
//   title: "test2",
//   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim porro laborum assumenda cum veniam nesciunt facilis atque corporis odio qui libero ducimus consequatur aut hic, impedit, saepe voluptatibus doloribus ut!",
//   star: 5
//   }
// ]

const Item = ({ item }: Props) => {
  // item?.review.reverse()
  // console.log(item)
  const router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [goCart, setGocart] = useState(false);
  const itemSort = [...item!.review];
  const avgStar = Math.round(
    item!.review.reduce((total: number, data: any) => (total += data.rate), 0) /
      item!.review.length
  );

  const addItemOrGoCart = () => {
    if (goCart) {
      router.push("/cart");
    } else {
      for (let i = 0; i < selected; i++) {
        dispatch(addToCart(item!));
      }
      toast.success(`${item!.name}を${selected}つカートに入れました。`);
      setGocart(true);
    }
  };

  const writeReview = () => {
    if (session) {
      setOpen(!open);
    } else {
      router.push("/login");
    }
  };

  if (!item) {
    return (
      <Layout title="Product Not Found">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <h1 className="text-lg">Product Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={item.name}>
      <div className="m-10">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="inline-block lg:flex">
          <div className="relative h-96 w-96 z-0 cursor-pointer lg:h-[600px] lg:w-[600px]">
            <Image src={item.url} alt="" layout="fill" objectFit="contain" />
          </div>
          <div className="lg:ml-10 lg:w-1/4 lg:mt-14">
            <ul className="leading-9">
              <li className="text-xl font-bold mt-5 lg:m-0">{item.name}</li>
              <li>種類: {item.category}</li>
              <li>説明: {item.text}</li>
              <li className="text-xl font-bold my-5">
                価格: {item.price.toLocaleString()}円
              </li>
            </ul>
            <div className="flex flex-col">
              <button
                onClick={addItemOrGoCart}
                className="px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 hover:opacity-80 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 lg:w-auto"
              >
                {goCart ? "カートへ移動する" : "カートに入れる"}
              </button>
              <select
                className="w-20 h-8 mt-5 shadow-md shadow-gray-400 bg-gray-200 rounded-lg focus:outline-none"
                value={selected}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelected(Number(e.target.value))
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <Link href={"/"}>
                <h1 className="mt-8 text-lg hover:underline hover:opacity-50 transition-opacity mb-10">
                  &rarr;買い物に戻る
                </h1>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-300">
          <h1 className="mt-5 font-bold text-xl ">カスタマーレビュー</h1>
          {avgStar ? (
            <h1 className="flex items-center text-xl">
              {startRate(avgStar)}星5つ中{avgStar}
            </h1>
          ) : null}
          <h1 className="border-b-2 border-gray-300 pb-5">
            {item.review.length}件のグローバル評価
          </h1>
          <div>
            <Review reviews={itemSort.reverse()} />
          </div>

          {open ? (
            <div className="mt-10 border-2 p-5 max-w-[1200px] mr-auto ml-auto block">
              <BsXLg
                onClick={() => setOpen(!open)}
                className="cursor-pointer  hover:opacity-50 transition-opacity flex ml-auto"
              />
              <PostReview />
            </div>
          ) : (
            <button
              onClick={writeReview}
              className="lg:w-1/2 w-full p-2 mt-10 text-left  transition duration-300 hover:opacity-50 rounded-lg border-2 mr-auto ml-auto block"
            >
              レビューを書く
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Item;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.id;
  const item = await fetchOneItem(id as string);
  return {
    props: {
      item: item ? item : null,
    },
  };
};
