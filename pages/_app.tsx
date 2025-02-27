import { useEffect, useState } from 'react';
import { useStore, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from 'react-helmet';
import { SnackbarProvider } from 'notistack';

import { wrapper } from '../store/index.js';
import { demoActions } from '~/store/demo';
import { currentDemo } from '~/server/queries';
import '~/public/sass/style.scss';
import '~/public/sass/globals.scss';
import LayoutDesktop from '../layouts/desktop';
import LayoutMobile from '../layouts/mobile';

import {
  ApiProvider,
  ProgramProvider,
  AuthProvider,
  ApiAuthProvider,
  GeneralProvider,
  CartProvider,
} from 'context';
import { Modal } from '@mui/material';

const App = ({ Component, pageProps }) => {
  const store = useStore();

  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      store.dispatch(demoActions.refreshStore(currentDemo));
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SnackbarProvider
      maxSnack={50}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      hideIconVariant
      autoHideDuration={3000}
      // TransitionComponent={Zoom}
      // action={(key) => <SnackbarCloseButton snackbarKey={key} />}
    >
      <ApiProvider>
        <ProgramProvider>
          <AuthProvider>
            <GeneralProvider>
              <ApiAuthProvider>
                <CartProvider>
                  <Provider store={store}>
                    <Helmet>
                      <meta charSet='UTF-8' />
                      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                      <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1, shrink-to-fit=no'
                      />

                      <title>Tienda-Premia Tu Esfuerzo</title>

                      <meta name='keywords' content='React Template' />
                      <meta
                        name='description'
                        content='Riode - React eCommerce Template'
                      />
                      <meta name='author' content='D-THEMES' />
                    </Helmet>
                    {isMobile ? (
                      <LayoutMobile>
                        <Component {...pageProps} />
                      </LayoutMobile>
                    ) : (
                      <LayoutDesktop>
                        <Component {...pageProps} />
                      </LayoutDesktop>
                    )}
                  </Provider>
                </CartProvider>
              </ApiAuthProvider>
            </GeneralProvider>
          </AuthProvider>
        </ProgramProvider>
      </ApiProvider>
    </SnackbarProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(App);
