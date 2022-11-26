import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from '../redux/store'
import { Session } from 'next-auth'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Loading from '../components/Loading'

interface NewAppProps extends AppProps{
  session: Session
}

function MyApp({ Component, session ,pageProps }: NewAppProps) {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url:string) => url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      {pageLoading? <Loading/>:
        <Component {...pageProps} />}
      </Provider>
    </SessionProvider>

  )
}

export default MyApp
