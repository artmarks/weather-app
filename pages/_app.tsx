import '../styles/globals.css'
import '../styles/esri-overwrite.css'
// import "../general/extern/esriLight.css";

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
