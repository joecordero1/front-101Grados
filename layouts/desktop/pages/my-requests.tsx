import React from 'react';

import { ParticipantRequests } from '../../components/partials/participant/requests/ParticipantRequests';
import { withAuth } from 'components/AuthGuard';

const MyRequests = () => {
  return (
    <div>
      <ParticipantRequests />
    </div>
  );
};

export default withAuth(MyRequests);
