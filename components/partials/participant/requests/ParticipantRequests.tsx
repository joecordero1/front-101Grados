import React from "react";

import { useRequests } from "./reducer";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { StatusTypes } from "../../../../utils/types";

import { Alert, Container } from "@mui/material";
export const ParticipantRequests = () => {
  const { requestsParticipant, status } = useRequests();

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
                <th>Premio</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Codigo</th>
                <th>Puntos</th>
                <th>Fecha Solicitud</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {requestsParticipant.map((request) => (
                <>
                  <tr>
                    <td className="order-number">
                      <img src={request.award.mainImage} alt="imagen premio" />
                    </td>
                    <td className="order-date" align="center">
                      {request.award.name}
                    </td>
                    <td className="order-status" align="center">
                      {request.award.model}
                    </td>
                    <td className="order-total" align="center">
                      {request.award.code}
                    </td>
                    <td className="order-date" align="center">
                      {request.points}
                    </td>
                    <td className="order-date" align="center">
                      {" "}
                      {formatRelative(
                        subDays(new Date(request.requestedAt), 0),
                        new Date(),
                        {
                          locale: es,
                        }
                      )}
                    </td>
                    <td>
                      {request.status === StatusTypes.APPROVED ||
                      request.status === StatusTypes.CELLAR ||
                      request.status === StatusTypes.REQUESTED ||
                      request.status === StatusTypes.SPECIALS ||
                      request.status === StatusTypes.ORDERRED ||
                      request.status === StatusTypes.NEWS ? (
                        <Alert severity="success">SOLICITADO</Alert>
                      ) : request.status === StatusTypes.DISPATCHED ? (
                        <Alert severity="info">DESPACHADO</Alert>
                      ) : request.status === StatusTypes.DELIVERED ? (
                        <Alert severity="success">RECIBIDO</Alert>
                      ) : (
                        <Alert severity="error">ANULADO</Alert>
                      )}
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
