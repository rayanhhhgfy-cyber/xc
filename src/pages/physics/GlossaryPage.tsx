import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const terms = {
  en: [
    { term: "Acceleration", def: "Rate of change of velocity with respect to time.", branch: "Mechanics" },
    { term: "Amplitude", def: "Maximum displacement of a wave from its equilibrium position.", branch: "Waves" },
    { term: "Angular Momentum", def: "Product of moment of inertia and angular velocity; L = Iω.", branch: "Mechanics" },
    { term: "Capacitance", def: "Ability of a system to store electric charge per unit voltage; C = Q/V.", branch: "E&M" },
    { term: "Centripetal Force", def: "Force directed toward the center of circular motion; F = mv²/r.", branch: "Mechanics" },
    { term: "Conductivity", def: "Measure of a material's ability to conduct electric current.", branch: "E&M" },
    { term: "Conservation of Energy", def: "Total energy in an isolated system remains constant.", branch: "Mechanics" },
    { term: "Coulomb's Law", def: "Electric force between two charges is proportional to q₁q₂/r².", branch: "E&M" },
    { term: "Diffraction", def: "Bending of waves around obstacles or through openings.", branch: "Waves" },
    { term: "Electric Field", def: "Force per unit charge exerted on a test charge; E = F/q.", branch: "E&M" },
    { term: "Electromagnetic Induction", def: "Generation of EMF by changing magnetic flux through a circuit.", branch: "E&M" },
    { term: "Entropy", def: "Measure of disorder or randomness in a thermodynamic system.", branch: "Thermo" },
    { term: "Equilibrium", def: "State where net force and net torque on a system are zero.", branch: "Mechanics" },
    { term: "Frequency", def: "Number of oscillations or wave cycles per unit time.", branch: "Waves" },
    { term: "Gravitational Field", def: "Region where a mass experiences a gravitational force; g = F/m.", branch: "Mechanics" },
    { term: "Half-life", def: "Time for half the atoms in a radioactive sample to decay.", branch: "Modern" },
    { term: "Heat Capacity", def: "Energy required to raise the temperature of a substance by 1K.", branch: "Thermo" },
    { term: "Heisenberg Uncertainty", def: "Fundamental limit: ΔxΔp ≥ ℏ/2. Cannot know both exactly.", branch: "Modern" },
    { term: "Impedance", def: "Total opposition to AC current in a circuit; Z = V/I.", branch: "E&M" },
    { term: "Interference", def: "Superposition of waves creating constructive or destructive patterns.", branch: "Waves" },
    { term: "Isotope", def: "Atoms of same element with different neutron numbers.", branch: "Modern" },
    { term: "Kinetic Energy", def: "Energy of motion; KE = ½mv².", branch: "Mechanics" },
    { term: "Lorentz Factor", def: "Relativistic scaling factor γ = 1/√(1 - v²/c²).", branch: "Modern" },
    { term: "Magnetic Flux", def: "Total magnetic field passing through a surface; Φ = B·A.", branch: "E&M" },
    { term: "Momentum", def: "Product of mass and velocity; p = mv. Conserved in collisions.", branch: "Mechanics" },
    { term: "Newton's Laws", def: "Three fundamental laws governing classical mechanics.", branch: "Mechanics" },
    { term: "Ohm's Law", def: "Voltage equals current times resistance; V = IR.", branch: "E&M" },
    { term: "Photoelectric Effect", def: "Emission of electrons when light hits a material surface.", branch: "Modern" },
    { term: "Planck's Constant", def: "Fundamental quantum of action; h = 6.626 × 10⁻³⁴ J·s.", branch: "Modern" },
    { term: "Potential Energy", def: "Energy stored in position or configuration of a system.", branch: "Mechanics" },
    { term: "Quantum Tunneling", def: "Particle passing through a potential barrier it classically cannot.", branch: "Modern" },
    { term: "Refraction", def: "Change in wave direction when passing between media.", branch: "Waves" },
    { term: "Resistance", def: "Opposition to electric current flow; R = V/I.", branch: "E&M" },
    { term: "Simple Harmonic Motion", def: "Oscillation where restoring force is proportional to displacement.", branch: "Mechanics" },
    { term: "Snell's Law", def: "n₁ sin θ₁ = n₂ sin θ₂. Relates angles of refraction.", branch: "Waves" },
    { term: "Specific Heat", def: "Heat required to raise 1kg of substance by 1K.", branch: "Thermo" },
    { term: "Superposition", def: "Net response is the sum of individual responses.", branch: "Waves" },
    { term: "Thermodynamic Laws", def: "Four laws governing energy, entropy, and temperature.", branch: "Thermo" },
    { term: "Time Dilation", def: "Moving clocks run slower; Δt' = γΔt.", branch: "Modern" },
    { term: "Torque", def: "Rotational force; τ = r × F.", branch: "Mechanics" },
    { term: "Wave-Particle Duality", def: "Quantum objects exhibit both wave and particle properties.", branch: "Modern" },
    { term: "Work", def: "Energy transfer by force over displacement; W = F·d·cos θ.", branch: "Mechanics" },
  ],
  ar: [
    { term: "التسارع", def: "معدل تغير السرعة بالنسبة للزمن.", branch: "الميكانيكا" },
    { term: "السعة", def: "أقصى إزاحة للموجة من موضع الاتزان.", branch: "الموجات" },
    { term: "العزم الزاوي", def: "ناتج عزم القصور الذاتي والسرعة الزاوية; L = Iω.", branch: "الميكانيكا" },
    { term: "السعة الكهربائية", def: "قدرة النظام على تخزين الشحنة الكهربائية لكل وحدة جهد; C = Q/V.", branch: "الكهرومغناطيسية" },
    { term: "القوة المركزية", def: "القوة الموجهة نحو مركز الحركة الدائرية; F = mv²/r.", branch: "الميكانيكا" },
    { term: "الموصلية", def: "قياس قدرة المادة على توصيل التيار الكهربائي.", branch: "الكهرومغناطيسية" },
    { term: "حفظ الطاقة", def: "مجموع الطاقة في نظام معزول يبقى ثابتاً.", branch: "الميكانيكا" },
    { term: "قانون كولوم", def: "القوة الكهربائية بين شحنتين تتناسب مع q₁q₂/r².", branch: "الكهرومغناطيسية" },
    { term: "الحيود", def: "انحناء الموجات حول العوائق أو من خلال الفتحات.", branch: "الموجات" },
    { term: "المجال الكهربائي", def: "القوة لكل وحدة شحنة مطبقة على شحنة الاختبار; E = F/q.", branch: "الكهرومغناطيسية" },
    { term: "الحث الكهرومغناطيسي", def: "توليد القوة الدافعة الكهربائية بتغيير التدفق المغناطيسي.", branch: "الكهرومغناطيسية" },
    { term: "الإنتروبيا", def: "مقياس اضطراب أو عشوائية النظام الديناميكي الحراري.", branch: "الديناميكا الحرارية" },
    { term: "الاتزان", def: "حالة حيث القوة الصافية والعزم الصافي على النظام يساويان صفر.", branch: "الميكانيكا" },
    { term: "التردد", def: "عدد التذبذبات أو دورات الموجة لكل وحدة زمن.", branch: "الموجات" },
    { term: "المجال الجاذبي", def: "المنطقة التي تختبر فيها الكتلة قوة جاذبية; g = F/m.", branch: "الميكانيكا" },
    { term: "عمر النصف", def: "الوقت اللتحول فيه نصف ذرات العينة المشعة.", branch: "الفيزياء الحديثة" },
    { term: "الحرارة النوعية", def: "الطاقة اللازمة لرفع درجة حرارة المادة بمقدار 1 كلفن.", branch: "الديناميكا الحرارية" },
    { term: "مبدأ عدم اليقين", def: "الحد الأساسي: ΔxΔp ≥ ℏ/2. لا يمكن معرفة كليهما بدقة.", branch: "الفيزياء الحديثة" },
    { term: "المعاوقة", def: "المقاومة الكلية للتيار المتردد في الدائرة; Z = V/I.", branch: "الكهرومغناطيسية" },
    { term: "التداخل", def: "تراكب الموجات مما يخلق أنماطاً بنائية أو هدامة.", branch: "الموجات" },
    { term: "النظير", def: "ذرات نفس العنصر بأعداد مختلفة من النيوترونات.", branch: "الفيزياء الحديثة" },
    { term: "الطاقة الحركية", def: "طاقة الحركة; KE = ½mv².", branch: "الميكانيكا" },
    { term: "عامل لورنتز", def: "عامل القياس النسبي γ = 1/√(1 - v²/c²).", branch: "الفيزياء الحديثة" },
    { term: "التدفق المغناطيسي", def: "مجموع المجال المغناطيسي المار عبر السطح; Φ = B·A.", branch: "الكهرومغناطيسية" },
    { term: "الزخم", def: "ناتج الكتلة والسرعة; p = mv. محفوظ في التصادمات.", branch: "الميكانيكا" },
    { term: "قوانين نيوتن", def: "ثلاثة قوانين أساسية تحكم الميكانيكا الكلاسيكية.", branch: "الميكانيكا" },
    { term: "قانون أوم", def: "الجهد يساوي التيار مضروباً في المقاومة; V = IR.", branch: "الكهرومغناطيسية" },
    { term: "التأثير الكهروضوئي", def: "انبعاث الإلكترونات عندما يضوء سطح المادة.", branch: "الفيزياء الحديثة" },
    { term: "ثابت بلانك", def: "كم الفعل الأساسي; h = 6.626 × 10⁻³⁴ جول·ثانية.", branch: "الفيزياء الحديثة" },
    { term: "الطاقة الكامنة", def: "الطاقة المخزنة في موضع أو تكوين النظام.", branch: "الميكانيكا" },
    { term: "النفق الكمومي", def: "جسيم يمر عبر حاجز-potential لا يمكنه عبوره كلاسيكياً.", branch: "الفيزياء الحديثة" },
    { term: "الانكسار", def: "تغير اتجاه الموجة عند المرور بين الوسطين.", branch: "الموجات" },
    { term: "المقاومة", def: "مقاومة تدفق التيار الكهربائي; R = V/I.", branch: "الكهرومغناطيسية" },
    { term: "الحركة التوافقية البسيطة", def: "التذبذب حيث القوة الاستعادة تتناسب مع الإزاحة.", branch: "الميكانيكا" },
    { term: "قانون سنيل", def: "n₁ sin θ₁ = n₂ sin θ₂. يربط زوايا الانكسار.", branch: "الموجات" },
    { term: "الحرارة النوعية", def: "الحرارة اللازمة لرفع 1 كجم من المادة بمقدار 1 كلفن.", branch: "الديناميكا الحرارية" },
    { term: "التراكب", def: "الاستجابة الصافية هي مجموع الاستجابات الفردية.", branch: "الموجات" },
    { term: "قوانين الديناميكا الحرارية", def: "أربعة قوانين تحكم الطاقة والانتروبيا ودرجة الحرارة.", branch: "الديناميكا الحرارية" },
    { term: "تمدد الزمن", def: "الساعات المتحركة تعمل ببطء; Δt' = γΔt.", branch: "الفيزياء الحديثة" },
    { term: "العزم", def: "القوة الدورانية; τ = r × F.", branch: "الميكانيكا" },
    { term: "ازدواجية الموجة-الجسيم", def: "الكمومية.objects exhibit both wave and particle properties.", branch: "الفيزياء الحديثة" },
    { term: "الشغل", def: "انتقال الطاقة بالقوة عبر الإزاحة; W = F·d·cos θ.", branch: "الميكانيكا" },
  ]
};

const branches = {
  en: ["All", "Mechanics", "E&M", "Thermo", "Waves", "Modern"],
  ar: ["الكل", "الميكانيكا", "كهرباء ومغناطيس", "حرارة", "موجات", "حديثة"]
};

const branchKeys = {
  en: { "All": "All", "Mechanics": "Mechanics", "E&M": "E&M", "Thermo": "Thermo", "Waves": "Waves", "Modern": "Modern" },
  ar: { "الكل": "All", "الميكانيكا": "Mechanics", "كهرباء ومغناطيس": "E&M", "حرارة": "Thermo", "موجات": "Waves", "حديثة": "Modern" }
};

export default function GlossaryPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState(branches.en[0]);
  
  const currentTerms = terms[lang as keyof typeof terms] || terms.en;
  const currentBranches = branches[lang as keyof typeof branches] || branches.en;
  const q = search.toLowerCase();

  const filtered = currentTerms.filter(
    (t) => (branch === "All" || t.branch === branch) && (t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q))
  );

  return (
    <div className="min-h-screen w-full pt-10 xs:pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-8 xs:pb-10 sm:pb-12 md:pb-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0.5 xs:mb-1 sm:mb-2 text-gradient-primary">{t('physics.glossary.page_title')}</h1>
        <p className="text-muted-foreground text-xs xs:text-sm md:text-base mb-4 xs:mb-5 sm:mb-6 md:mb-8">{currentTerms.length} {lang === 'ar' ? 'مصطلح في جميع فروع الفيزياء' : 'terms across all branches of physics'}.</p>

        <div className="flex flex-col sm:flex-row gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 mb-4 xs:mb-5 sm:mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={lang === 'ar' ? 'بحث في المصطلحات...' : 'Search terms...'}
              className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-muted text-xs xs:text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {currentBranches.map((b) => (
              <button key={b} onClick={() => setBranch(branchKeys[lang as keyof typeof branchKeys][b as keyof typeof branchKeys.en])}
                className={`px-2 xs:px-3 py-1.5 xs:py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition ${branch === branchKeys[lang as keyof typeof branchKeys][b as keyof typeof branchKeys.en] ? "tab-active" : "tab-inactive"}`}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5 xs:space-y-2 sm:space-y-2.5">
          {filtered.map((item) => (
            <div key={item.term} className="glass rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 flex items-start gap-2 xs:gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm">{item.term}</h3>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{item.branch}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{item.def}</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">{t('physics.glossary.no_match')}</p>}
        </motion.div>
      </div>
    </div>
  );
}
