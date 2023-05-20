import React from "react";

import { useAccountStatus } from "./reducer";
import { format, formatRelative, getDate, getMonth, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { StatusTypes } from "../../../../utils/types";

import { Alert, Container } from "@mui/material";
import { useProgram } from "~/hooks";
import { get } from "http";
export const AccountStatus = () => {
  const { accountStatus, status, handleFiltersChange } = useAccountStatus();
  const { coinName } = useProgram();

  return (
    <Container
      sx={{
        marginBottom: 52,
        marginTop: 5,
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 10,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div className="filters-container">
        <div className="filters">
          <h5>Selecciona el mes y año para ver tu estado de cuenta</h5>
          <div className="filter">
            <label htmlFor="month" style={{ margin: 5, fontSize: 18 }}>
              Mes
            </label>
            <select
              name="month"
              style={{ fontSize: 18 }}
              onChange={(e) => handleFiltersChange("month", e.target.value)}
            >
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>

              <option value="4">Abril</option>

              <option value="5">Mayo</option>

              <option value="6">Junio</option>

              <option value="7">Julio</option>

              <option value="8">Agosto</option>

              <option value="9">Septiembre</option>

              <option value="10">Octubre</option>

              <option value="11">Noviembre</option>

              <option value="12">Diciembre</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="year" style={{ margin: 5, fontSize: 18 }}>
              Año
            </label>

            <select
              name="year"
              style={{ fontSize: 18 }}
              onChange={(e) => handleFiltersChange("year", e.target.value)}
            >
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>
      <div className="income-container">
        {accountStatus.incomePoints.length > 0 && status === "complete" ? (
          <>
            <h4 style={{ textAlign: "center" }}>{coinName} Ganados</h4>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Año</th>
                  <th>{coinName}</th>
                </tr>
              </thead>
              <tbody>
                {accountStatus.incomePoints.map((income) => (
                  <>
                    <tr>
                      <td className="order-total" align="center">
                        {format(
                          new Date(income.year, income.month - 1),
                          "MMMM",
                          {
                            locale: es,
                          }
                        )}
                      </td>

                      <td className="order-total" align="center">
                        {income.year}
                      </td>

                      <td className="order-total" align="center">
                        {income.points}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h4>Puntos Ganados</h4>
            <h5>No tienes puntos ganados en esta fecha</h5>
          </>
        )}
      </div>
      <div className="expense-container">
        {accountStatus.expensePoints.length > 0 && status === "complete" ? (
          <>
            <h4 style={{ textAlign: "center" }}>{coinName} Descontados</h4>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Año</th>
                  <th>{coinName}</th>
                </tr>
              </thead>
              <tbody>
                {accountStatus.expensePoints.map((expense) => (
                  <>
                    <tr>
                      <td className="order-total" align="center">
                        {format(
                          new Date(expense.year, expense.month - 1),
                          "MMMM",
                          {
                            locale: es,
                          }
                        )}
                      </td>

                      <td className="order-total" align="center">
                        {expense.year}
                      </td>

                      <td className="order-total" align="center">
                        {expense.points}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h4>Puntos Descontados</h4>
            <h5>No tienes puntos descontados en esta fecha</h5>
          </>
        )}
      </div>
    </Container>
  );
};
