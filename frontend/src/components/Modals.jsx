import React, { useEffect } from 'react';
import { IconSquareX } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariant = {
  hidden: { scale: 0.9, opacity: 0, y: 40 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: 40,
    transition: { duration: 0.2 },
  },
};


export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />
          <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                   w-full max-w-lg bg-white dark:bg-neutral-900 rounded-xl shadow-xl"
      >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg
                         transition-colors"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// TrailerModal Component
export function TrailerModal({ isOpen, onClose, trailerUrl, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal Content */}
          <motion.div
            className="relative m-3 z-50 w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl shadow-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg dark:text-white font-semibold">{title}</h3>
              <IconSquareX onClick={onClose} className="w-8 h-8 dark:text-white cursor-pointer p-1 hover:scale-110 transition" stroke={2} />
            </div>
            <div className="p-4">
              {/* Responsive YouTube Embed */}
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={trailerUrl}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -------------------------
// LOGIN MODAL COMPONENT
// -------------------------
export const LoginModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-2xl"
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={onClose}
            >
              <IconSquareX className="w-8 h-8 dark:text-white cursor-pointer p-1 hover:scale-110 transition" stroke={2} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Login to Your Account</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
              >
                Login
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// -------------------------
// REGISTER MODAL COMPONENT
// -------------------------
export const RegisterModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
       <motion.div
       className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
       variants={backdropVariant}
       initial="hidden"
       animate="visible"
       exit="exit"
       onClick={onClose}
     >
       <motion.div
         className="relative w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-2xl"
         variants={modalVariant}
         initial="hidden"
         animate="visible"
         exit="exit"
         onClick={(e) => e.stopPropagation()}
       >
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={onClose}
            >
              <IconSquareX className="w-8 h-8 dark:text-white cursor-pointer p-1 hover:scale-110 transition" stroke={2} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Create an Account</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
              >
                Register
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};