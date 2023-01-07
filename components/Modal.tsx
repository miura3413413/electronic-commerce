import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { switchIsMpdal } from "../redux/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const scrollX = window.scrollX;
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="absolute top-0  left-0 w-full h-full bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-[600px] h-[600px] p-5">
        <BsXLg
          className="cursor-pointer text-black hover:opacity-50 transition-opacity mr-0 ml-auto"
          onClick={() => dispatch(switchIsMpdal())}
        />
        <h1 className="text-2xl font-bold flex justify-center">お知らせ</h1>
        <h2>・1月1日 24:00~メンテナンス</h2>
        <h2>・1月5日 24:00~メンテナンス</h2>
        <h2>・1月10日 24:00~メンテナンス</h2>
      </div>
    </div>
  );
};

export default Modal;
