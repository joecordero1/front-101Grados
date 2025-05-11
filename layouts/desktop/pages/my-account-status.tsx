import React from 'react';

import { AccountStatus } from '~/components/partials/participant/accountStatus/AccountStatus';
import { withAuth } from 'components/AuthGuard';

const MyAccountStatus = () => {
  return (
    <div>
      <AccountStatus />
    </div>
  );
};

export default withAuth(MyAccountStatus);
