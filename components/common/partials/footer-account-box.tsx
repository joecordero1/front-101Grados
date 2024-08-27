import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import withApollo from "~/server/apollo";
import { useLogs, useAuth, useProgram } from "hooks";
import { LogType } from "~/utils/types/logType";
import useDishsItems from "~/hooks/useDishsItems";

function SearchForm() {
  const router = useRouter();
  const { logOut, participant, accessToken } = useAuth();
  const { program } = useProgram();
  const { dispatchLog } = useLogs();
  const { items, getMyDishsItems, couldSeeResults } = useDishsItems();
  const codesToGetSnapsMenu = ["IN_SNAPS_01", "IN_SNAPS_05", "IN_SNAPS_08"];

  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
    getMyDishsItems();
  }, [router.pathname]);

  function onMenuClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        onClick={(e: any) => {
          e.currentTarget.parentNode.classList.toggle("show");
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
          href="/pages/account/?tab=requests"
          className="mb-2"
          onClick={() => dispatchLog(LogType.OPEN_MY_REQUESTS, {})}
        >
          <i className="d-icon-truck mr-1"></i>
          Mis Solicitudes
        </Link>
        {program.id !== 7 && (
          <Link href="/pages/account/?tab=account-statement" className="mb-2">
            <i className="d-icon-money mr-1"></i>
            Estado de Cuenta
          </Link>
        )}

        {program.hasAcademy && (
          <Link
            href={`${program.academyUrl}?token=${accessToken}`}
            className="mb-2"
          >
            <i className="d-icon-graduation-cap mr-1"></i>
            Academia
          </Link>
        )}

        {
          //todo: change this to filter by ingredient code and validate groups can upload invoices
          items.find((item) =>
            codesToGetSnapsMenu.includes(item.ingredient.code)
          ) && (
            <Link href="/pages/upload-invoices">
              <i className="d-icon-camera1 mr-1 mb-1"></i>
              Subir Facturas
            </Link>
          )
        }

        {participant.isAConsumerRegistrar && (
          <Link href="/pages/create-pdv">
            <i className="d-icon-map mr-1"></i>
            Crear Punto de Venta
          </Link>
        )}

        {couldSeeResults && (
          <Link href="/pages/my-results">
            <i className="d-icon-chart mr-1"></i>
            Mis Resultados
          </Link>
        )}
        {/* <Link href="/pages/change-my-password" className="mb-2">
          <i className="d-icon-lock mr-1"></i>
          Cambiar Mi Contraseña
        </Link> */}

        <Link href="/pages/my-requests" onClick={logOut}>
          <i className="d-icon-cancel mr-1"></i>
          Salir
        </Link>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window === "undefined" })(SearchForm);
