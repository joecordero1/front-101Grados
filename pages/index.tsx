import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

// Import Apollo Server and Query
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import IntroSection from "~/components/partials/home/intro-section";
import ServiceBox from "~/components/partials/home/service-section";
import DealCollection from "~/components/partials/home/deal-collection";
import CategorySection from "~/components/partials/home/category-section";
import BannerOneSection from "~/components/partials/home/banner-one-section";
import VendorSection from "~/components/partials/home/vendor-section";
import Buyable from "~/components/partials/home/buyable";
import BannerTwoSection from "~/components/partials/home/banner-two-section";
import BestCollection from "~/components/partials/home/best-collection";

import { useAuth, useProgram } from "hooks";
import MultipleCategories from "components/partials/home/multiple-categories";
import { useRouter } from "next/router";

import SpecialCatalogues from "~/components/partials/home/SpecialCatalogues";
import SpecialBannerFirst from "~/components/partials/home/SpecialCatalogues/SpecialBannerFirst";
import SpecialBannerSecond from "~/components/partials/home/SpecialCatalogues/SpecialBannerSecond";
import useSpecialCatalogues from "~/hooks/useCatalogues";
import Head from "next/head";

function HomePage() {
  const { availablePoints, loginWithToken, isLoggedIn } = useAuth();
  const { myCatalogues } = useSpecialCatalogues();
  const { program } = useProgram();
  const router = useRouter();

  /* if (router.isReady && router.query.token !== undefined) {
    const { token } = router.query;
    loginWithToken(token.toLocaleString());
  } */

  useEffect(() => {
    if (program.id === 5 && isLoggedIn) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = "smcx-sdk";
      script.src =
        "https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgdyTgR1EBWkJ2U6IMXw0lOaZw2ZnSQ4VRvkKm6DXt8yVI.js";

      document.head.appendChild(script);

      return () => {
        // Cleanup: Remove the script when the component unmounts
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="main home">
      <Helmet>
        <title>Tienda - {program.name}</title>
      </Helmet>

      <h1 className="d-none">Tienda - {program.name}</h1>

      <div className="page-content">
        <div className="intro-section">
          <div className="container">
            <IntroSection />

            <ServiceBox />
          </div>
        </div>
        {program.isStoreActive && <DealCollection />}

        {program.isStoreActive && myCatalogues.length > 0 && (
          <SpecialBannerFirst />
        )}

        {program.isStoreActive && <CategorySection />}

        {program.isStoreActive && <BannerOneSection />}

        {program.isStoreActive && <VendorSection />}

        {program.isStoreActive && availablePoints > 0 && <Buyable />}

        {program.isStoreActive && myCatalogues.length > 0 && (
          <SpecialCatalogues />
        )}

        {program.isStoreActive && <BannerTwoSection />}

        {program.isStoreActive && <BestCollection />}

        {program.isStoreActive && <MultipleCategories />}

        {program.isStoreActive && myCatalogues.length > 0 && (
          <SpecialBannerSecond />
        )}
      </div>

      {!program.isStoreActive && (
        <h4 style={{ textAlign: "center", marginBottom: 60 }}>
          La tienda se encuentra inhabilitada temporalmente <br />
          Vuelve a ingresar más tarde
        </h4>
      )}
      <NewsletterModal />
    </div>
  );
}

export default HomePage;
