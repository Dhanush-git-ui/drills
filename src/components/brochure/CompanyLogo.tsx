import React from 'react';

interface CompanyLogoProps {
  variant?: 'red' | 'white' | 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtext?: boolean;
  horizontal?: boolean;
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = 'red',
  size = 'md',
  showText = true,
  showSubtext = false,
  horizontal = false,
  className = ''
}) => {
  const isWhite = variant === 'white';

  const sizeDimensions = {
    xs: { iconHeight: 24, fontSize: 'text-sm', subSize: 'text-[8px]', gap: 'gap-2' },
    sm: { iconHeight: 34, fontSize: 'text-lg', subSize: 'text-[9px]', gap: 'gap-3' },
    md: { iconHeight: 46, fontSize: 'text-xl', subSize: 'text-[10px]', gap: 'gap-3.5' },
    lg: { iconHeight: 64, fontSize: 'text-2xl', subSize: 'text-xs', gap: 'gap-4' },
    xl: { iconHeight: 84, fontSize: 'text-3xl', subSize: 'text-sm', gap: 'gap-5' }
  };

  const { iconHeight, fontSize, subSize, gap } = sizeDimensions[size];

  const handshakeSrc = isWhite
    ? '/images/logo-handshake-white.svg'
    : '/images/logo-handshake.svg';

  const handshakeImg = (
    <img
      src={handshakeSrc}
      alt="PSRS Rock Drills Handshake Logo"
      style={{
        height: iconHeight,
        width: 'auto',
        objectFit: 'contain'
      }}
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    />
  );

  // If showText is false, return only the handshake icon
  if (!showText) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        {handshakeImg}
      </div>
    );
  }

  const textColorClass = isWhite ? 'text-white' : 'text-brand-red';
  const subtextColorClass = isWhite ? 'text-white/80' : 'text-brand-red/90';

  // Horizontal layout (Handshake left, PSRS Rock Drills right)
  if (horizontal) {
    return (
      <div className={`inline-flex items-center ${gap} select-none ${className}`}>
        {handshakeImg}
        <div className="flex flex-col leading-none">
          <span
            className={`font-serif font-bold tracking-tight ${fontSize} ${textColorClass} block leading-tight`}
          >
            PSRS Rock Drills
          </span>
          {showSubtext && (
            <span
              className={`font-mono font-bold tracking-widest uppercase mt-0.5 ${subSize} ${subtextColorClass}`}
            >
              {'Heavy Machinery & Spares \u2022 Est. 1998'}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Stacked layout (Handshake top, PSRS Rock Drills below - exact match to screenshot)
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {handshakeImg}
      <div className="text-center mt-2">
        <span
          className={`font-serif font-bold tracking-tight ${fontSize} ${textColorClass} block leading-tight`}
        >
          PSRS Rock Drills
        </span>
        {showSubtext && (
          <span
            className={`font-mono font-bold tracking-widest uppercase block mt-1 ${subSize} ${subtextColorClass}`}
          >
            {'Heavy Machinery & Tools \u2022 Est. 1998'}
          </span>
        )}
      </div>
    </div>
  );
};

export default CompanyLogo;