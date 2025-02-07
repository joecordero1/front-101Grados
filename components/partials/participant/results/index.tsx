import React, { use, useEffect, useState } from 'react';
import { useMyResults } from './reducer';
import SlideToggle from 'react-slide-toggle';
import {
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { IngredientCodes, Result } from '~/utils/types';
import { getMonthName } from '~/utils';
import { useDishsItems, useProgram } from '~/hooks';
import styles from './resultsStyles.module.scss';

const ParticipantResults = () => {
  const { groupedResults, ungroupedResults, handleFilter, status } =
    useMyResults();

  const { availableCodes, getMyDishsItems } = useDishsItems();
  const { program } = useProgram();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    getMyDishsItems();
  }, []);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ingredientCodes: IngredientCodes[] = [
    IngredientCodes.IN_RESUL_01,
    IngredientCodes.IN_RESUL_08,
  ];

  const couldSeeResultsPerMonth = ingredientCodes.some((code) =>
    availableCodes.includes(code)
  );

  if (status === 'idle')
    return (
      <div className='text-center'>
        <i
          className='fas fa-spinner fa-spin'
          style={{
            fontSize: '3rem',
          }}
        ></i>
      </div>
    );

  const sortOrder = {
    VENTAS: 1,
    IMPACTOS: 2,
    'PRODUCTO FOCO': 3,
  };

  const getOrder = (description: string): number => {
    for (const key in sortOrder) {
      if (description.includes(key)) {
        return sortOrder[key];
      }
    }
    return Infinity;
  };

  const sortedResults =
    program.id === 8
      ? [...ungroupedResults].sort((a, b) => {
          const orderA = getOrder(a.description.trim());
          const orderB = getOrder(b.description.trim());
          return orderA - orderB;
        })
      : ungroupedResults;

  return (
    <div className='p-3'>
      {width < 768 ? (
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <h3 className='tex-center mt-2'>Mis Resultados</h3>

          <div className='flex flex-col sm:flex-row sm:justify-between gap-4 w-full'>
            <FormControl size='small'>
              <InputLabel
                style={{
                  fontSize: '2rem',
                }}
              >
                Año
              </InputLabel>
              <Select
                name='year'
                onChange={(e) => handleFilter('year', e.target.value)}
                defaultValue={new Date().getFullYear()} // Año actual como valor por defecto
                style={{
                  fontSize: '1.5rem',
                }}
              >
                {/* Año actual */}
                <MenuItem
                  value={new Date().getFullYear()}
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  {new Date().getFullYear()}
                </MenuItem>

                {/* Año anterior */}
                <MenuItem
                  value={new Date().getFullYear() - 1}
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  {new Date().getFullYear() - 1}
                </MenuItem>
              </Select>
            </FormControl>
            {couldSeeResultsPerMonth && (
              <FormControl size='small'>
                <InputLabel
                  style={{
                    fontSize: '2rem',
                  }}
                >
                  Mes
                </InputLabel>
                <Select
                  name='month'
                  onChange={(e) => handleFilter('month', e.target.value)}
                  defaultValue={new Date().getMonth() + 1}
                  style={{
                    fontSize: '1.5rem',
                  }}
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
              </FormControl>
            )}
          </div>
          <div>
            {program.id !== 26 ? (
              <div>
                {groupedResults.map((result: Result, index: number) => (
                  <div key={index}>
                    {result.children.length === 0 ? (
                      <div className='card py-3' key={index}>
                        <div
                          className='m-2'
                          style={{
                            background: '#c4c4c4',
                            height: '2px',
                            width: '100%',
                          }}
                        ></div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'start',
                            padding: '1rem',
                          }}
                        >
                          <div>
                            <h2
                              style={{
                                fontSize: '1.5rem',
                                margin: '0',
                              }}
                            >
                              {result.periodResult?.name}
                            </h2>
                            <p className='m-0'>
                              Descripción: {''}
                              <span className='font-weight-bold'>
                                {result.periodResult?.description}
                              </span>
                            </p>

                            <p className='m-0'>
                              <span className='font-weight-light'>
                                {result.nameValue1}:{' '}
                              </span>
                              {result.value1}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className='m-0'>
                            <span className='font-weight-bold'>
                              {result.nameValue2}:{' '}
                            </span>
                            {result.value2}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='widget-collapsible' key={index}>
                        <SlideToggle collapsed={true}>
                          {({
                            onToggle,
                            setCollapsibleElement,
                            toggleState,
                          }) => (
                            <>
                              <div
                                className={`widget-title ${toggleState.toLowerCase()}`}
                                onClick={onToggle}
                              >
                                <div className='card py-3' key={result.id}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'start',
                                      justifyContent: 'start',
                                    }}
                                  >
                                    <div>
                                      <h2
                                        style={{
                                          fontSize: '1.5rem',
                                          margin: '0',
                                        }}
                                      >
                                        {result.parent?.periodResult?.name}
                                      </h2>
                                      <p className='m-0'>
                                        Descripción: {''}
                                        <span className='font-weight-bold'>
                                          {
                                            result.parent?.periodResult
                                              ?.description
                                          }
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className='m-0'>
                                      <span className='font-weight-bold'>
                                        {result.parent.nameValue1}:{' '}
                                      </span>

                                      {result.parent.value1}
                                    </p>
                                    <p className='m-0'>
                                      <span className='font-weight-bold'>
                                        {result.parent.nameValue2}:{' '}
                                      </span>
                                      {result.parent.value2}
                                    </p>
                                    {result.parent.result !== 0 && (
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          Cumplimiento{' '}
                                        </span>
                                        {result.parent.result}%
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '1.2rem',
                                      textTransform: 'uppercase',
                                      textDecoration: 'underline',
                                      textAlign: 'right',
                                      width: '100%',
                                    }}
                                  >
                                    Ver Detalle
                                  </span>
                                  <span className='toggle-btn parse-content'></span>
                                </div>
                              </div>

                              <div
                                className='overflow-hidden'
                                ref={setCollapsibleElement}
                              >
                                {result.children.map((result) => (
                                  <div className='card py-3' key={result.id}>
                                    <div
                                      style={{
                                        background: '#c4c4c4',
                                        height: '2px',
                                        width: '100%',
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        justifyContent: 'start',
                                      }}
                                    >
                                      <div>
                                        <h2
                                          style={{
                                            fontSize: '1.5rem',
                                            margin: '0',
                                          }}
                                        >
                                          {getMonthName(result.month)}
                                        </h2>
                                        <p className='m-0'>
                                          Descripción: {''}
                                          <span className='font-weight-bold'>
                                            {result.description}
                                          </span>
                                        </p>

                                        <p className='m-0'>
                                          <span className='font-weight-light'>
                                            {result.nameValue1}:{' '}
                                          </span>
                                          {result.value1}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          {result.nameValue2}:{' '}
                                        </span>
                                        {result.value2}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                <div
                                  onClick={onToggle}
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '1.2rem',
                                      textTransform: 'uppercase',
                                      textDecoration: 'underline',
                                      textAlign: 'right',
                                      width: '100%',
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
                {couldSeeResultsPerMonth && (
                  <div
                    className='w-full flex flex-col gap-4'
                    style={{
                      width: '80vw',
                    }}
                  >
                    {sortedResults.map((result: Result, index: number) => (
                      <div className='card py-3' key={result.id}>
                        <div
                          style={{
                            background: '#c4c4c4',
                            height: '2px',
                            width: '100%',
                          }}
                        ></div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'start',
                          }}
                        >
                          <div>
                            <h2
                              style={{
                                fontSize: '1.5rem',
                                margin: '0',
                              }}
                            >
                              {getMonthName(result.month)}
                            </h2>
                            <p className='m-0'>
                              Descripción: {''}
                              <span className='font-weight-bold'>
                                {result.description}
                              </span>
                            </p>

                            <p className='m-0'>
                              <span className='font-weight-light'>
                                {result.nameValue1}:{' '}
                              </span>
                              {result.description?.includes('VENTAS')
                                ? `$${result.value1}`
                                : program.id === 26
                                ? `${result.value1} Kilos`
                                : result.value1}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className='m-0'>
                            <span className='font-weight-bold'>
                              {result.nameValue2}:{' '}
                            </span>
                            {result.description?.includes('VENTAS')
                              ? `$${result.value2}`
                              : program.id === 26
                              ? `${result.value2} Kilos`
                              : result.value2}
                          </p>
                        </div>
                        <div>
                          <p className='m-0'>
                            <span className='font-weight-bold'>
                              {'Cumplimiento'}:{' '}
                            </span>
                            {((result.value2 / result.value1) * 100).toFixed(2)}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className='w-full flex flex-col gap-4'
                style={{
                  width: '80vw',
                }}
              >
                {groupedResults.map((result: Result, index: number) => (
                  <div key={index}>
                    {result.children.length === 0 ? (
                      <div className='card py-3' key={index}>
                        <div
                          className='m-2'
                          style={{
                            background: '#c4c4c4',
                            height: '2px',
                            width: '100%',
                          }}
                        ></div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'start',
                            padding: '1rem',
                          }}
                        >
                          <div>
                            <h2
                              style={{
                                fontSize: '1.5rem',
                                margin: '0',
                              }}
                            >
                              {result.periodResult?.name}
                            </h2>
                            <p className='m-0'>
                              Descripción: {''}
                              <span className='font-weight-bold'>
                                {result.periodResult?.description}
                              </span>
                            </p>

                            <p className='m-0'>
                              <span className='font-weight-light'>
                                {result.nameValue1}:{' '}
                              </span>
                              {result.value1}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className='m-0'>
                            <span className='font-weight-bold'>
                              {result.nameValue2}:{' '}
                            </span>
                            {result.value2}
                          </p>
                        </div>
                        {result.transactionResults.length > 0 &&
                          result.transactionResults.map((transaction) =>
                            transaction.transaction.rollbackTransaction ===
                            null ? (
                              <div>
                                <p className='m-0'>
                                  <span className='font-weight-bold'>
                                    {`${program.coinName
                                      .charAt(0)
                                      .toUpperCase()}${program.coinName.slice(
                                      1
                                    )}: `}
                                  </span>
                                  {transaction.transaction.points}
                                </p>
                              </div>
                            ) : null
                          )}
                      </div>
                    ) : (
                      <div className='widget-collapsible' key={index}>
                        <SlideToggle collapsed={true}>
                          {({
                            onToggle,
                            setCollapsibleElement,
                            toggleState,
                          }) => (
                            <>
                              <div
                                className={`widget-title ${toggleState.toLowerCase()}`}
                                onClick={onToggle}
                              >
                                <div className='card py-3' key={result.id}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'start',
                                      justifyContent: 'start',
                                    }}
                                  >
                                    <div>
                                      <h2
                                        style={{
                                          fontSize: '1.5rem',
                                          margin: '0',
                                        }}
                                      >
                                        {result.parent?.periodResult?.name}
                                      </h2>
                                      <p className='m-0'>
                                        Descripción: {''}
                                        <span className='font-weight-bold'>
                                          {
                                            result.parent?.periodResult
                                              ?.description
                                          }
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className='m-0'>
                                      <span className='font-weight-bold'>
                                        {result.parent.nameValue1}:{' '}
                                      </span>

                                      {result.parent.value1}
                                    </p>
                                    <p className='m-0'>
                                      <span className='font-weight-bold'>
                                        {result.parent.nameValue2}:{' '}
                                      </span>
                                      {result.parent.value2}
                                    </p>
                                    {result.parent.result !== 0 && (
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          Cumplimiento{' '}
                                        </span>
                                        {result.parent.result}%
                                      </p>
                                    )}
                                    {result.transactionResults.length > 0 &&
                                      result.transactionResults.map(
                                        (transaction) =>
                                          transaction.transaction
                                            .rollbackTransaction === null ? (
                                            <div>
                                              <p className='m-0'>
                                                <span className='font-weight-bold'>
                                                  {`${program.coinName
                                                    .charAt(0)
                                                    .toUpperCase()}${program.coinName.slice(
                                                    1
                                                  )}: `}
                                                </span>
                                                {transaction.transaction.points}
                                              </p>
                                            </div>
                                          ) : null
                                      )}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '1.2rem',
                                      textTransform: 'uppercase',
                                      textDecoration: 'underline',
                                      textAlign: 'right',
                                      width: '100%',
                                    }}
                                  >
                                    Ver Detalle
                                  </span>
                                  <span className='toggle-btn parse-content'></span>
                                </div>
                              </div>

                              <div
                                className='overflow-hidden'
                                ref={setCollapsibleElement}
                              >
                                {result.children.map((result) => (
                                  <div className='card py-3' key={result.id}>
                                    <div
                                      style={{
                                        background: '#c4c4c4',
                                        height: '2px',
                                        width: '100%',
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        justifyContent: 'start',
                                      }}
                                    >
                                      <div>
                                        <h2
                                          style={{
                                            fontSize: '1.5rem',
                                            margin: '0',
                                          }}
                                        >
                                          {getMonthName(result.month)}
                                        </h2>
                                        <p className='m-0'>
                                          Descripción: {''}
                                          <span className='font-weight-bold'>
                                            {result.description}
                                          </span>
                                        </p>

                                        <p className='m-0'>
                                          <span className='font-weight-light'>
                                            {result.nameValue1}:{' '}
                                          </span>
                                          {result.value1}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          {result.nameValue2}:{' '}
                                        </span>
                                        {result.value2}
                                      </p>
                                    </div>
                                    {result.transactionResults.length > 0 &&
                                      result.transactionResults.map(
                                        (transaction) =>
                                          transaction.transaction
                                            .rollbackTransaction === null ? (
                                            <div>
                                              <p className='m-0'>
                                                <span className='font-weight-bold'>
                                                  {`${program.coinName
                                                    .charAt(0)
                                                    .toUpperCase()}${program.coinName.slice(
                                                    1
                                                  )}: `}
                                                </span>
                                                {transaction.transaction.points}
                                              </p>
                                            </div>
                                          ) : null
                                      )}
                                  </div>
                                ))}
                                <div
                                  onClick={onToggle}
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '1.2rem',
                                      textTransform: 'uppercase',
                                      textDecoration: 'underline',
                                      textAlign: 'right',
                                      width: '100%',
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
                {couldSeeResultsPerMonth && (
                  <div
                    className='w-full flex flex-col gap-4'
                    style={{
                      width: '80vw',
                    }}
                  >
                    {sortedResults.map((result: Result, index: number) => (
                      <div className='card py-3' key={result.id}>
                        <div
                          style={{
                            background: '#c4c4c4',
                            height: '2px',
                            width: '100%',
                          }}
                        ></div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'start',
                          }}
                        >
                          <div>
                            <h2
                              style={{
                                fontSize: '1.5rem',
                                margin: '0',
                              }}
                            >
                              {getMonthName(result.month)}
                            </h2>
                            <p className='m-0'>
                              Descripción: {''}
                              <span className='font-weight-bold'>
                                {result.description}
                              </span>
                            </p>

                            <p className='m-0'>
                              <span className='font-weight-light'>
                                {result.nameValue1}:{' '}
                              </span>
                              {result.description?.includes('VENTAS')
                                ? `$${result.value1}`
                                : program.id === 26
                                ? `${result.value1} Kilos`
                                : result.value1}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className='m-0'>
                            <span className='font-weight-bold'>
                              {result.nameValue2}:{' '}
                            </span>
                            {result.description?.includes('VENTAS')
                              ? `$${result.value2}`
                              : program.id === 26
                              ? `${result.value2} Kilos`
                              : result.value2}
                          </p>
                        </div>
                        <div>
                          <p className='m-0'>
                            <span className='font-weight-bold'>
                              {'Cumplimiento'}:{' '}
                            </span>
                            {((result.value2 / result.value1) * 100).toFixed(2)}
                            %
                          </p>
                        </div>
                        {result.transactionResults.length > 0 &&
                          result.transactionResults.map((transaction) =>
                            transaction.transaction.rollbackTransaction ===
                            null ? (
                              <div>
                                <p className='m-0'>
                                  <span className='font-weight-bold'>
                                    {`${program.coinName
                                      .charAt(0)
                                      .toUpperCase()}${program.coinName.slice(
                                      1
                                    )}: `}
                                  </span>
                                  {transaction.transaction.points}
                                </p>
                              </div>
                            ) : null
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      ) : (
        <div>
          <Card
            style={{
              padding: '1rem',
              margin: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>Mis Resultados</h3>
            <div
              className='results-container'
              style={{ display: 'flex', gap: '10px' }}
            >
              <FormControl size='medium'>
                <InputLabel
                  style={{
                    fontSize: '2rem',
                  }}
                >
                  Año
                </InputLabel>
                <Select
                  name='year'
                  onChange={(e) => handleFilter('year', e.target.value)}
                  defaultValue={new Date().getFullYear()} // Año actual como valor por defecto
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  {/* Año actual */}
                  <MenuItem
                    value={new Date().getFullYear()}
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    {new Date().getFullYear()}
                  </MenuItem>

                  {/* Año anterior */}
                  <MenuItem
                    value={new Date().getFullYear() - 1}
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    {new Date().getFullYear() - 1}
                  </MenuItem>
                </Select>
              </FormControl>
              {couldSeeResultsPerMonth && (
                <FormControl size='medium'>
                  <InputLabel
                    style={{
                      fontSize: '2rem',
                    }}
                  >
                    Mes
                  </InputLabel>
                  <Select
                    name='month'
                    onChange={(e) => handleFilter('month', e.target.value)}
                    defaultValue={new Date().getMonth() + 1}
                    style={{
                      fontSize: '1.5rem',
                    }}
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
                </FormControl>
              )}
            </div>
            <div
              className='results-screen'
              style={{
                margin: '1rem',
              }}
            >
              {program.id !== 26 ? (
                <div>
                  {groupedResults.map((result: Result, index: number) => (
                    <div key={index}>
                      {result.children.length === 0 ? (
                        <div className='card py-3' key={index}>
                          <div
                            style={{
                              background: '#c3c3c3',
                              height: '2px',
                              width: '100%',
                            }}
                          ></div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'start',
                              justifyContent: 'start',
                              padding: '1rem',
                            }}
                          >
                            <div>
                              <h2
                                style={{
                                  fontSize: '1.5rem',
                                  margin: '0',
                                }}
                              >
                                {result.periodResult?.name}
                              </h2>
                              <p className='m-0'>
                                Descripción: {''}
                                <span className='font-weight-bold'>
                                  {result.periodResult?.description}
                                </span>
                              </p>

                              <p className='m-0'>
                                <span className='font-weight-light'>
                                  {result.nameValue1}:{' '}
                                </span>
                                {result.value1}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className='m-0'>
                              <span className='font-weight-bold'>
                                {result.nameValue2}:{' '}
                              </span>
                              {result.value2}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className='widget-collapsible'
                          key={index}
                          style={{
                            position: 'relative',
                          }}
                        >
                          <SlideToggle collapsed={true}>
                            {({
                              onToggle,
                              setCollapsibleElement,
                              toggleState,
                            }) => (
                              <>
                                <div
                                  className={`widget-title ${toggleState.toLowerCase()}`}
                                  onClick={onToggle}
                                >
                                  <div
                                    className='card py-3'
                                    key={result.id}
                                    style={{
                                      width: '90vw',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        justifyContent: 'start',
                                      }}
                                    >
                                      <div>
                                        <h2
                                          style={{
                                            fontSize: '1.5rem',
                                            margin: '0',
                                          }}
                                        >
                                          {result.parent?.periodResult?.name}
                                        </h2>
                                        <p className='m-0'>
                                          Descripción: {''}
                                          <span className='font-weight-bold'>
                                            {
                                              result.parent?.periodResult
                                                ?.description
                                            }
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          {result.parent.nameValue1}:{' '}
                                        </span>

                                        {result.parent.value1}
                                      </p>
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          {result.parent.nameValue2}:{' '}
                                        </span>
                                        {result.parent.value2}
                                      </p>
                                      {result.parent.result !== 0 && (
                                        <p className='m-0'>
                                          <span className='font-weight-bold'>
                                            Cumplimiento{' '}
                                          </span>
                                          {result.parent.result}%
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: '1.2rem',
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline',
                                        textAlign: 'right',
                                        width: '100%',
                                      }}
                                    >
                                      Ver Detalle
                                    </span>
                                    <span className='toggle-btn parse-content'></span>
                                  </div>
                                </div>

                                <div
                                  className='overflow-hidden'
                                  ref={setCollapsibleElement}
                                >
                                  {result.children.map((result) => (
                                    <div className='card py-3' key={result.id}>
                                      <div
                                        style={{
                                          background: '#c3c3c3',
                                          height: '2px',
                                          width: '100%',
                                        }}
                                      ></div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'start',
                                          justifyContent: 'start',
                                        }}
                                      >
                                        <div>
                                          <h2
                                            style={{
                                              fontSize: '1.5rem',
                                              margin: '0',
                                            }}
                                          >
                                            {getMonthName(result.month)}
                                          </h2>
                                          <p className='m-0'>
                                            Descripción: {''}
                                            <span className='font-weight-bold'>
                                              {result.description}
                                            </span>
                                          </p>

                                          <p className='m-0'>
                                            <span className='font-weight-light'>
                                              {result.nameValue1}:{' '}
                                            </span>
                                            {result.value1}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className='m-0'>
                                          <span className='font-weight-bold'>
                                            {result.nameValue2}:{' '}
                                          </span>
                                          {result.value2}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <div
                                    onClick={onToggle}
                                    style={{
                                      display: 'flex',
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: '1.2rem',
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline',
                                        textAlign: 'right',
                                        width: '100%',
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
                  {couldSeeResultsPerMonth && (
                    <div className='w-full flex flex-col gap-4'>
                      {sortedResults.map((result: Result, index: number) => (
                        <div
                          className={styles.ungroupedResultsContainer}
                          key={result.id}
                        >
                          <div className='card py-3'>
                            <div
                              style={{
                                background: '#c3c3c3',
                                height: '2px',
                                width: '100%',
                                marginBottom: '10px',
                              }}
                            ></div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'start',
                                justifyContent: 'start',
                              }}
                            >
                              <div>
                                <h2
                                  style={{
                                    fontSize: '1.5rem',
                                    margin: '0',
                                  }}
                                >
                                  {getMonthName(result.month)}
                                </h2>
                                <p className='m-0'>
                                  Descripción: {''}
                                  <span className='font-weight-bold'>
                                    {result.description}
                                  </span>
                                </p>

                                <p className='m-0'>
                                  <span className='font-weight-light'>
                                    {result.nameValue1}:{' '}
                                  </span>
                                  {result.description?.includes('VENTAS')
                                    ? `$${result.value1}`
                                    : program.id === 26
                                    ? `${result.value1} Kilos`
                                    : result.value1}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className='m-0'>
                                <span className='font-weight-bold'>
                                  {result.nameValue2}:{' '}
                                </span>
                                {result.description?.includes('VENTAS')
                                  ? `$${result.value2}`
                                  : program.id === 26
                                  ? `${result.value2} Kilos`
                                  : result.value2}
                              </p>
                            </div>
                            <div>
                              <p className='m-0'>
                                <span className='font-weight-bold'>
                                  {'Cumplimiento'}:{' '}
                                </span>
                                {(
                                  (result.value2 / result.value1) *
                                  100
                                ).toFixed(2)}
                                %
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {groupedResults.map((result: Result, index: number) => (
                    <div key={index}>
                      {result.children.length === 0 ? (
                        <div className='card py-3' key={index}>
                          <div
                            style={{
                              background: '#c3c3c3',
                              height: '2px',
                              width: '100%',
                            }}
                          ></div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'start',
                              justifyContent: 'start',
                              padding: '1rem',
                            }}
                          >
                            <div>
                              <h2
                                style={{
                                  fontSize: '1.5rem',
                                  margin: '0',
                                }}
                              >
                                {result.periodResult?.name}
                              </h2>
                              <p className='m-0'>
                                Descripción: {''}
                                <span className='font-weight-bold'>
                                  {result.periodResult?.description}
                                </span>
                              </p>

                              <p className='m-0'>
                                <span className='font-weight-light'>
                                  {result.nameValue1}:{' '}
                                </span>
                                {result.value1}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className='m-0'>
                              <span className='font-weight-bold'>
                                {result.nameValue2}:{' '}
                              </span>
                              {result.value2}
                            </p>
                          </div>
                          {result.transactionResults.length > 0 &&
                            result.transactionResults.map((transaction) =>
                              transaction.transaction.rollbackTransaction ===
                              null ? (
                                <div>
                                  <p className='m-0'>
                                    <span className='font-weight-bold'>
                                      {`${program.coinName
                                        .charAt(0)
                                        .toUpperCase()}${program.coinName.slice(
                                        1
                                      )}: `}
                                    </span>
                                    {transaction.transaction.points}
                                  </p>
                                </div>
                              ) : null
                            )}
                        </div>
                      ) : (
                        <div
                          className='widget-collapsible'
                          key={index}
                          style={{
                            position: 'relative',
                          }}
                        >
                          <SlideToggle collapsed={true}>
                            {({
                              onToggle,
                              setCollapsibleElement,
                              toggleState,
                            }) => (
                              <>
                                <div
                                  className={`widget-title ${toggleState.toLowerCase()}`}
                                  onClick={onToggle}
                                >
                                  <div
                                    className='card py-3'
                                    key={result.id}
                                    style={{
                                      width: '90vw',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        justifyContent: 'start',
                                      }}
                                    >
                                      <div>
                                        <h2
                                          style={{
                                            fontSize: '1.5rem',
                                            margin: '0',
                                          }}
                                        >
                                          {result.parent?.periodResult?.name}
                                        </h2>
                                        <p className='m-0'>
                                          Descripción: {''}
                                          <span className='font-weight-bold'>
                                            {
                                              result.parent?.periodResult
                                                ?.description
                                            }
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          {result.parent.nameValue1}:{' '}
                                        </span>

                                        {result.parent.value1}
                                      </p>
                                      <p className='m-0'>
                                        <span className='font-weight-bold'>
                                          {result.parent.nameValue2}:{' '}
                                        </span>
                                        {result.parent.value2}
                                      </p>
                                      {result.parent.result !== 0 && (
                                        <p className='m-0'>
                                          <span className='font-weight-bold'>
                                            Cumplimiento{' '}
                                          </span>
                                          {result.parent.result}%
                                        </p>
                                      )}
                                      {result.transactionResults.length > 0 &&
                                        result.transactionResults.map(
                                          (transaction) =>
                                            transaction.transaction
                                              .rollbackTransaction === null ? (
                                              <div>
                                                <p className='m-0'>
                                                  <span className='font-weight-bold'>
                                                    {`${program.coinName
                                                      .charAt(0)
                                                      .toUpperCase()}${program.coinName.slice(
                                                      1
                                                    )}: `}
                                                  </span>
                                                  {
                                                    transaction.transaction
                                                      .points
                                                  }
                                                </p>
                                              </div>
                                            ) : null
                                        )}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: '1.2rem',
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline',
                                        textAlign: 'right',
                                        width: '100%',
                                      }}
                                    >
                                      Ver Detalle
                                    </span>
                                    <span className='toggle-btn parse-content'></span>
                                  </div>
                                </div>

                                <div
                                  className='overflow-hidden'
                                  ref={setCollapsibleElement}
                                >
                                  {result.children.map((result) => (
                                    <div className='card py-3' key={result.id}>
                                      <div
                                        style={{
                                          background: '#c3c3c3',
                                          height: '2px',
                                          width: '100%',
                                        }}
                                      ></div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'start',
                                          justifyContent: 'start',
                                        }}
                                      >
                                        <div>
                                          <h2
                                            style={{
                                              fontSize: '1.5rem',
                                              margin: '0',
                                            }}
                                          >
                                            {getMonthName(result.month)}
                                          </h2>
                                          <p className='m-0'>
                                            Descripción: {''}
                                            <span className='font-weight-bold'>
                                              {result.description}
                                            </span>
                                          </p>

                                          <p className='m-0'>
                                            <span className='font-weight-light'>
                                              {result.nameValue1}:{' '}
                                            </span>
                                            {result.value1}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className='m-0'>
                                          <span className='font-weight-bold'>
                                            {result.nameValue2}:{' '}
                                          </span>
                                          {result.value2}
                                        </p>
                                      </div>
                                      {result.transactionResults.length > 0 &&
                                        result.transactionResults.map(
                                          (transaction) =>
                                            transaction.transaction
                                              .rollbackTransaction === null ? (
                                              <div>
                                                <p className='m-0'>
                                                  <span className='font-weight-bold'>
                                                    {`${program.coinName
                                                      .charAt(0)
                                                      .toUpperCase()}${program.coinName.slice(
                                                      1
                                                    )}: `}
                                                  </span>
                                                  {
                                                    transaction.transaction
                                                      .points
                                                  }
                                                </p>
                                              </div>
                                            ) : null
                                        )}
                                    </div>
                                  ))}
                                  <div
                                    onClick={onToggle}
                                    style={{
                                      display: 'flex',
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: '1.2rem',
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline',
                                        textAlign: 'right',
                                        width: '100%',
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
                  {couldSeeResultsPerMonth && (
                    <div className='w-full flex flex-col gap-4'>
                      {sortedResults.map((result: Result, index: number) => (
                        <div
                          className={styles.ungroupedResultsContainer}
                          key={result.id}
                        >
                          <div className='card py-3'>
                            <div
                              style={{
                                background: '#c3c3c3',
                                height: '2px',
                                width: '100%',
                                marginBottom: '10px',
                              }}
                            ></div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'start',
                                justifyContent: 'start',
                              }}
                            >
                              <div>
                                <h2
                                  style={{
                                    fontSize: '1.5rem',
                                    margin: '0',
                                  }}
                                >
                                  {getMonthName(result.month)}
                                </h2>
                                <p className='m-0'>
                                  Descripción: {''}
                                  <span className='font-weight-bold'>
                                    {result.description}
                                  </span>
                                </p>

                                <p className='m-0'>
                                  <span className='font-weight-light'>
                                    {result.nameValue1}:{' '}
                                  </span>
                                  {result.description?.includes('VENTAS')
                                    ? `$${result.value1}`
                                    : program.id === 26
                                    ? `${result.value1} Kilos`
                                    : result.value1}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className='m-0'>
                                <span className='font-weight-bold'>
                                  {result.nameValue2}:{' '}
                                </span>
                                {result.description?.includes('VENTAS')
                                  ? `$${result.value2}`
                                  : program.id === 26
                                  ? `${result.value2} Kilos`
                                  : result.value2}
                              </p>
                            </div>
                            <div>
                              <p className='m-0'>
                                <span className='font-weight-bold'>
                                  {'Cumplimiento'}:{' '}
                                </span>
                                {(
                                  (result.value2 / result.value1) *
                                  100
                                ).toFixed(2)}
                                %
                              </p>
                            </div>
                            {result.transactionResults.length > 0 &&
                              result.transactionResults.map((transaction) =>
                                transaction.transaction.rollbackTransaction ===
                                null ? (
                                  <div>
                                    <p className='m-0'>
                                      <span className='font-weight-bold'>
                                        {`${program.coinName
                                          .charAt(0)
                                          .toUpperCase()}${program.coinName.slice(
                                          1
                                        )}: `}
                                      </span>
                                      {transaction.transaction.points}
                                    </p>
                                  </div>
                                ) : null
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ParticipantResults;
