import { elements, ptGrid, catColor, type Element } from '@/data/elements';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onElementClick: (el: Element) => void;
  selected: string[];
}

const PeriodicTable = ({ onElementClick, selected }: Props) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<number | null>(null);
  
  const elMap = useMemo(() => {
    const m = new Map<number, Element>();
    elements.forEach(e => m.set(e.z, e));
    return m;
  }, []);

  return (
    <div className="w-full overflow-x-auto chem-scroll pb-4">
      <div className="w-full">
        {ptGrid.map((row, ri) => {
          // Skip empty gap row
          if (ri === 7) return <div key={ri} className="h-3 sm:h-4" />;
          
          return (
            <div key={ri} className="grid periodic-table-row gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
              {row.map((z, ci) => {
                if (z === null) return <div key={ci} />;
                const el = elMap.get(z);
                if (!el) return <div key={ci} />;
                const isSel = selected.includes(el.sym);
                const isHov = hovered === z;

                return (
                  <button
                    key={ci}
                    onClick={() => onElementClick(el)}
                    onMouseEnter={() => setHovered(z)}
                    onMouseLeave={() => setHovered(null)}
                    className={`elem-cell transition-all duration-200 ${catColor[el.cat]} ${
                      isSel 
                        ? 'ring-2 ring-cyan-400 scale-110 shadow-lg shadow-cyan-500/40 z-20' 
                        : isHov 
                        ? 'scale-105 shadow-lg shadow-white/20 z-10'
                        : 'shadow-md'
                    } hover:brightness-110 border border-white/20 hover:border-white/40`}
                    title={`${el.name} (${el.sym}) - ${el.mass}`}
                  >
                    <span className="text-[0.35rem] sm:text-[0.45rem] opacity-50 font-mono leading-none">{el.z}</span>
                    <span className="text-[0.5rem] sm:text-[0.65rem] font-bold leading-none">{el.sym}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-2 mt-4 sm:mt-6 pt-4 border-t border-white/10">
        <span className="text-xs text-cyan-300/60 w-full font-semibold">{t('periodic.categories')}:</span>
        {(Object.entries(catColor) as [string, string][]).map(([cat, cls]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-md ${cls} border border-white/20`} />
            <span className="text-[0.65rem] sm:text-xs text-cyan-300/70">{t(`elements.categories.${cat}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
