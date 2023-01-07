import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { putClicked } from "../util/putClicked";
import Bottom from "./Bottom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
interface Props {
  title: string | undefined | null;
  children: React.ReactNode;
  is760?: boolean;
}

export const Layout: NextPage<Props> = ({ children, title, is760 }: Props) => {
  const [open, setOpen] = useState(false);
  const item = useSelector((state: RootState) => state.cart.clicked);
  useEffect(() => {
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
      <Topbar open={open} setOpen={setOpen} is760={is760} />
      {open && <Sidebar open={open} setOpen={setOpen} />}
      <main>{children}</main>
      <Bottom is760={is760} />
    </div>
  );
};

export default Layout;
