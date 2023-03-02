import { useQuery } from '@apollo/react-hooks';
import SlideToggle from 'react-slide-toggle';

import withApollo from '~/server/apollo';
import { GET_SHOP_SIDEBAR_DATA } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import SmallProduct from '~/components/features/product/product-sm';

import { mainSlider7 } from '~/utils/data/carousel';

function ProductsSidebar(props) {
  const { adClass = '', type = 'right' } = props;
  const { data, loading, error } = useQuery(GET_SHOP_SIDEBAR_DATA, {
    variables: { featured: true },
  });
  const featured = data && data.shopSidebarData.featured;

  const toggleSidebarHandler = (e) => {
    if (type === 'right')
      document.querySelector('body').classList.toggle('right-sidebar-active');
    else document.querySelector('body').classList.toggle('sidebar-active');
  };

  const hideSidebarhandler = (e) => {
    if (type === 'right')
      document.querySelector('body').classList.remove('right-sidebar-active');
    else document.querySelector('body').classList.remove('sidebar-active');
  };

  return (
    <aside
      className={`col-xl-3 col-lg-4 sidebar sidebar-fixed sticky-sidebar-wrapper ${adClass} ${
        type === 'left' ? '' : 'right-sidebar'
      }`}
    >
      <div className="sidebar-overlay" onClick={hideSidebarhandler}>
        <ALink className="sidebar-close" href="#">
          <i className="d-icon-times"></i>
        </ALink>
      </div>

      <div className="sidebar-toggle" onClick={toggleSidebarHandler}>
        {type === 'right' ? (
          <i className="fas fa-chevron-left"></i>
        ) : (
          <i className="fas fa-chevron-right"></i>
        )}
      </div>

      <div className="sidebar-content">
        {loading ? (
          <div className="widget-2"></div>
        ) : (
          <div className="sticky-sidebar">
            <div className="widget widget-collapsible widget-vendor-info">
              <SlideToggle collapsed={false}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <h3
                      className={`widget-title ${toggleState.toLowerCase()}`}
                      onClick={onToggle}
                    >
                      Vendor Info{' '}
                      <span className="toggle-btn parse-content"></span>
                    </h3>
                    <div
                      className="overflow-hidden"
                      ref={setCollapsibleElement}
                    >
                      <ul className="widget-body filter-items">
                        <li className="store-name">
                          <span>Store Name:</span>
                          <span className="details">vendor1</span>
                        </li>
                        <li className="seller-name">
                          <span>Vendor:</span>
                          <span className="details">vendor1</span>
                        </li>
                        <li className="store-address">
                          <span>Address:</span>
                          <span className="details">
                            ON
                            <br />
                            Canada
                          </span>
                        </li>
                        <li className="clearfix">
                          <span className="ratings-container">
                            <span
                              className="ratings-full"
                              title="Rated 4.65 out of 5"
                            >
                              <span
                                className="ratings"
                                style={{ width: '93%' }}
                              ></span>
                              <span className="tooltiptext tooltip-top">
                                4.65
                              </span>
                            </span>
                          </span>
                          <span className="details">
                            4.65 rating from 31 reviews
                          </span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </SlideToggle>
            </div>
            <div className="widget widget-collapsible widget-contact-vendor">
              <SlideToggle collapsed={false}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <h3
                      className={`widget-title ${toggleState.toLowerCase()}`}
                      onClick={onToggle}
                    >
                      Contact Vendor{' '}
                      <span className="toggle-btn parse-content"></span>
                    </h3>
                    <div
                      className="overflow-hidden"
                      ref={setCollapsibleElement}
                    >
                      <div className="widget-body">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          required=""
                        />
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="you@example.com"
                          required=""
                        />
                        <textarea
                          id="message"
                          cols="30"
                          rows="6"
                          className="form-control"
                          placeholder="Type your message..."
                          required=""
                        ></textarea>
                        <ALink href="#" className="btn btn-dark btn-rounded">
                          Send Message
                        </ALink>
                      </div>
                    </div>
                  </>
                )}
              </SlideToggle>
            </div>
            <div className="widget widget-products">
              <h4 className="widget-title lh-1 border-no text-capitalize ">
                Más Premios
              </h4>

              <ul className="widget-body">
                <OwlCarousel adClass="owl-nav-top" options={mainSlider7}>
                  <div className="products-col">
                    {featured.slice(0, 3).map((product, index) => (
                      <SmallProduct
                        product={product}
                        key={'small-product-' + index}
                      />
                    ))}
                  </div>

                  <div className="products-col">
                    {featured.slice(0, 3).map((product, index) => (
                      <SmallProduct
                        product={product}
                        key={'small-product-' + index}
                      />
                    ))}
                  </div>
                </OwlCarousel>
              </ul>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  ProductsSidebar
);
