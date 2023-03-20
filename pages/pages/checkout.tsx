import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SlideToggle from 'react-slide-toggle';
import Collapse from 'react-bootstrap/Collapse';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';

import { toDecimal, getTotalPrice } from '~/utils';
import { useCart, useProgram } from '~/hooks';

function Checkout(props) {
  const [isFirst, setFirst] = useState(false);
  const { items, totalAmount } = useCart();
  const { program } = useProgram();
  return (
    <main className='main checkout border-no'>
      <Helmet>
        <title>Tienda | Checkout</title>
      </Helmet>

      <h1 className='d-none'>Tienda - Checkout</h1>

      <div
        className={`page-content pt-7 pb-10 ${
          items.length > 0 ? 'mb-10' : 'mb-2'
        }`}>
        <div className='step-by pr-4 pl-4'>
          <h3 className='title title-simple title-step'>
            <ALink href='/pages/cart'>1.Carrito</ALink>
          </h3>
          <h3 className='title title-simple title-step active'>
            <ALink href='#'>2.Envio</ALink>
          </h3>
          <h3 className='title title-simple title-step'>
            <ALink href='/pages/order'>3.Finalizar</ALink>
          </h3>
        </div>
        <div className='container mt-7'>
          {items.length > 0 ? (
            <>
              <form action='#' className='form'>
                <div className='row'>
                  <div className='col-lg-7 mb-6 mb-lg-0 pr-lg-4'>
                    <h3 className='title title-simple text-left text-uppercase'>
                      Billing Details
                    </h3>
                    <div className='row'>
                      <div className='col-xs-6'>
                        <label>First Name *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='first-name'
                          required
                        />
                      </div>
                      <div className='col-xs-6'>
                        <label>Last Name *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='last-name'
                          required
                        />
                      </div>
                    </div>
                    <label>Company Name (Optional)</label>
                    <input
                      type='text'
                      className='form-control'
                      name='company-name'
                      required
                    />
                    <label>Country / Region *</label>
                    <div className='select-box'>
                      <select
                        name='country'
                        className='form-control'
                        defaultValue='us'>
                        <option value='us'>United States (US)</option>
                        <option value='uk'> United Kingdom</option>
                        <option value='fr'>France</option>
                        <option value='aus'>Austria</option>
                      </select>
                    </div>
                    <label>Street Address *</label>
                    <input
                      type='text'
                      className='form-control'
                      name='address1'
                      required
                      placeholder='House number and street name'
                    />
                    <input
                      type='text'
                      className='form-control'
                      name='address2'
                      required
                      placeholder='Apartment, suite, unit, etc. (optional)'
                    />
                    <div className='row'>
                      <div className='col-xs-6'>
                        <label>Town / City *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='city'
                          required
                        />
                      </div>
                      <div className='col-xs-6'>
                        <label>State *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='state'
                          required
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-xs-6'>
                        <label>ZIP *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='zip'
                          required
                        />
                      </div>
                      <div className='col-xs-6'>
                        <label>Phone *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='phone'
                          required
                        />
                      </div>
                    </div>
                    <label>Email Address *</label>
                    <input
                      type='text'
                      className='form-control'
                      name='email-address'
                      required
                    />

                    <SlideToggle duration={300} collapsed>
                      {({ onToggle, setCollapsibleElement }) => (
                        <div className='form-checkbox mb-0 pt-0'>
                          <input
                            type='checkbox'
                            className='custom-checkbox'
                            id='create-account'
                            name='create-account'
                            onChange={onToggle}
                          />
                          <label
                            className='form-control-label ls-s'
                            htmlFor='create-account'>
                            Create an account?
                          </label>

                          <div
                            ref={setCollapsibleElement}
                            style={{ overflow: 'hidden' }}>
                            <label htmlFor='account_username' className='pt-4'>
                              Account username&nbsp;
                              <abbr className='required' title='required'>
                                *
                              </abbr>
                            </label>

                            <input
                              type='text'
                              className='form-control'
                              name='account_username'
                              id='account_username'
                              placeholder='Username'
                              rows='5'
                            />

                            <label htmlFor='account_password'>
                              Create account password&nbsp;
                              <abbr className='required' title='required'>
                                *
                              </abbr>
                            </label>

                            <input
                              type='password'
                              className='form-control mb-3'
                              name='account_password'
                              id='account_password'
                              placeholder='Password'
                              rows='5'
                            />
                          </div>
                        </div>
                      )}
                    </SlideToggle>

                    <SlideToggle duration={300} collapsed>
                      {({ onToggle, setCollapsibleElement }) => (
                        <div className='form-checkbox mb-6'>
                          <input
                            type='checkbox'
                            className='custom-checkbox'
                            id='different-address'
                            name='different-address'
                            onChange={onToggle}
                          />
                          <label
                            className='form-control-label ls-s'
                            htmlFor='different-address'>
                            Ship to a different address?
                          </label>

                          <div
                            ref={setCollapsibleElement}
                            style={{ overflow: 'hidden' }}>
                            <div className='row pt-4'>
                              <div className='col-xs-6'>
                                <label>First Name *</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='first-name'
                                  required
                                />
                              </div>
                              <div className='col-xs-6'>
                                <label>Last Name *</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='last-name'
                                  required
                                />
                              </div>
                            </div>
                            <label>Company Name (Optional)</label>
                            <input
                              type='text'
                              className='form-control'
                              name='company-name'
                              required
                            />
                            <label>Country / Region *</label>
                            <div className='select-box'>
                              <select
                                name='country'
                                className='form-control'
                                defaultValue='us'>
                                <option value='us'>United States (US)</option>
                                <option value='uk'> United Kingdom</option>
                                <option value='fr'>France</option>
                                <option value='aus'>Austria</option>
                              </select>
                            </div>
                            <label>Street Address *</label>
                            <input
                              type='text'
                              className='form-control'
                              name='address1'
                              required
                              placeholder='House number and street name'
                            />
                            <input
                              type='text'
                              className='form-control'
                              name='address2'
                              required
                              placeholder='Apartment, suite, unit, etc. (optional)'
                            />
                            <div className='row'>
                              <div className='col-xs-6'>
                                <label>Town / City *</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='city'
                                  required
                                />
                              </div>
                              <div className='col-xs-6'>
                                <label>State *</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='state'
                                  required
                                />
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-xs-6'>
                                <label>ZIP *</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='zip'
                                  required
                                />
                              </div>
                              <div className='col-xs-6'>
                                <label>Phone *</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='phone'
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </SlideToggle>

                    <h2 className='title title-simple text-uppercase text-left mt-6'>
                      Additional Information
                    </h2>
                    <label>Order Notes (Optional)</label>
                    <textarea
                      className='form-control pb-2 pt-2 mb-0'
                      cols='30'
                      rows='5'
                      placeholder='Notes about your order, e.g. special notes for delivery'></textarea>
                  </div>

                  <aside className='col-lg-5 sticky-sidebar-wrapper'>
                    <div
                      className='sticky-sidebar mt-1'
                      data-sticky-options="{'bottom': 50}">
                      <div className='summary pt-5'>
                        <h3 className='title title-simple text-left text-uppercase'>
                          Tu Canje
                        </h3>
                        <table className='order-table'>
                          <thead>
                            <tr>
                              <th>Premio</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => (
                              <tr key={'checkout-' + item.award.name}>
                                <td className='product-name'>
                                  {item.award.name}{' '}
                                  <span className='product-quantity'>
                                    ×&nbsp;{item.quantity}
                                  </span>
                                </td>
                                <td className='product-total text-body'>
                                  {totalAmount()} {program.coinName}
                                </td>
                              </tr>
                            ))}
                            <tr className='summary-total'>
                              <td className='pb-0'>
                                <h4 className='summary-subtitle'>Total</h4>
                              </td>
                              <td className=' pt-0 pb-0'>
                                <p className='summary-total-price ls-s text-primary'>
                                  {`${totalAmount()} ${program.coinName}`}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <button
                          type='submit'
                          className='btn btn-dark btn-rounded btn-order'>
                          Place Order
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </form>
            </>
          ) : (
            <div className='empty-cart text-center'>
              <p>Your cart is currently empty.</p>
              <i className='cart-empty d-icon-bag'></i>
              <p className='return-to-shop mb-0'>
                <ALink
                  className='button wc-backward btn btn-dark btn-md'
                  href='/shop'>
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
