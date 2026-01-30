import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [stage, setStage] = useState<'name' | 'title' | 'fadeout'>('name');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('title'), 1500);
    const timer2 = setTimeout(() => setStage('fadeout'), 3000);
    const timer3 = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    })
  };

  const name = "Darius Mukoya";
  const title = "Developer • Photographer • First Aider";

  return (
    <AnimatePresence>
      {stage !== 'fadeout' ? (
        <motion.div
          className="fixed inset-0 bg-background flex items-center justify-center z-50 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          
          {/* Animated lines */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            />
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          <div className="relative z-10 text-center px-4">
            {/* Name */}
            <div className="overflow-hidden mb-4">
              <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                {name.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className={char === ' ' ? 'inline-block w-4 md:w-6' : `inline-block ${i >= 6 ? 'text-primary' : ''}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: stage === 'title' ? 1 : 0, 
                y: stage === 'title' ? 0 : 20 
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p className="text-lg md:text-xl text-muted-foreground tracking-widest uppercase">
                {title}
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div 
              className="mt-12 mx-auto max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Floating dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -100],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroScreen;
