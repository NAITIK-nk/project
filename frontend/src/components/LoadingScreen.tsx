import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Define a white stroke gradient (flat white) */}
      <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
        <defs xmlns="http://www.w3.org/2000/svg">
          <linearGradient id="solidWhite" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" offset="0" />
            <stop stopColor="#FFFFFF" offset="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated SAMAY letters */}
      <div className="loader-compact">
        {/* S */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="80" width="80" className="letter-svg">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#solidWhite)"
            d="M 50 15 C 50 10 45 5 35 5 C 25 5 15 10 15 20 C 15 28 22 32 32 32 C 42 32 50 36 50 44 C 50 54 40 59 30 59 C 20 59 14 54 14 49"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* A */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="80" width="80" className="letter-svg">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#solidWhite)"
            d="M 15 59 L 32 5 L 49 59 M 22 40 L 42 40"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* M */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="80" width="80" className="letter-svg">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#solidWhite)"
            d="M 12 59 L 12 5 L 32 35 L 52 5 L 52 59"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* A */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="80" width="80" className="letter-svg">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#solidWhite)"
            d="M 15 59 L 32 5 L 49 59 M 22 40 L 42 40"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* Y */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="80" width="80" className="letter-svg">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#solidWhite)"
            d="M 15 5 L 32 32 L 49 5 M 32 32 L 32 59"
            className="dash"
            pathLength="360"
          />
        </svg>
      </div>

      <style>{`
        .loader-compact {
          display: flex;
          align-items: center;
          gap: 0.25rem; /* tighter spacing */
        }

        .letter-svg {
          display: inline-block;
        }

        .dash {
          animation: dashArray 2s ease-in-out infinite, dashOffset 2s linear infinite;
        }

        @keyframes dashArray {
          0%   { stroke-dasharray: 0 1 359 0; }
          50%  { stroke-dasharray: 0 359 1 0; }
          100% { stroke-dasharray: 359 1 0 0; }
        }

        @keyframes dashOffset {
          0%   { stroke-dashoffset: 365; }
          100% { stroke-dashoffset: 5; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
