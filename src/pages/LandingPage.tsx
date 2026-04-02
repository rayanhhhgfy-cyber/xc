import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Atom, Zap, ArrowRight, Zap as ZapIcon } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import AntiGravityOverlay from "@/components/three/AntiGravityOverlay";

export default function LandingPage() {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Cyan orb - top right */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-2xl"
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Purple orb - bottom left */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-2xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Blue accent - center */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* 3D Anti-Gravity Glass Overlay */}
      <AntiGravityOverlay />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <ZapIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white font-bold" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              UN
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              className="text-xs sm:text-sm font-semibold text-cyan-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10"
              whileHover={{ scale: 1.05 }}
            >
              {t('global.brand.tagline')}
            </motion.div>
            <LanguageSwitcher />
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Title */}
          <motion.div className="text-center mb-6 sm:mb-10 md:mb-14 max-w-4xl" variants={itemVariants}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mx-auto mb-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-500/20">
                <ZapIcon className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase tracking-[0.28em] text-slate-300 font-semibold">
                {t('landing.hero.title')}
              </span>
            </div>

            <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-5 leading-[1.05]">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('landing.hero.title')}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              {t('landing.hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-[11px] sm:text-xs text-slate-400 uppercase tracking-[0.22em]">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Interactive labs</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Real-time simulation</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">STEM learning</span>
            </div>
          </motion.div>

          {/* Lab Cards Grid */}
          <motion.div
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 mb-12 sm:mb-16"
            variants={itemVariants}
          >
            {/* Physics Lab */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <Link to="/physics">
                <div className="relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-cyan-500/80 via-blue-500/60 to-slate-800/30 shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/95 backdrop-blur-xl border border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_32%)]" />
                    <div className="relative flex flex-col items-center justify-center text-center p-8 sm:p-10 lg:p-12 space-y-6">
                      <div className="relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/80 border border-cyan-500/20 shadow-[0_20px_80px_-40px_rgba(34,211,238,0.6)]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent blur-2xl" />
                        <Zap className="relative w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>

                      <div className="space-y-4">
                        <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200/90">
                          {t('landing.physics_card.title')}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                          {t('landing.physics_card.title')}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                          {t('landing.physics_card.description')}
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-400/20">
                          {t('landing.physics_card.tags.0')}
                        </span>
                        <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-200 border border-blue-400/20">
                          {t('landing.physics_card.tags.1')}
                        </span>
                        <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-violet-500/15 text-violet-200 border border-violet-400/20">
                          {t('landing.physics_card.tags.2')}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
                      >
                        {t('landing.physics_card.button')}
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Chemistry Lab */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <Link to="/chemistry">
                <div className="relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-purple-500/80 via-fuchsia-500/60 to-rose-500/40 shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/95 backdrop-blur-xl border border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.14),transparent_35%)]" />
                    <div className="relative flex flex-col items-center justify-center text-center p-8 sm:p-10 lg:p-12 space-y-6">
                      <div className="relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/80 border border-purple-500/20 shadow-[0_20px_80px_-40px_rgba(168,85,247,0.6)]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-2xl" />
                        <Atom className="relative w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>

                      <div className="space-y-4">
                        <span className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-purple-200/90">
                          {t('landing.chemistry_card.title')}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                          {t('landing.chemistry_card.title')}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                          {t('landing.chemistry_card.description')}
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/20">
                          {t('landing.chemistry_card.tags.0')}
                        </span>
                        <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-pink-500/15 text-pink-200 border border-pink-400/20">
                          {t('landing.chemistry_card.tags.1')}
                        </span>
                        <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-red-500/15 text-red-200 border border-red-400/20">
                          {t('landing.chemistry_card.tags.2')}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
                      >
                        {t('landing.chemistry_card.button')}
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div className="w-full max-w-6xl" variants={itemVariants}>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              {t('landing.features.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: "⚡", title: t('landing.features.feature1.title'), desc: t('landing.features.feature1.description') },
                { icon: "🎓", title: t('landing.features.feature2.title'), desc: t('landing.features.feature2.description') },
                { icon: "🚀", title: t('landing.features.feature3.title'), desc: t('landing.features.feature3.description') },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 sm:p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-all duration-300"
                >
                  <div className="text-3xl sm:text-4xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

