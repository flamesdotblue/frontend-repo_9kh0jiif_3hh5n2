import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookContent = ({ activeItem }) => {
  return (
    <div className="relative z-10 mx-auto mt-8 max-w-3xl rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:bg-white/10 dark:text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="mb-2 text-center text-2xl font-semibold tracking-tight">
            {activeItem.title}
          </h2>
          <p className="text-center text-base leading-relaxed text-zinc-700 dark:text-zinc-200">
            {activeItem.text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BookContent;
