import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import CartMenu from '~/components/common/partials/cart-menu';
import SearchBox from '~/components/common/partials/search-box';
import { headerBorderRemoveList } from '~/utils/data/menu';
import { useAuth, useProgram, useLogs } from 'hooks';
import { LogType } from '~/utils/types/logType';
import ResultsCard from '../../../components/common/partials/results';
import { useDishsItems } from '~/hooks';
import SimpleMainMenu from '../../../components/common/Menus/content/simple-main-menu';
import { Button } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from './headerStyles.module.scss';
import ResultsCardComplete from '~/components/common/partials/results/resultsCardComplete';

export default function HeaderDesktop(props) {
  const { logOut, availablePoints, participant, accessToken, loadingPoints } =
    useAuth();
  const { items, getMyDishsItems, couldSeeResults, availableCodes } =
    useDishsItems();
  const { program } = useProgram();
  const codesToGetSnapsMenu = ['IN_SNAPS_01', 'IN_SNAPS_05', 'IN_SNAPS_08'];
  const router = useRouter();
  const { dispatchLog } = useLogs();
  const [isResultsVisible, setIsResultsVisible] = useState(
    program.id === 8 ||
      program.id === 13 ||
      program.id === 15 ||
      program.id === 14 ||
      program.id === 26 ||
      program.id === 18 ||
      program.id === 10
      ? true
      : false
  );

  useEffect(() => {
    let header = document.querySelector('header');
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains('header-border')
      )
        header.classList.remove('header-border');
      else if (!headerBorderRemoveList.includes(router.pathname))
        document.querySelector('header').classList.add('header-border');
    }
    getMyDishsItems();
  }, [router.pathname]);

  const showMobileMenu = () => {
    document.querySelector('body').classList.add('mmenu-active');
  };

  return (
    <header className='header'>
      <div
        className='header-middle sticky-header fix-top sticky-content'
        style={{ padding: '1rem' }}
      >
        <div className='container'>
          <div className='header-left mr-4'>
            <ALink href='/' className='logo'>
              <img src={program.logo} alt='logo' width='153' height='44' />
            </ALink>

            <SearchBox />
          </div>

          <div className='header-right'>
            <div className='icon-box-side mr-2'>
              <div className='icon-box-content d-lg-show mr-2'>
                {program.hasAcademy && program.id !== 3 && (
                  <p
                    style={{
                      paddingTop: '23px',
                      paddingRight: '10px',
                    }}
                  >
                    <div className='arrow-3'>
                      <ALink
                        href={`${program.academyUrl}?token=${accessToken}`}
                      >
                        Capacitaciones
                      </ALink>
                    </div>
                  </p>
                )}
              </div>
              <div className='icon-box-icon mr-0 mr-lg-2'>
                {program.supportPhone.length > 1 && program.id !== 26 && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=593${program.supportPhone}&text=Hola!%20Soy%20un%20participante%20del%20programa%20${program.name},%20mi%20usuario%20es%20${participant.fullName},%20y%20tengo%20una%20duda%20sobre...`}
                    target='_blank'
                  >
                    <i className='fab fa-whatsapp'></i>
                  </a>
                )}
              </div>
              {program.id !== 26 && (
                <div className='icon-box-content d-lg-show mt-4'>
                  <h4 className='icon-box-title text-dark text-normal'>
                    Soporte:
                  </h4>
                  {program.supportPhone.length > 1 ? (
                    <p>
                      <a
                        href={`https://api.whatsapp.com/send?phone=593${program.supportPhone}&text=Hola!%20Soy%20un%20participante%20del%20programa%20${program.name},%20mi%20usuario%20es%20${participant.fullName},%20y%20tengo%20una%20duda%20sobre...`}
                        target='_blank'
                      >
                        {program.supportPhone}
                      </a>
                    </p>
                  ) : (
                    <p>
                      <ALink
                        href={`mailto:${program.supportEmail}&text=Hola!%20Soy%20un%20participante%20del%20programa%20${program.name},%20mi%20usuario%20es%20${participant.fullName},%20y%20tengo%20una%20duda%20sobre...`}
                      >
                        {program.supportEmail}
                      </ALink>
                    </p>
                  )}
                </div>
              )}
            </div>
            <span className='divider mr-4'></span>

            <CartMenu />

            <span className='divider mr-4'></span>

            <ul className='menu menu-active-underline'>
              <li className={`submenu blog-menu  ${''}`}>
                <div className='icon-box icon-box-side'>
                  <div className='icon-box-icon mr-0 mr-lg-2'>
                    <i className='d-icon-user'></i>
                  </div>
                </div>

                <ul style={{ marginLeft: '-60px' }}>
                  <li>
                    <ALink href='/pages/account'>Mi Cuenta</ALink>
                  </li>
                  <li>
                    <ALink
                      href='/pages/account/?tab=requests'
                      onClick={() => {
                        dispatchLog(LogType.OPEN_MY_REQUESTS, {});
                      }}
                    >
                      Mis Solicitudes
                    </ALink>
                  </li>
                  {program.id !== 7 && (
                    <li>
                      <ALink
                        href='/pages/account/?tab=account-statement'
                        onClick={() => {
                          dispatchLog(LogType.OPEN_MY_ACCOUNT_BALANCE, {});
                        }}
                      >
                        Estado de cuenta
                      </ALink>
                    </li>
                  )}

                  {
                    //todo: change this to filter by ingredient code and validate groups can upload invoices
                    items.find((item) =>
                      codesToGetSnapsMenu.includes(item.ingredient.code)
                    ) && (
                      <li>
                        <ALink href='/pages/upload-invoices'>
                          Subir Facturas
                        </ALink>
                      </li>
                    )
                  }
                  {participant.isAConsumerRegistrar && (
                    <li>
                      <ALink href='/pages/create-pdv'>
                        Crear Punto de Venta
                      </ALink>
                    </li>
                  )}

                  {couldSeeResults && (
                    <li>
                      <ALink href='/pages/my-results'>Mis Resultados</ALink>
                    </li>
                  )}

                  <li key={'blog'}>
                    <ALink
                      href='#'
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Salir
                    </ALink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`header-bottom ${router.pathname === '/' ? '' : 'pb-50'}`}
        style={{ paddingBottom: 0 }}
      >
        <div
          className={`${styles.menuHeaderContainer} container`}
          style={{ gap: '5px' }}
        >
          {program.isStoreActive && <SimpleMainMenu />}
          {/* Botón para mostrar/ocultar el ResultsCard */}
          {couldSeeResults && (
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={() => setIsResultsVisible(!isResultsVisible)}
              className={styles.customButton}
              endIcon={
                isResultsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />
              } // Ícono que cambia según el estado
              sx={{
                borderRadius: '10px',
                backgroundColor: '#00A5D7',
                '&:hover': {
                  backgroundColor: '#007B9E', // Color de fondo para hover
                },
                fontSize: '1rem',
              }}
            >
              {isResultsVisible ? 'Ocultar Resultados' : 'Ver Resultados'}
            </Button>
          )}
        </div>
      </div>

      {!couldSeeResults && (
        <div className='welcome-message'>
          <h6
            style={{
              textAlign: 'center',
              margin: 10,
              color: '#5d5e5e',
            }}
          >
            ¡Hola {participant?.firstName}!
          </h6>
          <h5
            style={{
              textAlign: 'center',
              margin: '0 auto',
              color: '#5d5e5e',
            }}
          >
            Tienes{' '}
            {loadingPoints ? (
              <>
                <i className='fa fa-spinner fa-spin'></i>
              </>
            ) : (
              availablePoints
            )}{' '}
            {program.coinName}
          </h5>
        </div>
      )}

      {couldSeeResults && (
        <div
          className='welcome-message container'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {/* Mostrar ResultsCard condicionalmente */}
          {isResultsVisible && program.id !== 26 && <ResultsCard />}
          {isResultsVisible && program.id === 26 && <ResultsCardComplete />}
        </div>
      )}
    </header>
  );
}
