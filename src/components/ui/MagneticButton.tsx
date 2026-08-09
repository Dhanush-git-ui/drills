import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  range?: number;
  speed?: number;
}

export default function MagneticButton({
  children,
  className = '',
  range = 40,
  speed = 0.3,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Distance from center of button
      const dist = Math.sqrt(x * x + y * y);
      
      // Determine if cursor is within activation range
      const activationRadius = rect.width / 2 + range;

      if (dist < activationRadius) {
        // Pull button slightly toward cursor
        gsap.to(btn, {
          x: x * 0.4,
          y: y * 0.4,
          duration: speed,
          ease: 'power2.out',
        });
      } else {
        // Ease back to original coordinates
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (btn) btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, speed]);

  return (
    <button
      ref={btnRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
