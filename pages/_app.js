// Neptune Mutual Test
// Author: Priyanshu Chauhan
// Last Updated: 14 Jan 2021 2:45 AM

import '../styles/globals.css'
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}

export default MyApp
