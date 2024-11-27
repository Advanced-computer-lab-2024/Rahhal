import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 576) {
        if (!isMobile) {
          setIsMobile(true);
        }
      } else {
        if (isMobile) {
          setIsMobile(false);
        }
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return isMobile;
}