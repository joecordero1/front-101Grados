// src/pages/cart.tsx
import React from 'react';
import ALink from '~/components/features/custom-link';
import BannerGrid from '~/components/partials/home/BannerGrid';
import { useAuth, useCart, useProgram, useLogs, useItem } from '~/hooks';
import { CartItem, LogType } from '~/utils/types';
import { withAuth } from 'components/AuthGuard';

function Cart() {
  const {
    removeFromCart,
    items,
    totalAmount,
    setQuantity,
  } = useCart();
  const { program } = useProgram();
  const { availablePoints } = useAuth();
  const { dispatchLog } = useLogs();

  const { coinName } = program;

  // IDs de los productos que quieres mostrar en los banners
  const bannerId1 = '3497';
  const bannerId2 = 'QKZ-FKX';
  const bannerId3 = 'PRODUCT_ID_3';

  // Llamadas al hook existente para obtener cada producto
  const { item: banner1, loading: loading1 } = useItem(bannerId1);
  const { item: banner2, loading: loading2 } = useItem(bannerId2);
  const { item: banner3, loading: loading3 } = useItem(bannerId3);

  /* Sólo incluimos en el grid los que ya cargaron
  const sideItems = [banner1, banner2, banner3]
    .filter((p) => !!p)
    .map((p) => ({
      id: p.award.id,
      name: p.award.name,
      model: p.award.model,
      brand: p.award.brand.name,
      imageUrl: p.award.mainImage,
      points: p.points,
      variantName: p.variant?.name,
    }));
  */

  // Sólo FILTRAMOS los CatalogueItem definidos y lo pasamos directamente:
  const sideItems = [banner1, banner2, banner3].filter((p) => !!p);

  const bannersLoading = loading1 || loading2 || loading3;

  return (
    <div className="main cart border-no">
      <div className="page-content pt-7 pb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Carrito</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href={availablePoints >= totalAmount() ? '/pages/checkout' : ''}>
              2. Envío
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
                        <th><span>Premio</span></th>
                        <th></th>
                        <th><span>Costo</span></th>
                        <th><span>Cantidad</span></th>
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
                                  alt={item.award.name}
                                />
                              </ALink>
                            </figure>
                          </td>
                          <td className="product-name">
                            <div className="product-name-section">
                              <ALink href={'/award/' + item.award.id}>
                                {`${item.award.name}${item.award.model ? ' - ' + item.award.model : ''} - ${item.award.brand.name}${item.variant ? ' - ' + item.variant.name : ''}`}
                              </ALink>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">{`${item.points} ${program.coinName}`}</span>
                          </td>
                          <td className="product-quantity">
                            <div className="mr-2 input-group">
                              <button
                                className="quantity-minus d-icon-minus"
                                onClick={() =>
                                  setQuantity(item.id, item.quantity - 1)
                                }
                              />
                              <input
                                className="quantity form-control"
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  setQuantity(
                                    item.id,
                                    parseInt(e.target.value || '1', 10)
                                  )
                                }
                              />
                              <button
                                className="quantity-plus d-icon-plus"
                                onClick={() =>
                                  setQuantity(item.id, item.quantity + 1)
                                }
                              />
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
                      <i className="d-icon-arrow-left" /> Seguir Comprando
                    </ALink>
                  </div>

                  {/* ——— Aquí tu BannerGrid con la nueva estructura ——— */}
                  <div className="mb-6 pt-4">
                    {bannersLoading
                      ? <p>Cargando banners…</p>
                      : <BannerGrid sideItems={sideItems} coinName={coinName} />
                    }
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
                      {/* … resto del sidebar … */}
                    </div>
                  </div>
                </aside>
              </>
            ) : (
              <div className="empty-cart text-center" style={{ marginTop: 10 }}>
                <p>Tu carrito está vacío.</p>
                <i className="cart-empty d-icon-bag" />
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
