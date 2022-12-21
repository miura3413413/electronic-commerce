import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { putClicked } from "../util/putClicked";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
interface Props {
  title: string | undefined | null;
  children: React.ReactNode;
}

export const Layout: NextPage<Props> = ({ children, title }: Props) => {
  const [open, setOpen] = useState(false);
  const item = useSelector((state: RootState) => state.cart.clicked);
  useEffect(() => {
    console.log(item);
    const onUnload = (event: BeforeUnloadEvent): void => {
      putClicked(item);
    };
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  });
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>
      <Topbar open={open} setOpen={setOpen} />
      {open && <Sidebar open={open} setOpen={setOpen} />}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
