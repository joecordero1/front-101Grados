import React from 'react'

type Product = {
  id: string
  name: string
  imageUrl: string
  points: number
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
        <strong>¡Producto estrella!</strong>
        <span>Canjea ahora con tus puntos</span>
      </div>

      {/* Nombre + puntos: columna 3 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          textAlign: 'right',
          padding: '0 0.5rem',
          fontSize: '2rem',
        }}
      >
        <span>{product.name}</span>
        <span style={{ color: '#007bff', fontWeight: 'bold' }}>{product.points} Puntos</span>
      </div>
    </div>
  )
}

export default MainBanner
