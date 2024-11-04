'use client';

import React, { useEffect, useRef, useState } from 'react';

const Page = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Précharger l'image
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/images/bg.jpg'; // Remplacez par votre URL d'image
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image - hidden initially */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: "url('/assets/images/bg.jpg')", // Remplacez par votre URL d'image
        }}
      />

      {/* Reveal effect */}
      <RevealEffect />
    </div>
  );
};

const RevealEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const haloSize = 175;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Fonction pour mettre à jour les dimensions
  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Effet pour initialiser et gérer les dimensions
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Effet pour gérer le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Remplir initialement le canvas en noir
    const fillCanvas = () => {
      if (!ctx) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Create gradient for smooth edges
    const createGradient = (x: number, y: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, haloSize);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      return gradient;
    };

    const draw = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill canvas with black
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set blend mode to reveal background
      ctx.globalCompositeOperation = 'destination-out';

      // Draw gradient halo
      ctx.fillStyle = createGradient(clientX, clientY);
      ctx.beginPath();
      ctx.arc(clientX, clientY, haloSize, 0, Math.PI * 2);
      ctx.fill();

      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';
    };

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => draw(e));
    };

    // Initial fill
    fillCanvas();

    // Initial draw au centre
    draw({
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    } as MouseEvent);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dimensions]); // Dépendance aux dimensions

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full"
      style={{
        pointerEvents: 'none',
        touchAction: 'none',
      }}
    />
  );
};

export default Page;
