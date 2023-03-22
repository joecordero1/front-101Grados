import ALink from "~/components/features/custom-link";
import { useProgram } from "~/hooks";

export default function ShopBanner(props) {
  const { program } = useProgram();

  return (
    <div
      className="shop-boxed-banner banner mb-8 mb-lg-7"
      style={{ backgroundImage: program.hero1, backgroundColor: "#ECEDEF" }}
    >
      <div className="banner-content">
        <h4 className="banner-subtitle font-weight-semi-bold ls-m text-uppercase text-secondary mb-3">
          Tienda
        </h4>
        <h1 className="banner-title font-weight-bold ls-m mb-6">
          {program.name}
        </h1>
        {/*    <ALink href="/shop" className="btn btn-dark btn-outline btn-rounded">
          Shop Now<i className="d-icon-arrow-right"></i>
        </ALink> */}
      </div>
    </div>
  );
}
