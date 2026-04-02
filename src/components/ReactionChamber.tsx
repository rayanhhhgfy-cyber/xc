import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Beaker, X, Zap } from 'lucide-react';
import { type Element, catColor } from '@/data/elements';
import { preAddedCompounds } from '@/data/reactions';

interface Props {
  elements: Element[];
  compounds: string[];
  onRemoveElement: (sym: string) => void;
  onRemoveCompound: (formula: string) => void;
  onReact: () => void;
  reacting: boolean;
}

const ReactionChamber = ({ elements: els, compounds: comps, onRemoveElement, onRemoveCompound, onReact, reacting }: Props) => {
  const { t } = useTranslation();
  const allReactants = [...els, ...comps.map(formula => ({ formula, isCompound: true }))];

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden border border-cyan-500/10 backdrop-blur-xl">
      {reacting && (
        <>
          <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div className="absolute inset-0 border-2 border-cyan-500/30 rounded-2xl" animate={{ scale: [0.9, 1.05, 0.9] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </>
      )}
      
      <div className="flex items-center gap-3 mb-4 sm:mb-6 relative z-10">
        <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
          <Beaker className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">{t('chemistry.reaction_chamber.title')}</h3>
          <p className="text-xs text-cyan-300/60">{t('chemistry.reaction_chamber.description')}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 min-h-[140px] sm:min-h-[160px] flex-wrap relative z-10">
        <AnimatePresence mode="popLayout">
          {allReactants.map((reactant, i) => {
            const isCompound = 'isCompound' in reactant;
            const key = isCompound ? reactant.formula : reactant.sym;
            
            return (
              <motion.div key={key} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ type: 'spring', stiffness: 200 }} className="relative">
                {i > 0 && (
                  <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2">
                    <span className="text-cyan-400/60 font-bold text-xl sm:text-2xl">+</span>
                  </div>
                )}
                <motion.div
                  className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                    isCompound 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 shadow-lg hover:shadow-xl'
                      : `${catColor[reactant.cat]} shadow-lg hover:shadow-xl`
                  }`}
                  animate={reacting ? { rotate: [0, 5, -5, 0], y: [0, -8, 0], scale: [1, 1.08, 1] } : { scale: 1, rotate: 0 }}
                  transition={reacting ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : {}}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.button 
                    onClick={() => isCompound ? onRemoveCompound(reactant.formula) : onRemoveElement(reactant.sym)} 
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-1 hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </motion.button>
                  <span className="text-xl sm:text-2xl font-black leading-none">
                    {isCompound ? reactant.formula : reactant.sym}
                  </span>
                  <span className="text-[0.6rem] sm:text-xs opacity-70 mt-0.5 text-center font-medium max-w-full truncate px-1">
                    {isCompound 
                      ? preAddedCompounds.find(c => c.formula === reactant.formula)?.name || reactant.formula
                      : reactant.name
                    }
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {allReactants.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
            <Beaker className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400/40" />
            <p className="text-xs sm:text-sm text-cyan-300/60 text-center max-w-xs">{t('chemistry.reaction_chamber.empty_state')}</p>
          </motion.div>
        )}
      </div>

      {allReactants.length >= 2 && (
        <motion.div className="flex justify-center mt-5 sm:mt-6 relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <motion.button
            onClick={onReact} 
            disabled={reacting}
            className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={!reacting ? { scale: 1.08, y: -2 } : {}} 
            whileTap={!reacting ? { scale: 0.95 } : {}}
          >
            <Zap className="w-5 h-5" />
            <span>{reacting ? 'Reacting...' : t('chemistry.reaction_chamber.button')}</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ReactionChamber;
