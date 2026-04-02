import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Trophy, ArrowRight } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  branch: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  hint: string;
  answer: number;
  unit: string;
  tolerance: number;
}

const challenges: Challenge[] = [
  { id: 1, title: "Freefall Time", branch: "Mechanics", difficulty: "Easy", question: "A ball is dropped from 80m. How long does it take to hit the ground? (g = 9.81 m/s²)", hint: "Use h = ½gt²", answer: 4.04, unit: "s", tolerance: 0.1 },
  { id: 2, title: "Coulomb Force", branch: "E&M", difficulty: "Medium", question: "Two charges of 3μC and 5μC are 0.2m apart. What is the force in Newtons? (k = 8.99×10⁹)", hint: "F = kq₁q₂/r²", answer: 3.37, unit: "N", tolerance: 0.05 },
  { id: 3, title: "Ideal Gas Pressure", branch: "Thermo", difficulty: "Easy", question: "2 moles of gas at 350K in 1L. What's the pressure in kPa? (R = 8.314)", hint: "PV = nRT", answer: 5819.8, unit: "kPa", tolerance: 10 },
  { id: 4, title: "Wave Speed", branch: "Waves", difficulty: "Easy", question: "A wave has frequency 5Hz and wavelength 3m. What's its speed?", hint: "v = fλ", answer: 15, unit: "m/s", tolerance: 0.1 },
  { id: 5, title: "Lorentz Factor", branch: "Modern", difficulty: "Medium", question: "What is the Lorentz factor γ for v = 0.8c?", hint: "γ = 1/√(1-β²)", answer: 1.667, unit: "", tolerance: 0.01 },
  { id: 6, title: "Photon Wavelength", branch: "Modern", difficulty: "Hard", question: "What's the wavelength (nm) of a 4eV photon? (h=6.626e-34, c=3e8, eV=1.602e-19)", hint: "λ = hc/E", answer: 310, unit: "nm", tolerance: 5 },
];

const diffColor = { Easy: "text-accent", Medium: "text-electromagnetism", Hard: "text-destructive" };

export default function ChallengesPage() {
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [solved, setSolved] = useState<Set<number>>(new Set());

  const check = () => {
    if (!selected) return;
    const val = parseFloat(userAnswer);
    if (isNaN(val)) return;
    if (Math.abs(val - selected.answer) <= selected.tolerance) {
      setResult("correct");
      setSolved((prev) => new Set(prev).add(selected.id));
    } else {
      setResult("wrong");
    }
  };

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-6 mb-4 xs:mb-6 md:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-primary mb-0.5 xs:mb-1">Challenges</h1>
            <p className="text-muted-foreground text-xs xs:text-sm md:text-base">Test your physics knowledge with interactive problems.</p>
          </div>
          <div className="flex items-center gap-1.5 xs:gap-2 glass rounded-lg px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 flex-shrink-0">
            <Trophy className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-electromagnetism" />
            <span className="font-mono text-xs xs:text-sm md:text-base text-foreground">{solved.size}/{challenges.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:gap-5">
          {/* Challenge list */}
          <div className="space-y-2">
            {challenges.map((ch) => (
              <motion.button
                key={ch.id}
                onClick={() => { setSelected(ch); setResult(null); setUserAnswer(""); }}
                whileHover={{ scale: 1.01 }}
                className={`w-full text-left glass rounded-xl p-4 flex items-center gap-3 transition border ${selected?.id === ch.id ? "border-primary/50" : "border-transparent"}`}
              >
                {solved.has(ch.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">{ch.title}</span>
                    <span className={`text-xs font-mono ${diffColor[ch.difficulty]}`}>{ch.difficulty}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{ch.branch}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            ))}
          </div>

          {/* Selected challenge */}
          <div className="glass rounded-xl p-6">
            {selected ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-bold text-foreground text-lg">{selected.title}</h2>
                <p className="text-sm text-muted-foreground">{selected.question}</p>
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer text-primary hover:underline">Show Hint</summary>
                  <p className="mt-1 font-mono">{selected.hint}</p>
                </details>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => { setUserAnswer(e.target.value); setResult(null); }}
                    placeholder="Your answer..."
                    className="flex-1 px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">{selected.unit}</span>
                </div>
                <button onClick={check} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
                  Check Answer
                </button>
                {result === "correct" && (
                  <motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-accent font-semibold text-center">
                    ✓ Correct!
                  </motion.p>
                )}
                {result === "wrong" && (
                  <p className="text-destructive text-sm text-center">Not quite. Try again!</p>
                )}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Select a challenge to begin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
