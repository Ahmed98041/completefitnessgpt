// pages/_app.tsx
import { AppProps } from 'next/app';
import RootLayout from '../app/layout'; // Adjust the path to point to your RootLayout component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
