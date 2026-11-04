import React, { useState, useMemo } from 'react';
import { FoodCategory, FoodItem, PyramidTier } from '../types/nutrition';
import { FOODS_DATA, CATEGORY_LABELS, PYRAMID_TIERS_INFO } from '../data/foodsData';
import { useNutrition } from '../context/NutritionContext';
import { FoodPyramidSection } from './FoodPyramidSection';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Dna,
  Heart,
  Plus,
  ArrowUpDown,
  Sparkles,
  Check,
  RotateCcw,
  Mic,
  MicOff,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { normalizeText, getGoogleNutritionUrl, startVoiceRecognition } from '../utils/searchUtils';

export const FoodExplorer: React.FC = () => {
  const {
    isFoodFavorite,
    toggleFavoriteFood,
    setSelectedFoodDetail,
    addFoodToMeal,
    quickSearchQuery,
    setQuickSearchQuery,
    selectedPyramidTier,
    setSelectedPyramidTier,
  } = useNutrition();

  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'todas'>('todas');
  const [peruFilter, setPeruFilter] = useState<'todas' | 'peru' | 'costa' | 'sierra' | 'selva'>('todas');
  const [sortBy, setSortBy] = useState<'nombre' | 'calorias-asc' | 'calorias-desc' | 'proteina' | 'fibra'>('nombre');
  const [macroFilter, setMacroFilter] = useState<'todos' | 'alto-proteina' | 'bajo-calorias' | 'alto-fibra'>('todos');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [showPyramidVisual, setShowPyramidVisual] = useState<boolean>(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);

  // Filter and sort items with accent-insensitive search
  const filteredFoods = useMemo(() => {
    return FOODS_DATA.filter((food) => {
      // Pyramid tier filter
      if (selectedPyramidTier !== 'todas' && food.pyramidTier !== selectedPyramidTier) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'todas' && food.category !== selectedCategory) {
        return false;
      }

      // Peru origin & region filter
      if (peruFilter === 'peru' && !food.isPeruvianOrigin) {
        return false;
      }
      if (peruFilter === 'costa' && (!food.isPeruvianOrigin || food.regionPeru !== 'Costa')) {
        return false;
      }
      if (peruFilter === 'sierra' && (!food.isPeruvianOrigin || food.regionPeru !== 'Sierra')) {
        return false;
      }
      if (peruFilter === 'selva' && (!food.isPeruvianOrigin || food.regionPeru !== 'Selva')) {
        return false;
      }

      // Search query (normalized & accent-insensitive)
      if (quickSearchQuery.trim()) {
        const query = normalizeText(quickSearchQuery);
        const nameNorm = normalizeText(food.name);
        const descNorm = normalizeText(food.description);
        const catNorm = normalizeText(food.category);
        const tierNorm = normalizeText(PYRAMID_TIERS_INFO[food.pyramidTier]?.title || '');
        const tagsNorm = food.tags.map((t) => normalizeText(t)).join(' ');
        const scientificNorm = normalizeText(food.scientificOrCommonName || '');
        const regionNorm = normalizeText(food.regionPeru || '');

        const matches =
          nameNorm.includes(query) ||
          descNorm.includes(query) ||
          catNorm.includes(query) ||
          tierNorm.includes(query) ||
          tagsNorm.includes(query) ||
          scientificNorm.includes(query) ||
          regionNorm.includes(query) ||
          (query.includes('peru') && food.isPeruvianOrigin);

        if (!matches) {
          return false;
        }
      }

      // Quick macro filter
      if (macroFilter === 'alto-proteina' && food.per100g.protein < 10) return false;
      if (macroFilter === 'bajo-calorias' && food.per100g.calories > 60) return false;
      if (macroFilter === 'alto-fibra' && food.per100g.fiber < 4) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nombre') return a.name.localeCompare(b.name, 'es');
      if (sortBy === 'calorias-asc') return a.per100g.calories - b.per100g.calories;
      if (sortBy === 'calorias-desc') return b.per100g.calories - a.per100g.calories;
      if (sortBy === 'proteina') return b.per100g.protein - a.per100g.protein;
      if (sortBy === 'fibra') return b.per100g.fiber - a.per100g.fiber;
      return 0;
    });
  }, [selectedCategory, selectedPyramidTier, peruFilter, quickSearchQuery, macroFilter, sortBy]);

  const categoriesList: { id: FoodCategory | 'todas'; label: string; count: number }[] = [
    { id: 'todas', label: 'Todas las categorías', count: FOODS_DATA.length },
    {
      id: 'frutas',
      label: 'Frutas',
      count: FOODS_DATA.filter((f) => f.category === 'frutas').length,
    },
    {
      id: 'verduras',
      label: 'Verduras',
      count: FOODS_DATA.filter((f) => f.category === 'verduras').length,
    },
    {
      id: 'proteinas',
      label: 'Proteínas',
      count: FOODS_DATA.filter((f) => f.category === 'proteinas').length,
    },
    {
      id: 'cereales',
      label: 'Granos & Cereales',
      count: FOODS_DATA.filter((f) => f.category === 'cereales').length,
    },
    {
      id: 'lacteos',
      label: 'Lácteos & Fermentos',
      count: FOODS_DATA.filter((f) => f.category === 'lacteos').length,
    },
    {
      id: 'grasas',
      label: 'Grasas Saludables',
      count: FOODS_DATA.filter((f) => f.category === 'grasas').length,
    },
    {
      id: 'bebidas',
      label: 'Bebidas & Agua',
      count: FOODS_DATA.filter((f) => f.category === 'bebidas').length,
    },
  ];

  const pyramidTiersList: { id: PyramidTier | 'todas'; label: string; levelNum?: number }[] = [
    { id: 'todas', label: 'Todos los niveles' },
    { id: 'base_hidratacion', label: '1. Hidratación (Base)', levelNum: 1 },
    { id: 'granos_tuberculos', label: '2. Granos & Tubérculos', levelNum: 2 },
    { id: 'frutas_verduras', label: '3. Frutas, Verduras & AOVE', levelNum: 3 },
    { id: 'lacteos_frutos_secos', label: '4. Lácteos & Frutos Secos', levelNum: 4 },
    { id: 'proteinas_magras', label: '5. Proteínas & Legumbres', levelNum: 5 },
    { id: 'consumo_ocasional', label: '6. Consumo Ocasional (Cúspide)', levelNum: 6 },
  ];

  const handleQuickAdd = (e: React.MouseEvent, food: FoodItem) => {
    e.stopPropagation();
    addFoodToMeal(food);
    setJustAddedId(food.id);
    setTimeout(() => {
      setJustAddedId((prev) => (prev === food.id ? null : prev));
    }, 1800);
  };

  const handleResetFilters = () => {
    setSelectedCategory('todas');
    setSelectedPyramidTier('todas');
    setPeruFilter('todas');
    setQuickSearchQuery('');
    setMacroFilter('todos');
    setSortBy('nombre');
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setVoiceToast('Escuchando con Google... Di un alimento (ej. aguacate, salmón)');
      startVoiceRecognition(
        (transcript) => {
          setQuickSearchQuery(transcript);
          setIsListening(false);
          setVoiceToast(`Buscando "${transcript}"`);
          setTimeout(() => setVoiceToast(null), 2500);
        },
        (errMsg) => {
          setIsListening(false);
          setVoiceToast(errMsg);
          setTimeout(() => setVoiceToast(null), 3000);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title & Slogan Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Base de Datos de Alimentos & Pirámide Nutricional</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
          Explorador de Alimentos & Pirámide Alimenticia
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Consulta la composición nutricional completa de todos los alimentos de la pirámide alimenticia
          (desde la base de hidratación hasta la cúspide de consumo ocasional). Busca por voz con Google,
          filtra por niveles y calcula porciones reales.
        </p>
      </div>

      {/* Interactive Food Pyramid Component */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => setShowPyramidVisual(!showPyramidVisual)}
            className="flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>{showPyramidVisual ? 'Ocultar gráfico de la Pirámide' : 'Mostrar Pirámide Alimenticia Interactiva'}</span>
          </button>

          {selectedPyramidTier !== 'todas' && (
            <span className="text-xs text-stone-600 font-semibold bg-stone-100 px-3 py-1 rounded-xl">
              Filtro activo: <strong>{PYRAMID_TIERS_INFO[selectedPyramidTier]?.shortTitle}</strong>
            </span>
          )}
        </div>

        {showPyramidVisual && (
          <FoodPyramidSection
            selectedTier={selectedPyramidTier}
            onSelectTier={(tier) => setSelectedPyramidTier(tier)}
          />
        )}
      </div>

      {/* Control Bar: Search with Google Voice + Sort + Filters */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search bar with Google Voice Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, nutriente o propiedad (ej. aguacate, salmón, avena, magnesio)..."
              className="w-full pl-11 pr-20 py-2.5 text-sm bg-white border border-stone-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-stone-800 placeholder-stone-400"
            />

            <div className="absolute right-2 top-2 flex items-center gap-1">
              {quickSearchQuery && (
                <button
                  type="button"
                  onClick={() => setQuickSearchQuery('')}
                  className="text-xs text-stone-400 hover:text-stone-700 font-bold px-1.5"
                >
                  Limpiar
                </button>
              )}

              {/* Google Voice Search Button */}
              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`p-1.5 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-stone-400 hover:text-emerald-700 hover:bg-stone-100'
                }`}
                title="Búsqueda por voz con Google"
                aria-label="Búsqueda por voz con Google"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
              <label htmlFor="sortByFoodExplorer" className="hidden sm:inline text-stone-500">Ordenar:</label>
              <select
                id="sortByFoodExplorer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-semibold text-stone-800 cursor-pointer"
              >
                <option value="nombre">Alfabético (A-Z)</option>
                <option value="calorias-asc">Menor a mayor caloría</option>
                <option value="calorias-desc">Mayor a menor caloría</option>
                <option value="proteina">Más proteína</option>
                <option value="fibra">Más fibra dietética</option>
              </select>
            </div>
          </div>
        </div>

        {/* Voice Feedback Toast */}
        {voiceToast && (
          <div className="p-2.5 bg-stone-900 text-white text-xs rounded-xl text-center shadow-md animate-in fade-in flex items-center justify-center gap-2">
            <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{voiceToast}</span>
          </div>
        )}

        {/* Pyramid Tier Filter Pills */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Filtrar por nivel de la Pirámide Alimenticia:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pb-1">
            {pyramidTiersList.map((tier) => {
              const isSelected = selectedPyramidTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedPyramidTier(tier.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Peruvian Biodiversity Section Filters */}
        <div className="bg-gradient-to-r from-rose-50/70 via-amber-50/50 to-emerald-50/60 p-3 rounded-2xl border border-rose-200/70 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-base">🇵🇪</span>
              <span>Biodiversidad & Superalimentos del Perú (INS / MINAGRI):</span>
            </div>
            {peruFilter !== 'todas' && (
              <button
                onClick={() => setPeruFilter('todas')}
                className="text-[11px] text-rose-700 hover:text-rose-900 font-semibold underline cursor-pointer"
              >
                Mostrar todos los alimentos
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <button
              onClick={() => setPeruFilter(peruFilter === 'peru' ? 'todas' : 'peru')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                peruFilter === 'peru'
                  ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                  : 'bg-white text-stone-700 hover:text-rose-700 border-rose-200 hover:bg-rose-50/60'
              }`}
            >
              <span>🇵🇪 Todos de Perú</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${peruFilter === 'peru' ? 'bg-rose-900 text-rose-100' : 'bg-rose-100 text-rose-800'}`}>
                {FOODS_DATA.filter((f) => f.isPeruvianOrigin).length}
              </span>
            </button>
            <button
              onClick={() => setPeruFilter(peruFilter === 'costa' ? 'todas' : 'costa')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                peruFilter === 'costa'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-stone-700 hover:text-amber-800 border-amber-200 hover:bg-amber-50/60'
              }`}
            >
              <span>🏖️ Costa Peruana</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${peruFilter === 'costa' ? 'bg-amber-800 text-amber-100' : 'bg-amber-100 text-amber-800'}`}>
                {FOODS_DATA.filter((f) => f.isPeruvianOrigin && f.regionPeru === 'Costa').length}
              </span>
            </button>
            <button
              onClick={() => setPeruFilter(peruFilter === 'sierra' ? 'todas' : 'sierra')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                peruFilter === 'sierra'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-stone-700 hover:text-emerald-800 border-emerald-200 hover:bg-emerald-50/60'
              }`}
            >
              <span>🏔️ Sierra & Andes</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${peruFilter === 'sierra' ? 'bg-emerald-900 text-emerald-100' : 'bg-emerald-100 text-emerald-800'}`}>
                {FOODS_DATA.filter((f) => f.isPeruvianOrigin && f.regionPeru === 'Sierra').length}
              </span>
            </button>
            <button
              onClick={() => setPeruFilter(peruFilter === 'selva' ? 'todas' : 'selva')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                peruFilter === 'selva'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-stone-700 hover:text-teal-800 border-teal-200 hover:bg-teal-50/60'
              }`}
            >
              <span>🌴 Selva Amazónica</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${peruFilter === 'selva' ? 'bg-teal-900 text-teal-100' : 'bg-teal-100 text-teal-800'}`}>
                {FOODS_DATA.filter((f) => f.isPeruvianOrigin && f.regionPeru === 'Selva').length}
              </span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Nutritional Highlight Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-emerald-600" /> Filtros nutricionales:
          </span>
          <button
            onClick={() => setMacroFilter(macroFilter === 'alto-proteina' ? 'todos' : 'alto-proteina')}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              macroFilter === 'alto-proteina'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Rico en proteína (&gt;10g/100g)
          </button>
          <button
            onClick={() => setMacroFilter(macroFilter === 'bajo-calorias' ? 'todos' : 'bajo-calorias')}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              macroFilter === 'bajo-calorias'
                ? 'bg-amber-100 text-amber-800 border-amber-300 font-semibold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Ligero (&lt;60 kcal/100g)
          </button>
          <button
            onClick={() => setMacroFilter(macroFilter === 'alto-fibra' ? 'todos' : 'alto-fibra')}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              macroFilter === 'alto-fibra'
                ? 'bg-teal-100 text-teal-800 border-teal-300 font-semibold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Alto en fibra (&gt;4g/100g)
          </button>

          {(selectedCategory !== 'todas' || selectedPyramidTier !== 'todas' || peruFilter !== 'todas' || quickSearchQuery || macroFilter !== 'todos') && (
            <button
              onClick={handleResetFilters}
              className="text-stone-500 hover:text-emerald-700 underline font-medium ml-auto flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Mostrando <strong className="text-stone-800">{filteredFoods.length}</strong> alimentos en la base de datos
        </span>
        {quickSearchQuery && (
          <a
            href={getGoogleNutritionUrl(quickSearchQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Buscar &quot;{quickSearchQuery}&quot; en Google Nutrición</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Foods Grid */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredFoods.map((food) => {
            const isFav = isFoodFavorite(food.id);
            const isJustAdded = justAddedId === food.id;
            const tierInfo = PYRAMID_TIERS_INFO[food.pyramidTier];

            return (
              <div
                key={food.id}
                onClick={() => setSelectedFoodDetail(food)}
                className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer relative"
              >
                {/* Image Cover */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-60" />

                  {/* Badges container */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                    <div className="bg-stone-950/75 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${tierInfo?.accentClass || 'bg-emerald-400'}`} />
                      <span>{tierInfo?.shortTitle || food.category}</span>
                    </div>
                    {food.isPeruvianOrigin && (
                      <div className="bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-rose-400/30">
                        <span>🇵🇪 {food.regionPeru ? `Perú • ${food.regionPeru}` : 'Perú'}</span>
                      </div>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteFood(food.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
                      isFav
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/85 text-stone-600 hover:text-rose-500 hover:bg-white'
                    }`}
                    aria-label="Marcar como favorito"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Serving size badge */}
                  <div className="absolute bottom-2.5 left-2.5 bg-stone-900/75 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {food.servingUnitName}
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-emerald-700 uppercase tracking-wider">
                        {CATEGORY_LABELS[food.category]?.label || food.category}
                      </span>
                      {food.regionPeru && (
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100">
                          {food.regionPeru}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1 font-display">
                      {food.name}
                    </h2>
                    {food.scientificOrCommonName && (
                      <p className="text-[11px] text-stone-400 italic line-clamp-1 mb-1">
                        {food.scientificOrCommonName}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  {/* Nutritional preview bar (per 100g) */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between text-[11px] mb-2 font-semibold text-stone-500">
                      <span>Por 100g:</span>
                      <span className="flex items-center gap-1 text-amber-700 font-bold">
                        <Flame className="w-3 h-3 text-amber-500" />
                        {food.per100g.calories} kcal
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1 text-center text-[10px] bg-stone-50 rounded-lg p-1.5 border border-stone-100">
                      <div>
                        <span className="text-stone-400 block">Prot</span>
                        <strong className="text-emerald-800">{food.per100g.protein}g</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Carb</span>
                        <strong className="text-sky-800">{food.per100g.carbs}g</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Grasa</span>
                        <strong className="text-orange-800">{food.per100g.fat}g</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Fibra</span>
                        <strong className="text-teal-800">{food.per100g.fiber}g</strong>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFoodDetail(food);
                        }}
                        className="flex-1 py-1.5 px-2 text-xs font-semibold text-stone-700 hover:text-emerald-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-center"
                      >
                        Detalles
                      </button>

                      {/* Google Nutrition Quick link */}
                      <a
                        href={getGoogleNutritionUrl(food.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-stone-400 hover:text-emerald-700 hover:bg-stone-100 rounded-lg transition-colors"
                        title="Ver ficha nutricional en Google"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, food)}
                        title="Añadir a la calculadora de plato"
                        className={`p-1.5 rounded-lg border transition-all ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400'
                        }`}
                      >
                        {isJustAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state with Google Nutrition quick fallback */
        <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-stone-900 font-display">
            No encontramos &quot;{quickSearchQuery}&quot; en la base local
          </h2>
          <p className="mt-1 text-xs text-stone-500 leading-relaxed">
            Puedes restablecer los filtros para ver todos los alimentos de la pirámide o consultar
            directamente la base extendida en Google Nutrición.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
            >
              Restablecer filtros
            </button>

            {quickSearchQuery && (
              <a
                href={getGoogleNutritionUrl(quickSearchQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Consultar en Google Nutrición</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
