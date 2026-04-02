import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import ChemistryIndex from "./pages/ChemistryIndex.tsx";
import PhysicsLayout from "./pages/PhysicsLayout.tsx";
import PhysicsIndexPage from "./pages/PhysicsIndexPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignLanguageTranslator from "./pages/SignLanguageTranslator.tsx";

// Physics Pages
import MechanicsPage from "./pages/physics/MechanicsPage.tsx";
import ElectromagnetismPage from "./pages/physics/ElectromagnetismPage.tsx";
import ThermodynamicsPage from "./pages/physics/ThermodynamicsPage.tsx";
import WavesPage from "./pages/physics/WavesPage.tsx";
import ModernPhysicsPage from "./pages/physics/ModernPhysicsPage.tsx";
import LibraryPage from "./pages/physics/LibraryPage.tsx";
import ChallengesPage from "./pages/physics/ChallengesPage.tsx";
import UnitConverterPage from "./pages/physics/UnitConverterPage.tsx";
import FormulaCalcPage from "./pages/physics/FormulaCalcPage.tsx";
import GlossaryPage from "./pages/physics/GlossaryPage.tsx";
import PhysicsNotFound from "./pages/physics/NotFound.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <div className="flex flex-col min-h-screen w-full pt-14">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
          
          {/* Chemistry Routes */}
          <Route path="/chemistry" element={<ChemistryIndex />} />
          
          {/* Physics Routes */}
          <Route path="/physics" element={<PhysicsLayout />}>
            <Route index element={<PhysicsIndexPage />} />
            <Route path="mechanics" element={<MechanicsPage />} />
            <Route path="electromagnetism" element={<ElectromagnetismPage />} />
            <Route path="thermodynamics" element={<ThermodynamicsPage />} />
            <Route path="waves" element={<WavesPage />} />
            <Route path="modern" element={<ModernPhysicsPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="converter" element={<UnitConverterPage />} />
            <Route path="calculator" element={<FormulaCalcPage />} />
            <Route path="glossary" element={<GlossaryPage />} />
            <Route path="*" element={<PhysicsNotFound />} />
          </Route>

<Route path="/tools/sign-language" element={<SignLanguageTranslator />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
