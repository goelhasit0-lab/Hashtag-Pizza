import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'lockup' | 'icon-only';
}

export const HashtagLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'lockup',
}) => {
  const sizeMap = {
    sm: { height: 36, width: variant === 'badge' ? 36 : 140 },
    md: { height: 44, width: variant === 'badge' ? 44 : 170 },
    lg: { height: 56, width: variant === 'badge' ? 56 : 210 },
    xl: { height: 72, width: variant === 'badge' ? 72 : 260 },
  };

  const dim = sizeMap[size];

  // If badge or icon-only, render the circular emblem matching user's image exactly
  if (variant === 'badge' || variant === 'icon-only') {
    return (
      <svg
        className={`inline-block shrink-0 ${className}`}
        width={dim.height}
        height={dim.height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hashtag Pizza Logo"
      >
        {/* Royal Blue Circle Background */}
        <circle cx="100" cy="100" r="100" fill="#1443B8" />

        {/* Outer subtle glow/depth ring */}
        <circle cx="100" cy="100" r="97" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />

        {/* Mascot Hashtag Figure in Red (#E92C2C) */}
        <g id="mascot-hashtag">
          {/* Left Vertical Bar */}
          <path
            d="M51 68C48 88 47 114 51 133"
            stroke="#E92C2C"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* Right Vertical Bar */}
          <path
            d="M66 69C66 90 68 113 67 131"
            stroke="#E92C2C"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* Top Horizontal Bar */}
          <path
            d="M40 98C49 96 66 94 80 91"
            stroke="#E92C2C"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* Bottom Horizontal Bar */}
          <path
            d="M39 116C50 114 65 110 75 107"
            stroke="#E92C2C"
            strokeWidth="9.5"
            strokeLinecap="round"
          />

          {/* Hashtag Mascot Head (Curved smiling face circle inside hashtag) */}
          <ellipse
            cx="58.5"
            cy="90"
            rx="8.5"
            ry="7.5"
            stroke="#E92C2C"
            strokeWidth="5"
            fill="none"
          />

          {/* Right Arm extending upwards holding pizza */}
          <path
            d="M66 92C71 89 77 84 83 75"
            stroke="#E92C2C"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Mascot Hair/Antenna Tufts (3 red strokes on top left) */}
          <path d="M42 67C40 73 37 80 34 85" stroke="#E92C2C" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M51 64C50 69 48 76 45 81" stroke="#E92C2C" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M59 65C59 70 58 77 56 81" stroke="#E92C2C" strokeWidth="5" strokeLinecap="round" />

          {/* Pizza Slice in Hand */}
          {/* Crust (Red) */}
          <path
            d="M71 77L92 70L87 91Z"
            fill="#FFCA28"
            stroke="#E92C2C"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Pizza Pepperoni dots (Red) */}
          <circle cx="80" cy="78" r="2" fill="#E92C2C" />
          <circle cx="85" cy="80" r="1.8" fill="#E92C2C" />
          <circle cx="82" cy="85" r="1.8" fill="#E92C2C" />
        </g>

        {/* "ASHTAG" Bold Geometric White Letters */}
        <g id="ashtag-text" fill="#FFFFFF">
          {/* A */}
          <path d="M78 94.5H86.5L88 114.5H82.5L82 109H77.5L77 114.5H72L78 94.5ZM78 105.5H81.5L80 99.5L78 105.5Z" />
          {/* S */}
          <path d="M89.5 94.5H98.5V99H94V102H98.5V114.5H89.5V110H94V106.5H89.5V94.5Z" />
          {/* H */}
          <path d="M100.5 94.5H105.5V102H109.5V94.5H114.5V114.5H109.5V106.5H105.5V114.5H100.5V94.5Z" />
          {/* T */}
          <path d="M116 94.5H127V99H123.5V114.5H119V99H116V94.5Z" />
          {/* A */}
          <path d="M129 94.5H137.5L139 114.5H133.5L133 109H128.5L128 114.5H123L129 94.5ZM129 105.5H132.5L131 99.5L129 105.5Z" />
          {/* G */}
          <path d="M140.5 94.5H150.5V99H145.5V110H149V105.5H146.5V102H152.5V114.5H140.5V94.5Z" />
        </g>

        {/* "Pizza" Yellow Script Font */}
        <g id="pizza-script">
          <text
            x="93"
            y="145"
            fill="#FFCA28"
            fontFamily="'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif"
            fontSize="38"
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="1"
          >
            Pizza
          </text>
        </g>
      </svg>
    );
  }

  // Full Brand Lockup with emblem + crisp text
  return (
    <div className={`flex items-center gap-2 sm:gap-3 shrink min-w-0 ${className}`}>
      {/* Official Emblem */}
      <svg
        width={dim.height}
        height={dim.height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 drop-shadow-md hover:scale-105 transition-transform"
      >
        <circle cx="100" cy="100" r="100" fill="#1443B8" />
        <circle cx="100" cy="100" r="97" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />

        {/* Mascot Hashtag Figure */}
        <g id="mascot-hashtag">
          <path d="M51 68C48 88 47 114 51 133" stroke="#E92C2C" strokeWidth="9.5" strokeLinecap="round" />
          <path d="M66 69C66 90 68 113 67 131" stroke="#E92C2C" strokeWidth="9.5" strokeLinecap="round" />
          <path d="M40 98C49 96 66 94 80 91" stroke="#E92C2C" strokeWidth="9.5" strokeLinecap="round" />
          <path d="M39 116C50 114 65 110 75 107" stroke="#E92C2C" strokeWidth="9.5" strokeLinecap="round" />
          <ellipse cx="58.5" cy="90" rx="8.5" ry="7.5" stroke="#E92C2C" strokeWidth="5" fill="none" />
          <path d="M66 92C71 89 77 84 83 75" stroke="#E92C2C" strokeWidth="7" strokeLinecap="round" />
          <path d="M42 67C40 73 37 80 34 85" stroke="#E92C2C" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M51 64C50 69 48 76 45 81" stroke="#E92C2C" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M59 65C59 70 58 77 56 81" stroke="#E92C2C" strokeWidth="5" strokeLinecap="round" />

          {/* Pizza slice */}
          <path d="M71 77L92 70L87 91Z" fill="#FFCA28" stroke="#E92C2C" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="80" cy="78" r="2" fill="#E92C2C" />
          <circle cx="85" cy="80" r="1.8" fill="#E92C2C" />
          <circle cx="82" cy="85" r="1.8" fill="#E92C2C" />
        </g>

        {/* ASHTAG */}
        <g id="ashtag-text" fill="#FFFFFF">
          <path d="M78 94.5H86.5L88 114.5H82.5L82 109H77.5L77 114.5H72L78 94.5ZM78 105.5H81.5L80 99.5L78 105.5Z" />
          <path d="M89.5 94.5H98.5V99H94V102H98.5V114.5H89.5V110H94V106.5H89.5V94.5Z" />
          <path d="M100.5 94.5H105.5V102H109.5V94.5H114.5V114.5H109.5V106.5H105.5V114.5H100.5V94.5Z" />
          <path d="M116 94.5H127V99H123.5V114.5H119V99H116V94.5Z" />
          <path d="M129 94.5H137.5L139 114.5H133.5L133 109H128.5L128 114.5H123L129 94.5ZM129 105.5H132.5L131 99.5L129 105.5Z" />
          <path d="M140.5 94.5H150.5V99H145.5V110H149V105.5H146.5V102H152.5V114.5H140.5V94.5Z" />
        </g>

        {/* Pizza */}
        <text
          x="93"
          y="145"
          fill="#FFCA28"
          fontFamily="'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif"
          fontSize="38"
          fontWeight="bold"
          fontStyle="italic"
        >
          Pizza
        </text>
      </svg>

      {/* Brand Wordmark & Tag */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-0.5 sm:gap-1 font-heading font-extrabold text-sm sm:text-xl tracking-wider leading-none text-white whitespace-nowrap">
          <span className="text-[#E92C2C]">#</span>
          <span>HASHTAG</span>
          <span className="text-[#FFCA28] ml-0.5 sm:ml-1 font-serif italic text-xs sm:text-lg">Pizza</span>
        </div>
        <span className="hidden sm:block text-[10px] text-[#A3B3D4] tracking-widest uppercase mt-0.5 font-medium truncate">
          Since 2022 · Adarshnagar
        </span>
      </div>
    </div>
  );
};
