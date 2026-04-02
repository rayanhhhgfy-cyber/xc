import { Link, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PhysicsLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: "/physics/mechanics", label: t('physics.navigation.mechanics') },
    { path: "/physics/electromagnetism", label: t('physics.navigation.e_m') },
    { path: "/physics/thermodynamics", label: t('physics.navigation.thermo') },
    { path: "/physics/waves", label: t('physics.navigation.waves') },
    { path: "/physics/modern", label: t('physics.navigation.modern') },
    { path: "/physics/library", label: t('physics.navigation.library') },
    { path: "/physics/challenges", label: t('physics.navigation.challenges') },
  ];

  const toolLinks = [
    { path: "/physics/converter", label: t('physics.navigation.converter') },
    { path: "/physics/calculator", label: t('physics.navigation.calculator') },
    { path: "/physics/glossary", label: t('physics.navigation.glossary') },
    { path: "/tools/sign-language", label: t('nav.tools_menu.signLanguage') },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-slate-700/50 w-full" style={{ background: "rgba(15,23,42,0.95)" }}>
        <div className="w-full flex items-center justify-between h-14 sm:h-16 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
          {/* Logo and Home */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity flex-shrink-0" title="Back to home">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-300" />
            </Link>
            <Link to="/physics" className="hidden xs:flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base">⚛</span>
              </div>
              <span className="hidden sm:inline text-sm md:text-base font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('physics.page_title')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} className="relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  {isActive && <motion.div layoutId="nav-indicator" className="absolute inset-0 rounded-md bg-cyan-500/20 border border-cyan-500/30" transition={{ type: "spring", duration: 0.4 }} />}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Tools Dropdown */}
            <div className="relative group ml-1 lg:ml-2">
              <span className={`relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium cursor-pointer transition-colors rounded-md hover:bg-slate-700/30 flex items-center gap-1 ${
                toolLinks.some(tl => location.pathname === tl.path) ? "text-cyan-400" : "text-slate-300 hover:text-white"
              }`}>
                {t('nav.tools')} <span className="text-xs">▾</span>
              </span>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block rounded-lg border border-slate-700 p-2 min-w-[140px] lg:min-w-[160px] backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.95)" }}>
                {toolLinks.map((tl) => (
                  <Link key={tl.path} to={tl.path} className={`block px-3 py-2 text-xs lg:text-sm rounded-md transition ${location.pathname === tl.path ? "text-cyan-400 bg-cyan-500/10" : "text-slate-300 hover:text-white hover:bg-slate-700/30"}`}>
                    {tl.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-slate-700/30 rounded-lg transition-colors flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-slate-700/50 backdrop-blur-sm p-3 sm:p-4 space-y-2 max-h-96 overflow-y-auto"
            style={{ background: "rgba(15,23,42,0.95)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-700/50 mt-2">
              <p className="px-4 text-xs text-slate-500 font-semibold mb-2">{t('nav.tools').toUpperCase()}</p>
              {toolLinks.map((tl) => (
                <Link
                  key={tl.path}
                  to={tl.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors text-sm"
                >
                  {tl.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-14 sm:pt-16 w-full">
        <Outlet />
      </main>
    </div>
  );
}
