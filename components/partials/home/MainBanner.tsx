import React from 'react'

type Product = {
  id: string
  name: string
  imageUrl: string
  points: number
  brandName: string
  model?: string
  subcategories?: { id: string; name: string }[]
}


interface Props {
  product: Product
}

const MainBanner: React.FC<Props> = ({ product }) => {
  return (
    <div
      style={{
        height: '150px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        backgroundColor: '#f8f8f8',
        border: '2px solid #ccc',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        marginTop: '2rem',
      }}
    >
      {/* Imagen: columna 1 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            height: '110px',
            width: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Texto: columna 2 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '2rem',
          padding: '0 0.5rem',
        }}
      >
        <strong>Porque conocemos lo que te interesa!</strong>
        <span>Canjea ahora con tus puntos</span>
      </div>

      {/* Columna 3: product-details */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'right',
    padding: '0 0.5rem',
    fontSize: '1rem',
  }}
>
  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{product.name}</div>

  {product.model && (
    <div style={{ fontSize: '1.5rem', color: '#666' }}>{product.model}</div>
  )}

  <div style={{ fontSize: '1.5rem', color: '#999' }}>{product.brandName}</div>

  <div style={{ color: '#007bff', fontSize: '2rem',fontWeight: 'bold', marginTop: '0.3rem' }}>
    {product.points} Puntos
  </div>
</div>

    </div>
  )
}

export default MainBanner
