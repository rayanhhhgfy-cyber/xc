import { motion, AnimatePresence } from 'framer-motion';
import { type Reaction } from '@/data/reactions';
import { useEffect, useState } from 'react';

interface Props {
  reaction: Reaction | null;
  reacting: boolean;
}

const Particle = ({ color, delay, type }: { color: string; delay: number; type: string }) => {
  const anims: Record<string, any> = {
    bubble: { y: [0, -100], x: [0, (Math.random() - 0.5) * 40], opacity: [0.8, 0], scale: [0.5, 1.5] },
    spark: { x: [0, (Math.random() - 0.5) * 180], y: [0, (Math.random() - 0.5) * 180], opacity: [1, 0], scale: [1, 0] },
    smoke: { y: [0, -70], x: [0, (Math.random() - 0.5) * 50], opacity: [0.5, 0], scale: [0.8, 2.5] },
    fire: { y: [0, -50 - Math.random() * 30], x: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 20], opacity: [1, 0], scale: [1, 0.3] },
    drop: { y: [0, 50 + Math.random() * 30], opacity: [0.8, 0.5], scale: [0.3, 1] },
  };
  const a = anims[type] || anims.spark;
  const sz = type === 'smoke' ? '16px' : type === 'fire' ? '10px' : '7px';
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ backgroundColor: color, width: sz, height: sz, borderRadius: '50%' }}
      initial={{ opacity: 0 }}
      animate={a}
      transition={{ duration: 1.2 + Math.random(), delay, repeat: Infinity, repeatDelay: Math.random() * 0.4 }}
    />
  );
};

const visualToType = (v: string) => {
  if (['explosion', 'spark', 'glow'].includes(v)) return 'spark';
  if (v === 'fire') return 'fire';
  if (['bubbles', 'gas-release'].includes(v)) return 'bubble';
  if (['smoke', 'dissolve'].includes(v)) return 'smoke';
  if (['precipitate', 'crystallize'].includes(v)) return 'drop';
  return 'spark';
};

const ReactionVisualizer = ({ reaction, reacting }: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (reacting) { const t = setTimeout(() => setShow(true), 400); return () => clearTimeout(t); }
    setShow(false);
  }, [reacting]);

  if (!reaction || !reacting) return null;
  const count = reaction.visual === 'explosion' ? 35 : 18;
  const pType = visualToType(reaction.visual);

  return (
    <AnimatePresence>
      <motion.div 
        className="relative w-full h-40 sm:h-52 lg:h-60 rounded-2xl border-2 border-cyan-500/20 overflow-hidden bg-gradient-to-b from-black via-black/80 to-black shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Ambient glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 80px 20px ${reaction.color}40, inset 0 0 60px ${reaction.color}20` }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Visual type label */}
        <motion.div 
          className="absolute top-3 left-3 z-20 text-xs sm:text-sm font-mono font-bold px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/30 text-cyan-400 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {reaction.visual.toUpperCase().replace('-', ' ')}
        </motion.div>

        {/* Particles container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {show && Array.from({ length: count }).map((_, i) => (
            <Particle key={i} color={reaction.color} delay={i * 0.06} type={pType} />
          ))}
        </div>

        {/* Explosion burst */}
        {reaction.visual === 'explosion' && (
          <>
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{ borderColor: reaction.color, width: 50, height: 50 }}
              animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{ borderColor: reaction.color, width: 70, height: 70 }}
              animate={{ scale: [0, 2, 0], opacity: [1, 0.5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
            />
          </>
        )}

        {/* Color change effect */}
        {reaction.visual === 'color-change' && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0"
            style={{ backgroundColor: reaction.color }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2.5 }}
          />
        )}

        {/* Light rays */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${reaction.color}40 0%, transparent 70%)`
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ReactionVisualizer;
