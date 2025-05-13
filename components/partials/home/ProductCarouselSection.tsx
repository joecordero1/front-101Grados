import React from 'react'
import OwlCarousel from '~/components/features/owl-carousel'
import ALink from '~/components/features/custom-link'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLogs } from '~/hooks';
import { LogType } from '~/utils/types/logType';
import { introSlider } from '~/utils/data/carousel'
import { CatalogueItem } from '~/utils/types';

interface ProductCarouselSectionProps {
  carouselItems: CatalogueItem[];
  sideItems: CatalogueItem[];
  coinName: string;
}



const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({ carouselItems, sideItems, coinName }) => {
  const { dispatchLog } = useLogs();
  // 1) Filtramos sólo los items que realmente tengan award definido
  const validItems = sideItems.filter(item => !!item?.award);
  if (validItems.length === 0) {
    return null;
  }
  return (
    <div className="row">
      {/* slider principal de banners en carusel */}
      <div className="col-lg-9 mb-4">
        <OwlCarousel
          adClass="owl-theme owl-dot-inner product-carousel animation-slider"
          options={introSlider}
        >
          {carouselItems.map((item) => {
            const award = {
              id: item.id,
              name: item.award.name,
              brand: item.award.brand,
              model: item.award.model,
              mainImage: item.award.mainImage,
              subcategories: item.award.subcategories
            };

            return (
              <div key={award.id} className="p-4">
                <div
                  className="product text-left"
                  style={{
                    height: '600px',
                    border: '2px solid #ccc',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Imagen del producto */}
                  <figure
                    
                    style={{
                      height: '419px',
                      width: '100%',
                      position: 'relative',
                      margin: 0,
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <LazyLoadImage
                      alt={award.name}
                      src={award.mainImage}
                      threshold={500}
                      wrapperProps={{
                        style: {
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          width: '100%',
                          backgroundColor: 'transparent',
                        },
                      }}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        backgroundColor: 'transparent',
                      }}
                    />

                    <div
                      className="product-action"
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                      }}
                    >
                      <ALink
                        href={`/award/${award.id}`}
                        className="btn-product btn-quickview"
                        title="Ver detalle"
                        onClick={() => {
                          dispatchLog(LogType.OPEN_QUICK_VIEW_AWARD, {
                            awardId: award.id,
                            awardPoints: item.points,
                          });
                        }}
                      >
                        Vista Rápida
                      </ALink>
                    </div>
                  </figure>


                  {/* Detalles del producto */}
                  <div
                    className="product-details px-3 py-2"
                    style={{
                      height: '180px',
                      overflow: 'hidden',
                      fontSize: 13,
                    }}
                  >
                    <div className="product-cat">
                      {award.subcategories?.map((sub, idx) => (
                        <React.Fragment key={`${sub.id}-${idx}`}>
                          <ALink
                            href={{
                              pathname: '/shop',
                              query: { subcategory: sub.id },
                            }}
                          >
                            {sub.name}
                            {idx < (award.subcategories?.length || 0) - 1 && ', '}
                          </ALink>
                        </React.Fragment>
                      ))}
                    </div>

                    <h3 className="product-name">
                      <ALink href={`/award/${award.id}`}>
                        {award.name}
                      </ALink>
                      <br />
                      <span className="product-brand" style={{ fontSize: 12 }}>
                        {award.brand.name}
                      </span>
                    </h3>

                    {award.model && (
                      <p style={{ fontSize: 13 }}>{award.model}</p>
                    )}

                    <div className="product-price">
                      <ins className="new-price">
                        {item.points} {coinName}
                      </ins>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}



        </OwlCarousel>
      </div>

      {/* banners laterales */}
      <div className="col-lg-3">
        <div className="row cols-lg-1 cols-sm-2 cols-1">
          {validItems.map(item => {
            const award = item.award!;
            return (
              <div key={award.id} className="mb-4">
                <div className="product text-left">
                  <figure className="product-media">
                    <ALink href={`/award/${award.id}`}>
                      <LazyLoadImage
                        alt={award.name}
                        src={award.mainImage}
                        threshold={500}
                        effect="opacity"
                        width="300"
                        height="338"
                        style={{
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    </ALink>

                    <div className="product-action">
                      <ALink
                        href={`/award/${award.id}`}
                        className="btn-product btn-quickview"
                        title="Ver detalle"
                        onClick={() => {
                          dispatchLog(LogType.OPEN_QUICK_VIEW_AWARD, {
                            awardId: award.id,
                            awardPoints: item.points,
                          });
                        }}
                      >
                        Vista Rápida
                      </ALink>
                    </div>
                  </figure>

                  <div className="product-details">
                    <div className="product-cat">
                      {award.subcategories?.map((sub, idx) => (
                        <React.Fragment key={`${sub.id}-${idx}`}>
                          <ALink
                            href={{
                              pathname: '/shop',
                              query: { subcategory: sub.id },
                            }}
                          >
                            {sub.name}
                            {idx < (award.subcategories?.length || 0) - 1 && ', '}
                          </ALink>
                        </React.Fragment>
                      ))}
                    </div>

                    <h3 className="product-name">
                      <ALink href={`/award/${award.id}`}>
                        {award.name}
                      </ALink>
                      <br />
                      <span className="product-brand" style={{ fontSize: 12 }}>
                        {award.brand.name}
                      </span>
                    </h3>

                    {award.model && (
                      <p style={{ fontSize: 13 }}>{award.model}</p>
                    )}

                    <div className="product-price">
                      <ins className="new-price">
                        {item.points} {coinName}
                      </ins>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};

export default React.memo(ProductCarouselSection)
