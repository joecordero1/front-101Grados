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

function HomePage() {
  const { availablePoints, loginWithToken } = useAuth();
  const { program } = useProgram();
  const router = useRouter();

  /* if (router.isReady && router.query.token !== undefined) {
    const { token } = router.query;
    loginWithToken(token.toLocaleString());
  } */

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

        <DealCollection />

        <CategorySection />

        <BannerOneSection />

        <VendorSection />

        {availablePoints > 0 && <Buyable />}

        <BannerTwoSection />

        <BestCollection />

        <MultipleCategories />
      </div>

      <NewsletterModal />
    </div>
  );
}

export default HomePage;
