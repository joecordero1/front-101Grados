import ALink from '~/components/features/custom-link';

import { useAuth, useCart, useProgram, useLogs } from '~/hooks';
import { CartItem, LogType } from '~/utils/types';
import { withAuth } from 'components/AuthGuard';

function Cart() {
  const {
    removeFromCart,
    items,
    totalAmount,
    sumQuantity,
    substractQuantity,
    setQuantity,
  } = useCart();
  const { program } = useProgram();
  const { availablePoints } = useAuth();
  const { dispatchLog } = useLogs();

  return (
    <div className="main cart border-no">
      <div className="page-content pt-7 pb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1.Carrito</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink
              href={availablePoints >= totalAmount() ? '/pages/checkout' : ''}
            >
              2.Envío
            </ALink>
          </h3>
        </div>

        <div className="container mt-7 mb-2">
          <div className="row">
            {items.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 pr-lg-4">
                  <table className="shop-table cart-table">
                    <thead>
                      <tr>
                        <th>
                          <span>Premio</span>
                        </th>
                        <th></th>
                        <th>
                          <span>Costo</span>
                        </th>
                        <th>
                          <span>Cantidad</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={'cart' + item.award.id}>
                          <td className="product-thumbnail">
                            <figure>
                              <ALink href={'/award/' + item.award.id}>
                                <img
                                  src={item.award.mainImage}
                                  width="100"
                                  height="100"
                                  alt="product"
                                />
                              </ALink>
                            </figure>
                          </td>
                          <td className="product-name">
                            <div className="product-name-section">
                              <ALink href={'/award/' + item.award.id}>
                                {`${item.award.name} ${
                                  item.award.model ? '-' + item.award.model : ''
                                }-${item.award.brand.name}${
                                  item.variant ? '-' + item.variant.name : ''
                                }`}
                              </ALink>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              {`${item.points} ${program.coinName}`}
                            </span>
                          </td>

                          <td className="product-quantity">
                            <div className="mr-2 input-group">
                              <button
                                className="quantity-minus d-icon-minus"
                                // onClick={() => substractQuantity(item.id)}
                                onClick={() =>
                                  setQuantity(item.id, item.quantity - 1)
                                }
                              ></button>
                              <input
                                className="quantity form-control"
                                type="number"
                                min="1"
                                // max="100"
                                value={item.quantity}
                                onChange={(e) =>
                                  setQuantity(
                                    item.id,
                                    parseInt(
                                      e.target.value && e.target.value !== ''
                                        ? e.target.value
                                        : ''
                                    )
                                  )
                                }
                              />
                              <button
                                className="quantity-plus d-icon-plus"
                                // onClick={() => sumQuantity(item.id)}
                                onClick={() =>
                                  setQuantity(item.id, item.quantity + 1)
                                }
                              ></button>
                            </div>
                          </td>

                          <td className="product-close">
                            <ALink
                              href="#"
                              className="product-remove"
                              title="Remove this product"
                              onClick={() => {
                                removeFromCart(item.id);
                                dispatchLog(LogType.REMOVE_FROM_CART, {
                                  awardId: item.award.id,
                                  awardPoints: item.points,
                                });
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </ALink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-actions mb-6 pt-4">
                    <ALink
                      href="/shop"
                      className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"
                    >
                      <i className="d-icon-arrow-left"></i>Seguir Comprando
                    </ALink>
                  </div>
                </div>
                <aside className="col-lg-4 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <div className="summary mb-4">
                      <h3 className="summary-title text-left">
                        Detalle de Canje
                      </h3>
                      <table className="shipping">
                        <tbody>
                          <tr className="sumnary-shipping shipping-row-last">
                            <td colSpan={2}>
                              {items.map((item: CartItem, index: number) => (
                                <div
                                  className="product product-cart"
                                  key={'cart-menu-product-' + index}
                                >
                                  <figure className="product-media pure-media">
                                    <ALink href={'/award/' + item.award.id}>
                                      <img
                                        src={item.award.mainImage}
                                        alt="product"
                                        width="80"
                                        height="88"
                                      />
                                    </ALink>
                                  </figure>
                                  <div className="product-detail">
                                    <ALink
                                      href={'/award/' + item.award.id}
                                      className="product-name"
                                    >
                                      {`${item.award.name} ${
                                        item.award.model
                                          ? '-' + item.award.model
                                          : ''
                                      }-${item.award.brand.name}${
                                        item.variant
                                          ? '-' + item.variant.name
                                          : ''
                                      }`}
                                    </ALink>
                                    <div className="price-box">
                                      <span className="product-quantity">
                                        {item.quantity}
                                      </span>
                                      <span className="product-price">{`${item.points} ${program.coinName}`}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="total">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td>
                              <p className="summary-total-price ls-s">
                                {`${totalAmount()} ${program.coinName}`}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {availablePoints >= totalAmount() ? (
                        <ALink
                          href="/pages/checkout"
                          className="btn btn-dark btn-rounded btn-checkout"
                        >
                          Continuar Canje
                        </ALink>
                      ) : (
                        <ALink
                          href=""
                          className="btn btn-dark btn-rounded btn-checkout"
                        >
                          {program.coinName} insuficientes
                        </ALink>
                      )}
                    </div>
                  </div>
                </aside>
              </>
            ) : (
              <div className="empty-cart text-center" style={{ marginTop: 10 }}>
                <p>Tu carrito esta vacio.</p>
                <i className="cart-empty d-icon-bag"></i>
                <p className="return-to-shop">
                  <ALink
                    className="button wc-backward btn btn-dark btn-md"
                    href="/shop"
                  >
                    Regresar a la tienda
                  </ALink>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Cart);
