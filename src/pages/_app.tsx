import Head from "next/head";
import { AppProps } from "next/app";
import "styles/index.css";
import { UniversalUIConfigProvider, ThemeProvider } from "@parssa/universal-ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TW</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UniversalUIConfigProvider value={{ components: {}, ssr: true }}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </UniversalUIConfigProvider>
    </>
  );
}

export default MyApp;
