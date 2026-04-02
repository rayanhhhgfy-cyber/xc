import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const categories = {
  en: [
    {
      name: "Length",
      units: [
        { name: "Meters", factor: 1 },
        { name: "Kilometers", factor: 1e-3 },
        { name: "Centimeters", factor: 100 },
        { name: "Millimeters", factor: 1000 },
        { name: "Miles", factor: 6.2137e-4 },
        { name: "Feet", factor: 3.28084 },
        { name: "Inches", factor: 39.3701 },
        { name: "Light-years", factor: 1.057e-16 },
        { name: "Angstroms", factor: 1e10 },
      ],
    },
    {
      name: "Mass",
      units: [
        { name: "Kilograms", factor: 1 },
        { name: "Grams", factor: 1000 },
        { name: "Milligrams", factor: 1e6 },
        { name: "Pounds", factor: 2.20462 },
        { name: "Ounces", factor: 35.274 },
        { name: "Atomic mass (u)", factor: 6.022e26 },
        { name: "Electron masses", factor: 1.098e30 },
      ],
    },
    {
      name: "Energy",
      units: [
        { name: "Joules", factor: 1 },
        { name: "Kilojoules", factor: 1e-3 },
        { name: "Calories", factor: 0.239006 },
        { name: "Kilocalories", factor: 2.39006e-4 },
        { name: "Electron volts", factor: 6.242e18 },
        { name: "Kilowatt-hours", factor: 2.778e-7 },
        { name: "Ergs", factor: 1e7 },
      ],
    },
    {
      name: "Temperature",
      units: [
        { name: "Kelvin", factor: 1 },
        { name: "Celsius", factor: 1, offset: -273.15 },
        { name: "Fahrenheit", factor: 9 / 5, offset: -459.67 },
      ],
    },
    {
      name: "Pressure",
      units: [
        { name: "Pascals", factor: 1 },
        { name: "Atmospheres", factor: 9.8692e-6 },
        { name: "Bar", factor: 1e-5 },
        { name: "mmHg (Torr)", factor: 7.5006e-3 },
        { name: "PSI", factor: 1.450e-4 },
      ],
    },
    {
      name: "Force",
      units: [
        { name: "Newtons", factor: 1 },
        { name: "Dynes", factor: 1e5 },
        { name: "Pound-force", factor: 0.224809 },
        { name: "Kilogram-force", factor: 0.101972 },
      ],
    },
  ],
  ar: [
    {
      name: "الطول",
      units: [
        { name: "المتر", factor: 1 },
        { name: "الكيلومتر", factor: 1e-3 },
        { name: "السنتيمتر", factor: 100 },
        { name: "المليمتر", factor: 1000 },
        { name: "الميل", factor: 6.2137e-4 },
        { name: "القدم", factor: 3.28084 },
        { name: "البوصة", factor: 39.3701 },
        { name: "السنة الضوئية", factor: 1.057e-16 },
        { name: "الأنغستروم", factor: 1e10 },
      ],
    },
    {
      name: "الكتلة",
      units: [
        { name: "كيلوغرام", factor: 1 },
        { name: "غرام", factor: 1000 },
        { name: "ميليغرام", factor: 1e6 },
        { name: "باوند", factor: 2.20462 },
        { name: "أونصة", factor: 35.274 },
        { name: "الكتلة الذرية (u)", factor: 6.022e26 },
        { name: "كتلة الإلكترون", factor: 1.098e30 },
      ],
    },
    {
      name: "الطاقة",
      units: [
        { name: "جول", factor: 1 },
        { name: "كيلو جول", factor: 1e-3 },
        { name: "سعرة", factor: 0.239006 },
        { name: "كيلو سعرة", factor: 2.39006e-4 },
        { name: "إلكترون فولت", factor: 6.242e18 },
        { name: "كيلوواط ساعة", factor: 2.778e-7 },
        { name: "إرج", factor: 1e7 },
      ],
    },
    {
      name: "الحرارة",
      units: [
        { name: "كلفن", factor: 1 },
        { name: "مئوية", factor: 1, offset: -273.15 },
        { name: "فهرنهايت", factor: 9 / 5, offset: -459.67 },
      ],
    },
    {
      name: "الضغط",
      units: [
        { name: "باسكال", factor: 1 },
        { name: "جو", factor: 9.8692e-6 },
        { name: "بار", factor: 1e-5 },
        { name: "مم زئبق", factor: 7.5006e-3 },
        { name: "باوند/بوصة²", factor: 1.450e-4 },
      ],
    },
    {
      name: "القوة",
      units: [
        { name: "نيوتن", factor: 1 },
        { name: "داين", factor: 1e5 },
        { name: "باوند-قوة", factor: 0.224809 },
        { name: "كيلوغرام-قوة", factor: 0.101972 },
      ],
    },
  ],
};

export default function UnitConverterPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const currentCategories = categories[lang as keyof typeof categories] || categories.en;
  
  const [category, setCategory] = useState(currentCategories[0]);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState("1");

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";
    const from = category.units[fromIdx];
    const to = category.units[toIdx];
    const isTemp = category.name === "Temperature" || category.name === "الحرارة";
    if (isTemp) {
      let kelvin = v;
      const fromName = from.name;
      const toName = to.name;
      if (fromName === "Celsius" || fromName === "مئوية") kelvin = v + 273.15;
      else if (fromName === "Fahrenheit" || fromName === "فهرنهايت") kelvin = (v + 459.67) * 5 / 9;
      if (toName === "Celsius" || toName === "مئوية") return (kelvin - 273.15).toPrecision(6);
      if (toName === "Fahrenheit" || toName === "فهرنهايت") return (kelvin * 9 / 5 - 459.67).toPrecision(6);
      return kelvin.toPrecision(6);
    }
    const base = v / from.factor;
    return (base * to.factor).toPrecision(6);
  };

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 text-gradient-primary">{t('physics.converter.page_title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm md:text-base mb-4 xs:mb-5 sm:mb-6 md:mb-8">{t('physics.converter.description')}</p>

        <div className="flex gap-1 flex-wrap mb-4 xs:mb-5 sm:mb-6">
          {currentCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setCategory(cat); setFromIdx(0); setToIdx(1); }}
              className={`px-2 xs:px-3 py-1.5 xs:py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition ${category.name === cat.name ? "tab-active" : "tab-inactive"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5">
              <label className="text-xs xs:text-sm text-muted-foreground">{t('physics.converter.from')}</label>
              <select value={fromIdx} onChange={(e) => setFromIdx(Number(e.target.value))}
                className="w-full px-2 xs:px-3 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-muted text-foreground text-xs xs:text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-primary">
                {category.units.map((u, i) => <option key={u.name} value={i}>{u.name}</option>)}
              </select>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-2 xs:px-3 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-muted text-foreground font-mono text-base xs:text-lg sm:text-xl md:text-2xl focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5">
              <label className="text-xs xs:text-sm text-muted-foreground">{t('physics.converter.to')}</label>
              <select value={toIdx} onChange={(e) => setToIdx(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                {category.units.map((u, i) => <option key={u.name} value={i}>{u.name}</option>)}
              </select>
              <div className="w-full px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-lg">
                {convert()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
