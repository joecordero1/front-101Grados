import { useEffect } from 'react';
import { useStore, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from 'react-helmet';
import { SnackbarProvider } from 'notistack';

import { wrapper } from '../store/index.js';
import { demoActions } from '~/store/demo';
import { currentDemo } from '~/server/queries';
import '~/public/sass/style.scss';

import {
  ApiProvider,
  ProgramProvider,
  AuthProvider,
  ApiAuthProvider,
} from 'context';
import Layout from '~/components/layout';

const App = ({ Component, pageProps }) => {
  const store = useStore();

  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      store.dispatch(demoActions.refreshStore(currentDemo));
    }
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
            <ApiAuthProvider>
              <Provider store={store}>
                <Helmet>
                  <meta charSet="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                  />

                  <title>Riode - React eCommerce Template</title>

                  <meta name="keywords" content="React Template" />
                  <meta
                    name="description"
                    content="Riode - React eCommerce Template"
                  />
                  <meta name="author" content="D-THEMES" />
                </Helmet>

                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Provider>
            </ApiAuthProvider>
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
