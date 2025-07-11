import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';

import { getTotalPrice, getCartCount, toDecimal } from '~/utils';
import { CartItem } from '~/utils/types';
import { useAuth, useCart, useProgram, useLogs } from '~/hooks';
import { LogType } from '~/utils/types/logType';

function CartMenu() {
  const { removeFromCart, items, totalAmount } = useCart();
  const { program } = useProgram();
  const { availablePoints } = useAuth();
  const router = useRouter();
  const { dispatchLog } = useLogs();

  useEffect(() => {
    hideCartMenu();
  }, [router.asPath]);

  const showCartMenu = (e) => {
    e.preventDefault();
    e.currentTarget.closest('.cart-dropdown').classList.add('opened');
  };

  const hideCartMenu = () => {
    if (document.querySelector('.cart-dropdown').classList.contains('opened'))
      document.querySelector('.cart-dropdown').classList.remove('opened');
  };

  return (
    <div className="dropdown cart-dropdown type2 cart-offcanvas mr-0 mr-lg-2">
      <a
        href="#"
        className="cart-toggle label-block link"
        onClick={showCartMenu}
      >
        <div className="cart-label d-lg-show">
          <span className="cart-name">Carrito:</span>
          <span className="cart-price">{`${totalAmount()} ${
            program.coinName
          }`}</span>
        </div>
        <i className="d-icon-bag">
          <span className="cart-count">{items.length}</span>
        </i>
      </a>
      <div className="cart-overlay" onClick={hideCartMenu}></div>
      <div className="dropdown-box">
        <div className="cart-header">
          <h4 className="cart-title">Carrito</h4>
          <ALink
            href="#"
            className="btn btn-dark btn-link btn-icon-right btn-close"
            onClick={hideCartMenu}
          >
            cerrar<i className="d-icon-arrow-right"></i>
            <span className="sr-only">Cart</span>
          </ALink>
        </div>
        {items.length > 0 ? (
          <>
            <div className="products scrollable">
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
                    <button
                      className="btn btn-link btn-close"
                      onClick={() => {
                        removeFromCart(item.id);
                        dispatchLog(LogType.REMOVE_FROM_CART, {
                          awardId: item.award.id,
                          awardPoints: item.points,
                        });
                      }}
                    >
                      <i className="fas fa-times"></i>
                      <span className="sr-only">Cerrar</span>
                    </button>
                  </figure>
                  <div className="product-detail">
                    <ALink
                      href={'/award/' + item.award.id}
                      className="product-name"
                    >
                      {`${item.award.name} ${
                        item.award.model ? '-' + item.award.model : ''
                      }-${item.award.brand.name}${
                        item.variant ? '-' + item.variant.name : ''
                      }`}
                    </ALink>
                    <div className="price-box">
                      <span className="product-quantity">{item.quantity}</span>
                      <span className="product-price">{`${item.points} ${program.coinName}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <label>Total:</label>
              <span className="price">{`${totalAmount()} ${
                program.coinName
              }`}</span>
            </div>

            <div className="cart-action">
              <ALink
                href="/pages/cart"
                className="btn btn-dark btn-link"
                onClick={hideCartMenu}
              >
                Ver Carrito
              </ALink>
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
          </>
        ) : (
          <p className="mt-4 text-center font-weight-semi-bold ls-normal text-body">
            No tienes premios en el carrito.
          </p>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
