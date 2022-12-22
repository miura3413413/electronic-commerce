import Link from "next/link";
import React from "react";

const success = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center ">
      <h1>購入が完了しました！</h1>
      <Link href={"/"}>
        <button className="hover:underline hover:opacity-50 transition-opacity mb-10">
          買い物を続ける
        </button>
      </Link>
    </div>
  );
};

export default success;
