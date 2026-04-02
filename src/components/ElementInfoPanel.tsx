import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Atom, Thermometer, Droplets, Zap, Weight, Layers } from 'lucide-react';
import { type Element, catLabel, catColor } from '@/data/elements';
import { getReactionsForElement } from '@/data/reactions';

const ElementInfoPanel = ({ element: el, onClose }: { element: Element | null; onClose: () => void }) => {
  const { t } = useTranslation();
  if (!el) return null;
  const rxns = getReactionsForElement(el.sym);

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 border border-blue-500/10 backdrop-blur-xl"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${catColor[el.cat]} flex flex-col items-center justify-center border-2 border-white/10 shadow-lg`}>
            <span className="text-[0.45rem] sm:text-xs opacity-60 font-mono font-bold">{el.z}</span>
            <span className="text-2xl sm:text-3xl font-black">{el.sym}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white">{el.name}</h3>
            <span className="text-xs sm:text-sm text-blue-300/70">{t(`elements.categories.${el.cat}`)}</span>
          </div>
        </div>
        <motion.button 
          onClick={onClose} 
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg text-blue-300/60">✕</span>
        </motion.button>
      </div>

      <p className="text-xs sm:text-sm text-blue-200/60 leading-relaxed">{el.desc}</p>

      {/* Properties Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <Stat icon={<Weight className="w-4 h-4" />} label={t('chemistry.element_info.mass')} value={`${el.mass}`} />
        {el.en !== null && <Stat icon={<Zap className="w-4 h-4" />} label={t('chemistry.element_info.electronegativity')} value={String(el.en)} />}
        {el.mp !== null && <Stat icon={<Thermometer className="w-4 h-4" />} label={t('chemistry.element_info.melting_point')} value={`${el.mp}°C`} />}
        {el.bp !== null && <Stat icon={<Droplets className="w-4 h-4" />} label={t('chemistry.element_info.boiling_point')} value={`${el.bp}°C`} />}
        <Stat icon={<Atom className="w-4 h-4" />} label={t('chemistry.element_info.config')} value={el.econf} small />
        <Stat icon={<Layers className="w-4 h-4" />} label={t('chemistry.element_info.phase')} value={el.phase} />
      </div>

      {/* Oxidation States */}
      {el.ox.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-xs font-bold text-blue-300 mb-2">{t('chemistry.element_info.oxidation_states')}</div>
          <div className="flex gap-2 flex-wrap">
            {el.ox.map((s, i) => (
              <motion.span 
                key={s} 
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {s > 0 ? `+${s}` : s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Reactions */}
      {rxns.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs font-bold text-blue-300 mb-2">{t('chemistry.element_info.related_reactions')} ({rxns.length})</div>
          <div className="space-y-1.5 max-h-28 overflow-y-auto chem-scroll">
            {rxns.slice(0, 5).map((r, i) => (
              <motion.div 
                key={r.id}
                className="text-xs font-mono bg-blue-500/10 border border-blue-500/20 rounded-lg px-2.5 py-1.5 text-blue-300/80 truncate hover:bg-blue-500/20 transition-colors"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {r.balanced}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Stat = ({ icon, label, value, small }: { icon: React.ReactNode; label: string; value: string; small?: boolean }) => (
  <motion.div 
    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-2 sm:p-3 flex items-center gap-2 border border-blue-500/20 hover:border-blue-500/40 transition-colors"
    whileHover={{ scale: 1.05 }}
  >
    <span className="text-blue-400">{icon}</span>
    <div>
      <div className="text-[0.65rem] text-blue-300/60 font-semibold uppercase">{label}</div>
      <div className={`font-mono font-bold ${small ? 'text-xs' : 'text-sm'} text-blue-300`}>{value}</div>
    </div>
  </motion.div>
);

export default ElementInfoPanel;
