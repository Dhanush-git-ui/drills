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
  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          stroke: '#FFFFFF',
          handStroke: '#FFFFFF',
          textMain: '#FFFFFF',
          textSub: 'rgba(255,255,255,0.8)'
        };
      case 'dark':
        return {
          stroke: '#C8102E',
          handStroke: '#EF4444',
          textMain: '#FFFFFF',
          textSub: '#9CA3AF'
        };
      case 'light':
      case 'red':
      default:
        return {
          stroke: '#C8102E',
          handStroke: '#C8102E',
          textMain: '#1D1D1D',
          textSub: '#C8102E'
        };
    }
  };

  const colors = getColors();

  const sizeDimensions = {
    xs: { iconWidth: 32, iconHeight: 18, fontSize: 'text-sm', subSize: 'text-[8px]' },
    sm: { iconWidth: 44, iconHeight: 25, fontSize: 'text-base', subSize: 'text-[9px]' },
    md: { iconWidth: 60, iconHeight: 34, fontSize: 'text-xl', subSize: 'text-[10px]' },
    lg: { iconWidth: 84, iconHeight: 48, fontSize: 'text-2xl', subSize: 'text-xs' },
    xl: { iconWidth: 110, iconHeight: 62, fontSize: 'text-3xl', subSize: 'text-sm' }
  };

  const { iconWidth, iconHeight, fontSize, subSize } = sizeDimensions[size];

  const logoSvg = (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 120 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
    >
      {/* Left Arm & Sleeve Cuff */}
      <path
        d="M6 18C16 23 26 27 38 27L42 27"
        stroke={colors.handStroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 32C16 34 26 36 36 36"
        stroke={colors.handStroke}
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Right Arm & Sleeve Cuff */}
      <path
        d="M114 18C104 23 94 27 82 27L78 27"
        stroke={colors.handStroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M114 32C104 34 94 36 84 36"
        stroke={colors.handStroke}
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Left Hand & Thumb */}
      <path
        d="M38 27C44 24 50 18 56 12C60 8 68 8 74 13C78 16 80 20 78 24C75 27 68 28 62 28L48 28"
        stroke={colors.handStroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Hand & Fingers Clasping */}
      <path
        d="M82 27C76 25 70 20 64 16C58 13 52 14 48 18C44 22 46 27 50 31L66 43C70 46 76 46 80 43C84 39 84 34 82 27Z"
        stroke={colors.handStroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Clasping Fingers Details */}
      <path
        d="M48 31C44 34 44 38 48 42C51 45 56 45 60 41"
        stroke={colors.handStroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M52 39C49 42 50 46 54 49C57 51 62 50 65 46"
        stroke={colors.handStroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M57 46C55 49 56 53 60 55C63 56 68 55 70 51"
        stroke={colors.handStroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M62 52C61 55 63 58 67 59C70 60 74 58 76 54"
        stroke={colors.handStroke}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Palm Line Detail */}
      <path
        d="M55 24C62 26 70 26 76 22"
        stroke={colors.handStroke}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (horizontal) {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="p-1.5 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
          {logoSvg}
        </div>
        {showText && (
          <div className="flex flex-col leading-none">
            <span 
              className={`font-serif font-black tracking-tight ${fontSize} block`}
              style={{ color: colors.textMain }}
            >
              PSRS <span className="text-brand-red">Rock Drills</span>
            </span>
            {showSubtext && (
              <span 
                className={`font-mono text-[9px] font-bold tracking-widest uppercase mt-0.5 ${subSize}`}
                style={{ color: colors.textSub }}
              >
                Heavy Machinery & Spares • Est. 1998
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {logoSvg}
      {showText && (
        <div className="text-center mt-1.5">
          <span 
            className={`font-serif font-black tracking-tight ${fontSize} block leading-tight`}
            style={{ color: colors.textMain }}
          >
            PSRS <span className="text-brand-red">Rock Drills</span>
          </span>
          {showSubtext && (
            <span 
              className={`font-mono text-[9px] font-bold tracking-widest uppercase block mt-0.5 ${subSize}`}
              style={{ color: colors.textSub }}
            >
              Heavy Machinery & Tools
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
