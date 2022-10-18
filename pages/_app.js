import { Toaster } from 'react-hot-toast';
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
