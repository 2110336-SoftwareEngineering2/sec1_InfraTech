import { CookiesProvider } from 'react-cookie';
import 'antd/dist/antd.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
};

export default App;
