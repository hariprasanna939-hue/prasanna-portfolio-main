import React from 'react';

interface WireframeProps {
  kind: 'recipe' | 'shop' | 'dashboard';
  className?: string;
}

export const Wireframe: React.FC<WireframeProps> = ({
  kind,
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 640 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`text-fg/45 ${className}`}
      aria-hidden="true"
    >
      {/* Browser Window Frame */}
      <rect x="2" y="2" width="636" height="396" rx="12" />
      <line x1="2" y1="42" x2="638" y2="42" />

      {/* Browser Dots */}
      <circle cx="24" cy="22" r="4.5" />
      <circle cx="40" cy="22" r="4.5" />
      <circle cx="56" cy="22" r="4.5" />

      {/* URL Pill */}
      <rect x="90" y="12" width="460" height="20" rx="10" />

      {/* Body Variant: recipe */}
      {kind === 'recipe' && (
        <g>
          {/* Hero Image Box with Mountain Polyline and Sun Circle */}
          <rect x="30" y="60" width="260" height="150" rx="8" />
          <polyline points="50,185 110,120 170,175 220,135 270,185" />
          <circle cx="230" cy="95" r="16" />

          {/* Title & Subtitle lines */}
          <line x1="320" y1="75" x2="520" y2="75" strokeWidth="2.5" />
          <line x1="320" y1="100" x2="440" y2="100" strokeWidth="1.8" />

          {/* 5 Ingredient Bullet Rows */}
          <g>
            <circle cx="330" cy="130" r="3" />
            <line x1="345" y1="130" x2="580" y2="130" />

            <circle cx="330" cy="150" r="3" />
            <line x1="345" y1="150" x2="560" y2="150" />

            <circle cx="330" cy="170" r="3" />
            <line x1="345" y1="170" x2="590" y2="170" />

            <circle cx="330" cy="190" r="3" />
            <line x1="345" y1="190" x2="530" y2="190" />

            <circle cx="330" cy="210" r="3" />
            <line x1="345" y1="210" x2="570" y2="210" />
          </g>

          {/* 3 Thumbnail Cards */}
          <g>
            <rect x="30" y="245" width="180" height="125" rx="8" />
            <line x1="45" y1="335" x2="150" y2="335" />
            <line x1="45" y1="350" x2="110" y2="350" />

            <rect x="230" y="245" width="180" height="125" rx="8" />
            <line x1="245" y1="335" x2="350" y2="335" />
            <line x1="245" y1="350" x2="310" y2="350" />

            <rect x="430" y="245" width="180" height="125" rx="8" />
            <line x1="445" y1="335" x2="550" y2="335" />
            <line x1="445" y1="350" x2="510" y2="350" />
          </g>
        </g>
      )}

      {/* Body Variant: shop */}
      {kind === 'shop' && (
        <g>
          {/* Header Bar with Logo and Cart Pill */}
          <line x1="30" y1="65" x2="120" y2="65" strokeWidth="3" />
          <rect x="520" y="55" width="90" height="24" rx="12" />

          {/* 3x2 Product Grid */}
          {/* Row 1 */}
          <g>
            <rect x="30" y="95" width="180" height="130" rx="8" />
            <rect x="45" y="110" width="150" height="65" rx="4" />
            <line x1="45" y1="190" x2="140" y2="190" />
            <line x1="45" y1="205" x2="100" y2="205" />
            <rect x="150" y="195" width="45" height="16" rx="8" />
          </g>
          <g>
            <rect x="230" y="95" width="180" height="130" rx="8" />
            <rect x="245" y="110" width="150" height="65" rx="4" />
            <line x1="245" y1="190" x2="340" y2="190" />
            <line x1="245" y1="205" x2="300" y2="205" />
            <rect x="350" y="195" width="45" height="16" rx="8" />
          </g>
          <g>
            <rect x="430" y="95" width="180" height="130" rx="8" />
            <rect x="445" y="110" width="150" height="65" rx="4" />
            <line x1="445" y1="190" x2="540" y2="190" />
            <line x1="445" y1="205" x2="500" y2="205" />
            <rect x="550" y="195" width="45" height="16" rx="8" />
          </g>

          {/* Row 2 */}
          <g>
            <rect x="30" y="245" width="180" height="130" rx="8" />
            <rect x="45" y="260" width="150" height="65" rx="4" />
            <line x1="45" y1="340" x2="140" y2="340" />
            <line x1="45" y1="355" x2="100" y2="355" />
            <rect x="150" y="345" width="45" height="16" rx="8" />
          </g>
          <g>
            <rect x="230" y="245" width="180" height="130" rx="8" />
            <rect x="245" y="260" width="150" height="65" rx="4" />
            <line x1="245" y1="340" x2="340" y2="340" />
            <line x1="245" y1="355" x2="300" y2="355" />
            <rect x="350" y="345" width="45" height="16" rx="8" />
          </g>
          <g>
            <rect x="430" y="245" width="180" height="130" rx="8" />
            <rect x="445" y="260" width="150" height="65" rx="4" />
            <line x1="445" y1="340" x2="540" y2="340" />
            <line x1="445" y1="355" x2="500" y2="355" />
            <rect x="550" y="345" width="45" height="16" rx="8" />
          </g>
        </g>
      )}

      {/* Body Variant: dashboard */}
      {kind === 'dashboard' && (
        <g>
          {/* Sidebar */}
          <rect x="15" y="55" width="130" height="330" rx="6" />
          <line x1="30" y1="80" x2="115" y2="80" strokeWidth="2" />
          <line x1="30" y1="110" x2="95" y2="110" />
          <line x1="30" y1="135" x2="105" y2="135" />
          <line x1="30" y1="160" x2="85" y2="160" />
          <line x1="30" y1="185" x2="100" y2="185" />

          {/* Top Controls: Search Pill & Action Pill */}
          <rect x="165" y="55" width="280" height="26" rx="13" />
          <rect x="495" y="55" width="115" height="26" rx="13" />

          {/* 6 Table Rows with Cells and Badge */}
          {[0, 1, 2, 3, 4, 5].map((rowIdx) => {
            const yPos = 100 + rowIdx * 45;
            return (
              <g key={rowIdx}>
                <rect x="165" y={yPos} width="445" height="36" rx="6" />
                <circle cx="185" cy={yPos + 18} r="6" />
                <line x1="205" y1={yPos + 18} x2="280" y2={yPos + 18} />
                <line x1="315" y1={yPos + 18} x2="385" y2={yPos + 18} />
                <line x1="415" y1={yPos + 18} x2="480" y2={yPos + 18} />
                <rect
                  x="530"
                  y={yPos + 10}
                  width="65"
                  height="16"
                  rx="8"
                />
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
};
