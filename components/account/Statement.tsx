import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Box } from "@mui/material";
import { useTransactions, useProgram } from "hooks";
import { TransactionType } from "~/utils/types";
import { capitalizeFirstChar } from "utils";
import styles from "./accountStyles.module.css";
import { FilterYears } from "./filterYears";

export const Statement = () => {
  const { transactions, loading, filters, handleFilterChange, accountBalance } =
    useTransactions({});
  const { coinName, program } = useProgram();

  // If loading return spinner
  if (loading)
    return (
      <div className="text-center">
        <i
          className="fas fa-spinner fa-spin"
          style={{
            fontSize: "3rem",
          }}
        ></i>
      </div>
    );

  return (
    <div>
      {/* Account Balance */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderRadius: "0.5rem",
          padding: "1.5rem 0rem",
          backgroundColor: "#EBEBEB",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.9rem",
              color: "#74D575",
              textTransform: "uppercase",
            }}
          >
            Ingresos
          </h2>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {accountBalance?.incomePoints}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.9rem",
              color: "#D5635F",
              textTransform: "uppercase",
            }}
          >
            Egresos
          </h2>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {accountBalance?.expensePoints}
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersSection}>
        <Box className={styles.filtersCheckboxesContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={
                filters.types && filters.types.includes(TransactionType.INCOME)
              }
              onChange={() =>
                handleFilterChange({
                  types: filters.types?.includes(TransactionType.INCOME)
                    ? []
                    : [TransactionType.INCOME],
                })
              }
              style={{
                background: "red",
                WebkitAppearance: "checkbox",
              }}
              name="justIncomes"
              id="justIncomes"
            />
            <label
              htmlFor="justIncomes"
              style={{
                fontSize: "1.2rem",
                fontWeight: "lighter",
                margin: 0,
                userSelect: "none",
              }}
            >
              Solo Ingresos
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={
                filters.types && filters.types.includes(TransactionType.EXPENSE)
              }
              onChange={() =>
                handleFilterChange({
                  types: filters.types?.includes(TransactionType.EXPENSE)
                    ? []
                    : [TransactionType.EXPENSE],
                })
              }
              style={{
                background: "red",
                WebkitAppearance: "checkbox",
              }}
              name="justExpenses"
              id="justExpenses"
            />
            <label
              htmlFor="justExpenses"
              style={{
                fontSize: "1.2rem",
                fontWeight: "lighter",
                margin: 0,
                userSelect: "none",
              }}
            >
              Solo Egresos
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={filters.includeRolledBackTransactions}
              onChange={() =>
                handleFilterChange({
                  includeRolledBackTransactions:
                    !filters.includeRolledBackTransactions,
                })
              }
              style={{
                background: "red",
                WebkitAppearance: "checkbox",
              }}
              name="includeRolledBackTransactions"
              id="includeRolledBackTransactions"
            />
            <label
              htmlFor="includeRolledBackTransactions"
              style={{
                fontSize: "1.2rem",
                fontWeight: "lighter",
                margin: 0,
                userSelect: "none",
              }}
            >
              Transacciones anuladas
            </label>
          </div>
        </Box>
        {/* FYI: Remove acount balance download for Socio Adelca */}
        {program.id !== 7 && (
          <Box className={styles.filterDateContainer}>
            <FilterYears />
          </Box>
        )}
      </div>

      {/* Transacciones */}
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          style={{
            display: "flex",
            borderBottom: "1px solid #ccc",
            justifyContent: "space-between",
            padding: "1rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "60%",
            }}
          >
            <span
              style={{
                fontSize: "1.3rem",
                color: "#989898",
                fontWeight: "bold",
              }}
            >
              #Ref: {transaction.id}
            </span>
            <h6
              style={{
                fontSize: "1.4rem",
                fontWeight: "normal",
                // marginBottom: '0.5rem',
                margin: 0,
              }}
            >
              {transaction.description}
            </h6>
            {/* <span
              style={{
                fontSize: "1.3rem",
                color: "#999",
              }}
            >
              {format(new Date(transaction.createdAt), "dd/MM/yyyy HH:mm")}
            </span> */}
            <span
              style={{
                fontSize: "1.4rem",
                color: "#999",
                fontWeight: "lighter",
              }}
            >
              {transaction.type === TransactionType.INCOME
                ? "Obtenidos en:"
                : "Descontados de:"}{" "}
              {capitalizeFirstChar(
                format(
                  new Date(`${transaction.month} 1 ${transaction.year}`),
                  "MMMM YYY",
                  {
                    locale: es,
                  }
                )
              )}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                color:
                  transaction.type === TransactionType.INCOME
                    ? "#74D575"
                    : "#D5635F",
                fontSize: "1.6rem",
                textAlign: "right",
                lineHeight: "1.5rem",
              }}
            >
              {transaction.type === TransactionType.INCOME ? "+" : "-"}
              {transaction.points} {capitalizeFirstChar(coinName)}
            </span>
            {/* <span
              style={{
                textAlign: "right",
                lineHeight: "1.5rem",
                marginTop: "0.5rem",
              }}
            >
              {transaction.afterPoints} {capitalizeFirstChar(coinName)}
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};
