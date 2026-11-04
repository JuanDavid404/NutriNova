import React, { useState, useMemo } from 'react';
import { PyramidTier, FoodItem } from '../types/nutrition';
import { PYRAMID_TIERS_INFO, FOODS_DATA } from '../data/foodsData';
import { useNutrition } from '../context/NutritionContext';
import {
  Layers,
  ChevronRight,
  Flame,
  Info,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Droplets,
  Apple,
  Wheat,
  Fish,
  ShieldCheck,
  Activity,
  Heart,
  Dna,
} from 'lucide-react';
import { getGoogleNutritionUrl } from '../utils/searchUtils';

interface FoodPyramidSectionProps {
  onSelectTier?: (tier: PyramidTier | 'todas') => void;
  selectedTier?: PyramidTier | 'todas';
}

interface TierVisualConfig {
  icon: React.ComponentType<{ className?: string }>;
  widthDesktop: string;
  gradientBg: string;
  gradientBgActive: string;
  borderColor: string;
  borderColorActive: string;
  badgeBg: string;
  badgeText: string;
  accentDot: string;
  glowColor: string;
  biologicalRole: string;
  portionGuide: string;
}

const TIER_VISUAL_CONFIGS: Record<PyramidTier, TierVisualConfig> = {
  consumo_ocasional: {
    icon: Flame,
    widthDesktop: 'w-[52%] sm:w-[48%]',
    gradientBg: 'from-rose-50 via-rose-100/60 to-rose-50',
    gradientBgActive: 'from-rose-500/15 via-rose-500/25 to-rose-500/15',
    borderColor: 'border-rose-200/90',
    borderColorActive: 'border-rose-400',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    badgeText: 'text-rose-900',
    accentDot: 'bg-rose-500',
    glowColor: 'shadow-rose-100',
    biologicalRole: 'Aporte de placer gastronómico y energía densa. Consumir con plena consciencia y moderación.',
    portionGuide: '1 a 2 veces al mes en porciones moderadas (ej. 20g chocolate negro puro o carnes selectas).',
  },
  proteinas_magras: {
    icon: Fish,
    widthDesktop: 'w-[64%] sm:w-[60%]',
    gradientBg: 'from-indigo-50 via-indigo-100/60 to-indigo-50',
    gradientBgActive: 'from-indigo-500/15 via-indigo-500/25 to-indigo-500/15',
    borderColor: 'border-indigo-200/90',
    borderColorActive: 'border-indigo-400',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    badgeText: 'text-indigo-900',
    accentDot: 'bg-indigo-600',
    glowColor: 'shadow-indigo-100',
    biologicalRole: 'Reparación tisular, síntesis enzimática, desarrollo muscular e inmunoglobulinas protectoras.',
    portionGuide: '1 ración por comida principal (120-150g pescado/ave, 2 huevos o 150g legumbres cocidas).',
  },
  lacteos_frutos_secos: {
    icon: ShieldCheck,
    widthDesktop: 'w-[76%] sm:w-[72%]',
    gradientBg: 'from-sky-50 via-sky-100/60 to-sky-50',
    gradientBgActive: 'from-sky-500/15 via-sky-500/25 to-sky-500/15',
    borderColor: 'border-sky-200/90',
    borderColorActive: 'border-sky-400',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    badgeText: 'text-sky-900',
    accentDot: 'bg-sky-600',
    glowColor: 'shadow-sky-100',
    biologicalRole: 'Calcio biodisponible para densidad ósea, probióticos para microbiota y ácidos grasos esenciales.',
    portionGuide: '1 a 3 raciones diarias (1 vaso kéfir/yogur natural o un puñado de 30g de frutos secos al natural).',
  },
  frutas_verduras: {
    icon: Apple,
    widthDesktop: 'w-[88%] sm:w-[84%]',
    gradientBg: 'from-emerald-50 via-emerald-100/60 to-emerald-50',
    gradientBgActive: 'from-emerald-500/20 via-emerald-500/30 to-emerald-500/20',
    borderColor: 'border-emerald-200/90',
    borderColorActive: 'border-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badgeText: 'text-emerald-950',
    accentDot: 'bg-emerald-600',
    glowColor: 'shadow-emerald-100',
    biologicalRole: 'Fibra prebiótica, polifenoles antioxidantes, vitaminas C/A/K y agua biológica intracelular.',
    portionGuide: 'Mínimo 5 raciones al día (3 piezas de fruta entera y 2 platos abundantes de hortalizas variadas).',
  },
  granos_tuberculos: {
    icon: Wheat,
    widthDesktop: 'w-[96%] sm:w-[94%]',
    gradientBg: 'from-amber-50 via-amber-100/60 to-amber-50',
    gradientBgActive: 'from-amber-500/15 via-amber-500/25 to-amber-500/15',
    borderColor: 'border-amber-200/90',
    borderColorActive: 'border-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    badgeText: 'text-amber-950',
    accentDot: 'bg-amber-600',
    glowColor: 'shadow-amber-100',
    biologicalRole: 'Glucosa de liberación sostenida para el cerebro y sistema nervioso, almidón resistente y saciedad.',
    portionGuide: '1 porción en cada comida principal ajustada al gasto energético (60-80g en seco o tamaño de un puño).',
  },
  base_hidratacion: {
    icon: Droplets,
    widthDesktop: 'w-[100%]',
    gradientBg: 'from-cyan-50 via-cyan-100/60 to-cyan-50',
    gradientBgActive: 'from-cyan-500/20 via-cyan-500/30 to-cyan-500/20',
    borderColor: 'border-cyan-200/90',
    borderColorActive: 'border-cyan-500',
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    badgeText: 'text-cyan-950',
    accentDot: 'bg-cyan-600',
    glowColor: 'shadow-cyan-100',
    biologicalRole: 'Termorregulación, transporte de nutrientes y oxígeno celular, volumen plasmático y filtración renal.',
    portionGuide: '1.5 a 2.5 litros a lo largo del día (agua de mesa, infusiones botánicas sin azúcar y agua de coco).',
  },
};

export const FoodPyramidSection: React.FC<FoodPyramidSectionProps> = ({
  onSelectTier,
  selectedTier = 'todas',
}) => {
  const { setSelectedFoodDetail, setActiveTab } = useNutrition();
  const [activeTierDetail, setActiveTierDetail] = useState<PyramidTier>(
    selectedTier !== 'todas' ? selectedTier : 'frutas_verduras'
  );

  const tiersOrder: PyramidTier[] = [
    'consumo_ocasional',
    'proteinas_magras',
    'lacteos_frutos_secos',
    'frutas_verduras',
    'granos_tuberculos',
    'base_hidratacion',
  ];

  const currentTierInfo = PYRAMID_TIERS_INFO[activeTierDetail];
  const currentVisualConfig = TIER_VISUAL_CONFIGS[activeTierDetail];
  const foodsInActiveTier = FOODS_DATA.filter((f) => f.pyramidTier === activeTierDetail);

  // Dynamic average metrics for this tier
  const tierAverages = useMemo(() => {
    if (foodsInActiveTier.length === 0) return { calories: 0, protein: 0, fiber: 0 };
    const totalCal = foodsInActiveTier.reduce((sum, f) => sum + f.per100g.calories, 0);
    const totalProt = foodsInActiveTier.reduce((sum, f) => sum + f.per100g.protein, 0);
    const totalFib = foodsInActiveTier.reduce((sum, f) => sum + f.per100g.fiber, 0);

    return {
      calories: Math.round(totalCal / foodsInActiveTier.length),
      protein: Math.round((totalProt / foodsInActiveTier.length) * 10) / 10,
      fiber: Math.round((totalFib / foodsInActiveTier.length) * 10) / 10,
    };
  }, [foodsInActiveTier]);

  const handleTierClick = (tier: PyramidTier) => {
    setActiveTierDetail(tier);
    if (onSelectTier) {
      onSelectTier(tier);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-8 overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Guía Alimentaria Oficial Basada en SENC, OMS y Dieta Mediterránea</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display tracking-tight">
            Pirámide Nutricional Interactiva
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
            Estructura piramidal oficial: desde el agua y alimentos vegetales de consumo diario en la base,
            hasta los alimentos de consumo ocasional en la cúspide. Haz clic en cualquier nivel para explorar sus propiedades.
          </p>
        </div>

        {selectedTier !== 'todas' && (
          <button
            type="button"
            onClick={() => {
              if (onSelectTier) onSelectTier('todas');
            }}
            className="self-start sm:self-auto text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
          >
            Mostrar todos los niveles
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: THE REAL GEOMETRIC STEPPED PYRAMID DIAGRAM */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 w-full text-center flex items-center justify-center gap-2">
            <span>Toca un estrato de la pirámide para inspeccionarlo</span>
          </div>

          {/* Stepped Trapezoid Stack forming a cohesive pyramid */}
          <div className="w-full flex flex-col items-center space-y-2 relative">
            {tiersOrder.map((tierKey, index) => {
              const info = PYRAMID_TIERS_INFO[tierKey];
              const config = TIER_VISUAL_CONFIGS[tierKey];
              const isSelected = activeTierDetail === tierKey;
              const foodsInTier = FOODS_DATA.filter((f) => f.pyramidTier === tierKey);
              const previewFoods = foodsInTier.slice(0, 3);
              const IconComponent = config.icon;

              return (
                <div
                  key={tierKey}
                  className={`w-full flex justify-center relative transition-all duration-300`}
                >
                  <button
                    type="button"
                    onClick={() => handleTierClick(tierKey)}
                    className={`group relative py-3 px-3.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between shadow-xs ${
                      config.widthDesktop
                    } ${
                      isSelected
                        ? `bg-gradient-to-r ${config.gradientBgActive} ${config.borderColorActive} ring-4 ring-emerald-500/20 shadow-md scale-[1.02] z-20`
                        : `bg-gradient-to-r ${config.gradientBg} ${config.borderColor} hover:scale-[1.01] hover:shadow-sm z-10`
                    }`}
                  >
                    {/* Left: Tier Number & Dedicated Icon */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-white shadow-xs text-stone-900 border-stone-200'
                            : 'bg-white/80 text-stone-700 border-stone-200'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 text-emerald-700" />
                      </div>

                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                              isSelected ? 'text-stone-900 font-extrabold' : 'text-stone-800'
                            }`}
                          >
                            {info.shortTitle}
                          </span>
                          <span className="text-[10px] font-semibold text-stone-400">
                            • N{info.level}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 font-medium block truncate max-w-[170px] sm:max-w-[220px]">
                          {info.frequency}
                        </span>
                      </div>
                    </div>

                    {/* Right: Food Preview Avatars & Item Count */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Mini food avatars */}
                      <div className="hidden sm:flex -space-x-1.5 overflow-hidden">
                        {previewFoods.map((food) => (
                          <img
                            key={food.id}
                            src={food.image}
                            alt={food.name}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-xs"
                            title={food.name}
                          />
                        ))}
                      </div>

                      {/* Count Badge */}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white/90 text-stone-600 border-stone-200'
                        }`}
                      >
                        {foodsInTier.length}
                      </span>

                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 hidden sm:block" />
                      )}
                    </div>

                    {/* Desktop Pointer Arrow pointing towards detail card */}
                    {isSelected && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-8 border-t-transparent border-b-transparent border-l-emerald-600 z-30 animate-pulse" />
                    )}
                  </button>
                </div>
              );
            })}

            {/* Foundational Lifestyle Bar (Nivel 0: Hábitos Saludables) */}
            <div className="w-full flex justify-center pt-1">
              <div className="w-[100%] py-2.5 px-4 rounded-xl border border-stone-200/90 bg-stone-50 text-stone-600 text-xs flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-stone-700">
                    Cimientos: Estilo de Vida Saludable
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 hidden sm:inline">
                  Actividad física diaria (60 min) • Convivialidad • Sueño reparador
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: DEEP-DIVE TIER INSPECTOR */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-stone-50/90 rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-4">
          {/* Header of Active Tier */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${currentVisualConfig.badgeBg}`}>
                  Nivel {currentTierInfo.level} de 6
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {foodsInActiveTier.length} alimentos catalogados
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                {currentTierInfo.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {currentTierInfo.description}
              </p>
            </div>
          </div>

          {/* Biological Function & Frequency Recommendation Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Frecuencia Recomendada
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 block">
                {currentTierInfo.frequency}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Pauta de Ración
              </span>
              <p className="text-xs text-stone-700 leading-snug line-clamp-2">
                {currentVisualConfig.portionGuide}
              </p>
            </div>
          </div>

          {/* Average Macro Metrics for this tier */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-3 flex items-center justify-around text-center shadow-2xs">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Calorías Promedio</span>
              <strong className="text-xs sm:text-sm font-bold text-amber-800">{tierAverages.calories} kcal</strong>
              <span className="text-[10px] text-stone-400 block">/ 100g</span>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Proteína Promedio</span>
              <strong className="text-xs sm:text-sm font-bold text-indigo-800">{tierAverages.protein}g</strong>
              <span className="text-[10px] text-stone-400 block">/ 100g</span>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Fibra Promedio</span>
              <strong className="text-xs sm:text-sm font-bold text-emerald-800">{tierAverages.fiber}g</strong>
              <span className="text-[10px] text-stone-400 block">/ 100g</span>
            </div>
          </div>

          {/* Biological Role callout */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Función metabólica principal:</strong>
              <p className="text-emerald-900 leading-relaxed">{currentVisualConfig.biologicalRole}</p>
            </div>
          </div>

          {/* Foods Inside This Tier */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
              <span>Alimentos en este nivel ({foodsInActiveTier.length}):</span>
              <span className="text-stone-400 font-normal">Toca para ver ficha completa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {foodsInActiveTier.map((food) => (
                <div
                  key={food.id}
                  onClick={() => setSelectedFoodDetail(food)}
                  className="p-2.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all flex items-center justify-between gap-2 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-stone-800 group-hover:text-emerald-700 transition-colors truncate">
                        {food.name.split('/')[0]}
                      </h4>
                      <span className="text-[10px] text-stone-500 block truncate">
                        {food.servingUnitName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-amber-800 block">
                      {food.per100g.calories} kcal
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      {food.per100g.protein}g P
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Link to filter full Explorer */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                if (onSelectTier) onSelectTier(activeTierDetail);
                setActiveTab('explorador');
              }}
              className="flex-1 py-2 px-3 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Filtrar estos {foodsInActiveTier.length} alimentos en el catálogo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getGoogleNutritionUrl(currentTierInfo.shortTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 text-xs font-semibold bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              title="Consultar en Google Nutrition"
            >
              <span>Ver en Google</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
