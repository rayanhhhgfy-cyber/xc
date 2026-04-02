import { History, FlaskConical } from 'lucide-react';
import { type Reaction } from '@/data/reactions';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ReactionHistory = ({ history, onSelect }: { history: Reaction[]; onSelect: (r: Reaction) => void }) => {
  const { t } = useTranslation();
  if (history.length === 0) return null;
  return (
    <motion.div 
      className="glass-panel rounded-2xl p-4 sm:p-5 border border-purple-500/10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
          <History className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{t('chemistry.reaction_history.title')}</h3>
          <p className="text-xs text-purple-300/60">{history.length} {history.length !== 1 ? t('chemistry.reaction_history.reaction_count_plural') : t('chemistry.reaction_history.reaction_count_singular')}</p>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto chem-scroll">
        {history.map((r, i) => (
          <motion.button 
            key={`${r.id}-${i}`} 
            onClick={() => onSelect(r)}
            className="w-full flex items-start gap-3 text-left bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 rounded-lg px-3 py-2.5 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ x: 4 }}
          >
            <FlaskConical className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-mono truncate text-purple-300 font-medium">{r.balanced}</p>
              <p className="text-[0.65rem] text-purple-300/50 capitalize">{t(`chemistry.reaction_types.${r.type}`)}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ReactionHistory;
