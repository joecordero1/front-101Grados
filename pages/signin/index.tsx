'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import SignInLayoutDesktop from '../../layouts/desktop/signin';
import SignInLayoutMobile from '../../layouts/mobile/signin';

export default function SignIn() {
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

  return (
    <div>{isMobile ? <SignInLayoutMobile /> : <SignInLayoutDesktop />}</div>
  );
}
