import React, { useEffect, useMemo, useRef } from 'react';

const Silhouette = ({ type, active }) => {
  const common = 'transition-all duration-300';
  const fill = active ? 'fill-white drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]' : 'fill-black/70 dark:fill-white/70';
  const scale = active ? 'scale-110' : 'scale-100';

  // Simple, stylized silhouettes built with basic shapes for reliability
  switch (type) {
    case 'tree':
      return (
        <svg viewBox="0 0 100 100" className={`${common} ${fill} ${scale} h-28 w-28`}>
          <circle cx="50" cy="38" r="28" />
          <rect x="44" y="50" width="12" height="40" rx="2" />
        </svg>
      );
    case 'castle':
      return (
        <svg viewBox="0 0 100 100" className={`${common} ${fill} ${scale} h-28 w-28`}>
          <rect x="10" y="44" width="80" height="46" />
          <rect x="18" y="32" width="12" height="12" />
          <rect x="44" y="24" width="12" height="20" />
          <rect x="70" y="32" width="12" height="12" />
          <path d="M18 32 L24 24 L30 32 Z" />
          <path d="M44 24 L50 16 L56 24 Z" />
          <path d="M70 32 L76 24 L82 32 Z" />
          <rect x="46" y="60" width="8" height="30" />
        </svg>
      );
    case 'cat':
      return (
        <svg viewBox="0 0 100 100" className={`${common} ${fill} ${scale} h-28 w-28`}>
          <ellipse cx="56" cy="64" rx="26" ry="20" />
          <circle cx="34" cy="48" r="12" />
          <path d="M26 42 L30 30 L36 42 Z" />
          <path d="M42 42 L46 30 L52 42 Z" />
          <path d="M80 66 C92 70, 92 86, 80 88" />
        </svg>
      );
    case 'ship':
      return (
        <svg viewBox="0 0 100 100" className={`${common} ${fill} ${scale} h-28 w-28`}>
          <path d="M10 70 L90 70 L80 86 L20 86 Z" />
          <rect x="48" y="24" width="4" height="46" />
          <path d="M52 26 L78 50 L52 50 Z" />
          <path d="M48 26 L22 44 L48 44 Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className={`${common} ${fill} ${scale} h-28 w-28`}>
          <circle cx="50" cy="30" r="12" />
          <rect x="42" y="44" width="16" height="28" rx="4" />
          <rect x="30" y="74" width="14" height="18" rx="3" />
          <rect x="56" y="74" width="14" height="18" rx="3" />
        </svg>
      );
  }
};

const SilhouetteScroller = ({ items, activeIndex, onActiveChange, autoAdvance = true, interval = 3500 }) => {
  const containerRef = useRef(null);
  const itemWidth = 160; // px including gap

  const positions = useMemo(() => items.map((_, i) => i * itemWidth), [items]);

  // Keep scroll position in sync with active index
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: positions[activeIndex] ?? 0, behavior: 'smooth' });
  }, [activeIndex, positions]);

  // Auto-advance
  useEffect(() => {
    if (!autoAdvance) return;
    const id = setInterval(() => {
      onActiveChange((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoAdvance, interval, items.length, onActiveChange]);

  // When user scrolls, compute nearest index
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / itemWidth);
    if (idx !== activeIndex) onActiveChange(idx);
  };

  return (
    <div className="relative z-10">
      <div className="mx-auto mb-2 max-w-4xl px-4 text-center text-sm font-medium uppercase tracking-widest text-white/80">
        Journey of Shadows
      </div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="no-scrollbar mx-auto flex max-w-4xl gap-10 overflow-x-auto px-6 py-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => onActiveChange(i)}
            style={{ scrollSnapAlign: 'center', minWidth: itemWidth - 40 }}
            className={`group grid place-items-center rounded-xl bg-white/10 px-6 py-4 backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none ${
              i === activeIndex ? 'ring-2 ring-white/80' : 'ring-1 ring-white/20'
            }`}
          >
            <Silhouette type={it.icon} active={i === activeIndex} />
            <span className={`mt-3 text-sm font-semibold text-white/80 ${i === activeIndex ? 'opacity-100' : 'opacity-70'}`}>
              {it.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SilhouetteScroller;
