// LogoLoop.tsx
import React from "react";
import { motion } from "framer-motion";

interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 80,
  logoHeight = 60,
  gap = 40,
}) => {
  // total width (just for animation distance)
  const totalWidth = logos.length * (logoHeight * 1.5 + gap);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: logoHeight + 40 }}
    >
      {/* Scrolling track */}
      <motion.div
        className="flex items-center absolute top-1/2 -translate-y-1/2 z-20"
        style={{
          gap: `${gap}px`,
          width: totalWidth * 2,
        }}
        initial={{ x: 0 }}
        animate={{ x: -totalWidth }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: totalWidth / speed,
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-shrink-0"
            style={{
              minWidth: logoHeight * 1.5,
              height: logoHeight,
            }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="object-contain opacity-80 hover:opacity-100 transition duration-300"
                  style={{ height: logoHeight, maxWidth: logoHeight * 1.5 }}
                />
              </a>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain opacity-80 hover:opacity-100 transition duration-300"
                style={{ height: logoHeight, maxWidth: logoHeight * 1.5 }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoLoop;
