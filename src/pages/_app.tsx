import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { useAuth } from "src/hook/useAuth";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const { authListener } = useAuth();

  useEffect(() => {
    const data = authListener();
    return () => {
      if (data) data.unsubscribe();
    };
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}

export default MyApp;
