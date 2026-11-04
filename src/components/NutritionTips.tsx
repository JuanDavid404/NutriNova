import React, { useState, useMemo } from 'react';
import { Article } from '../types/nutrition';
import { ARTICLES_DATA } from '../data/articlesData';
import { MYTHS_DATA, MythItem } from '../data/mythsData';
import {
  BookOpen,
  Clock,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  X,
  ShieldCheck,
  Sparkles,
  RotateCw,
  Lightbulb,
  HelpCircle,
  Eye,
  EyeOff,
  Droplets,
  Tag,
  HeartPulse,
  Scale,
  Search,
  AlertTriangle,
  Timer,
  ChevronRight,
  Check,
  Info,
} from 'lucide-react';

export const NutritionTips: React.FC = () => {
  // Main section tabs: 'todos', 'Fundamentos', 'Hidratación', 'Mitos', 'Etiquetado', 'Hábitos'
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Interactive Myths states
  const [revealedMyths, setRevealedMyths] = useState<string[]>([MYTHS_DATA[0].id]);
  const [mythFilter, setMythFilter] = useState<string>('todos');

  // --- HIDRATACIÓN INTERACTIVE TOOLS STATE ---
  const [userWeightKg, setUserWeightKg] = useState<number>(70);
  const [activityLevel, setActivityLevel] = useState<'sedentario' | 'moderado' | 'intenso'>('moderado');

  // Water calculation formula:
  // Baseline: 35ml per kg.
  // Activity multiplier: sedentario = +0ml, moderado = +400ml, intenso = +800ml
  const calculatedWater = useMemo(() => {
    const base = userWeightKg * 35;
    const add = activityLevel === 'sedentario' ? 0 : activityLevel === 'moderado' ? 400 : 800;
    const totalMl = Math.round(base + add);
    const glasses = Math.round((totalMl / 250) * 10) / 10;
    const foodWater = Math.round(totalMl * 0.25);
    const drinkWater = totalMl - foodWater;
    return { totalMl, glasses, foodWater, drinkWater };
  }, [userWeightKg, activityLevel]);

  // --- ETIQUETADO INTERACTIVE TOOLS STATE ---
  const [selectedOctogon, setSelectedOctogon] = useState<string>('azucar');
  const [sugarSearchQuery, setSugarSearchQuery] = useState<string>('');

  const sugarAliases = [
    { name: 'Maltodextrina', desc: 'Almidón hidrolizado de alto índice glucémico (IG 110), eleva la glucosa más rápido que el azúcar blanco.' },
    { name: 'Jarabe de maíz de alta fructosa (JMAF)', desc: 'Endulzante industrial vinculado a esteatosis hepática y resistencia a la insulina.' },
    { name: 'Dextrosa', desc: 'Glucosa pura cristalizada usada comúnmente en embutidos, salsas y panificados.' },
    { name: 'Jarabe de agave', desc: 'Contiene hasta un 85% de fructosa libre; se promociona falsamente como saludable.' },
    { name: 'Panela / Azúcar de caña integral', desc: 'Aunque conserva trazas de minerales, tiene el mismo impacto metabólico que el azúcar común.' },
    { name: 'Concentrado de zumo de manzana/uva', desc: 'Zumo desprovisto de fibra y concentrado hasta ser puro azúcar libre.' },
    { name: 'Sirope de arroz / malta', desc: 'Azúcares derivados de granos fermentados que aportan calorías vacías.' },
    { name: 'Melaza / Miel de caña', desc: 'Subproducto viscoso de la refinación del azúcar con alta densidad calórica.' },
  ];

  const filteredSugarAliases = useMemo(() => {
    if (!sugarSearchQuery.trim()) return sugarAliases;
    const q = sugarSearchQuery.toLowerCase();
    return sugarAliases.filter((a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));
  }, [sugarSearchQuery]);

  // --- HÁBITOS INTERACTIVE TOOLS STATE ---
  const [hungerTestStep, setHungerTestStep] = useState<number>(0);
  const [hungerAnswers, setHungerAnswers] = useState<Record<number, boolean>>({});

  const categories = [
    { id: 'todos', label: 'Todos los temas', icon: BookOpen, count: ARTICLES_DATA.length },
    { id: 'Fundamentos', label: 'Fundamentos', icon: Scale, count: ARTICLES_DATA.filter((a) => a.category === 'Fundamentos').length },
    { id: 'Hidratación', label: 'Hidratación', icon: Droplets, count: ARTICLES_DATA.filter((a) => a.category === 'Hidratación').length },
    { id: 'Mitos', label: 'Mitos', icon: HelpCircle, count: ARTICLES_DATA.filter((a) => a.category === 'Mitos').length },
    { id: 'Etiquetado', label: 'Etiquetado', icon: Tag, count: ARTICLES_DATA.filter((a) => a.category === 'Etiquetado').length },
    { id: 'Hábitos', label: 'Hábitos', icon: HeartPulse, count: ARTICLES_DATA.filter((a) => a.category === 'Hábitos').length },
  ];

  const filteredArticles = useMemo(() => {
    return selectedCategory === 'todos'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Dynamic myths filter depending on selected section
  const sectionMyths = useMemo(() => {
    if (selectedCategory === 'Hidratación') {
      return MYTHS_DATA.filter((m) => m.category === 'hidratacion');
    }
    if (selectedCategory === 'Etiquetado') {
      return MYTHS_DATA.filter((m) => m.category === 'alimentos');
    }
    if (selectedCategory === 'Hábitos') {
      return MYTHS_DATA.filter((m) => m.category === 'habitos');
    }
    if (selectedCategory === 'Fundamentos') {
      return MYTHS_DATA.filter((m) => m.category === 'peso' || m.category === 'carbohidratos');
    }
    // If 'Mitos' or 'todos'
    return mythFilter === 'todos'
      ? MYTHS_DATA
      : MYTHS_DATA.filter((m) => m.category === mythFilter);
  }, [selectedCategory, mythFilter]);

  const toggleMyth = (id: string) => {
    setRevealedMyths((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const revealAllMyths = () => {
    setRevealedMyths(MYTHS_DATA.map((m) => m.id));
  };

  const hideAllMyths = () => {
    setRevealedMyths([]);
  };

  const openArticleById = (articleId?: string) => {
    if (!articleId) return;
    const found = ARTICLES_DATA.find((a) => a.id === articleId);
    if (found) {
      setActiveArticle(found);
    }
  };

  const mythCategories = [
    { id: 'todos', label: 'Todos los mitos', count: MYTHS_DATA.length },
    { id: 'peso', label: 'Peso & Calorías', count: MYTHS_DATA.filter((m) => m.category === 'peso').length },
    { id: 'carbohidratos', label: 'Carbohidratos', count: MYTHS_DATA.filter((m) => m.category === 'carbohidratos').length },
    { id: 'hidratacion', label: 'Hidratación', count: MYTHS_DATA.filter((m) => m.category === 'hidratacion').length },
    { id: 'alimentos', label: 'Alimentos & Sellos', count: MYTHS_DATA.filter((m) => m.category === 'alimentos').length },
    { id: 'habitos', label: 'Hábitos & Digestión', count: MYTHS_DATA.filter((m) => m.category === 'habitos').length },
  ];

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Educación Nutricional Basada en Evidencia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
          Consejos y Artículos de Nutrición
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Guías claras, interactivas y respaldadas por literatura científica de Harvard, OMS y el Instituto Nacional de Salud.
          Selecciona una sección para explorar herramientas prácticas, mitos y artículos completos.
        </p>
      </div>

      {/* Main Interactive Category Selector: Flex-wrap ensures no cut-off, no getting stuck! */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-3 border-b border-stone-200/80">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2 select-none ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/20 ring-2 ring-emerald-600/30'
                  : 'bg-white text-stone-700 hover:text-stone-950 border border-stone-200/90 hover:bg-stone-50 shadow-2xs hover:border-emerald-300'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-emerald-700'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: DEDICATED HIDRATACIÓN INTERACTIVE VIEW */}
      {/* ========================================================================= */}
      {selectedCategory === 'Hidratación' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Hydration Banner & Calculator */}
          <div className="bg-gradient-to-br from-sky-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-800/80 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>Apartado Especial • Fisiología del Agua &amp; Electrolitos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Calculadora de Hidratación Personalizada &amp; Biomarcadores
              </h2>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-2 leading-relaxed">
                Cada organismo tiene un requerimiento único. Ajusta tu peso y nivel de actividad diaria para estimar tu volumen óptimo en mililitros y vasos.
              </p>
            </div>

            {/* Interactive Calculator Box */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/15">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-sky-200 mb-2">
                    <span>Tu peso corporal:</span>
                    <span className="text-base font-black text-white bg-sky-500/30 px-2.5 py-0.5 rounded-lg border border-sky-400/40">
                      {userWeightKg} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="130"
                    value={userWeightKg}
                    onChange={(e) => setUserWeightKg(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-2 bg-sky-950 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-sky-300 mt-1">
                    <span>40 kg</span>
                    <span>70 kg</span>
                    <span>100 kg</span>
                    <span>130 kg</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-sky-200 block mb-2">
                    Nivel de actividad física diaria:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sedentario', label: 'Sedentario', sub: 'Oficina / reposo' },
                      { id: 'moderado', label: 'Moderado', sub: '30-45 min paseo' },
                      { id: 'intenso', label: 'Intenso', sub: 'Entrenamiento' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setActivityLevel(lvl.id as any)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          activityLevel === lvl.id
                            ? 'bg-sky-500 text-stone-950 border-white font-bold shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-stone-200 border-white/10'
                        }`}
                      >
                        <span className="text-xs font-bold block">{lvl.label}</span>
                        <span className="text-[10px] opacity-80 block">{lvl.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/15 pt-5 lg:pt-0 lg:pl-6">
                <div>
                  <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block mb-1">
                    Meta hídrica diaria recomendada:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-display">
                      {(calculatedWater.totalMl / 1000).toFixed(2)} Litros
                    </span>
                    <span className="text-xs text-sky-200 font-semibold">
                      (~{calculatedWater.glasses} vasos de 250ml)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-sky-500/15 rounded-xl p-3 border border-sky-400/20">
                    <span className="text-[10px] text-sky-300 block font-semibold">💧 Agua directa líquida:</span>
                    <strong className="text-sm font-bold text-white">
                      {(calculatedWater.drinkWater / 1000).toFixed(2)} L
                    </strong>
                    <span className="text-[10px] text-sky-200 block">75% del total</span>
                  </div>

                  <div className="bg-emerald-500/15 rounded-xl p-3 border border-emerald-400/20">
                    <span className="text-[10px] text-emerald-300 block font-semibold">🍉 Agua biológica (alimentos):</span>
                    <strong className="text-sm font-bold text-white">
                      {(calculatedWater.foodWater / 1000).toFixed(2)} L
                    </strong>
                    <span className="text-[10px] text-emerald-200 block">25% frutas y verduras</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-2.5 text-[11px] text-sky-100 flex items-start gap-2 border border-white/10">
                  <Info className="w-3.5 h-3.5 text-sky-300 shrink-0 mt-0.5" />
                  <span>
                    El agua de coco, la sandía (92% agua) y la granadilla peruana aportan electrolitos que optimizan la absorción celular sin sobrecargar los riñones.
                  </span>
                </div>
              </div>
            </div>

            {/* Urine Color Hydrometer Infographic */}
            <div className="relative z-10 mt-8 pt-6 border-t border-sky-800/80">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span>Escala Visual del Color de la Orina (Hidratómetro Clínico)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 border-2 border-yellow-300 shrink-0 shadow-sm" />
                  <div>
                    <span className="text-xs font-bold text-white block">Amarillo Pálido</span>
                    <span className="text-[10px] text-emerald-300 font-semibold">Hidratación Óptima</span>
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-yellow-400 shrink-0 shadow-sm" />
                  <div>
                    <span className="text-xs font-bold text-white block">Amarillo Claro</span>
                    <span className="text-[10px] text-sky-300 font-semibold">Hidratación Adecuada</span>
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-amber-600 shrink-0 shadow-sm" />
                  <div>
                    <span className="text-xs font-bold text-white block">Ámbar / Oscuro</span>
                    <span className="text-[10px] text-amber-300 font-semibold">Deshidratación Leve (Bebe 1-2 vasos)</span>
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-800 border-2 border-amber-900 shrink-0 shadow-sm" />
                  <div>
                    <span className="text-xs font-bold text-white block">Ámbar Intenso</span>
                    <span className="text-[10px] text-rose-300 font-semibold">Deshidratación Crítica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: DEDICATED ETIQUETADO & SELLOS INTERACTIVE VIEW */}
      {/* ========================================================================= */}
      {selectedCategory === 'Etiquetado' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apartado Especial • Decodificador de Etiquetas &amp; Octógonos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Aprende a Leer Sellos de Advertencia y Lista de Ingredientes
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                Los octógonos negros del MINSA / OPS advierten sobre nutrientes críticos. Toca cada sello para conocer sus límites oficiales y alimentos típicos.
              </p>
            </div>

            {/* Interactive Octogons Grid */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
              {[
                {
                  id: 'azucar',
                  title: 'ALTO EN AZÚCAR',
                  limit: '≥ 10g / 100g sólidos',
                  risk: 'Caries, resistencia a la insulina y picos glucémicos.',
                  examples: 'Cereales infantiles, galletas, néctares comerciales.',
                },
                {
                  id: 'sodio',
                  title: 'ALTO EN SODIO',
                  limit: '≥ 400mg / 100g sólidos',
                  risk: 'Hipertensión arterial y sobrecarga renal.',
                  examples: 'Snacks embolsados, embutidos, sopas deshidratadas.',
                },
                {
                  id: 'grasas-sat',
                  title: 'ALTO EN GRASAS SATURADAS',
                  limit: '≥ 4g / 100g sólidos',
                  risk: 'Elevación de partículas LDL pequeñas y densas.',
                  examples: 'Bollería industrial, galletas rellenas, mantecas.',
                },
                {
                  id: 'grasas-trans',
                  title: 'CONTIENE GRASAS TRANS',
                  limit: 'Cualquier grasa parcialmente hidrogenada',
                  risk: 'Inflamación vascular sistémica y riesgo coronario.',
                  examples: 'Margarinas hidrogenadas, coberturas de repostería.',
                },
              ].map((oct) => {
                const isSelected = selectedOctogon === oct.id;
                return (
                  <div
                    key={oct.id}
                    onClick={() => setSelectedOctogon(oct.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                      isSelected
                        ? 'bg-stone-950 border-emerald-400 shadow-xl ring-2 ring-emerald-500/50'
                        : 'bg-stone-850 hover:bg-stone-800 border-stone-700'
                    }`}
                  >
                    <div>
                      {/* Black Octagon Graphic */}
                      <div className="w-16 h-16 mx-auto mb-3 bg-black border-2 border-white rounded-xl flex items-center justify-center text-center p-1 shadow-md">
                        <span className="text-[9px] font-black tracking-tight text-white uppercase leading-none">
                          {oct.title}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-center text-white mb-1">
                        {oct.title}
                      </h4>
                      <p className="text-[11px] text-center text-emerald-300 font-semibold mb-2">
                        {oct.limit}
                      </p>
                    </div>

                    <div className="text-[10px] text-stone-300 pt-2 border-t border-stone-800">
                      <strong>Típico en:</strong> {oct.examples}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dictionary of 50 Sugar Synonyms */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-400" />
                    <span>Detector de Alias del Azúcar Oculto en Etiquetas</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Los fabricantes dispersan los endulzantes bajo diversos nombres técnicos para enmascararlos:
                  </p>
                </div>
                <input
                  type="text"
                  value={sugarSearchQuery}
                  onChange={(e) => setSugarSearchQuery(e.target.value)}
                  placeholder="Buscar alias (ej. dextrosa, jarabe)..."
                  className="px-3 py-1.5 text-xs bg-stone-900 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {filteredSugarAliases.map((alias, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-700/80 text-xs">
                    <span className="font-bold text-amber-300 block">{alias.name}</span>
                    <span className="text-[11px] text-stone-300 leading-snug">{alias.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: DEDICATED HÁBITOS & MINDFUL EATING INTERACTIVE VIEW */}
      {/* ========================================================================= */}
      {selectedCategory === 'Hábitos' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/80 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apartado Especial • Hábitos Sostenibles &amp; Mindful Eating</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                La Regla de los 20 Minutos y el Hambre Biológica vs Emocional
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                Comer bien trasciende qué alimentos eliges: la velocidad, la masticación, el entorno sin pantallas y los horarios circadianos transforman tu digestión y saciedad.
              </p>
            </div>

            {/* 3 Pillars of Habit Success */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black mb-3">
                  <Timer className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">1. La Regla de los 20 Minutos</h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Las hormonas de la saciedad (CCK, PYY y GLP-1) tardan aproximadamente 20 minutos desde el primer bocado en enviar la señal de plenitud al hipotálamo. Comer en 7 minutos causa sobreingesta involuntaria.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-emerald-400 text-stone-950 flex items-center justify-center font-black mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">2. Cero Pantallas al Comer</h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Mirar el celular o la televisión desvía la corteza prefrontal, anulando la memoria episódica de la comida y generando hambre prematura a la hora de haber terminado el plato.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-sky-400 text-stone-950 flex items-center justify-center font-black mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">3. Masticación Salival Activa</h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Masticar cada bocado 15 a 20 veces activa la amilasa y lipasa lingual, reduciendo en un 60% la hinchazón abdominal posprandial y facilitando el vaciamiento gástrico.
                </p>
              </div>
            </div>

            {/* Quick Interactive Self-Check: Hambre Física vs Emocional */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>Autodiagnóstico: ¿Tu hambre actual es Física o Emocional?</span>
              </h3>
              <p className="text-xs text-stone-300 mb-4">
                Responde mentalmente a estas señales biológicas para conocer qué necesita tu organismo:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="font-bold text-emerald-300 block text-xs mb-1">✅ Hambre Física (Biológica):</span>
                  <ul className="space-y-1 text-[11px] text-stone-200">
                    <li>• Aparece de forma gradual y progresiva.</li>
                    <li>• Estás dispuesto a comer opciones nutritivas (ej. una manzana, huevo o verduras).</li>
                    <li>• Se localiza físicamente en el estómago con ligeros ruidos.</li>
                    <li>• Desaparece naturalmente al alcanzar la plenitud.</li>
                  </ul>
                </div>

                <div className="bg-rose-950/70 p-3.5 rounded-xl border border-rose-500/30">
                  <span className="font-bold text-rose-300 block text-xs mb-1">⚠️ Hambre Emocional (Hedónica):</span>
                  <ul className="space-y-1 text-[11px] text-stone-200">
                    <li>• Aparece de forma súbita e impaciente.</li>
                    <li>• Desea un alimento ultraespecífico (chocolate, pizza, galletas).</li>
                    <li>• Se siente en la mente o como tensión en la garganta.</li>
                    <li>• Suele dejar culpa o insatisfacción posterior.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: DEDICATED FUNDAMENTOS INTERACTIVE VIEW */}
      {/* ========================================================================= */}
      {selectedCategory === 'Fundamentos' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/70 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apartado Especial • El Plato Saludable de Harvard</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                La Regla de Oro 50 - 25 - 25 para Comidas Perfectas
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                Olvídate de pesar la comida al gramo en cada comida. Diseña tu plato de forma visual con la proporción validada por la Escuela de Salud Pública de Harvard.
              </p>
            </div>

            {/* Visual Plate Diagram */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-500/40">
                <span className="text-2xl font-black text-emerald-300 block">50%</span>
                <h4 className="text-sm font-bold text-white mt-1">Vegetales &amp; Frutas</h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  La mitad de tu plato debe ser verduras de diversos colores (espinacas, tomate, brócoli, calabacín) y frutas enteras. Aporta fibra, agua biológica y antioxidantes.
                </p>
              </div>

              <div className="bg-amber-950/80 p-5 rounded-2xl border border-amber-500/40">
                <span className="text-2xl font-black text-amber-300 block">25%</span>
                <h4 className="text-sm font-bold text-white mt-1">Granos Complejos &amp; Tubérculos</h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Un cuarto del plato con quinoa andina, avena, arroz integral, papa amarilla o camote al horno. Proporcionan energía de liberación gradual sin picos de insulina.
                </p>
              </div>

              <div className="bg-sky-950/80 p-5 rounded-2xl border border-sky-500/40">
                <span className="text-2xl font-black text-sky-300 block">25%</span>
                <h4 className="text-sm font-bold text-white mt-1">Proteína de Calidad</h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Un cuarto con pescado rico en omega-3 (salmón, trucha), huevos camperos, legumbres (lentejas, garbanzos) o pechuga de pavo. Estimula la reparación tisular.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: INTERACTIVE MYTHS VS FACTS LAB */}
      {/* (Shows when 'Mitos' is clicked, or contextual to the category, or in 'todos') */}
      {/* ========================================================================= */}
      {(selectedCategory === 'todos' || selectedCategory === 'Mitos' || sectionMyths.length > 0) && (
        <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800">
          {/* Ambient subtle decorative background glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

          {/* Section Top Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stone-800/80 pb-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {selectedCategory === 'todos' || selectedCategory === 'Mitos'
                    ? 'Zona Interactiva • Mito vs Realidad Científica'
                    : `Mitos Relacionados con ${selectedCategory}`}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                {selectedCategory === 'Mitos'
                  ? 'Laboratorio Completo de Mitos Nutricionales'
                  : '¿Sabías que muchos dogmas sobre la comida son falsos?'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                Haz clic en las tarjetas interactivas para <span className="text-emerald-300 font-semibold">voltearlas y contrastar el mito</span> con la evidencia clínica de Harvard, OMS y EFSA.
              </p>
            </div>

            {/* Interactive Stats & Fast Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-stone-800/90 border border-stone-700/80 rounded-xl px-3.5 py-2 text-xs flex items-center gap-2 text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Desvelados: <strong className="text-white font-bold">{revealedMyths.length}</strong> de {sectionMyths.length}</span>
              </div>

              <button
                onClick={revealAllMyths}
                type="button"
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-200 border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-300" />
                <span>Desvelar todos</span>
              </button>

              <button
                onClick={hideAllMyths}
                type="button"
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                <span>Ocultar</span>
              </button>
            </div>
          </div>

          {/* Sub-filters within Myths (Only shown in 'todos' or 'Mitos' tab) */}
          {(selectedCategory === 'todos' || selectedCategory === 'Mitos') && (
            <div className="relative z-10 flex flex-wrap items-center gap-2 pb-2 mb-6">
              <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0 mr-1">
                Filtrar mitos:
              </span>
              {mythCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setMythFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
                    mythFilter === cat.id
                      ? 'bg-emerald-500 text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-700/80 border border-stone-700/60'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          )}

          {/* Myths Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {sectionMyths.map((item) => {
              const isRevealed = revealedMyths.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleMyth(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMyth(item.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isRevealed}
                  className={`group rounded-2xl transition-all duration-300 p-5 sm:p-6 cursor-pointer flex flex-col justify-between select-none relative focus:outline-hidden focus:ring-2 focus:ring-emerald-400 ${
                    isRevealed
                      ? 'bg-gradient-to-br from-emerald-950/95 via-stone-900 to-teal-950/90 border-2 border-emerald-500/70 shadow-xl'
                      : 'bg-stone-800/90 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-400/60 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                            isRevealed
                              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isRevealed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Evidencia Científica</span>
                            </>
                          ) : (
                            <>
                              <HelpCircle className="w-3.5 h-3.5 text-rose-300" />
                              <span>Mito Común</span>
                            </>
                          )}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">
                          {item.topic}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-stone-400 group-hover:text-emerald-300 transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {isRevealed ? 'Toca para ocultar' : 'Toca para descubrir'}
                        </span>
                      </div>
                    </div>

                    {/* UNREVEALED (MYTH) STATE */}
                    {!isRevealed && (
                      <div className="py-2 space-y-3">
                        <p className="text-sm sm:text-base font-bold text-stone-100 leading-snug">
                          &ldquo;{item.myth}&rdquo;
                        </p>
                        <p className="text-xs text-stone-400 flex items-center gap-1.5 pt-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Haz clic en esta tarjeta para desvelar la verdad científica.</span>
                        </p>
                      </div>
                    )}

                    {/* REVEALED (FACT & SCIENCE) STATE */}
                    {isRevealed && (
                      <div className="py-1 space-y-3.5 animate-in fade-in duration-200">
                        {/* Strikethrough faded recap */}
                        <div className="text-xs text-stone-400 line-through italic border-l-2 border-stone-700 pl-2.5">
                          &ldquo;{item.myth}&rdquo;
                        </div>

                        {/* Scientific verdict */}
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                          <h4 className="text-xs sm:text-sm font-bold text-emerald-200 flex items-start gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item.verdict}</span>
                          </h4>
                        </div>

                        {/* Explanation */}
                        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                          {item.scientificExplanation}
                        </p>

                        {/* Practical Advice Box */}
                        <div className="bg-stone-850/90 border border-emerald-500/20 rounded-xl p-3 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                            <span>Qué hacer en su lugar:</span>
                          </div>
                          <p className="text-stone-300 leading-relaxed">{item.practicalTip}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3.5 border-t border-stone-800/90 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Fuente: {item.sources[0]}</span>
                    </div>

                    {item.articleId && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openArticleById(item.articleId);
                        }}
                        className="text-emerald-300 hover:text-emerald-200 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Leer artículo completo</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ARTICLES LIBRARY SECTION (Dynamically filtered by selectedCategory) */}
      {/* ========================================================================= */}
      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              {selectedCategory === 'todos'
                ? 'Biblioteca de Artículos Completos'
                : `Artículos y Guías de ${selectedCategory}`}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Lecturas científicas completas para profundizar en este apartado.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 self-start sm:self-auto">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'artículo' : 'artículos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5">
                  <span className="font-bold text-emerald-700 uppercase tracking-wider text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {article.readTimeMin} min lectura
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors font-display leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>Leer artículo completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ARTICLE DETAIL READING MODAL */}
      {/* ========================================================================= */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span className="font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                {activeArticle.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {activeArticle.readTimeMin} minutos de lectura
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display leading-tight mb-4">
              {activeArticle.title}
            </h2>

            {/* Key takeaways box */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 mb-6">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Puntos clave a recordar
              </h3>
              <ul className="space-y-1.5 text-xs text-emerald-900">
                {activeArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-stone-700">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Scientific Sources list */}
            <div className="mt-8 pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Fuentes bibliográficas consultadas
              </h3>
              <ul className="space-y-1 text-xs text-stone-500">
                {activeArticle.sources.map((src, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-stone-300">•</span>
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Cerrar lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
