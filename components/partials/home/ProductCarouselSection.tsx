import React from 'react'
import OwlCarousel from '~/components/features/owl-carousel'
import ALink from '~/components/features/custom-link'
import { introSlider } from '~/utils/data/carousel'

type Product = {
  id: string
  name: string
  imageUrl: string
  points: number
}

interface Props {
  carouselItems: Product[]
  sideItems: Product[]
}

const ProductCarouselSection: React.FC<Props> = ({ carouselItems, sideItems }) => (
  <div className="row">
    {/* slider principal con layout grid 70/30 */}
    <div className="col-lg-9 mb-4">
      <OwlCarousel
        adClass="owl-theme owl-dot-inner product-carousel animation-slider"
        options={introSlider}
      >
        {carouselItems.map((p) => (
          <div
            key={p.id}
            className="banner banner-fixed banner-radius"
            style={{
              backgroundColor: '#f8f8f8',
              border: '2px solid #ccc',
              borderRadius: '0.5rem',
              height: '600px',
              display: 'grid',
              gridTemplateRows: '80% 20%',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '100%' }}>
              <img
                src={p.imageUrl}
                alt={p.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  gridRow: '1',
                }}
              />
            </div>
            <div
              className="banner-content"
              style={{
                background: '#fff',
                padding: '0.5rem',
                textAlign: 'center',
                gridRow: '2',
              }}
            >
              <h4 className="mb-1">{p.name}</h4>
              <p className="display-6 mb-0">{p.points} Puntos</p>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>

    {/* banners laterales con layout grid 70/30 */}
    <div className="col-lg-3">
      <div className="row cols-lg-1 cols-sm-2 cols-1">
        {sideItems.map((p) => (
          <div key={p.id} className="mb-4">
            <div
              className="banner banner-fixed banner-radius overlay-zoom"
              style={{
                backgroundColor: '#fff',
                border: '2px solid #ccc',
                borderRadius: '0.5rem',
                height: '300px',
                display: 'grid',
                gridTemplateRows: '80% 20%',
                overflow: 'hidden',
                gridRow: '1',
              }}
            >
              <div style={{ width: '100%' }}>
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
              <div
                className="banner-content"
                style={{
                  background: '#fff',
                  padding: '0.25rem',
                  textAlign: 'center',
                  gridRow: '2',
                }}
              >
                <h6 className="mb-1">{p.name}</h6>
                <p className="h6 text-primary mb-0">{p.points} Puntos</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default React.memo(ProductCarouselSection)
