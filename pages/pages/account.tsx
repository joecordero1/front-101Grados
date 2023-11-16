import React from 'react';
import Helmet from 'react-helmet';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

import ALink from '~/components/features/custom-link';

import { withAuth } from 'components/AuthGuard';
import { useAuth } from 'hooks';
import {
  AccountDetails,
  Requests,
  Statement,
  Addresses,
} from 'components/account';

function Account() {
  const { participant, logOut } = useAuth();

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
            defaultIndex={0}
            className="tab tab-vertical gutter-lg"
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
              <Tab className="nav-item">
                <a className="nav-link">Solicitudes</a>
              </Tab>
              <Tab className="nav-item">
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
              <TabPanel className="tab-pane">
                {/* <form action="#" className="form">
                  <div className="row">
                    <div className="col-sm-6">
                      <label>First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        required
                      />
                    </div>
                  </div>

                  <label>Display Name *</label>
                  <input
                    type="text"
                    className="form-control mb-0"
                    name="display_name"
                    required
                  />
                  <small className="d-block form-text mb-7">
                    This will be how your name will be displayed in the account
                    section and in reviews
                  </small>

                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                  />
                  <fieldset>
                    <legend>Password Change</legend>
                    <label>
                      Current password (leave blank to leave unchanged)
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="current_password"
                    />

                    <label>New password (leave blank to leave unchanged)</label>
                    <input
                      type="password"
                      className="form-control"
                      name="new_password"
                    />

                    <label>Confirm new password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                    />
                  </fieldset>

                  <button type="submit" className="btn btn-primary">
                    SAVE CHANGES
                  </button>
                </form> */}
              </TabPanel>
              {/* <TabPanel className="tab-pane"></TabPanel> */}
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

export default withAuth(React.memo(Account));
