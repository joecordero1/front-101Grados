import React from 'react';
import Helmet from 'react-helmet';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import { withAuth } from 'components/AuthGuard';
import { useAuth, useLogs } from 'hooks';
import {
  AccountDetails,
  Requests,
  Statement,
  Addresses,
} from 'components/account';
import { LogType } from '~/utils/types/logType';

function Account() {
  const { participant, logOut } = useAuth();
  const { dispatchLog } = useLogs();
  const router = useRouter();
  const query = router.query;

  const parseIndexIntoTab = (index: number) => {
    switch (index) {
      case 0:
        return 'dashboard';
      case 1:
        return 'details';
      case 2:
        return 'requests';
      case 3:
        return 'account-statement';
      case 4:
        return 'addresses';
      default:
        return 'dashboard';
    }
  };

  const parseTabIntoIndex = (
    tab:
      | 'dashboard'
      | 'details'
      | 'requests'
      | 'account-statement'
      | 'addresses'
  ) => {
    switch (tab) {
      case 'dashboard':
        return 0;
      case 'details':
        return 1;
      case 'requests':
        return 2;
      case 'account-statement':
        return 3;
      case 'addresses':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <main className="main account">
      <Helmet>
        <title>Tienda | Cuenta</title>
      </Helmet>

      <h1 className="d-none">Tienda - Account</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>Cuenta</li>
          </ul>
        </div>
      </nav>

      <div className="page-content mt-4 mb-10 pb-6">
        <div className="container">
          <h2 className="title title-center mb-10">Mi Cuenta</h2>

          <Tabs
            selectedTabClassName="show"
            selectedTabPanelClassName="active"
            defaultIndex={parseTabIntoIndex(
              query.tab as
                | 'dashboard'
                | 'details'
                | 'requests'
                | 'account-statement'
                | 'addresses'
            )}
            className="tab tab-vertical gutter-lg"
            onSelect={(index: number) => {
              const tab = parseIndexIntoTab(index);
              if (index === 5) {
                router.push(`/`, undefined, {
                  shallow: true,
                });
                logOut();
              } else {
                router.push(`/pages/account?tab=${tab}`, undefined, {
                  shallow: true,
                });
              }
            }}
          >
            <TabList
              className="nav nav-tabs mb-4 col-lg-3 col-md-4"
              role="tablist"
            >
              <Tab className="nav-item">
                <a className="nav-link">Panel</a>
              </Tab>
              <Tab className="nav-item">
                <a className="nav-link">Detalles de cuenta</a>
              </Tab>
              <Tab
                className="nav-item"
                onClick={() => {
                  dispatchLog(LogType.OPEN_MY_REQUESTS, {});
                }}
              >
                <a className="nav-link">Solicitudes</a>
              </Tab>
              <Tab
                className="nav-item"
                onClick={() => {
                  dispatchLog(LogType.OPEN_MY_ACCOUNT_BALANCE, {});
                }}
              >
                <a className="nav-link">Estado de Cuenta</a>
              </Tab>
              <Tab className="nav-item">
                <a className="nav-link">Direcciones</a>
              </Tab>
              <Tab className="nav-item">
                <ALink className="nav-link" href="#" onClick={logOut}>
                  Salir
                </ALink>
              </Tab>
            </TabList>

            <div className="tab-content col-lg-9 col-md-8">
              <TabPanel className="tab-pane dashboard">
                <p className="mb-0">
                  Hola! <span>{participant.fullName}</span> (no eres{' '}
                  <span>{participant.firstName}</span>?{' '}
                  <ALink href="#" className="text-primary">
                    Salir
                  </ALink>
                  )
                </p>
                <p className="mb-8">
                  Desde el panel de tu cuenta podrás ver{' '}
                  <ALink
                    href="/pages/my-requests"
                    className="link-to-tab text-primary"
                  >
                    tus solicitudes
                  </ALink>
                  , administrar tus direcciones de envío,
                  <br />y editar tu contraseña y los detalles de tu cuenta.
                </p>
                <ALink href="/shop" className="btn btn-dark btn-rounded">
                  Ir a la tienda<i className="d-icon-arrow-right"></i>
                </ALink>
              </TabPanel>
              <TabPanel className="tab-pane">
                <AccountDetails />
              </TabPanel>
              <TabPanel className="tab-pane downloads">
                <Requests />
              </TabPanel>
              <TabPanel className="tab-pane">
                <Statement />
              </TabPanel>
              <TabPanel className="tab-pane">
                <Addresses />
              </TabPanel>
              <TabPanel className="tab-pane"></TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

export default withAuth(React.memo(Account));
