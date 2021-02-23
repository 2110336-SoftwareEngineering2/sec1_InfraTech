import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import 'antd/dist/antd.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <Head>
        <title>Let's exercise!</title>
        <link rel='icon' href='/logo.svg'/>
      </Head>
      <Component {...pageProps} />
    </CookiesProvider>
  );
};

export default App;
