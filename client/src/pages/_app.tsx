import React, { useEffect, useState } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuthMiddleware } from '@/src/shared/hooks/useAuthMiddleware';
import Navbar from '../shared/components/Navbar';
import { isSignedIn } from '../shared/utils';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => {
  useAuthMiddleware();
  const [showNavbar, setShowNavbar] = useState(false);
  const { pathname } = useRouter();
  const userSignedIn = isSignedIn();

  useEffect(() => {
    if (pathname === '/404' || pathname === '/500') {
      setShowNavbar(false);
    } else {
      setShowNavbar(userSignedIn);
    }
  }, [pathname, userSignedIn]);

  return (
    <Provider store={store}>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
};

export default App;
