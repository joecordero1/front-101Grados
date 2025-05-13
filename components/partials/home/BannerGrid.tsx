// src/components/partials/home/BannerGrid.tsx
import React from 'react';
import ALink from '~/components/features/custom-link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLogs } from '~/hooks';
import { LogType } from '~/utils/types/logType';
import { CatalogueItem } from '~/utils/types';

interface BannerGridProps {
  sideItems: CatalogueItem[];
  coinName: string;
}

const BannerGrid: React.FC<BannerGridProps> = ({ sideItems, coinName }) => {
  const { dispatchLog } = useLogs();

  // 1) Filtramos sólo los items que realmente tengan award definido
  const validItems = sideItems.filter(item => !!item?.award);

  if (validItems.length === 0) {
    return null;
  }

  return (
    <div className="row">
      {validItems.map(item => {
        const award = item.award!;
        return (
          <div key={award.id} className="col-md-4 mb-4">
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
  );
};

export default BannerGrid;
