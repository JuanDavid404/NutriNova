import React, { useState, useMemo } from 'react';
import { Recipe } from '../types/nutrition';
import { RECIPES_DATA } from '../data/recipesData';
import { FOODS_DATA } from '../data/foodsData';
import { useNutrition } from '../context/NutritionContext';
import {
  UtensilsCrossed,
  Sparkles,
  Clock,
  Flame,
  Check,
  Plus,
  X,
  Heart,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const RecipeCreator: React.FC = () => {
  const {
    setSelectedRecipeDetail,
    isRecipeFavorite,
    toggleFavoriteRecipe,
  } = useNutrition();

  // Pantry ingredients selected by user
  const [selectedPantryIngredients, setSelectedPantryIngredients] = useState<string[]>([
    'espinacas',
    'huevos-camperos',
    'aguacate',
  ]);

  const [activeDietFilter, setActiveDietFilter] = useState<'todos' | 'vegetariano' | 'rapido' | 'alto-proteina'>('todos');
  const [customPantryInput, setCustomPantryInput] = useState('');

  // Extract common ingredients from FOODS_DATA for visual pantry picker
  const pantryOptions = useMemo(() => {
    return FOODS_DATA.map((food) => ({
      id: food.id,
      name: food.name.split('/')[0].split('(')[0].trim(),
      category: food.category,
    }));
  }, []);

  const togglePantryIngredient = (id: string) => {
    setSelectedPantryIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomPantry = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customPantryInput.trim().toLowerCase();
    if (clean && !selectedPantryIngredients.includes(clean)) {
      setSelectedPantryIngredients((prev) => [...prev, clean]);
      setCustomPantryInput('');
    }
  };

  const clearPantry = () => {
    setSelectedPantryIngredients([]);
  };

  // Match recipes based on selected pantry ingredients
  const rankedRecipes = useMemo(() => {
    return RECIPES_DATA.map((recipe) => {
      const totalRecipeIngs = recipe.ingredients.length;
      let matchedCount = 0;
      const matchedIngredients: string[] = [];
      const missingIngredients: string[] = [];

      recipe.ingredients.forEach((ing) => {
        const isMatched = selectedPantryIngredients.some((pantryId) => {
          if (ing.foodId && ing.foodId.toLowerCase() === pantryId.toLowerCase()) return true;
          return ing.name.toLowerCase().includes(pantryId.toLowerCase());
        });

        if (isMatched) {
          matchedCount++;
          matchedIngredients.push(ing.name);
        } else {
          missingIngredients.push(ing.name);
        }
      });

      const matchPercent = Math.round((matchedCount / totalRecipeIngs) * 100);

      return {
        recipe,
        totalRecipeIngs,
        matchedCount,
        missingIngredients,
        matchPercent,
      };
    })
      .filter(({ recipe }) => {
        if (activeDietFilter === 'vegetariano') {
          return recipe.tags.some((t) => t.toLowerCase().includes('vege') || t.toLowerCase().includes('plant'));
        }
        if (activeDietFilter === 'rapido') {
          return recipe.prepTimeMin + recipe.cookTimeMin <= 20;
        }
        if (activeDietFilter === 'alto-proteina') {
          return recipe.proteinG >= 20;
        }
        return true;
      })
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedPantryIngredients, activeDietFilter]);

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <UtensilsCrossed className="w-4 h-4" />
          <span>Asistente de Cocina Saludable</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
          Creador y Recomendador de Recetas
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Selecciona los ingredientes que tienes en casa. Nuestro motor nutricional buscará las mejores
          recetas gastronómicas, optimizando el aprovechamiento y equilibrando los macronutrientes.
        </p>
      </div>

      {/* Main Pantry Selector Panel */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-5 sm:p-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              ¿Qué ingredientes tienes disponibles hoy?
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Haz clic sobre los alimentos para añadirlos o quitarlos de tu despensa virtual.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {selectedPantryIngredients.length} ingredientes seleccionados
            </span>
            {selectedPantryIngredients.length > 0 && (
              <button
                type="button"
                onClick={clearPantry}
                className="text-xs text-stone-400 hover:text-rose-600 transition-colors underline font-medium"
              >
                Limpiar todo
              </button>
            )}
          </div>
        </div>

        {/* Selected Ingredients Badges */}
        {selectedPantryIngredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
            <span className="text-xs text-stone-500 font-semibold self-center mr-1">
              En tu nevera:
            </span>
            {selectedPantryIngredients.map((id) => {
              const matchedFood = FOODS_DATA.find((f) => f.id === id);
              const label = matchedFood ? matchedFood.name.split('/')[0].trim() : id;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-xs"
                >
                  <Check className="w-3 h-3" />
                  <span>{label}</span>
                  <button
                    type="button"
                    onClick={() => togglePantryIngredient(id)}
                    className="hover:text-emerald-200 p-0.5 rounded-full"
                    aria-label={`Quitar ${label}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Pantry Quick Chips Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Alimentos frecuentes en despensa:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pantryOptions.map((item) => {
              const isSelected = selectedPantryIngredients.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePantryIngredient(item.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-stone-400" />
                  )}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Form to add custom ingredient if not listed */}
          <form onSubmit={handleAddCustomPantry} className="pt-2 flex items-center gap-2 max-w-md">
            <input
              type="text"
              value={customPantryInput}
              onChange={(e) => setCustomPantryInput(e.target.value)}
              placeholder="¿Tienes otro ingrediente? (ej. limón, ajo, yogur)..."
              className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              disabled={!customPantryInput.trim()}
              className="px-3 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar
            </button>
          </form>
        </div>
      </div>

      {/* Filter and Recipe Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Recetas recomendadas según tus ingredientes
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Ordenadas por porcentaje de afinidad con tu despensa actual.
          </p>
        </div>

        {/* Diet quick filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Dieta:
          </span>
          <button
            onClick={() => setActiveDietFilter('todos')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              activeDietFilter === 'todos'
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Todas ({RECIPES_DATA.length})
          </button>
          <button
            onClick={() => setActiveDietFilter('vegetariano')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              activeDietFilter === 'vegetariano'
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Vegetarianas
          </button>
          <button
            onClick={() => setActiveDietFilter('rapido')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              activeDietFilter === 'rapido'
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Rápidas (&le;20 min)
          </button>
          <button
            onClick={() => setActiveDietFilter('alto-proteina')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              activeDietFilter === 'alto-proteina'
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Alta proteína
          </button>
        </div>
      </div>

      {/* Recipes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankedRecipes.map(({ recipe, totalRecipeIngs, matchedCount, missingIngredients, matchPercent }) => {
          const isFav = isRecipeFavorite(recipe.id);
          const hasAll = matchPercent === 100;
          const hasMost = matchPercent >= 60 && !hasAll;

          return (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipeDetail(recipe)}
              className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Recipe Image with Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60" />

                {/* Match percentage badge */}
                <div className="absolute top-3 left-3">
                  {hasAll ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ¡Tienes todo ({matchedCount}/{totalRecipeIngs})!
                    </span>
                  ) : hasMost ? (
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {matchPercent}% coincidencia ({matchedCount}/{totalRecipeIngs})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-stone-900/80 text-stone-200 text-[11px] font-medium px-2 py-1 rounded-lg backdrop-blur-xs">
                      {matchedCount} de {totalRecipeIngs} ingredientes
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteRecipe(recipe.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
                    isFav
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/85 text-stone-600 hover:text-rose-500 hover:bg-white'
                  }`}
                  aria-label="Guardar receta en favoritos"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Quick tags */}
                <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1">
                  <span className="bg-stone-950/75 text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {recipe.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors font-display line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {recipe.subtitle}
                  </p>

                  {/* Pantry status feedback */}
                  <div className="mt-3 py-2 px-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                    {missingIngredients.length === 0 ? (
                      <span className="text-emerald-800 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        No necesitas comprar nada más.
                      </span>
                    ) : (
                      <span className="text-stone-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        Te faltan:{' '}
                        <span className="text-stone-800 font-medium truncate">
                          {missingIngredients.slice(0, 2).join(', ')}
                          {missingIngredients.length > 2 ? ` (+${missingIngredients.length - 2})` : ''}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {recipe.prepTimeMin + recipe.cookTimeMin} min
                    </span>

                    <span className="flex items-center gap-1 font-bold text-amber-800">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      {recipe.caloriesPerServing} kcal / rac.
                    </span>

                    <span className="font-semibold text-emerald-800">
                      {recipe.proteinG}g proteína
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRecipeDetail(recipe)}
                    className="w-full py-2 px-3 text-xs font-semibold bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-xl transition-all flex items-center justify-center gap-1 group-hover:bg-emerald-600 group-hover:text-white"
                  >
                    <span>Ver preparación completa</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
