// pages/carousel.tsx
import { GetStaticProps, NextPage } from 'next'
import ProductCarouselSection from '../components/partials/home/ProductCarouselSection'

type Product = {
  id: string
  name: string
  imageUrl: string
  points: number
}

interface CarouselPageProps {
  carouselItems: Product[]
  sideItems: Product[]
}

const CarouselPage: NextPage<CarouselPageProps> = ({ carouselItems, sideItems }) => (
  <div className="page-content">
    <div className="container py-4">
      <h2 className="mb-4">Productos Destacados</h2>
      <ProductCarouselSection
        carouselItems={carouselItems}
        sideItems={sideItems}
      />
    </div>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const carouselItems = [
    { id: 'c1', name: 'Horno microondas Whirlpool',        imageUrl: '/images/micro.jpg', points: 6300 },
    { id: 'c2', name: 'Smart TV 42”',                       imageUrl: '/images/tele.jpg',         points: 7600 },
    { id: 'c3', name: 'Equipo de sonido',                   imageUrl: '/images/sonido.jpg',      points: 5200 },
  ]

  const sideItems = [
    { id: 's1', name: 'Samsung Galaxy S24 FE',              imageUrl: '/images/celular.jpg', points: 7800 },
    { id: 's2', name: 'Licuadora Ninja Xtrim 5 velocidades',imageUrl: '/images/licuadora.jpg', points: 3500 },
  ]

  return { props: { carouselItems, sideItems } }
}

export default CarouselPage
