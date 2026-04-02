// when adding a library
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Atom, FlaskConical, Calculator, Home, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PeriodicTable from '@/components/PeriodicTable';
import CompoundSelector from '@/components/CompoundSelector';
import ReactionChamber from '@/components/ReactionChamber';
import ReactionVisualizer from '@/components/ReactionVisualizer';
import ReactionResult from '@/components/ReactionResult';
import ReactionHistory from '@/components/ReactionHistory';
import ElementInfoPanel from '@/components/ElementInfoPanel';
import ChemCalculators from '@/components/ChemCalculators';
import { type Element } from '@/data/elements';
import { findReaction, type Reaction } from '@/data/reactions';

const ChemistryIndex = () => {
  const { t } = useTranslation();
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [selectedCompounds, setSelectedCompounds] = useState<string[]>([]);
  const [info, setInfo] = useState<Element | null>(null);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [reacting, setReacting] = useState(false);
  const [history, setHistory] = useState<Reaction[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const [tab, setTab] = useState<'sim' | 'calc'>('sim');

  const handleElementClick = useCallback((el: Element) => {
    setInfo(el);
    setSelectedElements(prev => {
      if (prev.find(e => e.sym === el.sym)) return prev.filter(e => e.sym !== el.sym);
      if (prev.length >= 2) return prev;
      return [...prev, el];
    });
    setNoMatch(false);
  }, []);

  const handleCompoundClick = useCallback((formula: string) => {
    setSelectedCompounds(prev => {
      if (prev.includes(formula)) return prev.filter(f => f !== formula);
      if (prev.length >= 2) return prev;
      return [...prev, formula];
    });
    setNoMatch(false);
  }, []);

  const handleReact = useCallback(() => {
    const reactants = [...selectedElements.map(e => e.sym), ...selectedCompounds];
    const r = findReaction(reactants);
    if (!r) { setNoMatch(true); return; }
    setReacting(true);
    setReaction(r);
    setNoMatch(false);
    setTimeout(() => { setReacting(false); setHistory(p => [r, ...p.slice(0, 29)]); }, 4000);
  }, [selectedElements, selectedCompounds]);

  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-cyan-500/20 backdrop-blur-lg sticky top-0 z-40 bg-black/80 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            <Link to="/" className="flex-shrink-0 flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors" title="Back to home">
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex-shrink-0">
                <Atom className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-glow truncate">{t('chemistry.page_title')}</h1>
                <p className="text-xs sm:text-sm text-cyan-300/60 truncate">{t('chemistry.page_description')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full p-1 sm:p-1.5 md:p-2 border border-cyan-500/20">
            <button 
              onClick={() => setTab('sim')} 
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1 whitespace-nowrap flex-shrink-0 ${
                tab === 'sim' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/30' 
                  : 'text-cyan-300/70 hover:text-cyan-300'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline md:inline">{t('index.tabs.simulator')}</span>
              <span className="sm:hidden">{t('index.tabs.simulator_short')}</span>
            </button>
            <button 
              onClick={() => setTab('calc')} 
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1 whitespace-nowrap flex-shrink-0 ${
                tab === 'calc' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-lg shadow-purple-500/30' 
                  : 'text-purple-300/70 hover:text-purple-300'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline md:inline">{t('index.tabs.calculator')}</span>
              <span className="sm:hidden">{t('index.tabs.calculator_short')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">
        {tab === 'sim' ? (
          <>
            {/* Periodic Table Section */}
            <section className="glass-panel rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-cyan-500/10 w-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <Atom className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">{t('index.sections.periodic_table')}</h2>
                  <p className="text-xs sm:text-sm text-cyan-300/60">{t('index.sections.periodic_table_description')}</p>
                </div>
              </div>
              <div className="w-full overflow-x-auto custom-scrollbar relative">
                {/* Mobile Scroll Hint */}
                <div className="lg:hidden flex items-center justify-center gap-2 mb-2 p-2 bg-cyan-500/10 rounded-lg text-cyan-300/60 text-[10px] uppercase tracking-widest font-bold border border-cyan-500/20">
                  <ArrowRightLeft className="w-3 h-3" /> Swipe Table to View All Elements / اسحب لعرض جميع العناصر
                </div>
                <div className="min-w-[800px] lg:min-w-0">
                  <PeriodicTable onElementClick={handleElementClick} selected={selectedElements.map(e => e.sym)} />
                </div>
              </div>
            </section>

            {/* Compound Selector Section */}
            <div className="w-full overflow-x-auto">
              <CompoundSelector
                onCompoundClick={handleCompoundClick}
                selected={selectedCompounds}
                maxSelection={2}
              />
            </div>

            {/* Main Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* Left Column - Reaction Area */}
              <div className="md:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 w-full">
                <ReactionChamber 
                  elements={selectedElements} 
                  compounds={selectedCompounds}
                  onRemoveElement={sym => { setSelectedElements(p => p.filter(e => e.sym !== sym)); setNoMatch(false); }}
                  onRemoveCompound={formula => { setSelectedCompounds(p => p.filter(f => f !== formula)); setNoMatch(false); }}
                  onReact={handleReact} 
                  reacting={reacting} 
                />

                {noMatch && (
                  <div className="text-center py-6 sm:py-8 rounded-2xl border-2 border-dashed border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-red-500/5">
                    <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-orange-400/60" />
                    <p className="text-xs sm:text-sm text-orange-300/70">{t('chemistry.no_reaction.message')}</p>
                    <p className="text-[0.7rem] sm:text-xs text-orange-300/50 mt-1">{t('chemistry.no_reaction.suggestion')}</p>
                  </div>
                )}

                <ReactionVisualizer reaction={reaction} reacting={reacting} />
                <ReactionResult reaction={reaction} />
              </div>

              {/* Right Column - Info & History */}
              <div className="space-y-4 sm:space-y-6">
                <ElementInfoPanel element={info} onClose={() => setInfo(null)} />
                <ReactionHistory history={history} onSelect={r => { setReaction(r); setReacting(false); }} />
              </div>
            </div>
          </>
        ) : (
          <div className="glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-500/10">
            <ChemCalculators />
          </div>
        )}
      </main>
    </div>
  );
};

export default ChemistryIndex;
