import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types/nutrition';
import { FOODS_DATA } from '../data/foodsData';
import { useNutrition } from '../context/NutritionContext';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Calculator,
  Plus,
  Trash2,
  Flame,
  Dna,
  Wheat,
  Droplet,
  Sparkles,
  Share2,
  Check,
  Scale,
  Search,
  RotateCcw,
  Sliders,
  Target,
  PieChart as PieChartIcon,
  Download,
  FileDown,
  FileText,
} from 'lucide-react';
import { exportMealToPdf } from '../utils/pdfExport';

export const NutritionCalculator: React.FC = () => {
  const {
    mealItems,
    addFoodToMeal,
    removeFoodFromMeal,
    updateMealItemGrams,
    clearMeal,
    loadPresetMeal,
    setSelectedFoodDetail,
  } = useNutrition();

  const [searchFoodQuery, setSearchFoodQuery] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [showGoalSettings, setShowGoalSettings] = useState(false);

  // Daily target goals (customizable by user)
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 75,
    carbs: 230,
    fat: 65,
    fiber: 30,
  });

  // Calculate aggregated totals
  const totals = useMemo(() => {
    return mealItems.reduce(
      (acc, item) => {
        const mult = item.grams / 100;
        acc.calories += item.food.per100g.calories * mult;
        acc.protein += item.food.per100g.protein * mult;
        acc.carbs += item.food.per100g.carbs * mult;
        acc.fat += item.food.per100g.fat * mult;
        acc.fiber += item.food.per100g.fiber * mult;
        acc.potassium += (item.food.per100g.potassium || 0) * mult;
        acc.calcium += (item.food.per100g.calcium || 0) * mult;
        acc.iron += (item.food.per100g.iron || 0) * mult;
        acc.vitaminC += (item.food.per100g.vitaminC || 0) * mult;
        acc.sodium += (item.food.per100g.sodium || 0) * mult;
        acc.totalGrams += item.grams;
        return acc;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        vitaminC: 0,
        sodium: 0,
        totalGrams: 0,
      }
    );
  }, [mealItems]);

  // Round totals
  const roundedTotals = {
    calories: Math.round(totals.calories),
    protein: Number(totals.protein.toFixed(1)),
    carbs: Number(totals.carbs.toFixed(1)),
    fat: Number(totals.fat.toFixed(1)),
    fiber: Number(totals.fiber.toFixed(1)),
    potassium: Math.round(totals.potassium),
    calcium: Math.round(totals.calcium),
    iron: Number(totals.iron.toFixed(1)),
    vitaminC: Number(totals.vitaminC.toFixed(1)),
    sodium: Math.round(totals.sodium),
  };

  // Caloric distribution percentages
  const calFromProtein = roundedTotals.protein * 4;
  const calFromCarbs = roundedTotals.carbs * 4;
  const calFromFat = roundedTotals.fat * 9;
  const totalCalSum = calFromProtein + calFromCarbs + calFromFat || 1;

  const pctProtein = Math.round((calFromProtein / totalCalSum) * 100);
  const pctCarbs = Math.round((calFromCarbs / totalCalSum) * 100);
  const pctFat = Math.round((calFromFat / totalCalSum) * 100);

  const [chartMetric, setChartMetric] = useState<'calories' | 'grams'>('calories');

  // Recharts interactive donut data
  const chartData = useMemo(() => {
    const hasData = roundedTotals.protein > 0 || roundedTotals.carbs > 0 || roundedTotals.fat > 0;
    if (!hasData) return [];

    return [
      {
        name: 'Proteínas',
        value: chartMetric === 'calories' ? Math.round(calFromProtein) : roundedTotals.protein,
        grams: roundedTotals.protein,
        calories: Math.round(calFromProtein),
        percent: pctProtein,
        color: '#10b981', // emerald-500
      },
      {
        name: 'Carbohidratos',
        value: chartMetric === 'calories' ? Math.round(calFromCarbs) : roundedTotals.carbs,
        grams: roundedTotals.carbs,
        calories: Math.round(calFromCarbs),
        percent: pctCarbs,
        color: '#0284c7', // sky-600
      },
      {
        name: 'Grasas',
        value: chartMetric === 'calories' ? Math.round(calFromFat) : roundedTotals.fat,
        grams: roundedTotals.fat,
        calories: Math.round(calFromFat),
        percent: pctFat,
        color: '#f97316', // orange-500
      },
    ];
  }, [roundedTotals.protein, roundedTotals.carbs, roundedTotals.fat, calFromProtein, calFromCarbs, calFromFat, pctProtein, pctCarbs, pctFat, chartMetric]);

  // Filtered food catalog to add
  const availableFoodsToAdd = useMemo(() => {
    if (!searchFoodQuery.trim()) {
      return FOODS_DATA.slice(0, 8);
    }
    const q = searchFoodQuery.toLowerCase().trim();
    return FOODS_DATA.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [searchFoodQuery]);

  const handleCopySummary = () => {
    if (mealItems.length === 0) return;
    const itemsText = mealItems
      .map((item) => `• ${item.food.name}: ${item.grams}g (${Math.round((item.food.per100g.calories * item.grams) / 100)} kcal)`)
      .join('\n');

    const summaryText = `--- NutriTech: Resumen de Plato / Comida ---
${itemsText}
---------------------------------------------
TOTALES NUTRICIONALES:
Energía: ${roundedTotals.calories} kcal
Proteínas: ${roundedTotals.protein}g (${pctProtein}% de kcal)
Carbohidratos: ${roundedTotals.carbs}g (${pctCarbs}% de kcal)
Grasas: ${roundedTotals.fat}g (${pctFat}% de kcal)
Fibra dietética: ${roundedTotals.fiber}g
Potasio: ${roundedTotals.potassium} mg | Calcio: ${roundedTotals.calcium} mg
*Valores de referencia calculados con NutriTech.`;

    navigator.clipboard.writeText(summaryText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfToast, setPdfToast] = useState(false);

  const handleDownloadPdf = () => {
    if (mealItems.length === 0) return;
    setIsGeneratingPdf(true);
    try {
      exportMealToPdf({
        mealItems,
        totals: {
          ...roundedTotals,
          totalGrams: totals.totalGrams,
        },
        pctMacros: {
          protein: pctProtein,
          carbs: pctCarbs,
          fat: pctFat,
        },
        dailyGoals,
      });
      setPdfToast(true);
      setTimeout(() => setPdfToast(false), 3000);
    } catch (err) {
      console.error('Error al generar PDF nutricional:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-4 h-4" />
          <span>Calculadora Nutricional & Compositor de Platos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
          Calculadora Nutricional Interactiva
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Arma tu plato en tiempo real especificando la cantidad en gramos de cada alimento.
          Observa la combinación matemática de calorías, macronutrientes y micronutrientes esenciales.
        </p>
      </div>

      {/* Preset selector bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
        <span className="text-xs text-stone-400 font-medium flex-shrink-0">
          Cargar plato de ejemplo:
        </span>
        <button
          onClick={() => loadPresetMeal('desayuno_vital')}
          className="text-xs px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 font-semibold text-stone-700 hover:text-emerald-800 transition-colors flex-shrink-0"
        >
          Desayuno Vital (Avena + Yogur + Arándanos)
        </button>
        <button
          onClick={() => loadPresetMeal('almuerzo_mediterraneo')}
          className="text-xs px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 font-semibold text-stone-700 hover:text-emerald-800 transition-colors flex-shrink-0"
        >
          Almuerzo Mediterráneo (Salmón + Quinoa)
        </button>
        <button
          onClick={() => loadPresetMeal('cena_ligera_fit')}
          className="text-xs px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 font-semibold text-stone-700 hover:text-emerald-800 transition-colors flex-shrink-0"
        >
          Cena Fit (Pechuga + Brócoli + Calabacín)
        </button>
        <button
          onClick={() => loadPresetMeal('snack_recuperacion')}
          className="text-xs px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 font-semibold text-stone-700 hover:text-emerald-800 transition-colors flex-shrink-0"
        >
          Snack Saludable (Kéfir + Plátano + Almendras)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Meal Plate Builder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Plate composer card */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-600" />
                  Alimentos en tu plato ({mealItems.length})
                </h2>
                <span className="text-xs text-stone-500">
                  Peso total acumulado: {Math.round(totals.totalGrams)} gramos
                </span>
              </div>

              {mealItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearMeal}
                  className="text-xs text-stone-400 hover:text-rose-600 font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Vaciar plato
                </button>
              )}
            </div>

            {/* List of items in current meal */}
            {mealItems.length > 0 ? (
              <div className="mt-4 space-y-3">
                {mealItems.map((item) => {
                  const mult = item.grams / 100;
                  const itemCal = Math.round(item.food.per100g.calories * mult);
                  const itemProt = (item.food.per100g.protein * mult).toFixed(1);
                  const itemCarb = (item.food.per100g.carbs * mult).toFixed(1);
                  const itemFat = (item.food.per100g.fat * mult).toFixed(1);

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 hover:border-stone-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.food.image}
                          alt={item.food.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                          onClick={() => setSelectedFoodDetail(item.food)}
                        />
                        <div>
                          <h3
                            onClick={() => setSelectedFoodDetail(item.food)}
                            className="text-sm font-bold text-stone-900 hover:text-emerald-700 cursor-pointer transition-colors"
                          >
                            {item.food.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                            <span className="text-amber-800 font-semibold">{itemCal} kcal</span>
                            <span>•</span>
                            <span>P: {itemProt}g</span>
                            <span>•</span>
                            <span>C: {itemCarb}g</span>
                            <span>•</span>
                            <span>G: {itemFat}g</span>
                          </div>
                        </div>
                      </div>

                      {/* Gram input and Stepper */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200/60">
                        <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-lg p-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateMealItemGrams(item.id, item.grams - 10)}
                            className="w-7 h-7 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100 rounded text-sm"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="2000"
                            value={item.grams}
                            onChange={(e) => updateMealItemGrams(item.id, Number(e.target.value))}
                            className="w-14 text-center text-xs font-bold text-stone-800 focus:outline-none"
                          />
                          <span className="text-[11px] text-stone-400 pr-1">g</span>
                          <button
                            type="button"
                            onClick={() => updateMealItemGrams(item.id, item.grams + 10)}
                            className="w-7 h-7 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100 rounded text-sm"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFoodFromMeal(item.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          aria-label={`Eliminar ${item.food.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-stone-800">Tu plato está vacío</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                  Agrega alimentos desde el buscador inferior o elige uno de los platos de ejemplo arriba.
                </p>
              </div>
            )}
          </div>

          {/* Quick Add Food Section */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-5 sm:p-6">
            <h3 className="text-sm font-bold text-stone-900 font-display mb-2 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-600" />
              Añadir más alimentos al plato
            </h3>

            <div className="relative mb-3">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFoodQuery}
                onChange={(e) => setSearchFoodQuery(e.target.value)}
                placeholder="Escribe el nombre del alimento para agregarlo..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableFoodsToAdd.map((food) => (
                <button
                  key={food.id}
                  type="button"
                  onClick={() => addFoodToMeal(food)}
                  className="p-2 text-left bg-stone-50 hover:bg-emerald-50/70 border border-stone-200 hover:border-emerald-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-7 h-7 rounded-md object-cover"
                    />
                    <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-800 line-clamp-1">
                      {food.name.split('/')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-500">
                    <span>{food.per100g.calories} kcal/100g</span>
                    <span className="text-emerald-700 font-bold group-hover:scale-110 transition-transform">
                      +
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Aggregated Nutritional Results & Charts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Totals Card */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Total Nutricional Combinado
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 font-display">
                  Composición del Plato
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={mealItems.length === 0 || isGeneratingPdf}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg border border-emerald-200 transition-colors disabled:opacity-40 cursor-pointer"
                  title="Descargar informe nutricional en PDF"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Exportar PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  disabled={mealItems.length === 0}
                  className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-stone-200 transition-colors disabled:opacity-40"
                  title="Copiar resumen del plato"
                >
                  {copiedToast ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {copiedToast && (
              <div className="mt-2 p-2 bg-emerald-100 text-emerald-900 text-xs rounded-lg font-medium text-center animate-in fade-in">
                ¡Resumen nutricional copiado al portapapeles!
              </div>
            )}

            {pdfToast && (
              <div className="mt-2 p-2 bg-emerald-100 text-emerald-900 text-xs rounded-lg font-medium text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡Informe nutricional en PDF descargado con éxito!</span>
              </div>
            )}

            {/* Total Energy Display */}
            <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 text-amber-600" />
                Aporte Energético Total
              </div>
              <div className="text-4xl sm:text-5xl font-black text-amber-950 font-display">
                {roundedTotals.calories}
              </div>
              <div className="text-xs text-amber-800 font-semibold mt-0.5">kilocalorías (kcal)</div>

              {/* Progress towards daily goal */}
              <div className="mt-3 pt-3 border-t border-amber-200/60">
                <div className="flex justify-between text-xs font-semibold text-amber-900 mb-1">
                  <span>Meta diaria estimada:</span>
                  <span>
                    {Math.round((roundedTotals.calories / dailyGoals.calories) * 100)}% de {dailyGoals.calories} kcal
                  </span>
                </div>
                <div className="h-2 w-full bg-amber-200/70 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${Math.min(100, Math.round((roundedTotals.calories / dailyGoals.calories) * 100))}%`,
                    }}
                    className="h-full bg-amber-600 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Macro Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/70">
                <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold mb-0.5">
                  <Dna className="w-3.5 h-3.5" /> Proteínas
                </div>
                <div className="text-xl font-bold text-emerald-950 font-display">
                  {roundedTotals.protein} <span className="text-xs font-medium">g</span>
                </div>
                <div className="text-[11px] text-emerald-700">
                  {pctProtein}% calorías • Meta: {dailyGoals.protein}g
                </div>
              </div>

              <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200/70">
                <div className="flex items-center gap-1 text-sky-700 text-xs font-bold mb-0.5">
                  <Wheat className="w-3.5 h-3.5" /> Carbohidratos
                </div>
                <div className="text-xl font-bold text-sky-950 font-display">
                  {roundedTotals.carbs} <span className="text-xs font-medium">g</span>
                </div>
                <div className="text-[11px] text-sky-700">
                  {pctCarbs}% calorías • Meta: {dailyGoals.carbs}g
                </div>
              </div>

              <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200/70">
                <div className="flex items-center gap-1 text-orange-700 text-xs font-bold mb-0.5">
                  <Droplet className="w-3.5 h-3.5" /> Grasas Totales
                </div>
                <div className="text-xl font-bold text-orange-950 font-display">
                  {roundedTotals.fat} <span className="text-xs font-medium">g</span>
                </div>
                <div className="text-[11px] text-orange-700">
                  {pctFat}% calorías • Meta: {dailyGoals.fat}g
                </div>
              </div>

              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/70">
                <div className="flex items-center gap-1 text-teal-700 text-xs font-bold mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" /> Fibra Dietética
                </div>
                <div className="text-xl font-bold text-teal-950 font-display">
                  {roundedTotals.fiber} <span className="text-xs font-medium">g</span>
                </div>
                <div className="text-[11px] text-teal-700">
                  {Math.round((roundedTotals.fiber / dailyGoals.fiber) * 100)}% de {dailyGoals.fiber}g/día
                </div>
              </div>
            </div>

            {/* Interactive Recharts Donut Chart */}
            <div className="mb-6 p-4 rounded-2xl bg-stone-50/90 border border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <PieChartIcon className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Distribución de Macronutrientes
                  </h4>
                </div>

                {/* Metric toggle: Calories vs Grams */}
                <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 text-[11px] font-semibold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setChartMetric('calories')}
                    className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      chartMetric === 'calories'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Por Calorías (% kcal)
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartMetric('grams')}
                    className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      chartMetric === 'grams'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Por Peso (g)
                  </button>
                </div>
              </div>

              {chartData.length > 0 ? (
                <div className="relative w-full h-56 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={84}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={700}
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            className="cursor-pointer transition-opacity hover:opacity-85"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-stone-900/95 text-white p-3 rounded-xl text-xs shadow-xl border border-stone-700/80 backdrop-blur-md z-50">
                                <div className="flex items-center gap-1.5 font-bold mb-1.5" style={{ color: data.color }}>
                                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
                                  <span>{data.name}</span>
                                </div>
                                <div className="space-y-1 text-stone-300 text-[11px]">
                                  <div className="flex justify-between gap-4">
                                    <span>Cantidad:</span>
                                    <strong className="text-white">{data.grams} g</strong>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span>Energía:</span>
                                    <strong className="text-white">{data.calories} kcal</strong>
                                  </div>
                                  <div className="flex justify-between gap-4 border-t border-stone-700/60 pt-1">
                                    <span>Reparto calórico:</span>
                                    <strong className="text-emerald-400 font-bold">{data.percent}%</strong>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Centered Donut Readout */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      {chartMetric === 'calories' ? 'Energía' : 'Peso'}
                    </span>
                    <span className="text-xl font-black text-stone-900 font-display leading-tight">
                      {chartMetric === 'calories' ? roundedTotals.calories : Math.round(totals.totalGrams)}
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold">
                      {chartMetric === 'calories' ? 'kcal' : 'gramos'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-44 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-stone-200/70 text-stone-400 flex items-center justify-center mb-2">
                    <PieChartIcon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Agrega alimentos al plato para visualizar el gráfico de dona interactivo de macronutrientes.
                  </p>
                </div>
              )}

              {/* Chart Legend with interactive values */}
              {chartData.length > 0 && (
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-200/70 text-center text-xs">
                  <div className="p-2 bg-white rounded-xl border border-stone-200/80">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Proteínas
                    </div>
                    <div className="font-extrabold text-stone-800 text-sm mt-0.5">
                      {pctProtein}%
                    </div>
                    <span className="text-[10px] text-stone-400 block">{roundedTotals.protein}g</span>
                  </div>

                  <div className="p-2 bg-white rounded-xl border border-stone-200/80">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-sky-700">
                      <span className="w-2 h-2 rounded-full bg-sky-600" />
                      Carbohidratos
                    </div>
                    <div className="font-extrabold text-stone-800 text-sm mt-0.5">
                      {pctCarbs}%
                    </div>
                    <span className="text-[10px] text-stone-400 block">{roundedTotals.carbs}g</span>
                  </div>

                  <div className="p-2 bg-white rounded-xl border border-stone-200/80">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-orange-700">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Grasas
                    </div>
                    <div className="font-extrabold text-stone-800 text-sm mt-0.5">
                      {pctFat}%
                    </div>
                    <span className="text-[10px] text-stone-400 block">{roundedTotals.fat}g</span>
                  </div>
                </div>
              )}

              {/* Reference Guidelines Footer */}
              <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2.5 px-1">
                <span>Rango AMDR sugerido: P (10-35%)</span>
                <span>C (45-65%)</span>
                <span>G (20-35%)</span>
              </div>
            </div>

            {/* Micronutrient Summary Drawer */}
            <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/60 mb-4">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Micronutrientes acumulados en el plato
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-200/50">
                  <span className="text-stone-500">Potasio:</span>
                  <strong className="text-stone-800">{roundedTotals.potassium} mg</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/50">
                  <span className="text-stone-500">Vitamina C:</span>
                  <strong className="text-stone-800">{roundedTotals.vitaminC} mg</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/50">
                  <span className="text-stone-500">Calcio:</span>
                  <strong className="text-stone-800">{roundedTotals.calcium} mg</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/50">
                  <span className="text-stone-500">Hierro:</span>
                  <strong className="text-stone-800">{roundedTotals.iron} mg</strong>
                </div>
              </div>
            </div>

            {/* Toggle Goal customization */}
            <div>
              <button
                type="button"
                onClick={() => setShowGoalSettings(!showGoalSettings)}
                className="w-full text-xs font-semibold text-emerald-800 hover:text-emerald-950 py-1.5 flex items-center justify-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                {showGoalSettings ? 'Ocultar metas diarias' : 'Personalizar mis metas diarias'}
              </button>

              {showGoalSettings && (
                <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-stone-600">Calorías diarias objetivo:</label>
                    <input
                      type="number"
                      value={dailyGoals.calories}
                      onChange={(e) =>
                        setDailyGoals((prev) => ({ ...prev, calories: Number(e.target.value) }))
                      }
                      className="w-20 px-2 py-1 bg-white border border-stone-300 rounded text-right font-bold"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-stone-600">Proteínas (g):</label>
                    <input
                      type="number"
                      value={dailyGoals.protein}
                      onChange={(e) =>
                        setDailyGoals((prev) => ({ ...prev, protein: Number(e.target.value) }))
                      }
                      className="w-20 px-2 py-1 bg-white border border-stone-300 rounded text-right font-bold"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-stone-600">Fibra objetivo (g):</label>
                    <input
                      type="number"
                      value={dailyGoals.fiber}
                      onChange={(e) =>
                        setDailyGoals((prev) => ({ ...prev, fiber: Number(e.target.value) }))
                      }
                      className="w-20 px-2 py-1 bg-white border border-stone-300 rounded text-right font-bold"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Download PDF CTA Button */}
            <div className="pt-4 mt-3 border-t border-stone-200/80">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={mealItems.length === 0 || isGeneratingPdf}
                className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white shadow-sm shadow-emerald-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar Desglose en PDF'}</span>
              </button>
              <p className="text-[10px] text-stone-400 text-center mt-1.5">
                Genera un informe descargable con macros, ingredientes, micronutrientes y rango AMDR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
