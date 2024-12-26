'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import HomeLayoutDesktop from '../layouts/desktop/home';
import HomeLayoutMobile from '../layouts/mobile/home';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>{isMobile ? <HomeLayoutMobile /> : <HomeLayoutDesktop />}</div>;
}
