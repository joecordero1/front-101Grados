import React from "react";
import SlideToggle from "react-slide-toggle";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useRequests, useProgram } from "hooks";
import { capitalizeFirstChar } from "utils";
import { statusField } from "../partials/requests";

export const Requests = () => {
  const { loading, groupedRequests } = useRequests(true);
  const { coinName } = useProgram();

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
      {groupedRequests.map((group, index) => (
        <div key={index}>
          {group.requests.length === 1 ? (
            <div className="card" key={index}>
              <div
                style={{
                  background: "#E3E3E3",
                  height: "2px",
                  width: "100%",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  padding: "1rem",
                }}
              >
                <img
                  src={group.award.mainImage}
                  alt={group.award.name}
                  width={75}
                  style={{
                    marginRight: "1rem",
                  }}
                />
                <div>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      margin: "0",
                    }}
                  >
                    {group.award.name} | {group.award.model}
                  </h2>
                  <p className="m-0">
                    Código: {""}
                    <span className="font-weight-bold">
                      {group.requests[0].code}
                    </span>
                  </p>

                  <p className="m-0">
                    <span className="font-weight-light">Estado: </span>
                    {statusField(group.requests[0].status)}
                  </p>
                </div>
              </div>
              <div>
                <p className="m-0">
                  <span className="font-weight-bold">Comprado en: </span>
                  {group.requests[0].points} {capitalizeFirstChar(coinName)}
                </p>

                <p className="m-0">
                  <span className="font-weight-bold">Guia de entrega: </span>
                  {group.requests[0].shippingGuide ? (
                    <a
                      href={`https://www.servientrega.com.ec/Tracking/?guia=${group.requests[0].shippingGuide}&tipo=GUIA`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "underline",
                      }}
                    >
                      {group.requests[0].shippingGuide}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="m-0">
                  <span className="font-weight-bold">Fecha: </span>
                  {/* {formatDistance(group.requests[0].requestedAt)} */}
                  {format(
                    new Date(group.requests[0].requestedAt),
                    "dd/MMMM/yyyy",
                    {
                      locale: es,
                    }
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="widget-collapsible" key={index}>
              <SlideToggle collapsed={true}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <div
                      className={`widget-title ${toggleState.toLowerCase()}`}
                      onClick={onToggle}
                    >
                      <div className="card" key={group.requests[0].id}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "start",
                            padding: "1rem",
                          }}
                        >
                          <img
                            src={group.award.mainImage}
                            alt={group.award.name}
                            width={75}
                            style={{
                              marginRight: "1rem",
                            }}
                          />
                          <div>
                            <h2
                              style={{
                                fontSize: "1.5rem",
                                margin: "0",
                              }}
                            >
                              {group.award.name} | {group.award.model}
                            </h2>
                            <p className="m-0">
                              Cantidad: {""}
                              <span className="font-weight-bold">
                                {group.requests.length}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="m-0">
                            <span className="font-weight-bold">
                              Comprado en:{" "}
                            </span>
                            {group.requests[0].points}{" "}
                            {capitalizeFirstChar(coinName)}
                          </p>
                          <p className="m-0">
                            <span className="font-weight-bold">
                              Guia de entrega:{" "}
                            </span>
                            {group.requests[0].shippingGuide
                              ? group.requests[0].shippingGuide
                              : "N/A"}
                          </p>
                          <p className="m-0">
                            <span className="font-weight-bold">Fecha: </span>
                            {/* {formatDistance(group.requests[0].requestedAt)} */}
                            {format(
                              new Date(group.requests[0].requestedAt),
                              "dd/MMMM/yyyy",
                              {
                                locale: es,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            textTransform: "uppercase",
                            textDecoration: "underline",
                            textAlign: "right",
                            width: "100%",
                          }}
                        >
                          Ver Detalle
                        </span>
                        <span className="toggle-btn parse-content"></span>
                      </div>
                    </div>

                    <div
                      className="overflow-hidden"
                      ref={setCollapsibleElement}
                    >
                      {group.requests.map((request, index) => (
                        <div className="card" key={request.id}>
                          <div
                            style={{
                              background: "#E3E3E3",
                              height: "2px",
                              width: "100%",
                            }}
                          ></div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "start",
                              padding: "1rem",
                            }}
                          >
                            <img
                              src={group.award.mainImage}
                              alt={group.award.name}
                              width={75}
                              style={{
                                marginRight: "1rem",
                              }}
                            />
                            <div>
                              <h2
                                style={{
                                  fontSize: "1.5rem",
                                  margin: "0",
                                }}
                              >
                                {index + 1}.- {group.award.name} |{" "}
                                {group.award.model}
                              </h2>
                              <p className="m-0">
                                Código: {""}
                                <span className="font-weight-bold">
                                  {request.code}
                                </span>
                              </p>

                              <p className="m-0">
                                <span className="font-weight-light">
                                  Estado:{" "}
                                </span>
                                {statusField(request.status)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="m-0">
                              <span className="font-weight-bold">
                                Comprado en:{" "}
                              </span>
                              {request.points} {capitalizeFirstChar(coinName)}
                            </p>
                            <p className="m-0">
                              <span className="font-weight-bold">
                                Guia de entrega:{" "}
                              </span>
                              {group.requests[0].shippingGuide
                                ? group.requests[0].shippingGuide
                                : "N/A"}
                            </p>
                            <p className="m-0">
                              <span className="font-weight-bold">Fecha: </span>
                              {/* {formatDistance(request.requestedAt)} */}
                              {format(
                                new Date(request.requestedAt),
                                "dd/MMMM/yyyy",
                                {
                                  locale: es,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={onToggle}
                        style={{
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.2rem",
                            textTransform: "uppercase",
                            textDecoration: "underline",
                            textAlign: "right",
                            width: "100%",
                          }}
                        >
                          Ocultar Detalle
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </SlideToggle>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
