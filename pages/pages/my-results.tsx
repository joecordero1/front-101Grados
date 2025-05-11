import React from "react";

import { withAuth } from "components/AuthGuard";
import ParticipantResults from "~/components/partials/participant/results";

const MyResults = () => {
  return (
    <div>
      <ParticipantResults />
    </div>
  );
};

export default withAuth(MyResults);
