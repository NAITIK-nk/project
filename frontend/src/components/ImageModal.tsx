import React from 'react';

const ImageModal: React.FC<{ src: string; alt?: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-white text-3xl">×</button>
      <div className="max-w-6xl w-full max-h-full overflow-hidden">
        <img src={src} alt={alt} className="w-full h-auto object-contain max-h-[90vh] mx-auto rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default ImageModal;
