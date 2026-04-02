import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Beaker, Flame, Thermometer, Droplets, Zap, FlaskConical, Atom, Scale, TestTubes, Activity, Gauge } from 'lucide-react';
import * as calc from '@/data/chemCalc';

type CalcId = 'ph' | 'molarity' | 'moles' | 'dilution' | 'gas' | 'gibbs' | 'keq' | 'nernst' | 'arrhenius' | 'bpe' | 'fpd' | 'osmotic' | 'hh' | 'molality' | 'pcomp' | 'activity' | 'bonds' | 'potentials' | 'solubility' | 'polyatomic';

const calcs: { id: CalcId; nameKey: string; icon: React.ReactNode; descKey: string }[] = [
  { id: 'ph', nameKey: 'calc.ph.name', icon: <Droplets className="w-4 h-4" />, descKey: 'calc.ph.desc' },
  { id: 'molarity', nameKey: 'calc.molarity.name', icon: <Beaker className="w-4 h-4" />, descKey: 'calc.molarity.desc' },
  { id: 'moles', nameKey: 'calc.moles.name', icon: <Scale className="w-4 h-4" />, descKey: 'calc.moles.desc' },
  { id: 'dilution', nameKey: 'calc.dilution.name', icon: <TestTubes className="w-4 h-4" />, descKey: 'calc.dilution.desc' },
  { id: 'gas', nameKey: 'calc.gas.name', icon: <Gauge className="w-4 h-4" />, descKey: 'calc.gas.desc' },
  { id: 'gibbs', nameKey: 'calc.gibbs.name', icon: <Flame className="w-4 h-4" />, descKey: 'calc.gibbs.desc' },
  { id: 'keq', nameKey: 'calc.keq.name', icon: <Activity className="w-4 h-4" />, descKey: 'calc.keq.desc' },
  { id: 'nernst', nameKey: 'calc.nernst.name', icon: <Zap className="w-4 h-4" />, descKey: 'calc.nernst.desc' },
  { id: 'arrhenius', nameKey: 'calc.arrhenius.name', icon: <Thermometer className="w-4 h-4" />, descKey: 'calc.arrhenius.desc' },
  { id: 'bpe', nameKey: 'calc.bpe.name', icon: <Thermometer className="w-4 h-4" />, descKey: 'calc.bpe.desc' },
  { id: 'fpd', nameKey: 'calc.fpd.name', icon: <Thermometer className="w-4 h-4" />, descKey: 'calc.fpd.desc' },
  { id: 'osmotic', nameKey: 'calc.osmotic.name', icon: <Gauge className="w-4 h-4" />, descKey: 'calc.osmotic.desc' },
  { id: 'hh', nameKey: 'calc.hh.name', icon: <FlaskConical className="w-4 h-4" />, descKey: 'calc.hh.desc' },
  { id: 'molality', nameKey: 'calc.molality.name', icon: <Beaker className="w-4 h-4" />, descKey: 'calc.molality.desc' },
  { id: 'pcomp', nameKey: 'calc.pcomp.name', icon: <Atom className="w-4 h-4" />, descKey: 'calc.pcomp.desc' },
  { id: 'bonds', nameKey: 'calc.bonds.name', icon: <Zap className="w-4 h-4" />, descKey: 'calc.bonds.desc' },
  { id: 'potentials', nameKey: 'calc.potentials.name', icon: <Zap className="w-4 h-4" />, descKey: 'calc.potentials.desc' },
  { id: 'solubility', nameKey: 'calc.solubility.name', icon: <Droplets className="w-4 h-4" />, descKey: 'calc.solubility.desc' },
  { id: 'polyatomic', nameKey: 'calc.polyatomic.name', icon: <Atom className="w-4 h-4" />, descKey: 'calc.polyatomic.desc' },
  { id: 'activity', nameKey: 'calc.activity.name', icon: <Scale className="w-4 h-4" />, descKey: 'calc.activity.desc' },
];

const Input = ({ label, value, onChange, unit }: { label: string; value: string; onChange: (v: string) => void; unit?: string }) => (
  <div>
    <label className="text-xs font-bold text-cyan-300/80 block mb-2 uppercase tracking-wider">{label}</label>
    <div className="flex items-center gap-2">
      <input 
        type="number" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full bg-white/5 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-sm font-mono text-cyan-300 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all hover:border-cyan-500/30"
        placeholder="0"
      />
      {unit && <span className="text-xs text-cyan-300/60 font-mono whitespace-nowrap font-semibold">{unit}</span>}
    </div>
  </div>
);

const Result = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-4 py-3.5">
    <div className="text-xs font-bold text-cyan-300/70 uppercase tracking-wider mb-1">{label}</div>
    <div className="text-base sm:text-lg font-mono font-bold text-cyan-300">{value}</div>
  </div>
);

const PHCalc = () => {
  const [h, setH] = useState('0.001');
  const ph = calc.calcPH(Number(h) || 1e-7);
  const poh = calc.phToPOH(ph);
  const oh = calc.pohToOHConc(poh);
  return (
    <div className="space-y-2">
      <Input label="[H⁺] concentration (mol/L)" value={h} onChange={setH} unit="M" />
      <div className="grid grid-cols-2 gap-2">
        <Result label="pH" value={ph.toFixed(3)} />
        <Result label="pOH" value={poh.toFixed(3)} />
        <Result label="[H⁺]" value={Number(h).toExponential(3)} />
        <Result label="[OH⁻]" value={oh.toExponential(3)} />
      </div>
      <div className="text-[0.55rem] text-muted-foreground">
        {ph < 7 ? '🔴 Acidic' : ph > 7 ? '🔵 Basic' : '🟢 Neutral'}
        <div className="mt-1 w-full h-3 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 relative">
          <div className="absolute top-0 h-3 w-1 bg-foreground rounded-full" style={{ left: `${(ph / 14) * 100}%` }} />
        </div>
        <div className="flex justify-between text-[0.5rem]"><span>0 Acidic</span><span>7</span><span>14 Basic</span></div>
      </div>
    </div>
  );
};

const MolarityCalc = () => {
  const [mol, setMol] = useState('0.5');
  const [vol, setVol] = useState('1');
  const m = calc.calcMolarity(Number(mol) || 0, Number(vol) || 1);
  return (
    <div className="space-y-2">
      <Input label="Moles of solute" value={mol} onChange={setMol} unit="mol" />
      <Input label="Volume of solution" value={vol} onChange={setVol} unit="L" />
      <Result label="Molarity (M)" value={m.toFixed(4) + ' mol/L'} />
    </div>
  );
};

const MolesCalc = () => {
  const [mass, setMass] = useState('18');
  const [mm, setMM] = useState('18.015');
  const n = calc.calcMoles(Number(mass) || 0, Number(mm) || 1);
  return (
    <div className="space-y-2">
      <Input label="Mass" value={mass} onChange={setMass} unit="g" />
      <Input label="Molar mass" value={mm} onChange={setMM} unit="g/mol" />
      <Result label="Moles" value={n.toFixed(4) + ' mol'} />
    </div>
  );
};

const DilutionCalc = () => {
  const [m1, setM1] = useState('1');
  const [v1, setV1] = useState('0.1');
  const [v2, setV2] = useState('1');
  const m2 = calc.dilution(Number(m1) || 0, Number(v1) || 0, undefined, Number(v2) || 1);
  return (
    <div className="space-y-2">
      <Input label="M₁ (initial concentration)" value={m1} onChange={setM1} unit="M" />
      <Input label="V₁ (initial volume)" value={v1} onChange={setV1} unit="L" />
      <Input label="V₂ (final volume)" value={v2} onChange={setV2} unit="L" />
      <Result label="M₂ (final concentration)" value={m2.toFixed(4) + ' M'} />
    </div>
  );
};

const GasCalc = () => {
  const [p, setP] = useState('1');
  const [v, setV] = useState('');
  const [n, setN] = useState('1');
  const [t, setT] = useState('273.15');
  const result = calc.idealGas(Number(p) || undefined, Number(v) || undefined, Number(n) || undefined, Number(t) || undefined);
  return (
    <div className="space-y-2">
      <Input label="Pressure (leave blank to solve)" value={p} onChange={setP} unit="atm" />
      <Input label="Volume (leave blank to solve)" value={v} onChange={setV} unit="L" />
      <Input label="Moles (leave blank to solve)" value={n} onChange={setN} unit="mol" />
      <Input label="Temperature (leave blank to solve)" value={t} onChange={setT} unit="K" />
      <div className="grid grid-cols-2 gap-2">
        <Result label="P" value={result.P.toFixed(3) + ' atm'} />
        <Result label="V" value={result.V.toFixed(3) + ' L'} />
        <Result label="n" value={result.n.toFixed(4) + ' mol'} />
        <Result label="T" value={result.T.toFixed(2) + ' K'} />
      </div>
    </div>
  );
};

const GibbsCalc = () => {
  const [dh, setDH] = useState('-285.8');
  const [t, setT] = useState('298.15');
  const [ds, setDS] = useState('-0.1636');
  const dg = calc.gibbsFreeEnergy(Number(dh) * 1000, Number(t), Number(ds) * 1000);
  return (
    <div className="space-y-2">
      <Input label="ΔH" value={dh} onChange={setDH} unit="kJ/mol" />
      <Input label="T" value={t} onChange={setT} unit="K" />
      <Input label="ΔS" value={ds} onChange={setDS} unit="kJ/(mol·K)" />
      <Result label="ΔG" value={(dg / 1000).toFixed(2) + ' kJ/mol'} />
      <div className="text-[0.55rem] text-muted-foreground">{dg < 0 ? '✅ Spontaneous' : '❌ Non-spontaneous'}</div>
    </div>
  );
};

const KeqCalc = () => {
  const [dg, setDG] = useState('-237.1');
  const [t, setT] = useState('298.15');
  const k = calc.equilibriumConstant(Number(dg) * 1000, Number(t));
  return (
    <div className="space-y-2">
      <Input label="ΔG" value={dg} onChange={setDG} unit="kJ/mol" />
      <Input label="T" value={t} onChange={setT} unit="K" />
      <Result label="K (equilibrium constant)" value={k > 1e6 ? k.toExponential(3) : k.toFixed(4)} />
      <div className="text-[0.55rem] text-muted-foreground">{k > 1 ? '→ Products favored' : '← Reactants favored'}</div>
    </div>
  );
};

const NernstCalc = () => {
  const [e0, setE0] = useState('1.10');
  const [n, setN] = useState('2');
  const [q, setQ] = useState('1');
  const [t, setT] = useState('298.15');
  const e = calc.nernstPotential(Number(e0), Number(n) || 1, Number(q) || 1, Number(t) || 298.15);
  return (
    <div className="space-y-2">
      <Input label="E° (standard potential)" value={e0} onChange={setE0} unit="V" />
      <Input label="n (electrons transferred)" value={n} onChange={setN} />
      <Input label="Q (reaction quotient)" value={q} onChange={setQ} />
      <Input label="T" value={t} onChange={setT} unit="K" />
      <Result label="E (cell potential)" value={e.toFixed(4) + ' V'} />
    </div>
  );
};

const ArrheniusCalc = () => {
  const [a, setA] = useState('1e13');
  const [ea, setEa] = useState('75000');
  const [t, setT] = useState('298.15');
  const k = calc.arrheniusRate(Number(a), Number(ea), Number(t));
  return (
    <div className="space-y-2">
      <Input label="A (pre-exponential)" value={a} onChange={setA} unit="s⁻¹" />
      <Input label="Ea (activation energy)" value={ea} onChange={setEa} unit="J/mol" />
      <Input label="T" value={t} onChange={setT} unit="K" />
      <Result label="k (rate constant)" value={k.toExponential(4) + ' s⁻¹'} />
    </div>
  );
};

const BPECalc = () => {
  const [i, setI] = useState('1');
  const [kb, setKb] = useState('0.512');
  const [m, setM] = useState('1');
  const dt = calc.boilingPointElevation(Number(i), Number(kb), Number(m));
  return (
    <div className="space-y-2">
      <Input label="i (van't Hoff factor)" value={i} onChange={setI} />
      <Input label="Kb" value={kb} onChange={setKb} unit="°C/m" />
      <Input label="Molality" value={m} onChange={setM} unit="m" />
      <Result label="ΔTb" value={dt.toFixed(3) + ' °C'} />
      <div className="text-[0.55rem] text-muted-foreground">New BP (water): {(100 + dt).toFixed(2)}°C</div>
    </div>
  );
};

const FPDCalc = () => {
  const [i, setI] = useState('1');
  const [kf, setKf] = useState('1.86');
  const [m, setM] = useState('1');
  const dt = calc.freezingPointDepression(Number(i), Number(kf), Number(m));
  return (
    <div className="space-y-2">
      <Input label="i (van't Hoff factor)" value={i} onChange={setI} />
      <Input label="Kf" value={kf} onChange={setKf} unit="°C/m" />
      <Input label="Molality" value={m} onChange={setM} unit="m" />
      <Result label="ΔTf" value={dt.toFixed(3) + ' °C'} />
      <div className="text-[0.55rem] text-muted-foreground">New FP (water): {(0 - dt).toFixed(2)}°C</div>
    </div>
  );
};

const OsmoticCalc = () => {
  const [i, setI] = useState('1');
  const [m, setM] = useState('1');
  const [t, setT] = useState('298.15');
  const pi = calc.osmoticPressure(Number(i), Number(m), Number(t));
  return (
    <div className="space-y-2">
      <Input label="i (van't Hoff factor)" value={i} onChange={setI} />
      <Input label="Molarity" value={m} onChange={setM} unit="M" />
      <Input label="T" value={t} onChange={setT} unit="K" />
      <Result label="π (osmotic pressure)" value={pi.toFixed(3) + ' atm'} />
    </div>
  );
};

const HHCalc = () => {
  const [pka, setPka] = useState('4.76');
  const [a, setA] = useState('0.1');
  const [ha, setHA] = useState('0.1');
  const ph = calc.hendersonHasselbalch(Number(pka), Number(a) || 0.001, Number(ha) || 0.001);
  return (
    <div className="space-y-2">
      <Input label="pKa" value={pka} onChange={setPka} />
      <Input label="[A⁻] (conjugate base)" value={a} onChange={setA} unit="M" />
      <Input label="[HA] (weak acid)" value={ha} onChange={setHA} unit="M" />
      <Result label="pH" value={ph.toFixed(3)} />
    </div>
  );
};

const MolalityCalc = () => {
  const [mol, setMol] = useState('0.5');
  const [kg, setKg] = useState('1');
  const m = calc.calcMolality(Number(mol), Number(kg) || 1);
  return (
    <div className="space-y-2">
      <Input label="Moles of solute" value={mol} onChange={setMol} unit="mol" />
      <Input label="Mass of solvent" value={kg} onChange={setKg} unit="kg" />
      <Result label="Molality" value={m.toFixed(4) + ' mol/kg'} />
    </div>
  );
};

const PCompCalc = () => {
  const [em, setEM] = useState('32');
  const [mm, setMM] = useState('44');
  const pc = calc.percentComposition(Number(em), Number(mm) || 1);
  return (
    <div className="space-y-2">
      <Input label="Mass of element (in 1 mol)" value={em} onChange={setEM} unit="g" />
      <Input label="Molar mass of compound" value={mm} onChange={setMM} unit="g/mol" />
      <Result label="% Composition" value={pc.toFixed(2) + '%'} />
    </div>
  );
};

const BondTable = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-60 overflow-y-auto chem-scroll">
    {Object.entries(calc.bondEnergies).map(([bond, e]) => (
      <div key={bond} className="flex justify-between bg-secondary/30 rounded px-2 py-1 text-[0.6rem] font-mono">
        <span>{bond}</span><span className="text-primary">{e} kJ</span>
      </div>
    ))}
  </div>
);

const PotentialsTable = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-60 overflow-y-auto chem-scroll">
    {Object.entries(calc.standardPotentials).sort((a, b) => a[1] - b[1]).map(([half, e]) => (
      <div key={half} className="flex justify-between bg-secondary/30 rounded px-2 py-1 text-[0.6rem] font-mono">
        <span>{half}</span><span className={e >= 0 ? 'text-chem-green' : 'text-chem-red'}>{e > 0 ? '+' : ''}{e.toFixed(2)} V</span>
      </div>
    ))}
  </div>
);

const SolubilityTable = () => (
  <div className="space-y-1.5 max-h-60 overflow-y-auto chem-scroll">
    {calc.solubilityRules.map((r, i) => (
      <div key={i} className="bg-secondary/30 rounded px-2.5 py-1.5 text-[0.6rem]">
        <div className="flex items-center gap-1.5"><span className={r.soluble ? 'text-chem-green' : 'text-chem-red'}>{r.soluble ? '✓ Soluble' : '✗ Insoluble'}</span><span>{r.rule}</span></div>
        {r.exceptions && <div className="text-muted-foreground ml-4">{r.exceptions}</div>}
      </div>
    ))}
  </div>
);

const PolyatomicTable = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-60 overflow-y-auto chem-scroll">
    {calc.polyatomicIons.map(ion => (
      <div key={ion.formula} className="flex justify-between bg-secondary/30 rounded px-2 py-1.5 text-[0.6rem] font-mono">
        <span>{ion.formula}</span><span className="text-secondary-foreground">{ion.name}</span><span className="text-primary">{ion.charge > 0 ? '+' : ''}{ion.charge}</span>
      </div>
    ))}
  </div>
);

const ActivityTable = () => (
  <div className="space-y-0.5">
    <div className="text-[0.55rem] text-muted-foreground mb-1">Most reactive → Least reactive</div>
    <div className="flex flex-wrap gap-1">
      {calc.activitySeries.map((el, i) => (
        <div key={el} className={`px-2 py-1 rounded text-[0.6rem] font-mono ${i < 6 ? 'bg-chem-red/20 text-chem-red' : i < 12 ? 'bg-chem-yellow/20 text-chem-yellow' : 'bg-chem-green/20 text-chem-green'}`}>
          {el}
        </div>
      ))}
    </div>
  </div>
);

const calcComponents: Record<CalcId, React.FC> = {
  ph: PHCalc, molarity: MolarityCalc, moles: MolesCalc, dilution: DilutionCalc,
  gas: GasCalc, gibbs: GibbsCalc, keq: KeqCalc, nernst: NernstCalc,
  arrhenius: ArrheniusCalc, bpe: BPECalc, fpd: FPDCalc, osmotic: OsmoticCalc,
  hh: HHCalc, molality: MolalityCalc, pcomp: PCompCalc,
  bonds: BondTable, potentials: PotentialsTable, solubility: SolubilityTable,
  polyatomic: PolyatomicTable, activity: ActivityTable,
};

const ChemCalculators = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<CalcId>('ph');
  const ActiveComp = calcComponents[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Calculator list */}
      <div className="lg:col-span-1 glass-panel rounded-2xl p-4 sm:p-5 max-h-[80vh] overflow-y-auto chem-scroll border border-cyan-500/10">
        <div className="flex items-center gap-2.5 mb-4 sticky top-0 bg-black/50 backdrop-blur p-2 -mx-4 px-6 rounded-t-xl">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
            <Calculator className="w-4 h-4 text-cyan-400" />
          </div>
          <h2 className="text-sm font-bold text-white">{t('calc.calculators')}</h2>
          <span className="ml-auto text-xs text-cyan-300/60 font-mono">{calcs.length}</span>
        </div>
        <div className="space-y-1.5">
          {calcs.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-all duration-300 ${
                active === c.id 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40' 
                  : 'hover:bg-white/5 text-cyan-300/70 border border-transparent'
              } group`}
            >
              <span className={`mt-1 transition-transform group-hover:scale-110 ${active === c.id ? 'text-cyan-400' : 'text-cyan-400/60'}`}>{c.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-bold">{t(c.nameKey)}</div>
                <div className="text-[0.6rem] opacity-60 line-clamp-1">{t(c.descKey)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active calculator */}
      <div className="lg:col-span-3 glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-500/10">
        <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-cyan-500/20">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
            {calcs.find(c => c.id === active)?.icon}
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-white">{t(calcs.find(c => c.id === active)?.nameKey || '')}</h3>
        </div>
        <ActiveComp />
      </div>
    </div>
  );
};

export default ChemCalculators;
