import { useEffect } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
import SearchBox from "~/components/common/partials/search-box";
import LoginModal from "~/components/features/modals/login-modal";

import { headerBorderRemoveList } from "~/utils/data/menu";
import { useAuth, useProgram, useLogs } from "hooks";
import { LogType } from "~/utils/types/logType";
import useDishsItems from "~/hooks/useDishsItems";
import { IngredientCodes } from "~/utils/types";

export default function Header(props) {
  const {
    logOut,
    availablePoints,
    participant,
    getAvailablePoints,
    accessToken,
  } = useAuth();
  const { items, getMyDishsItems } = useDishsItems();
  const { program } = useProgram();
  const router = useRouter();
  const { dispatchLog } = useLogs();

  useEffect(() => {
    let header = document.querySelector("header");
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains("header-border")
      )
        header.classList.remove("header-border");
      else if (!headerBorderRemoveList.includes(router.pathname))
        document.querySelector("header").classList.add("header-border");
    }
    getAvailablePoints();
    getMyDishsItems();
  }, [router.pathname]);

  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  console.log(items);

  return (
    <header className="header">
      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left mr-4">
            {/*  <ALink
              href="#"
              className="mobile-menu-toggle"
              onClick={showMobileMenu}
            >
              <i className="d-icon-bars2"></i>
            </ALink> */}

            <ALink href="/" className="logo">
              <img
                // src="../../images/home/logo.png"
                src={program.logo}
                alt="logo"
                width="153"
                height="44"
              />
            </ALink>

            <SearchBox />
          </div>

          <div className="header-right">
            <div className="icon-box icon-box-side">
              <div className="icon-box-content d-lg-show mr-2">
                {program.hasAcademy && (
                  <p>
                    <ALink href={`${program.academyUrl}?token=${accessToken}`}>
                      Capacitaciones
                    </ALink>
                  </p>
                )}
              </div>
              <div className="icon-box-icon mr-0 mr-lg-2">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <h4 className="icon-box-title text-dark text-normal">
                  <ALink
                    href="mailto:riode@mail.com"
                    className="text-primary d-inline-block"
                  >
                    Soporte:
                  </ALink>{" "}
                </h4>
                <p>
                  <ALink
                    href={`https://api.whatsapp.com/send?phone=593${program.supportPhone}&text=Hola!%20Soy%20un%20participante%20del%20programa%20${program.name},%20mi%20usuario%20es%20${participant.fullName},%20y%20tengo%20una%20duda%20sobre...`}
                  >
                    {program.supportPhone}
                  </ALink>
                </p>
              </div>
            </div>
            <span className="divider mr-4"></span>
            {/* <ALink href="/pages/wishlist" className="wishlist">
              <i className="d-icon-heart"></i>
            </ALink> */}
            {/* <span className="divider"></span> */}

            <CartMenu />

            <span className="divider mr-4"></span>

            {/* <nav className="main-nav mr-4"> */}
            <ul className="menu menu-active-underline">
              <li
                className={`submenu blog-menu  ${
                  // pathname.includes('/blog') && !pathname.includes('/elements')
                  //   ? 'active'
                  //   : ''
                  ""
                }`}
              >
                {/* <ALink href={`/blog/classic`}>Blog</ALink> */}
                <div className="icon-box icon-box-side">
                  <div className="icon-box-icon mr-0 mr-lg-2">
                    <i className="d-icon-user"></i>
                  </div>
                </div>

                <ul style={{ marginLeft: "-60px" }}>
                  {/* {mainMenu.blog.map((item, index) => ( */}
                  {/*  {program.id === 2 && (
                    <li>
                      <ALink href="/pages/upload-invoices">
                        Cargar Facturas
                      </ALink>
                    </li>
                  )} */}

                  <li>
                    <ALink
                      href="/pages/my-requests"
                      onClick={() => {
                        dispatchLog(LogType.OPEN_MY_REQUESTS, {});
                      }}
                    >
                      Mis Solicitudes
                    </ALink>
                  </li>
                  <li>
                    <ALink
                      href="/pages/my-account-status"
                      onClick={() => {
                        dispatchLog(LogType.OPEN_MY_ACCOUNT_BALANCE, {});
                      }}
                    >
                      Mi estado de cuenta
                    </ALink>
                  </li>
                  {items.filter((item) => {
                    item.ingredient.code === IngredientCodes.IN_SNAPS_05;
                  }).length > 0 && (
                    <li>
                      <ALink href="/pages/upload-invoices">
                        Subir Facturas
                      </ALink>
                    </li>
                  )}

                  <li
                    key={"blog"}
                    // className={item.subPages ? 'submenu' : ''}
                  >
                    <ALink
                      href="#"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Salir
                    </ALink>

                    {/* {item.subPages ? (
                      <ul>
                        {item.subPages.map((item, index) => (
                          <li key={`blog-${item.title}`}>
                            <ALink href={'/' + item.url}>{item.title}</ALink>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ''
                    )} */}
                  </li>
                  {/* ))} */}
                </ul>
              </li>
            </ul>
            {/* </nav> */}
          </div>
        </div>
      </div>

      <div
        className={`header-bottom ${router.pathname === "/" ? "" : "pb-50"}`}
      >
        <div className="container">{program.isStoreActive && <MainMenu />}</div>
      </div>

      <div className="welcome-message">
        <h6
          style={{
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          ¡Hola {participant?.firstName}!
        </h6>
        <h5
          style={{
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          Tienes {availablePoints && availablePoints} {program.coinName}
        </h5>
      </div>
    </header>
  );
}
