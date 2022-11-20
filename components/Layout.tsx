import { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
interface Props {
  title: string | undefined | null,
  children: React.ReactNode
}

export const Layout: NextPage<Props> = ({children, title}: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="h-full">
      <Head>
        <title>{title}</title>
      </Head>
      <Topbar open={open} setOpen={setOpen} />
      {open && <Sidebar  open={open} setOpen={setOpen}/>}

      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout