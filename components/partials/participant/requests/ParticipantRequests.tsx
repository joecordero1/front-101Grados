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

        overflow: "scroll",
      }}
    >
      <div className="requests-container">
        {requestsParticipant.length > 0 && status === "complete" ? (
          <table className="order-table">
            <tr>
              <th>Codigo</th>
              <th>Premio</th>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>{coinName}</th>
              <th>Fecha Solicitud</th>
              <th>Estado</th>
            </tr>

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
                      {request.status === StatusTypes.SPECIALS ||
                      request.status === StatusTypes.ORDERRED ||
                      request.status === StatusTypes.NEWS ? (
                        <Alert severity="warning">PENDIENTE</Alert>
                      ) : request.status === StatusTypes.APPROVED ? (
                        <Alert severity="info">APROBADO</Alert>
                      ) : request.status === StatusTypes.REQUESTED ? (
                        <Alert severity="info">SOLICITADO</Alert>
                      ) : request.status === StatusTypes.DISPATCHED ? (
                        <Alert severity="info">EN BODEGA</Alert>
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
