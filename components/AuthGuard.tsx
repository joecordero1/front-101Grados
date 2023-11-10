import Login from 'pages/signin';

import { useAuth } from 'hooks';

export const withAuth = (Component) => {
  const Auth = (props) => {
    const { isLoggedIn, status } = useAuth();

    // if (status === 'loading') {
    //   return <div>Loading...</div>;
    // }

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return <Login />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};
