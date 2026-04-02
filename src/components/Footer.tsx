import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full overflow-hidden mt-8 xs:mt-12 sm:mt-16 md:mt-20 lg:mt-24"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 -left-20 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Top gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-1 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Decorative gradient lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left accent line */}
        <motion.div
          className="absolute top-0 left-1/4 w-48 xs:w-64 sm:w-80 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Right accent line */}
        <motion.div
          className="absolute top-0 right-1/4 w-48 xs:w-64 sm:w-80 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-16 py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16">
        <motion.div
          className="flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top accent */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 xs:gap-2.5 mb-4 xs:mb-5 sm:mb-6"
          >
            <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-cyan-400/60" />
            <div className="w-0.5 h-0.5 rounded-full bg-primary/40" />
            <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-purple-400/60" />
          </motion.div>

          {/* Main heading with icon */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 mb-3 xs:mb-4 sm:mb-5 flex-wrap px-4"
          >
            <span className="text-xs xs:text-xs sm:text-sm md:text-base text-gray-300 font-light">
              {t('footer.madeBy')}
            </span>
          </motion.div>

          {/* School name with gradient */}
          <motion.h2
            variants={itemVariants}
            className="text-center text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-transparent mb-4 xs:mb-5 sm:mb-6 leading-relaxed px-2"
          >
            {t('footer.schoolName')}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xs xs:text-xs sm:text-sm text-gray-400 font-light italic mb-5 xs:mb-6 sm:mb-7 text-center"
          >
            {t('footer.tagline')}
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-12 xs:w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-5 xs:mb-6 sm:mb-7"
          />

          {/* Bottom info section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-6 text-center mb-4 xs:mb-5"
          >
            <div className="flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-yellow-400" />
              <span className="text-xs xs:text-xs sm:text-sm text-gray-400 font-light">
                {t('footer.empowering')}
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600/40" />
            <span className="text-xs xs:text-xs sm:text-sm text-gray-400 font-light">
              {t('footer.copyright', { year: currentYear })}
            </span>
          </motion.div>

          {/* Decorative dots */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 xs:gap-2.5 pt-3 xs:pt-4"
          >
            <motion.div
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-primary to-primary/60"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-300"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 xs:h-24 sm:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </motion.footer>
  );
}
