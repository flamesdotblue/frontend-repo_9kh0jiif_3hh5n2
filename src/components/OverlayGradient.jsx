import React from 'react';

const OverlayGradient = () => {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/60 to-transparent" />
    </>
  );
};

export default OverlayGradient;
