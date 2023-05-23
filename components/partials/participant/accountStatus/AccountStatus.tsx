import React from "react";

import { useAccountBalance } from "./reducer";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useProgram } from "~/hooks";
export const AccountStatus = () => {
  const { accountBalance, status, myTransactions } = useAccountBalance();
  const { coinName } = useProgram();

  const downloadPDF = () => {
    var pdf = new jsPDF("l", "pt", "a3");
    pdf.html(document.getElementById("transactions-container"), {
      callback: function (pdf) {
        pdf.save("estado-cuenta.pdf");
      },
    });
  };

  return (
    <Container id="transactions-container">
      {status === "complete" ? (
        <div
          className="cards-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: 20,
            margin: 10,
          }}
        >
          <div className="income">
            <Card
              sx={{
                minWidth: 130,
                backgroundColor: "rgba(40, 237, 103, 0.22)",
              }}
            >
              <CardHeader title="Puntos Ganados" />
              <CardContent>
                <Typography variant="h5" component="div">
                  {`${
                    accountBalance.incomePoints !== null
                      ? accountBalance.incomePoints
                      : 0
                  } ${coinName}`}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="expenses">
            <Card
              sx={{ minWidth: 150, backgroundColor: "rgba(243, 62, 62, 0.22)" }}
            >
              <CardHeader title="Puntos Descontados" />
              <CardContent>
                <Typography variant="h5" component="div">
                  {`${
                    accountBalance.expensePoints !== null
                      ? accountBalance.expensePoints
                      : 0
                  } ${coinName}`}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <h4 style={{ margin: 5 }}>Cargando...</h4>
      )}
      <div
        className="transactions-table"
        style={{
          marginTop: 10,
          marginBottom: 90,
          marginRight: 100,
        }}
      >
        {status === "complete" ? (
          myTransactions.length > 0 && (
            <>
              <div
                className="download-table"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <IconButton onClick={() => downloadPDF()}>
                  <i className="fa regular fa-download">Descargar</i>
                </IconButton>
              </div>
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Año</th>
                    <th>Tipo</th>
                    <th>Puntos</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {myTransactions.map((transaction) => (
                    <tr id={transaction.id.toString()}>
                      <td className="order-number" align="center">
                        {format(
                          new Date(transaction.year, transaction.month - 1),
                          "MMMM",
                          {
                            locale: es,
                          }
                        )}
                      </td>

                      <td className="order-status" align="center">
                        {transaction.year}
                      </td>
                      <td align="center">
                        {transaction.type === "INCOME" ? (
                          <Alert
                            severity="success"
                            sx={{ fontSize: 16, maxWidth: 100 }}
                            icon={false}
                          >
                            Ingreso
                          </Alert>
                        ) : (
                          <Alert
                            severity="error"
                            sx={{ fontSize: 16, maxWidth: 100 }}
                            icon={false}
                          >
                            Egreso
                          </Alert>
                        )}
                      </td>
                      <td className="order-date" align="center">
                        {transaction.points}
                      </td>
                      <td align="center">
                        {transaction.description
                          ? transaction.description
                          : transaction.type === "INCOME" &&
                            transaction.dishItem.ingredient.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )
        ) : (
          <h4 style={{ margin: 5 }}>Cargando...</h4>
        )}
      </div>
    </Container>
  );
};
