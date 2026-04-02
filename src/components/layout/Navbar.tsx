import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Atom, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/chemistry", label: t("nav.chemistry") || t("global.navigation.chemistry") },
    { path: "/physics/mechanics", label: t("nav.mechanics") },
    { path: "/physics/electromagnetism", label: t("nav.electromagnetism") },
    { path: "/physics/thermodynamics", label: t("nav.thermodynamics") },
    { path: "/physics/waves", label: t("nav.waves") },
    { path: "/physics/modern", label: t("nav.modern") },
    { path: "/physics/library", label: t("nav.library") },
    { path: "/physics/challenges", label: t("nav.challenges") },
  ];

  const toolLinks = [
    { path: "/physics/converter", label: t("nav.tools_menu.unitConverter") },
    { path: "/physics/calculator", label: t("nav.tools_menu.formulaCalc") },
    { path: "/physics/glossary", label: t("nav.tools_menu.glossary") },
  ];

  const isToolsActive = (pathname: string) => 
    ["/physics/converter", "/physics/calculator", "/physics/glossary"].some(p => pathname === p);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 group">
          <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
<span className="text-sm sm:text-base font-bold tracking-tight text-gradient-primary truncate max-w-[80px] xs:max-w-none">{t('physics.title')}</span>
        </Link>
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);
            return (
              <Link key={link.path} to={link.path} className="relative px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                {isActive && <motion.div layoutId="nav-indicator" className="absolute inset-0 rounded-md bg-muted/50" transition={{ type: "spring", duration: 0.4 }} />}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
          <div className="relative group ml-1">
            <span className={`relative px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors rounded-md hover:bg-muted/30 flex items-center gap-1 ${
              isToolsActive(location.pathname) ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}>
              {t('nav.tools')} ▾
            </span>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block glass-strong rounded-lg p-1 min-w-[140px]" style={{ background: "rgba(0,0,0,0.95)" }}>
              {toolLinks.map((tl) => (
                <Link key={tl.path} to={tl.path} className={`block px-3 py-2 text-xs rounded-md transition ${location.pathname === tl.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                  {tl.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-border" style={{ background: "rgba(0,0,0,0.95)" }}>
          {[...navLinks, ...toolLinks].map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
              className={`block px-6 py-2.5 text-sm font-medium transition-colors ${location.pathname === link.path ? "text-primary" : "text-muted-foreground"}`}>
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
