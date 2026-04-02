import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroScene from "@/components/three/HeroScene";
import { Zap, Flame, Waves, Atom, Rocket, BookOpen, Calculator, ArrowRightLeft, BookA, Trophy } from "lucide-react";

const branches = [
  { path: "/physics/mechanics", labelKey: "physics.branches.classical_mechanics", icon: Rocket, color: "text-mechanics", border: "border-mechanics/30", descKey: "physics.branches.classical_mechanics_desc" },
  { path: "/physics/electromagnetism", labelKey: "physics.branches.electricity_magnetism", icon: Zap, color: "text-electromagnetism", border: "border-electromagnetism/30", descKey: "physics.branches.electricity_magnetism_desc" },
  { path: "/physics/thermodynamics", labelKey: "physics.branches.thermodynamics", icon: Flame, color: "text-thermodynamics", border: "border-thermodynamics/30", descKey: "physics.branches.thermodynamics_desc" },
  { path: "/physics/waves", labelKey: "physics.branches.waves_optics", icon: Waves, color: "text-waves", border: "border-waves/30", descKey: "physics.branches.waves_optics_desc" },
  { path: "/physics/modern", labelKey: "physics.branches.modern_physics", icon: Atom, color: "text-modern", border: "border-modern/30", descKey: "physics.branches.modern_physics_desc" },
  { path: "/physics/library", labelKey: "physics.branches.physics_library", icon: BookOpen, color: "text-primary", border: "border-primary/30", descKey: "physics.branches.physics_library_desc" },
  { path: "/physics/calculator", labelKey: "physics.branches.formula_calculator", icon: Calculator, color: "text-primary", border: "border-primary/30", descKey: "physics.branches.formula_calculator_desc" },
  { path: "/physics/converter", labelKey: "physics.branches.unit_converter", icon: ArrowRightLeft, color: "text-accent", border: "border-accent/30", descKey: "physics.branches.unit_converter_desc" },
  { path: "/physics/glossary", labelKey: "physics.branches.physics_glossary", icon: BookA, color: "text-secondary", border: "border-secondary/30", descKey: "physics.branches.physics_glossary_desc" },
  { path: "/physics/challenges", labelKey: "physics.branches.challenges", icon: Trophy, color: "text-electromagnetism", border: "border-electromagnetism/30", descKey: "physics.branches.challenges_desc" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative w-full">
      <HeroScene />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] text-center px-2 xs:px-3 sm:px-4 md:px-6 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gradient-hero mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6"
        >
          {t('physics.page_title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mb-1.5 xs:mb-2 sm:mb-3 md:mb-4">
          {t('physics.explore_subtitle')}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-xs xs:text-xs sm:text-sm md:text-base text-muted-foreground/60 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          {t('physics.stats')}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <Link to="/physics/mechanics" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-2.5 sm:py-3 md:py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-xs sm:text-sm md:text-base hover:opacity-90 transition glow-primary">
            {t('physics.start_exploring')} <Rocket className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Link>
        </motion.div>
      </div>
      <div className="relative z-10 w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-12 xs:pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 w-full">
          {branches.map((b) => (
            <motion.div key={b.path} variants={item}>
              <Link to={b.path} className={`group glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 block border ${b.border} hover:border-opacity-60 transition-all hover:scale-[1.02] h-full`}>
                <b.icon className={`w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${b.color} mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3`} />
                <h3 className="font-semibold text-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-0.5 xs:mb-1 sm:mb-1.5 truncate">{t(b.labelKey)}</h3>
                <p className="text-xs xs:text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">{t(b.descKey)}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

