import Helmet from "react-helmet";

import ALink from "~/components/features/custom-link";

import { useAuth, useCart, useProgram, useLogs } from "~/hooks";
import AddressesList from "~/components/partials/addresses/AddressesList";
import { Autocomplete, Button, TextField } from "@mui/material";
import { cities } from "~/utils/types/city";
import { OptionLabel } from "~/utils/types";
import { useEffect, useState } from "react";
import { LogType } from "~/utils/types/logType";

function Checkout(props) {
  const {
    items,
    totalAmount,
    availableAdresses,
    saveAddress,
    redeemAll,
    status,
    handleNewAddressChange,
    selectedAdressId,
  } = useCart();
  const { program } = useProgram();
  const { availablePoints } = useAuth();
  const { dispatchLog } = useLogs();

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

  return (
    <main className="main checkout border-no">
      <Helmet>
        <title>Tienda | Checkout</title>
      </Helmet>

      <h1 className="d-none">Tienda - Checkout</h1>

      <div
        className={`page-content pt-7 pb-10 ${
          items.length > 0 ? "mb-10" : "mb-2"
        }`}
      >
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1.Carrito</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2.Envío</ALink>
          </h3>
        </div>
        <div className="container mt-7">
          {items.length > 0 ? (
            <>
              <form action="#" className="form">
                <div className="row">
                  <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                    {width > 768 && (
                      <>
                        <h3
                          className="title title-simple text-left text-uppercase"
                          style={{ marginTop: 25 }}
                        >
                          Selecciona Una Dirección de envío
                        </h3>
                        <h5>Dirección de envío</h5>
                        {availableAdresses.length > 0 ? (
                          <AddressesList addresses={availableAdresses} />
                        ) : (
                          <h5>Aún no tienes direcciones registradas</h5>
                        )}
                      </>
                    )}

                    <h5>Nueva dirección</h5>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>Nombre de la dirección *</label>
                        <input
                          onChange={(e) =>
                            handleNewAddressChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          type="text"
                          className="form-control"
                          name="alias"
                          placeholder={"casa, trabajo, casa2"}
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Ciudad *</label>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          options={cities}
                          getOptionLabel={(option: OptionLabel) =>
                            option ? `${option.label}` : ""
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Ciudad" />
                          )}
                          onChange={(_, value: OptionLabel) =>
                            handleNewAddressChange(
                              "city",
                              value ? value.value : null
                            )
                          }
                        />
                      </div>
                    </div>
                    <label>Sector(Opcional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company-name"
                      required
                    />

                    {/* <div className="select-box">
                      <select
                        name="mainStreet"
                        className="form-control"
                        required
                      >
                        <option value="us">United States (US)</option>
                        <option value="uk"> United Kingdom</option>
                        <option value="fr">France</option>
                        <option value="aus">Austria</option>
                      </select>
                    </div> */}
                    <label>Calle principal *</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        handleNewAddressChange(e.target.name, e.target.value)
                      }
                      name="mainStreet"
                      required
                      placeholder="Calle principal"
                    />
                    <label>Calle secundaria *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="secondaryStreet"
                      onChange={(e) =>
                        handleNewAddressChange(e.target.name, e.target.value)
                      }
                      required
                      placeholder="Calle secundaria"
                    />
                    <label>
                      Número de casa * (máximo 10 caracteres en caso de no
                      contar con este dato escribir no tiene)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="houseNumber"
                      max={10}
                      onChange={(e) =>
                        handleNewAddressChange(e.target.name, e.target.value)
                      }
                      required
                      placeholder="Número de casa"
                    />

                    <div className="row">
                      <div className="col-xs-6">
                        <label>Referencia *</label>
                        <input
                          type="text"
                          placeholder="a 2 cuadras del parque"
                          className="form-control"
                          onChange={(e) =>
                            handleNewAddressChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          name="reference"
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Nombre para contacto *</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) =>
                            handleNewAddressChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          name="contactName"
                          required
                        />
                      </div>
                    </div>

                    <label>Número de telefono para contacto *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contactPhone"
                      onChange={(e) =>
                        handleNewAddressChange(e.target.name, e.target.value)
                      }
                      required
                    />
                    <Button
                      size="large"
                      variant="contained"
                      disabled={status === "loading" ? true : false}
                      onClick={() => saveAddress()}
                      style={{ fontSize: 12 }}
                    >
                      Guardar Dirección
                    </Button>
                    {width < 768 && (
                      <>
                        <h3
                          className="title title-simple text-left text-uppercase"
                          style={{ marginTop: 25 }}
                        >
                          Selecciona Una Dirección de envío
                        </h3>
                        {availableAdresses.length > 0 ? (
                          <AddressesList addresses={availableAdresses} />
                        ) : (
                          <h5>Aún no tienes direcciones registradas</h5>
                        )}
                      </>
                    )}
                  </div>

                  <aside className="col-lg-5 sticky-sidebar-wrapper">
                    <div
                      className="sticky-sidebar mt-1"
                      data-sticky-options="{'bottom': 50}"
                    >
                      <div className="summary pt-5">
                        <h3 className="title title-simple text-left text-uppercase">
                          Tu Canje
                        </h3>
                        <table className="order-table">
                          <thead>
                            <tr>
                              <th>Premio</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => (
                              <tr key={"checkout-" + item.award.name}>
                                <td className="product-name">
                                  {`${item.award.name} ${
                                    item.award.model
                                      ? "-" + item.award.model
                                      : ""
                                  }-${item.award.brand.name}${
                                    item.variant ? "-" + item.variant.name : ""
                                  }`}
                                  <span className="product-quantity">
                                    ×&nbsp;{item.quantity}
                                  </span>
                                </td>
                                <td className="product-total text-body">
                                  {item.points} {program.coinName}
                                </td>
                              </tr>
                            ))}
                            <thead>
                              <tr>
                                <th>Dirección de envió</th>
                              </tr>
                            </thead>
                            <tr>
                              <td className="product-name">
                                <p style={{ textAlign: "left" }}>
                                  Calle Principal: &nbsp;
                                  {
                                    availableAdresses.filter(
                                      (address) =>
                                        address.id === selectedAdressId
                                    )[0]?.mainStreet
                                  }
                                  <br />
                                  Secundaria: &nbsp;
                                  {
                                    availableAdresses.filter(
                                      (address) =>
                                        address.id === selectedAdressId
                                    )[0]?.secondaryStreet
                                  }
                                  <br />
                                  Número de casa: &nbsp;
                                  {
                                    availableAdresses.filter(
                                      (address) =>
                                        address.id === selectedAdressId
                                    )[0]?.houseNumber
                                  }
                                  <br />
                                  Referencia: &nbsp;
                                  {
                                    availableAdresses.filter(
                                      (address) =>
                                        address.id === selectedAdressId
                                    )[0]?.reference
                                  }
                                  <br />
                                </p>
                              </td>
                            </tr>
                            <tr className="summary-total">
                              <td className="pb-0">
                                <h4 className="summary-subtitle">Total</h4>
                              </td>
                              <td className=" pt-0 pb-0">
                                <p className="summary-total-price ls-s text-primary">
                                  {`${totalAmount()} ${program.coinName}`}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {availablePoints >= totalAmount() &&
                        selectedAdressId ? (
                          <ALink
                            href={"/pages/order"}
                            className="btn btn-dark btn-rounded btn-order"
                            onClick={() => {
                              items.map((item) =>
                                dispatchLog(LogType.BUY_AWARD, {
                                  awardId: item.award.id,
                                  awardPoints: item.points,
                                })
                              );
                              redeemAll();
                            }}
                          >
                            Canjear Premios
                          </ALink>
                        ) : (
                          <Button
                            type="button"
                            size="medium"
                            color="error"
                            variant="contained"
                            sx={{ m: 1, fontSize: 13 }}
                          >
                            Necesitas registrar una dirección para realizar el
                            canje
                          </Button>
                        )}
                      </div>
                    </div>
                  </aside>
                </div>
              </form>
            </>
          ) : (
            <div className="empty-cart text-center">
              <p>Tu Carrito esta vacio.</p>
              <i className="cart-empty d-icon-bag"></i>
              <p className="return-to-shop mb-0">
                <ALink
                  className="button wc-backward btn btn-dark btn-md"
                  href="/shop"
                >
                  Return to shop
                </ALink>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Checkout;
