import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill, BsXLg } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchItems } from "../util/fetchItems";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Topbar = ({ open, setOpen }: Props) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const { data: session } = useSession();
  const [search, setSearch] = useState(false);
  const [seachedItems, setSeachedItems] = useState<Item[]>();
  const [searchValue, setSeachValue] = useState("");
  const clicked = useSelector((state: RootState) => state.cart.clicked);
  useEffect(() => {
    fetchItems().then((seachedItem) => setSeachedItems(seachedItem));
  }, []);

  const logoutHandler = () => {
    signOut({ callbackUrl: "/login" });
  };

  const newSeachedItems = seachedItems?.filter((item) => {
    return searchValue && item.name.includes(searchValue);
  });
  return (
    <div className="h-16 z-10 flex items-center justify-between bg-gray-700  sticky top-0">
      <div className="flex items-center">
        <AiOutlineBars
          className="h-5 w-5 cursor-pointer ml-10 text-white hover:opacity-50 transition-opacity"
          onClick={() => setOpen(!open)}
        />
        <Link href={"/"}>
          <h2 className="ml-2 hidden cursor-pointer md:inline-block text-white hover:opacity-50 transition-opacity">
            electronic-commerce
          </h2>
        </Link>
      </div>

      <div className="flex flex-col ">
        <div onClick={() => setSearch(true)} className="flex items-center">
          <input
            onChange={(e) => setSeachValue(() => e.target.value)}
            className="outline-none border-2 rounded-lg px-2 "
          />
          <AiOutlineSearch className="w-5 h-5 cursor-pointer text-white" />
        </div>
        {search && (
          <div className="flex flex-col bg-gray-500 text-white absolute w-48 top-12 rounded-xl py-3 items-start">
            <BsXLg
              className="ml-auto mr-2 flex justify-end cursor-pointer text-white hover:opacity-50 transition-opacity"
              onClick={() => setSearch(false)}
            />
            {newSeachedItems?.map((item) => (
              <button
                onClick={() => router.push(`/status/${item._id}`)}
                className="w-full h-8 text-left hover:bg-gray-300 hover:duration-300"
              >
                ・{item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Link href={"/cart"}>
          <div className="relative hover:opacity-50 transition-opacity">
            <SlBasket className=" w-7 h-7 mr-5 cursor-pointer text-white" />
            <span className="absolute right-1 -top-2 h-5 w-5 flex items-center justify-center cursor-pointer rounded-full bg-blue-500 text-white">
              {items.length}
            </span>
          </div>
        </Link>
        {session ? (
          <div className="flex items-center">
            {session.user?.image ? (
              <div className="relative w-10 h-10 rounded-full mr-2 border-2 border-white">
                <Image
                  src={session.user.image}
                  alt=""
                  fill
                  sizes=""
                  className="rounded-full object-cover"
                ></Image>
              </div>
            ) : (
              <BsFillPersonFill className="w-7 h-7 cursor-pointer mr-5 text-white " />
            )}
            <button
              className="px-2 py-2 mr-2 h-8 text-sm flex items-center font-semibold text-center text-white hover:opacity-80 transition-opacity rounded-lg bg-gradient-to-br from-purple-600 to-blue-500"
              onClick={logoutHandler}
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div className="flex">
            <Link href={"/login"}>
              <button className="px-2 py-2 mr-2 h-8 text-sm flex items-center font-semibold text-center text-white hover:opacity-80 transition-opacity rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
                ログイン
              </button>
            </Link>
            <Link href={"/register"}>
              <button className="px-2 py-2 mr-2  h-8 text-sm flex items-center font-semibold text-center text-white hover:opacity-80 transition-opacity rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
                登録
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
