import React, { useState } from 'react';
import { FoodItem } from '../types/nutrition';
import { PYRAMID_TIERS_INFO } from '../data/foodsData';
import { useNutrition } from '../context/NutritionContext';
import {
  X,
  Heart,
  PlusCircle,
  Flame,
  Dna,
  Wheat,
  Droplet,
  Info,
  Sparkles,
  Check,
  Scale,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { getGoogleNutritionUrl } from '../utils/searchUtils';

interface FoodDetailModalProps {
  food: FoodItem;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ food, onClose }) => {
  const {
    isFoodFavorite,
    toggleFavoriteFood,
    addFoodToMeal,
    setActiveTab,
  } = useNutrition();

  // Mode: '100g' | 'standard' | 'custom'
  const [portionMode, setPortionMode] = useState<'100g' | 'standard' | 'custom'>('standard');
  const [customGrams, setCustomGrams] = useState<number>(food.defaultServingGrams);
  const [addedToast, setAddedToast] = useState(false);

  // Active grams calculation
  const activeGrams =
    portionMode === '100g'
      ? 100
      : portionMode === 'standard'
      ? food.defaultServingGrams
      : customGrams;

  const multiplier = activeGrams / 100;

  const calculatedNutrients = {
    calories: Math.round(food.per100g.calories * multiplier),
    protein: Number((food.per100g.protein * multiplier).toFixed(1)),
    carbs: Number((food.per100g.carbs * multiplier).toFixed(1)),
    fat: Number((food.per100g.fat * multiplier).toFixed(1)),
    fiber: Number((food.per100g.fiber * multiplier).toFixed(1)),
    sodium: Math.round((food.per100g.sodium || 0) * multiplier),
    potassium: Math.round((food.per100g.potassium || 0) * multiplier),
    vitaminC: Number(((food.per100g.vitaminC || 0) * multiplier).toFixed(1)),
    calcium: Math.round((food.per100g.calcium || 0) * multiplier),
    iron: Number(((food.per100g.iron || 0) * multiplier).toFixed(1)),
  };

  const isFavorite = isFoodFavorite(food.id);

  const handleAddToCalculator = () => {
    addFoodToMeal(food, activeGrams);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleGoToCalculator = () => {
    addFoodToMeal(food, activeGrams);
    onClose();
    setActiveTab('calculadora');
  };

  // Calculate calories from each macro to show distribution
  const calFromProtein = calculatedNutrients.protein * 4;
  const calFromCarbs = calculatedNutrients.carbs * 4;
  const calFromFat = calculatedNutrients.fat * 9;
  const totalCalSum = calFromProtein + calFromCarbs + calFromFat || 1;

  const pctProtein = Math.round((calFromProtein / totalCalSum) * 100);
  const pctCarbs = Math.round((calFromCarbs / totalCalSum) * 100);
  const pctFat = Math.round((calFromFat / totalCalSum) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden my-8 max-h-[90vh] flex flex-col border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-100 flex-shrink-0">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 p-2 rounded-full backdrop-blur-md transition-colors shadow-sm"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavoriteFood(food.id)}
            className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-stone-700 hover:text-rose-500 hover:bg-white'
            }`}
            aria-label="Guardar en favoritos"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                {food.scientificOrCommonName || food.category}
              </span>
              <span className="text-[10px] bg-stone-900/80 backdrop-blur-md px-2 py-0.5 rounded-full text-emerald-200 font-semibold border border-emerald-500/30 flex items-center gap-1">
                <Layers className="w-3 h-3 text-emerald-400" />
                {PYRAMID_TIERS_INFO[food.pyramidTier]?.shortTitle || 'Pirámide Alimenticia'}
              </span>
              {food.isPeruvianOrigin && (
                <span className="text-[10px] bg-rose-600/90 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-bold border border-rose-400/30 flex items-center gap-1 shadow-xs">
                  <span>🇵🇪 Origen Perú ({food.regionPeru})</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
              {food.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-700">
          {/* Peruvian Superfood Callout */}
          {food.isPeruvianOrigin && (
            <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border border-rose-200/80 rounded-xl p-3.5 flex items-start gap-3">
              <span className="text-2xl mt-0.5 flex-shrink-0">🇵🇪</span>
              <div className="text-xs space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-rose-950 uppercase tracking-wide">
                    Superalimento Emblemático del Perú • Región {food.regionPeru}
                  </span>
                  {food.scientificOrCommonName && (
                    <span className="text-stone-500 italic">
                      ({food.scientificOrCommonName})
                    </span>
                  )}
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Alimento autóctono de gran valor biológico y culinario. Composición verificada según las Tablas Peruanas de Composición de Alimentos del Instituto Nacional de Salud (INS Perú / CENAN) y el Ministerio de Desarrollo Agrario y Riego (MIDAGRI).
                </p>
              </div>
            </div>
          )}

          <p className="text-sm leading-relaxed text-stone-600">{food.description}</p>

          {/* Portion Selector Buttons */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                Porción a analizar
              </span>
              <span className="font-bold text-emerald-800 text-sm">
                {activeGrams} gramos
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPortionMode('100g')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  portionMode === '100g'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                100 gramos
              </button>
              <button
                type="button"
                onClick={() => setPortionMode('standard')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center truncate ${
                  portionMode === 'standard'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title={food.servingUnitName}
              >
                Porción habitual
              </button>
              <button
                type="button"
                onClick={() => setPortionMode('custom')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  portionMode === 'custom'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Personalizada
              </button>
            </div>

            {/* Custom slider or input when in custom mode */}
            {portionMode === 'custom' && (
              <div className="pt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={customGrams}
                  onChange={(e) => setCustomGrams(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={customGrams}
                    onChange={(e) => setCustomGrams(Math.max(1, Number(e.target.value)))}
                    className="w-16 px-2 py-1 text-xs border border-stone-300 rounded font-bold text-center text-emerald-800"
                  />
                  <span className="text-xs text-stone-500 font-medium">g</span>
                </div>
              </div>
            )}

            {portionMode === 'standard' && (
              <p className="text-xs text-stone-500 italic">
                Equivalente a: <strong className="text-stone-700">{food.servingUnitName}</strong>
              </p>
            )}
          </div>

          {/* Macro Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* Calorías */}
            <div className="col-span-2 sm:col-span-1 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-700 text-xs font-semibold mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Energía
              </div>
              <div className="text-2xl font-extrabold text-amber-900 font-display">
                {calculatedNutrients.calories}
              </div>
              <div className="text-[11px] text-amber-800 font-medium">kcal</div>
            </div>

            {/* Proteínas */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-semibold mb-1">
                <Dna className="w-3.5 h-3.5 text-emerald-600" />
                Proteína
              </div>
              <div className="text-2xl font-extrabold text-emerald-900 font-display">
                {calculatedNutrients.protein}
              </div>
              <div className="text-[11px] text-emerald-800 font-medium">g ({pctProtein}%)</div>
            </div>

            {/* Carbohidratos */}
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-sky-700 text-xs font-semibold mb-1">
                <Wheat className="w-3.5 h-3.5 text-sky-600" />
                Carbohidratos
              </div>
              <div className="text-2xl font-extrabold text-sky-900 font-display">
                {calculatedNutrients.carbs}
              </div>
              <div className="text-[11px] text-sky-800 font-medium">g ({pctCarbs}%)</div>
            </div>

            {/* Grasas */}
            <div className="bg-orange-50/80 border border-orange-200/80 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-orange-700 text-xs font-semibold mb-1">
                <Droplet className="w-3.5 h-3.5 text-orange-600" />
                Grasas
              </div>
              <div className="text-2xl font-extrabold text-orange-900 font-display">
                {calculatedNutrients.fat}
              </div>
              <div className="text-[11px] text-orange-800 font-medium">g ({pctFat}%)</div>
            </div>

            {/* Fibra */}
            <div className="bg-teal-50/80 border border-teal-200/80 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-teal-700 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Fibra
              </div>
              <div className="text-2xl font-extrabold text-teal-900 font-display">
                {calculatedNutrients.fiber}
              </div>
              <div className="text-[11px] text-teal-800 font-medium">g dietética</div>
            </div>
          </div>

          {/* Macro percentage bar */}
          <div>
            <div className="flex justify-between text-xs font-medium text-stone-500 mb-1.5">
              <span>Distribución calórica por macronutriente:</span>
              <span>
                P: {pctProtein}% | C: {pctCarbs}% | G: {pctFat}%
              </span>
            </div>
            <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${pctProtein}%` }}
                className="bg-emerald-500 transition-all duration-300"
                title={`Proteína: ${pctProtein}%`}
              />
              <div
                style={{ width: `${pctCarbs}%` }}
                className="bg-sky-400 transition-all duration-300"
                title={`Carbohidratos: ${pctCarbs}%`}
              />
              <div
                style={{ width: `${pctFat}%` }}
                className="bg-orange-400 transition-all duration-300"
                title={`Grasas: ${pctFat}%`}
              />
            </div>
          </div>

          {/* Micronutrient Highlights */}
          <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/60">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              Micronutrientes clave ({activeGrams}g)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2 bg-white rounded-lg border border-stone-200/60">
                <span className="text-stone-500 block">Potasio</span>
                <span className="font-bold text-stone-800 text-sm">
                  {calculatedNutrients.potassium} mg
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/60">
                <span className="text-stone-500 block">Vitamina C</span>
                <span className="font-bold text-stone-800 text-sm">
                  {calculatedNutrients.vitaminC} mg
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/60">
                <span className="text-stone-500 block">Calcio</span>
                <span className="font-bold text-stone-800 text-sm">
                  {calculatedNutrients.calcium} mg
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/60">
                <span className="text-stone-500 block">Hierro</span>
                <span className="font-bold text-stone-800 text-sm">
                  {calculatedNutrients.iron} mg
                </span>
              </div>
            </div>
          </div>

          {/* Health Benefits & Culinary Tip */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                Beneficios funcionales
              </h4>
              <ul className="space-y-1 text-xs text-stone-600">
                {food.healthBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {food.culinaryTip && (
              <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-3 rounded-r-lg text-xs text-emerald-950">
                <strong className="font-semibold block mb-0.5">Consejo culinario del chef:</strong>
                <p>{food.culinaryTip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            <span>Valores basados en referencias nutricionales estandarizadas.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <a
              href={getGoogleNutritionUrl(food.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 shadow-2xs transition-colors"
              title="Abrir panel oficial en Google Nutrición"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ver en Google</span>
            </a>

            <button
              type="button"
              onClick={handleAddToCalculator}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                addedToast
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300 shadow-sm'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  ¡Añadido ({activeGrams}g)!
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  Añadir a mi plato
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleGoToCalculator}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all"
            >
              Calcular plato completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
