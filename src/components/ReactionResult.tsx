import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FlaskConical, Flame, AlertTriangle, Thermometer, BookOpen, Sparkles } from 'lucide-react';
import { type Reaction } from '@/data/reactions';

const ReactionResult = ({ reaction: r }: { reaction: Reaction | null }) => {
  const { t } = useTranslation();
  if (!r) return null;
  const exo = r.enthalpy < 0;

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 border border-cyan-500/10 backdrop-blur-xl" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Equation */}
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold tracking-wider break-all text-cyan-300 p-3 sm:p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
          {r.balanced}
        </div>
        <motion.span 
          className="inline-block text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t(`chemistry.reaction_types.${r.type}`)} {t('chemistry.reaction')}
        </motion.span>
      </div>

      {/* Products and Energy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Products Section */}
        <motion.div 
          className="space-y-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-bold text-cyan-300">{t('chemistry.products')}</span>
          </div>
          <div className="flex flex-col gap-2">
            {r.products.map((p, i) => (
              <motion.div 
                key={i} 
                className="bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-cyan-100 border border-cyan-500/10 transition-all"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {p}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Energy Section */}
        <motion.div 
          className="space-y-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs sm:text-sm font-bold text-orange-300">{t('chemistry.energy')}</span>
          </div>
          
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-mono font-bold transition-all ${
            exo ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            <Flame className="w-3.5 h-3.5" />
            {r.enthalpy > 0 ? '+' : ''}{r.enthalpy} kJ/mol
            <span className="text-[0.65rem] opacity-70 ml-1">({exo ? 'Exo' : 'Endo'})</span>
          </div>

          {r.temp && (
            <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/5 rounded-lg px-3 py-2 border border-cyan-500/10">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300">{r.temp}</span>
            </div>
          )}

          {r.catalyst && (
            <div className="flex items-center gap-2 text-xs sm:text-sm bg-purple-500/20 rounded-lg px-3 py-2 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-purple-300">{r.catalyst}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Description */}
      <motion.div 
        className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300">{t('chemistry.about_reaction')}</span>
        </div>
        <p className="text-xs sm:text-sm text-cyan-200/80 leading-relaxed">{r.desc}</p>
      </motion.div>

      {/* Real World Use */}
      <motion.div 
        className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-green-400 font-bold">{t('chemistry.real_world_use')}: </span>
        <span className="text-green-300/80">{r.realUse}</span>
      </motion.div>

      {/* Safety Warning */}
      {r.safety && (
        <motion.div 
          className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 shrink-0" />
          <span className="text-xs sm:text-sm text-red-300 font-semibold">{r.safety}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReactionResult;
