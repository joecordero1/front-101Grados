import Login from 'pages/signin';

import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuth = (Component) => {
  const Auth = (props) => {
    const { isLoggedIn, status, participant, setSession } = useAuth();
    const router = useRouter();

    // if (status === 'loading') {
    //   return <div>Loading...</div>;
    // }

    useEffect(() => {
      if (
        isLoggedIn &&
        !participant.approvedPolicy &&
        !participant.approvedTermsAndConditions
      ) {
        router.push('/pages/privacy-policy');
      }
    }, [
      isLoggedIn,
      participant.approvedPolicy,
      participant.approvedTermsAndConditions,
      status,
    ]);

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
