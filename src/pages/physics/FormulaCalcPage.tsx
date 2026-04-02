import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const formulas = {
  en: [
    { name: "Kinetic Energy", formula: "KE = ½mv²", inputs: ["mass (kg)", "velocity (m/s)"], calc: (v: number[]) => 0.5 * v[0] * v[1] * v[1], result: "J" },
    { name: "Gravitational PE", formula: "PE = mgh", inputs: ["mass (kg)", "gravity (m/s²)", "height (m)"], calc: (v: number[]) => v[0] * v[1] * v[2], result: "J" },
    { name: "Ohm's Law (V)", formula: "V = IR", inputs: ["current (A)", "resistance (Ω)"], calc: (v: number[]) => v[0] * v[1], result: "V" },
    { name: "Ohm's Law (I)", formula: "I = V/R", inputs: ["voltage (V)", "resistance (Ω)"], calc: (v: number[]) => v[0] / v[1], result: "A" },
    { name: "Force", formula: "F = ma", inputs: ["mass (kg)", "acceleration (m/s²)"], calc: (v: number[]) => v[0] * v[1], result: "N" },
    { name: "Ideal Gas (P)", formula: "P = nRT/V", inputs: ["moles", "temperature (K)", "volume (L)"], calc: (v: number[]) => v[0] * 8.314 * v[1] / (v[2] * 0.001), result: "Pa" },
    { name: "Wave Speed", formula: "v = fλ", inputs: ["frequency (Hz)", "wavelength (m)"], calc: (v: number[]) => v[0] * v[1], result: "m/s" },
    { name: "Coulomb Force", formula: "F = kq₁q₂/r²", inputs: ["q1 (C)", "q2 (C)", "distance (m)"], calc: (v: number[]) => 8.99e9 * v[0] * v[1] / (v[2] * v[2]), result: "N" },
    { name: "Photon Energy", formula: "E = hf", inputs: ["frequency (Hz)"], calc: (v: number[]) => 6.626e-34 * v[0], result: "J" },
    { name: "de Broglie λ", formula: "λ = h/p", inputs: ["momentum (kg·m/s)"], calc: (v: number[]) => 6.626e-34 / v[0], result: "m" },
    { name: "Lorentz Factor", formula: "γ = 1/√(1-v²/c²)", inputs: ["velocity (m/s)"], calc: (v: number[]) => 1 / Math.sqrt(1 - (v[0] * v[0]) / (9e16)), result: "" },
    { name: "Centripetal Force", formula: "F = mv²/r", inputs: ["mass (kg)", "velocity (m/s)", "radius (m)"], calc: (v: number[]) => v[0] * v[1] * v[1] / v[2], result: "N" },
    { name: "Gravitational Force", formula: "F = Gm₁m₂/r²", inputs: ["m1 (kg)", "m2 (kg)", "distance (m)"], calc: (v: number[]) => 6.674e-11 * v[0] * v[1] / (v[2] * v[2]), result: "N" },
    { name: "Escape Velocity", formula: "v = √(2GM/r)", inputs: ["mass (kg)", "radius (m)"], calc: (v: number[]) => Math.sqrt(2 * 6.674e-11 * v[0] / v[1]), result: "m/s" },
  ],
  ar: [
    { name: "الطاقة الحركية", formula: "KE = ½mv²", inputs: ["الكتلة (كغ)", "السرعة (م/ث)"], calc: (v: number[]) => 0.5 * v[0] * v[1] * v[1], result: "جول" },
    { name: "طاقة الوضع الجاذبية", formula: "PE = mgh", inputs: ["الكتلة (كغ)", "الجاذبية (م/ث²)", "الارتفاع (م)"], calc: (v: number[]) => v[0] * v[1] * v[2], result: "جول" },
    { name: "قانون أوم (ج)", formula: "V = IR", inputs: ["التيار (أ)", "المقاومة (Ω)"], calc: (v: number[]) => v[0] * v[1], result: "فولت" },
    { name: "قانون أوم (ت)", formula: "I = V/R", inputs: ["الجهد (ف)", "المقاومة (Ω)"], calc: (v: number[]) => v[0] / v[1], result: "أ" },
    { name: "القوة", formula: "F = ma", inputs: ["الكتلة (كغ)", "التسارع (م/ث²)"], calc: (v: number[]) => v[0] * v[1], result: "نيوتن" },
    { name: "الغاز المثالي (ض)", formula: "P = nRT/V", inputs: ["المولات", "الحرارة (ك)", "الحجم (ل)"], calc: (v: number[]) => v[0] * 8.314 * v[1] / (v[2] * 0.001), result: "باسكال" },
    { name: "سرعة الموجة", formula: "v = fλ", inputs: ["التردد (هرتز)", "الطول الموجي (م)"], calc: (v: number[]) => v[0] * v[1], result: "م/ث" },
    { name: "قوة كولوم", formula: "F = kq₁q₂/r²", inputs: ["q1 (ك)", "q2 (ك)", "المسافة (م)"], calc: (v: number[]) => 8.99e9 * v[0] * v[1] / (v[2] * v[2]), result: "نيوتن" },
    { name: "طاقة الفوتون", formula: "E = hf", inputs: ["التردد (هرتز)"], calc: (v: number[]) => 6.626e-34 * v[0], result: "جول" },
    { name: "طول دي بروجلي", formula: "λ = h/p", inputs: ["الزخم (كغ·م/ث)"], calc: (v: number[]) => 6.626e-34 / v[0], result: "م" },
    { name: "عامل لورنتز", formula: "γ = 1/√(1-v²/c²)", inputs: ["السرعة (م/ث)"], calc: (v: number[]) => 1 / Math.sqrt(1 - (v[0] * v[0]) / (9e16)), result: "" },
    { name: "القوة المركزية", formula: "F = mv²/r", inputs: ["الكتلة (كغ)", "السرعة (م/ث)", "نصف القطر (م)"], calc: (v: number[]) => v[0] * v[1] * v[1] / v[2], result: "نيوتن" },
    { name: "القوة الجاذبية", formula: "F = Gm₁m₂/r²", inputs: ["m1 (كغ)", "m2 (كغ)", "المسافة (م)"], calc: (v: number[]) => 6.674e-11 * v[0] * v[1] / (v[2] * v[2]), result: "نيوتن" },
    { name: "سرعة الهروب", formula: "v = √(2GM/r)", inputs: ["الكتلة (كغ)", "نصف القطر (م)"], calc: (v: number[]) => Math.sqrt(2 * 6.674e-11 * v[0] / v[1]), result: "م/ث" },
  ],
};

export default function FormulaCalcPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const currentFormulas = formulas[lang as keyof typeof formulas] || formulas.en;
  
  const [selected, setSelected] = useState(currentFormulas[0]);
  const [values, setValues] = useState<string[]>(currentFormulas[0].inputs.map(() => ""));
  const [answer, setAnswer] = useState<string | null>(null);

  const selectFormula = (f: typeof currentFormulas[0]) => {
    setSelected(f);
    setValues(f.inputs.map(() => ""));
    setAnswer(null);
  };

  const calculate = () => {
    const nums = values.map(Number);
    if (nums.some(isNaN)) return;
    try {
      const result = selected.calc(nums);
      setAnswer(isFinite(result) ? result.toPrecision(6) : "undefined");
    } catch {
      setAnswer("Error");
    }
  };

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 text-gradient-primary">{t('physics.calculator.page_title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm md:text-base mb-4 xs:mb-5 sm:mb-6 md:mb-8">{t('physics.calculator.description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 xs:gap-3 sm:gap-4 md:gap-5">
          <div className="glass rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 md:p-5 max-h-[400px] xs:max-h-[500px] sm:max-h-[600px] md:max-h-[700px] overflow-y-auto space-y-0.5 xs:space-y-1">
            {currentFormulas.map((f) => (
              <button key={f.name} onClick={() => selectFormula(f)}
                className={`w-full text-left px-2 xs:px-3 py-2 xs:py-2.5 sm:py-3 rounded-lg text-xs xs:text-sm md:text-base transition ${selected.name === f.name ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                <div className="font-medium">{f.name}</div>
                <div className="text-xs font-mono opacity-70">{f.formula}</div>
              </button>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selected.name} className="glass rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 space-y-3 xs:space-y-4">
            <div className="space-y-1">
              <h2 className="font-bold text-foreground text-base xs:text-lg sm:text-xl">{selected.name}</h2>
              <p className="font-mono text-primary text-base xs:text-lg sm:text-xl">{selected.formula}</p>
            </div>
            <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4">
              {selected.inputs.map((input, i) => (
                <div key={input} className="space-y-0.5 xs:space-y-1">
                  <label className="text-xs xs:text-sm text-muted-foreground">{input}</label>
                  <input type="number" value={values[i]} onChange={(e) => {
                    const next = [...values]; next[i] = e.target.value; setValues(next);
                  }}
                    className="w-full px-3 py-2 rounded-lg bg-muted text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              ))}
            </div>
            <button onClick={calculate} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
              {lang === 'ar' ? 'احسب' : 'Calculate'}
            </button>
            {answer && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
                <span className="text-xs text-muted-foreground">{lang === 'ar' ? 'النتيجة' : 'Result'}</span>
                <div className="text-2xl font-mono text-accent">{answer} <span className="text-sm text-muted-foreground">{selected.result}</span></div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
