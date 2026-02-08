import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', updatePosition);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        transform: `translate(${position.x - 24}px, ${position.y - 10}px)`,
      }}
    >
      <span
        className={`font-bold tracking-wider select-none transition-all duration-300 ${
          isHovering ? 'text-base opacity-100' : 'text-sm opacity-90'
        }`}
        style={{
          background: 'linear-gradient(135deg, hsl(270 61% 28%), hsl(355 56% 64%))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: `drop-shadow(0 0 ${isHovering ? '8px' : '4px'} hsl(270 61% 28% / 0.6))`,
          fontFamily: "'Inter', system-ui, sans-serif",
          letterSpacing: '0.15em',
        }}
      >
        DARIUS
      </span>
    </div>
  );
};

export default CustomCursor;
