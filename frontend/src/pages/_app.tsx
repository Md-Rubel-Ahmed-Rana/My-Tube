import store from "@/redux/store";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import GoogleOneTapSignin from "@/components/common/GoogleOneTapSignin";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster position="top-center" />
        <GoogleOneTapSignin />
      </Provider>
    </ThemeProvider>
  );
}
