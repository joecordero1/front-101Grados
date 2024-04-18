import React, { use, useEffect, useState } from "react";
import { useMyResults } from "./reducer";
import SlideToggle from "react-slide-toggle";
import {
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Result } from "~/utils/types";
import { getMonthName } from "~/utils";

const ParticipantResults = () => {
  const { groupedResults, handleFilter, status } = useMyResults();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (status === "idle")
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
      {width < 768 ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <h3>Mis Resultados</h3>
          {/*
        <FormControl size="medium">
          <InputLabel>Mes</InputLabel>
          <Select
            name="month"
            onChange={(e) => handleFilter("month", e.target.value)}
            defaultValue={new Date().getMonth()}
          >
            <MenuItem value={1}>Enero</MenuItem>
            <MenuItem value={2}>Febrero</MenuItem>
            <MenuItem value={3}>Marzo</MenuItem>
            <MenuItem value={4}>Abril</MenuItem>
            <MenuItem value={5}>Mayo</MenuItem>
            <MenuItem value={6}>Junio</MenuItem>
            <MenuItem value={7}>Julio</MenuItem>
            <MenuItem value={8}>Agosto</MenuItem>
            <MenuItem value={9}>Septiembre</MenuItem>
            <MenuItem value={10}>Octubre</MenuItem>
            <MenuItem value={11}>Noviembre</MenuItem>
            <MenuItem value={12}>Diciembre</MenuItem>
          </Select>
        </FormControl> */}

          <div>
            <FormControl size="medium">
              <InputLabel
                style={{
                  fontSize: "2rem",
                }}
              >
                Año
              </InputLabel>
              <Select
                name="year"
                onChange={(e) => handleFilter("year", e.target.value)}
                defaultValue={new Date().getFullYear()}
                style={{
                  fontSize: "1.5rem",
                }}
              >
                <MenuItem
                  value={2024}
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  2024
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            {groupedResults.map((result: Result, index: number) => (
              <div key={index}>
                {result.children.length === 0 ? (
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
                      <div>
                        <h2
                          style={{
                            fontSize: "1.5rem",
                            margin: "0",
                          }}
                        >
                          {result.periodResult?.name}
                        </h2>
                        <p className="m-0">
                          Descripción: {""}
                          <span className="font-weight-bold">
                            {result.periodResult?.description}
                          </span>
                        </p>

                        <p className="m-0">
                          <span className="font-weight-light">
                            {result.nameValue1}:{" "}
                          </span>
                          {result.value1}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="m-0">
                        <span className="font-weight-bold">
                          {result.nameValue2}:{" "}
                        </span>
                        {result.value2}
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
                            <div className="card" key={result.id}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "start",
                                  justifyContent: "start",
                                }}
                              >
                                <div>
                                  <h2
                                    style={{
                                      fontSize: "1.5rem",
                                      margin: "0",
                                    }}
                                  >
                                    {result.parent?.periodResult?.name}
                                  </h2>
                                  <p className="m-0">
                                    Descripción: {""}
                                    <span className="font-weight-bold">
                                      {result.parent?.periodResult?.description}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="m-0">
                                  <span className="font-weight-bold">
                                    {result.parent.nameValue1}:{" "}
                                  </span>

                                  {result.parent.value1}
                                </p>
                                <p className="m-0">
                                  <span className="font-weight-bold">
                                    {result.parent.nameValue2}:{" "}
                                  </span>
                                  {result.parent.value2}
                                </p>
                                {result.parent.result !== 0 && (
                                  <p className="m-0">
                                    <span className="font-weight-bold">
                                      Cumplimiento{" "}
                                    </span>
                                    {result.parent.result}%
                                  </p>
                                )}
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
                            {result.children.map((result) => (
                              <div className="card" key={result.id}>
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
                                  }}
                                >
                                  <div>
                                    <h2
                                      style={{
                                        fontSize: "1.5rem",
                                        margin: "0",
                                      }}
                                    >
                                      {getMonthName(result.month)}
                                    </h2>
                                    <p className="m-0">
                                      Descripción: {""}
                                      <span className="font-weight-bold">
                                        {result.description}
                                      </span>
                                    </p>

                                    <p className="m-0">
                                      <span className="font-weight-light">
                                        {result.nameValue1}:{" "}
                                      </span>
                                      {result.value1}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="m-0">
                                    <span className="font-weight-bold">
                                      {result.nameValue2}:{" "}
                                    </span>
                                    {result.value2}
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
        </Container>
      ) : (
        <div>
          {/* <Card 
          style={{
            padding: "1rem",
            margin: "1rem",
          }}
        > */}
        </div>
      )}
    </div>
  );
};

export default ParticipantResults;
