import React, { useState } from 'react';
import BackgroundBook from './components/BackgroundBook';
import OverlayGradient from './components/OverlayGradient';
import SilhouetteScroller from './components/SilhouetteScroller';
import BookContent from './components/BookContent';

const items = [
  {
    id: 'tree',
    icon: 'tree',
    title: 'Whispering Grove',
    text:
      'A quiet woodland where every leaf keeps a secret. As the wind passes, the pages turn to tales of patience, roots, and renewal.',
  },
  {
    id: 'castle',
    icon: 'castle',
    title: 'Keep of Echoes',
    text:
      'Stone remembers. Within these walls, footsteps of founders guide the brave through riddles of time and duty.',
  },
  {
    id: 'cat',
    icon: 'cat',
    title: 'Midnight Familiar',
    text:
      'Silent paws trace the margins. Between lines and lanternlight, curiosity unravels into wonder.',
  },
  {
    id: 'ship',
    icon: 'ship',
    title: 'Starbound Sails',
    text:
      'Across ink-dark seas, a mast stitches constellations into a map. Every horizon is an invitation.',
  },
  {
    id: 'hero',
    icon: 'hero',
    title: 'The Reader',
    text:
      'You are the traveler. The book opens for your imagination, and the story follows where your eyes wander.',
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[Math.max(0, Math.min(items.length - 1, activeIndex))];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white">
      <BackgroundBook />
      <OverlayGradient />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight drop-shadow-sm sm:text-5xl">Stories in Motion</h1>
          <p className="mt-2 text-white/80">Scroll the silhouettes to change the tale on the open book.</p>
        </header>

        <SilhouetteScroller
          items={items}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
        />

        <BookContent activeItem={activeItem} />

        <footer className="mt-8 text-xs text-white/60">
          Tip: Drag or click a silhouette to switch chapters.
        </footer>
      </main>
    </div>
  );
}
