import React, { useState } from 'react';
import { Recipe } from '../types/nutrition';
import { useNutrition } from '../context/NutritionContext';
import {
  X,
  Heart,
  Clock,
  Flame,
  ChefHat,
  Users,
  CheckCircle2,
  Circle,
  Dna,
  Wheat,
  Droplet,
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  const { isRecipeFavorite, toggleFavoriteRecipe } = useNutrition();

  const [currentServings, setCurrentServings] = useState<number>(recipe.servings);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  // Allow user to add or toggle custom ingredients
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [removedIngredientIndices, setRemovedIngredientIndices] = useState<number[]>([]);

  const isFavorite = isRecipeFavorite(recipe.id);
  const scale = currentServings / recipe.servings;

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAddCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredientName.trim()) {
      setExtraIngredients((prev) => [...prev, newIngredientName.trim()]);
      setNewIngredientName('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setRemovedIngredientIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRemoveExtraIngredient = (index: number) => {
    setExtraIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden my-8 max-h-[92vh] flex flex-col border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-stone-100 flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

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
            onClick={() => toggleFavoriteRecipe(recipe.id)}
            className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-stone-700 hover:text-rose-500 hover:bg-white'
            }`}
            aria-label="Guardar receta en favoritos"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Title and tags on image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                {recipe.category}
              </span>
              <span className="bg-stone-900/70 text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                Dificultad {recipe.difficulty}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
              {recipe.title}
            </h2>
            <p className="text-xs text-stone-300 mt-1 line-clamp-1">{recipe.subtitle}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-700">
          {/* Quick Metrics Bar & Servings Scaler */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Tiempo total
              </div>
              <span className="text-sm font-bold text-stone-800">
                {recipe.prepTimeMin + recipe.cookTimeMin} min
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Por porción
              </div>
              <span className="text-sm font-bold text-amber-800">
                {recipe.caloriesPerServing} kcal
              </span>
            </div>

            <div className="flex flex-col items-center justify-center col-span-2 sm:col-span-2">
              <div className="flex items-center gap-1 text-xs text-stone-500 font-medium mb-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Raciones a cocinar
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentServings((s) => Math.max(1, s - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-bold text-emerald-800 w-8 text-center">
                  {currentServings}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentServings((s) => Math.min(10, s + 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Macronutrients breakdown card per serving */}
          <div className="border border-stone-200 rounded-xl p-3.5 bg-stone-50/50">
            <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Aporte nutricional por porción</span>
              <span className="text-stone-400 font-normal">Valores aproximados</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded-lg border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-emerald-700 font-semibold mb-0.5">
                  <Dna className="w-3 h-3" /> Prot
                </div>
                <strong className="text-stone-900 text-sm">{recipe.proteinG}g</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-sky-700 font-semibold mb-0.5">
                  <Wheat className="w-3 h-3" /> Carbs
                </div>
                <strong className="text-stone-900 text-sm">{recipe.carbsG}g</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-orange-700 font-semibold mb-0.5">
                  <Droplet className="w-3 h-3" /> Grasas
                </div>
                <strong className="text-stone-900 text-sm">{recipe.fatG}g</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-teal-700 font-semibold mb-0.5">
                  <Sparkles className="w-3 h-3" /> Fibra
                </div>
                <strong className="text-stone-900 text-sm">{recipe.fiberG}g</strong>
              </div>
            </div>
          </div>

          {/* Ingredients Checklist with dynamic scaling & exclusion */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Ingredientes ({currentServings} {currentServings === 1 ? 'porción' : 'porciones'})
              </h3>
              <span className="text-[11px] text-stone-400">
                Puedes omitir o añadir ingredientes
              </span>
            </div>

            <ul className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const isExcluded = removedIngredientIndices.includes(idx);
                const scaledAmount = Math.round(ing.amount * scale * 10) / 10;

                return (
                  <li
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                      isExcluded
                        ? 'bg-stone-100 border-dashed border-stone-300 text-stone-400 line-through'
                        : 'bg-white border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{ing.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <strong className="font-semibold text-emerald-800">
                        {scaledAmount} {ing.unit}
                      </strong>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                        title={isExcluded ? 'Restaurar ingrediente' : 'Omitir de mi receta'}
                      >
                        {isExcluded ? <Plus className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </li>
                );
              })}

              {/* Extra Custom Ingredients Added by User */}
              {extraIngredients.map((item, idx) => (
                <li
                  key={`extra-${idx}`}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs text-emerald-900"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{item} (ingrediente adicional)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExtraIngredient(idx)}
                    className="text-emerald-700 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Form to add an extra ingredient */}
            <form onSubmit={handleAddCustomIngredient} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newIngredientName}
                onChange={(e) => setNewIngredientName(e.target.value)}
                placeholder="Añadir un ingrediente opcional (ej. 1 pizca de orégano, 50g setas)..."
                className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                disabled={!newIngredientName.trim()}
                className="px-3 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-900 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir
              </button>
            </form>
          </div>

          {/* Preparation Instructions with Interactive Step Toggles */}
          <div>
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-emerald-600" />
              Paso a paso de preparación
            </h3>

            <div className="space-y-2.5">
              {recipe.instructions.map((step, idx) => {
                const isCompleted = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isCompleted
                        ? 'bg-emerald-50/70 border-emerald-200 text-stone-500'
                        : 'bg-white border-stone-200 hover:border-emerald-300 text-stone-800'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-emerald-600 flex-shrink-0 focus:outline-none"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300" />
                      )}
                    </button>
                    <div className="flex-1 text-xs leading-relaxed">
                      <span className="font-bold text-stone-700 mr-1.5">Paso {idx + 1}:</span>
                      <span className={isCompleted ? 'line-through text-stone-500' : ''}>
                        {step}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chef Tip */}
          {recipe.chefTip && (
            <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5 text-amber-900">
                  Consejo del nutricionista culinario:
                </strong>
                <p>{recipe.chefTip}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleFavoriteRecipe(recipe.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              isFavorite
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            {isFavorite ? 'Guardada en tus recetas' : 'Guardar en Favoritos'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
