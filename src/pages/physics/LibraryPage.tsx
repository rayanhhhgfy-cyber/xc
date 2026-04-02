import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, Copy, Check } from "lucide-react";

const constants = [
  { name: "Speed of Light", symbol: "c", value: "2.998 × 10⁸", unit: "m/s" },
  { name: "Planck's Constant", symbol: "h", value: "6.626 × 10⁻³⁴", unit: "J·s" },
  { name: "Gravitational Constant", symbol: "G", value: "6.674 × 10⁻¹¹", unit: "N·m²/kg²" },
  { name: "Boltzmann Constant", symbol: "kB", value: "1.381 × 10⁻²³", unit: "J/K" },
  { name: "Elementary Charge", symbol: "e", value: "1.602 × 10⁻¹⁹", unit: "C" },
  { name: "Avogadro's Number", symbol: "NA", value: "6.022 × 10²³", unit: "mol⁻¹" },
  { name: "Gas Constant", symbol: "R", value: "8.314", unit: "J/(mol·K)" },
  { name: "Coulomb's Constant", symbol: "k", value: "8.988 × 10⁹", unit: "N·m²/C²" },
  { name: "Vacuum Permittivity", symbol: "ε₀", value: "8.854 × 10⁻¹²", unit: "F/m" },
  { name: "Vacuum Permeability", symbol: "μ₀", value: "1.257 × 10⁻⁶", unit: "H/m" },
  { name: "Electron Mass", symbol: "me", value: "9.109 × 10⁻³¹", unit: "kg" },
  { name: "Proton Mass", symbol: "mp", value: "1.673 × 10⁻²⁷", unit: "kg" },
  { name: "Stefan-Boltzmann", symbol: "σ", value: "5.670 × 10⁻⁸", unit: "W/(m²·K⁴)" },
  { name: "Rydberg Constant", symbol: "R∞", value: "1.097 × 10⁷", unit: "m⁻¹" },
];

const equations = [
  { category: "Mechanics", items: [
    { name: "Newton's 2nd Law", eq: "F = ma" },
    { name: "Kinetic Energy", eq: "KE = ½mv²" },
    { name: "Gravitational PE", eq: "PE = mgh" },
    { name: "Work-Energy", eq: "W = ΔKE" },
    { name: "Momentum", eq: "p = mv" },
    { name: "Projectile Range", eq: "R = v²sin(2θ)/g" },
  ]},
  { category: "E&M", items: [
    { name: "Coulomb's Law", eq: "F = kq₁q₂/r²" },
    { name: "Ohm's Law", eq: "V = IR" },
    { name: "Electric Field", eq: "E = F/q" },
    { name: "Capacitance", eq: "C = Q/V" },
    { name: "Power", eq: "P = IV" },
  ]},
  { category: "Thermo", items: [
    { name: "Ideal Gas Law", eq: "PV = nRT" },
    { name: "Heat Transfer", eq: "Q = mcΔT" },
    { name: "Entropy", eq: "ΔS = Q/T" },
    { name: "1st Law", eq: "ΔU = Q - W" },
  ]},
  { category: "Waves", items: [
    { name: "Wave Speed", eq: "v = fλ" },
    { name: "Snell's Law", eq: "n₁sinθ₁ = n₂sinθ₂" },
    { name: "Doppler Effect", eq: "f' = f(v±vo)/(v∓vs)" },
  ]},
  { category: "Modern", items: [
    { name: "Energy-Mass", eq: "E = mc²" },
    { name: "Photon Energy", eq: "E = hf" },
    { name: "de Broglie", eq: "λ = h/p" },
    { name: "Time Dilation", eq: "Δt' = γΔt" },
    { name: "Bohr Energy", eq: "Eₙ = -13.6/n² eV" },
    { name: "Heisenberg", eq: "ΔxΔp ≥ ℏ/2" },
  ]},
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="text-muted-foreground hover:text-foreground transition">
      {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function LibraryPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"constants" | "equations">("constants");
  const q = search.toLowerCase();

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 text-gradient-primary">{t('physics.library.page_title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm md:text-base mb-4 xs:mb-5 sm:mb-6 md:mb-8">{t('physics.library.description')}</p>

        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('glossary.search_placeholder')}
              className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-muted border-none text-xs xs:text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-1 glass rounded-lg p-1 flex-shrink-0">
            {(["constants", "equations"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-md text-xs xs:text-sm md:text-base font-medium transition ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {tab === "constants" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">{t('physics.library.name')}</th>
                  <th className="text-left p-3 font-medium">{t('physics.library.symbol')}</th>
                  <th className="text-left p-3 font-medium">{t('physics.library.value')}</th>
                  <th className="text-left p-3 font-medium">{t('physics.library.unit')}</th>
                  <th className="p-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {constants.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)).map((c) => (
                  <tr key={c.symbol} className="border-b border-border/50 hover:bg-muted/30 transition">
                    <td className="p-3 text-foreground">{c.name}</td>
                    <td className="p-3 font-mono text-primary">{c.symbol}</td>
                    <td className="p-3 font-mono">{c.value}</td>
                    <td className="p-3 text-muted-foreground">{c.unit}</td>
                    <td className="p-3"><CopyButton text={c.value} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {tab === "equations" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {equations.filter((cat) => cat.items.some((e) => e.name.toLowerCase().includes(q) || e.eq.toLowerCase().includes(q))).map((cat) => (
              <div key={cat.category} className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{cat.category}</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cat.items.filter((e) => e.name.toLowerCase().includes(q) || e.eq.toLowerCase().includes(q)).map((e) => (
                    <div key={e.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition">
                      <div>
                        <span className="text-xs text-muted-foreground">{e.name}</span>
                        <div className="font-mono text-sm text-foreground">{e.eq}</div>
                      </div>
                      <CopyButton text={e.eq} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
