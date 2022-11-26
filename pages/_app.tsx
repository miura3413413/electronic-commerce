import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from '../redux/store'
import { Session } from 'next-auth'

interface NewAppProps extends AppProps{
  session: Session
}

function MyApp({ Component, session ,pageProps }: NewAppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>

  )
}

export default MyApp
