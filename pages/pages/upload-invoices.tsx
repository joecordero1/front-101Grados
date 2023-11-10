import React from 'react';

import UploadInvoices from '~/components/partials/participant/uploadInvoices/UploadInvoices';
import { withAuth } from 'components/AuthGuard';

const UploadInvoicesPage = () => {
  return <UploadInvoices />;
};

export default withAuth(UploadInvoicesPage);
