import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Beaker, Search, X } from 'lucide-react';
import { preAddedCompounds } from '@/data/reactions';

interface Props {
  onCompoundClick: (formula: string) => void;
  selected: string[];
  maxSelection?: number;
}

const CompoundSelector = ({ onCompoundClick, selected, maxSelection = 2 }: Props) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group compounds by category
  const categories = {
    'all': t('compound.categories.all'),
    'acids': t('compound.categories.acids'),
    'bases': t('compound.categories.bases'),
    'salts': t('compound.categories.salts'),
    'oxides': t('compound.categories.oxides'),
    'organic': t('compound.categories.organic'),
    'gases': t('compound.categories.gases'),
    'metals': t('compound.categories.metals'),
    'halides': t('compound.categories.halides'),
    'carbonates': t('compound.categories.carbonates'),
    'sulfates': t('compound.categories.sulfates'),
    'nitrates': t('compound.categories.nitrates'),
    'hydroxides': t('compound.categories.hydroxides'),
    'peroxides': t('compound.categories.peroxides'),
    'complexes': t('compound.categories.complexes')
  };

  const getCategory = (formula: string, name: string): string => {
    if (formula.includes('H') && (formula.includes('O') || formula.includes('Cl') || formula.includes('NO3') || formula.includes('SO4')) && !formula.includes('OH')) {
      return 'acids';
    }
    if (name.toLowerCase().includes('hydroxide') || name.toLowerCase().includes('oxide') && name.toLowerCase().includes('sodium') || name.toLowerCase().includes('potassium') || name.toLowerCase().includes('calcium') || name.toLowerCase().includes('magnesium')) {
      return 'bases';
    }
    if (name.toLowerCase().includes('chloride') || name.toLowerCase().includes('bromide') || name.toLowerCase().includes('iodide') || name.toLowerCase().includes('fluoride')) {
      return 'halides';
    }
    if (name.toLowerCase().includes('oxide')) {
      return 'oxides';
    }
    if (name.toLowerCase().includes('carbonate') || name.toLowerCase().includes('bicarbonate')) {
      return 'carbonates';
    }
    if (name.toLowerCase().includes('sulfate')) {
      return 'sulfates';
    }
    if (name.toLowerCase().includes('nitrate')) {
      return 'nitrates';
    }
    if (name.toLowerCase().includes('hydroxide')) {
      return 'hydroxides';
    }
    if (name.toLowerCase().includes('peroxide')) {
      return 'peroxides';
    }
    if (formula.includes('C') && !formula.includes('CO') && !formula.includes('CO2')) {
      return 'organic';
    }
    if (name.toLowerCase().includes('gas') || formula === 'O2' || formula === 'N2' || formula === 'H2' || formula === 'CO' || formula === 'CO2' || formula === 'NO' || formula === 'NO2' || formula === 'N2O' || formula === 'SO2' || formula === 'SO3' || formula === 'H2S' || formula === 'PH3' || formula === 'SiH4') {
      return 'gases';
    }
    if (formula.includes('Na') || formula.includes('K') || formula.includes('Ca') || formula.includes('Mg') || formula.includes('Al') || formula.includes('Fe') || formula.includes('Cu') || formula.includes('Zn') || formula.includes('Ag') || formula.includes('Pb') || formula.includes('Hg') || formula.includes('Sn')) {
      return 'metals';
    }
    if (formula.includes('[') || formula.includes(']') || formula.includes('+') || formula.includes('-')) {
      return 'complexes';
    }
    return 'salts';
  };

  const filteredCompounds = preAddedCompounds.filter(compound => {
    const matchesSearch = compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compound.formula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getCategory(compound.formula, compound.name) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-500/10">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <Beaker className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{t('chemistry.compound_library.title')}</h2>
          <p className="text-xs sm:text-sm text-purple-300/60">{t('chemistry.compound_library.description')}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
          <input
            type="text"
            placeholder={t('chemistry.compound_library.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/60 focus:border-cyan-400 focus:outline-none transition-colors"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
        >
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Selected Compounds */}
      {selected.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-sm font-semibold text-white mb-2">{t('chemistry.compound_library.selected_label')}</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(formula => {
              const compound = preAddedCompounds.find(c => c.formula === formula);
              return (
                <div key={formula} className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-white">{compound?.formula}</span>
                  <button
                    onClick={() => onCompoundClick(formula)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Compound Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
        {filteredCompounds.map((compound) => {
          const isSelected = selected.includes(compound.formula);
          const canSelect = !isSelected && selected.length < maxSelection;

          return (
            <button
              key={compound.formula}
              onClick={() => canSelect && onCompoundClick(compound.formula)}
              disabled={!canSelect && !isSelected}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg shadow-purple-500/20'
                  : canSelect
                    ? 'bg-black/40 border-cyan-500/30 hover:border-purple-400 hover:bg-purple-500/10'
                    : 'bg-black/20 border-gray-600/30 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="text-sm font-bold text-white mb-1">{compound.formula}</div>
              <div className="text-xs text-cyan-300/70 line-clamp-2">{compound.name}</div>
            </button>
          );
        })}
      </div>

      {filteredCompounds.length === 0 && (
        <div className="text-center py-8 text-cyan-400/60">
          {t('chemistry.compound_library.no_match')}
        </div>
      )}
    </div>
  );
};

export default CompoundSelector;