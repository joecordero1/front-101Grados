import React from "react";

import { useRequests } from "./reducer";
import { format, formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { StatusTypes } from "../../../../utils/types";

import { Alert, Container } from "@mui/material";
import { useProgram } from "~/hooks";
export const ParticipantRequests = () => {
  const { requestsParticipant, status } = useRequests();
  const { coinName } = useProgram();

  return (
    <Container
      sx={{
        display: "flex",
        marginBottom: 52,
        marginTop: 5,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div className="requests-container">
        {requestsParticipant.length > 0 && status === "complete" ? (
          <table className="order-table">
            <thead>
              <tr>
                <th>Codigo Solicitud</th>
                <th>Premio</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>{coinName}</th>
                <th>Fecha Solicitud</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {requestsParticipant.map((request) => (
                <>
                  <tr>
                    <td className="order-total" align="center">
                      {request.code}
                    </td>
                    <td className="order-number">
                      <img src={request.award.mainImage} alt="imagen premio" />
                    </td>
                    <td className="order-date" align="center">
                      {request.award.name}
                      <br />
                      <p>{request.award.code}</p>
                    </td>
                    <td className="order-status" align="center">
                      {request.award.model}
                    </td>

                    <td className="order-date" align="center">
                      {request.points}
                    </td>
                    <td className="order-date" align="center">
                      {format(new Date(request.requestedAt), "dd/MM/yyyy", {
                        locale: es,
                      })}
                    </td>
                    <td>
                      {request.status === StatusTypes.APPROVED ||
                      request.status === StatusTypes.REQUESTED ||
                      request.status === StatusTypes.SPECIALS ||
                      request.status === StatusTypes.ORDERRED ||
                      request.status === StatusTypes.NEWS ? (
                        <Alert severity="success">SOLICITADO</Alert>
                      ) : request.status === StatusTypes.DISPATCHED ? (
                        <Alert severity="info">DESPACHADO</Alert>
                      ) : request.status === StatusTypes.DELIVERED ? (
                        <Alert severity="success">RECIBIDO</Alert>
                      ) : request.status === StatusTypes.WAREHOUSE ? (
                        <Alert severity="info">EN BODEGA</Alert>
                      ) : request.status === StatusTypes.CANCELED ? (
                        <Alert severity="error">ANULADO</Alert>
                      ) : null}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <h4>Aún no tienes solicitudes</h4>
        )}
      </div>
    </Container>
  );
};
