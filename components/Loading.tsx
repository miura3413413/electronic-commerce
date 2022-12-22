import { NextPage } from "next";
import React from "react";

const Loading: NextPage = () => {
  return (
    <div className="h-screen w-screen flex  justify-center items-center">
      <div className="mr-2 animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      <h1 className="text-2xl font-bold">Loading....</h1>
    </div>
  );
};

export default Loading;
