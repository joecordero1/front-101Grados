import React, { useRef } from 'react'
import { Box, IconButton, Card, CardMedia, CardContent, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
}

interface ProductCarouselProps {
  products: Product[]
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth
    containerRef.current.scrollBy({ 
      left: direction === 'left' ? -width : width, 
      behavior: 'smooth' 
    })
  }

  return (
    <Box position="relative" sx={{ mt: 4 }}>
      <IconButton
        onClick={() => handleScroll('left')}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.100' }
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          px: 6  // deja espacio para las flechas
        }}
      >
        {products.map((p) => (
          <Card key={p.id} sx={{ minWidth: 240, mr: 2, flex: '0 0 auto' }}>
            <CardMedia
              component="img"
              height="140"
              image={p.imageUrl}
              alt={p.name}
            />
            <CardContent>
              <Typography variant="subtitle1">{p.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${p.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <IconButton
        onClick={() => handleScroll('right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.100' }
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}

export default ProductCarousel
