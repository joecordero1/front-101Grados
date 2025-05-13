// pages/carousel.tsx
import React from 'react'
import ProductCarouselSection from '~/components/partials/home/ProductCarouselSection'
import { useItem, useProgram } from '~/hooks'

import { withAuth } from 'components/AuthGuard';

function CarouselPage() {
  const { program } = useProgram();
  const { coinName } = program;

  // IDs (quemados)
  const carouselIds = ['3770', '3770', '3770'];
  const sideIds = ['3770', '3770'];

  // Hooks para cada producto
  const carousels = carouselIds.map((id) => useItem(id));
  const sides = sideIds.map((id) => useItem(id));

  const carouselItems = carousels.map(({ item }) => item).filter(Boolean);
  const sideItems = sides.map(({ item }) => item).filter(Boolean);
  const bannersLoading = [...carousels, ...sides].some(({ loading }) => loading);

  return (
    <div className="page-content">
      <div className="container py-4">
        <h2 className="mb-4">Productos Destacados</h2>
        {bannersLoading ? (
          <p>Cargando productos…</p>
        ) : (
          <ProductCarouselSection
            carouselItems={carouselItems}
            sideItems={sideItems}
            coinName={coinName}
          />
        )}
      </div>
    </div>
  );
}


export default withAuth(CarouselPage);
