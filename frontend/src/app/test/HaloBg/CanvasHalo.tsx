import React, { useEffect, useRef } from 'react';

const CanvasHalo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const haloSize = 100; // Taille du halo

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx) return;
    if (!canvas) return;
    // Ajuster la taille du canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner un halo transparent pour révéler l'arrière-plan
      ctx.globalCompositeOperation = 'destination-out'; // Pour révéler l'arrière-plan
      ctx.beginPath();
      ctx.arc(clientX, clientY, haloSize, 0, Math.PI * 2);

      // On utilise une couleur opaque pour tester d'abord
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Couleur blanche opaque pour débogage
      ctx.fill();

      // Changer ici pour que ça soit transparent
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Halo transparent pour révéler
      ctx.fill();
    };

    // Événements pour le mouvement de la souris
    window.addEventListener('mousemove', handleMouseMove);

    // Nettoyage
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-0 z-20 size-full" // Assurez-vous que le z-index est supérieur
      style={{ pointerEvents: 'none' }} // Pour que le canvas ne capture pas les événements de souris
    />
  );
};

export default CanvasHalo;
