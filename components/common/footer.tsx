import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/custom-link";

import { useProgram } from "hooks";

export default function Footer() {
  const { program } = useProgram();
  return (
    <footer className="footer">
      <div className="container">
        {/* <div className="footer-top">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <ALink href="market1.html" className="logo-footer">
                <img
                  src="images/home/footer-logo.png"
                  alt="logo-footer"
                  width="153"
                  height="44"
                />
              </ALink>
            </div>
            <div className="col-lg-4 widget-newsletter mb-4 mb-lg-0">
              <h4 className="widget-title ls-m">Subscribe to our Newsletter</h4>
              <p>Get all the latest information on Events, Sales and Offers.</p>
            </div>
            <div className="col-lg-5 widget-newsletter">
              <form action="#" className="input-wrapper-inline mx-auto mx-lg-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Email address here..."
                  required
                />
                <button
                  className="btn btn-primary btn-rounded ml-2"
                  type="submit"
                >
                  subscribe<i className="d-icon-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-info">
                <h4 className="widget-title">Contact Info</h4>
                <ul className="widget-body">
                  <li>
                    <label>Phone: </label>
                    <ALink href="tel:#">Toll Free (123) 456-7890</ALink>
                  </li>
                  <li>
                    <label>Email: </label>
                    <ALink href="mailto:mail@riode.com">riode@mail.com</ALink>
                  </li>
                  <li>
                    <label>Address: </label>
                    <ALink href="#">123 Street, City, Country</ALink>
                  </li>
                  <li>
                    <label>WORKING DAYS / HOURS: </label>
                  </li>
                  <li>
                    <ALink href="#">Mon - Sun / 9:00 AM - 8:00 PM</ALink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                <ul className="widget-body">
                  <li>
                    <ALink href="/pages/about-us">Track My Order</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/cart">View Cart</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/account">Sign in</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/wishlist">My Wishlist</ALink>
                  </li>
                  <li>
                    <ALink href="#">Privacy Policy</ALink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="widget">
                <h4 className="widget-title">About Us</h4>
                <ul className="widget-body">
                  <li>
                    <ALink href="/pages/about-us">About Us</ALink>
                  </li>
                  <li>
                    <ALink href="#">Order History</ALink>
                  </li>
                  <li>
                    <ALink href="#">Returns</ALink>
                  </li>
                  <li>
                    <ALink href="#">Custom Service</ALink>
                  </li>
                  <li>
                    <ALink href="#">Terms &amp; Condition</ALink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="widget-body">
                  <li>
                    <ALink href="#">Payment Methods</ALink>
                  </li>
                  <li>
                    <ALink href="#">Money-back Guarantee!</ALink>
                  </li>
                  <li>
                    <ALink href="#">Products Returns</ALink>
                  </li>
                  <li>
                    <ALink href="#">Support Center</ALink>
                  </li>
                  <li>
                    <ALink href="#">Shipping</ALink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-instagram pl-lg-10 mb-0 mb-md-6">
                <h4 className="widget-title">Instagram</h4>
                <figure className="widget-body row">
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/01.jpg"
                      alt="instagram 1"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/02.jpg"
                      alt="instagram 2"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/03.jpg"
                      alt="instagram 3"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/04.jpg"
                      alt="instagram 4"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/05.jpg"
                      alt="instagram 5"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/06.jpg"
                      alt="instagram 6"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/07.jpg"
                      alt="instagram 7"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="col-3">
                    <LazyLoadImage
                      src="images/instagram/08.jpg"
                      alt="instagram 8"
                      width="64"
                      height="64"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="widget widget-category">
            <div className="category-box">
              <h6 className="category-name">Clothing & Apparel:</h6>

              <ALink href="#">Boots</ALink>
              <ALink href="#">Dresses</ALink>
              <ALink href="#">Jeans</ALink>
              <ALink href="#">Leather Backpack</ALink>
              <ALink href="#">Men's Sneaker</ALink>
              <ALink href="#">Men's T-shirt</ALink>
              <ALink href="#">Peter England Shirts</ALink>
              <ALink href="#">Rayban</ALink>
              <ALink href="#">Sunglasses</ALink>
            </div>
            <div className="category-box">
              <h6 className="category-name">Computer & Technologies:</h6>

              <ALink href="#">Apple</ALink>
              <ALink href="#">Drone</ALink>
              <ALink href="#">Game Controller</ALink>
              <ALink href="#">iMac</ALink>
              <ALink href="#">Laptop</ALink>
              <ALink href="#">Smartphone</ALink>
              <ALink href="#">Tablet</ALink>
              <ALink href="#">Wireless Speaker</ALink>
            </div>
            <div className="category-box">
              <h6 className="category-name">Consumer Electric:</h6>
              <ALink href="#">Air Condition</ALink>
              <ALink href="#">Audio Speaker</ALink>
              <ALink href="#">Refrigerator</ALink>
              <ALink href="#">Security Camera</ALink>
              <ALink href="#">TV Television</ALink>
              <ALink href="#">Washing Machine</ALink>
            </div>
            <div className="category-box">
              <h6 className="category-name">Jewellery & Watches:</h6>
              <ALink href="#">Ammolite</ALink>
              <ALink href="#">Australian Opal</ALink>
              <ALink href="#">Diamond Ring</ALink>
              <ALink href="#">Faceted Carnelian</ALink>
              <ALink href="#">Gucci</ALink>
              <ALink href="#">Leather Watcher</ALink>
              <ALink href="#">Necklace</ALink>
              <ALink href="#">Pendant</ALink>
              <ALink href="#">Rolex</ALink>
              <ALink href="#">Silver Earing</ALink>
              <ALink href="#">Sun Pyrite</ALink>
              <ALink href="#">Watches</ALink>
            </div>
            <div className="category-box">
              <h6 className="category-name">Healthy & Beauty:</h6>
              <ALink href="#">Body Shower</ALink>
              <ALink href="#">Hair Care</ALink>
              <ALink href="#">LipStick</ALink>
              <ALink href="#">Makeup</ALink>
              <ALink href="#">Perfume</ALink>
              <ALink href="#">Skin Care</ALink>
            </div>
            <div className="category-box">
              <h6 className="category-name">Home, Garden & Kitchen:</h6>
              <ALink href="#">Bed Room</ALink>
              <ALink href="#">Blender</ALink>
              <ALink href="#">Chair</ALink>
              <ALink href="#">Cookware</ALink>
              <ALink href="#">Decor</ALink>
              <ALink href="#">Garden Equipments</ALink>
              <ALink href="#">Library</ALink>
              <ALink href="#">Living Room</ALink>
              <ALink href="#">Shield-Oval</ALink>
              <ALink href="#">Sofa</ALink>
              <ALink href="#">Utensil</ALink>
              <ALink href="#">Wayfarer</ALink>
            </div>
          </div>
        </div> */}
        <div className="footer-bottom">
          <div className="footer-left">
            <figure className="payment">
              <img src={program.logo} alt="payment" width="159" height="29" />
            </figure>
          </div>
          <div className="footer-center">
            <p className="copyright">
              101 Grados Marketing Relacional © {new Date().getFullYear()}.
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
