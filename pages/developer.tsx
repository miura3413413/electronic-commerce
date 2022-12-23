import React, { useRef, useState } from "react";
import Analyze from "../components/Analyze";

const developer = () => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef!.current?.value == "1") {
      setOpen(true);
    } else {
      setErr("パスワードが違います");
    }
    inputRef!.current!.value = "";
  };

  if (open) {
    return (
      <div>
        <Analyze />
      </div>
    );
  } else {
    return (
      <form
        onSubmit={onSubmit}
        className="h-screen w-screen flex items-center justify-center flex-col"
      >
        <div>
          <input
            name="password"
            type="text"
            ref={inputRef}
            className="outline-none border-2 rounded-lg px-2 forcus:border-gray-500"
          />
          <button className="border-solid border-2 border-gray-500 rounded-lg ml-2">
            &nbsp;送信&nbsp;
          </button>
        </div>
        <h1 className="mt-10 opacity-50">Pass: 1</h1>
        <h1 className="mt-3 text-red-500">{err}</h1>
      </form>
    );
  }
};
export default developer;
