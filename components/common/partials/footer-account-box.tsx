import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import withApollo from '~/server/apollo';
import { useLogs, useAuth } from 'hooks';
import { LogType } from '~/utils/types/logType';

function SearchForm() {
  const router = useRouter();
  const { logOut } = useAuth();
  const { dispatchLog } = useLogs();

  useEffect(() => {
    document.querySelector('body').addEventListener('click', onBodyClick);

    return () => {
      document.querySelector('body').removeEventListener('click', onBodyClick);
    };
  }, []);

  useEffect(() => {
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }, [router.pathname]);

  function onMenuClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle('show');
  }

  function onBodyClick(e) {
    if (e.target.closest('.header-search'))
      return (
        e.target.closest('.header-search').classList.contains('show-results') ||
        e.target.closest('.header-search').classList.add('show-results')
      );

    document.querySelector('.header-search.show') &&
      document.querySelector('.header-search.show').classList.remove('show');
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }

  return (
    <div className="header-search hs-toggle dir-up">
      <a
        href="#"
        className="search-toggle sticky-link"
        role="button"
        onClick={onMenuClick}
      >
        <i className="d-icon-user"></i>
        <span>Cuenta</span>
      </a>

      <div
        className="input-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Link
          href="/pages/account"
          className="mb-2"
          onClick={() => dispatchLog(LogType.OPEN_MY_REQUESTS, {})}
        >
          <i className="d-icon-user mr-1"></i>
          Mi Cuenta
        </Link>
        <Link
          href="/pages/my-requests"
          className="mb-2"
          onClick={() => dispatchLog(LogType.OPEN_MY_REQUESTS, {})}
        >
          <i className="d-icon-truck mr-1"></i>
          Solicitudes
        </Link>
        <Link href="/pages/my-account-status" className="mb-2">
          <i className="d-icon-money mr-1"></i>
          Estado de Cuenta
        </Link>

        <Link href="/pages/change-my-password" className="mb-2">
          <i className="d-icon-lock mr-1"></i>
          Cambiar Mi Contraseña
        </Link>

        <Link href="/pages/my-requests" onClick={logOut}>
          <i className="d-icon-cancel mr-1"></i>
          Salir
        </Link>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(SearchForm);
