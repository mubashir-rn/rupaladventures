import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      const criticalImages = [
        '/src/assets/hero-mountain.jpg',
        '/src/assets/logo.png',
        '/src/assets/fairy-meadows.jpg',
        '/src/assets/laila-peak.jpg'
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Prefetch next likely pages
    const prefetchPages = () => {
      const likelyPages = ['/expeditions', '/about', '/contact'];
      
      likelyPages.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Initialize optimizations
    preloadResources();
    prefetchPages();
    optimizeImages();

    // Cleanup function
    return () => {
      // Remove any added elements if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
