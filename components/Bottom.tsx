import React from "react";
interface Props {
  is760?: boolean;
}

const Bottom = ({ is760 }: Props) => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <div className={`text-center ${is760 ? "min-w-[760px]" : "w-auto"}`}>
      <button
        className="text-white bg-gray-700 w-full h-14 hover:opacity-90 transition-opacity"
        onClick={returnTop}
      >
        トップに戻る
      </button>
      <div className="flex justify-center bg-black font text-white pt-20 pb-3 font-serif text-xs space-x-3">
        <h1 className="hover:underline cursor-pointer">利用規約</h1>
        <h1 className="hover:underline cursor-pointer">プライバシー規約</h1>
        <h1 className="hover:underline cursor-pointer">
          パーソナライズ広告規約
        </h1>
        <h1 className="hover:underline cursor-pointer">各種規約</h1>
        <h1 className="hover:underline cursor-pointer">
          特定商取引法に基づく表示
        </h1>
      </div>
    </div>
  );
};

export default Bottom;
