import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { FOODS_DATA } from '../data/foodsData';
import { RECIPES_DATA } from '../data/recipesData';
import {
  Heart,
  Compass,
  UtensilsCrossed,
  Flame,
  Plus,
  Trash2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const {
    favoriteFoodIds,
    favoriteRecipeIds,
    toggleFavoriteFood,
    toggleFavoriteRecipe,
    setSelectedFoodDetail,
    setSelectedRecipeDetail,
    addFoodToMeal,
    setActiveTab,
  } = useNutrition();

  const [activeSubTab, setActiveSubTab] = useState<'alimentos' | 'recetas'>('alimentos');

  const favoriteFoods = FOODS_DATA.filter((food) => favoriteFoodIds.includes(food.id));
  const favoriteRecipes = RECIPES_DATA.filter((recipe) => favoriteRecipeIds.includes(recipe.id));

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
          <Heart className="w-4 h-4 fill-current" />
          <span>Tu Colección Personalizada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
          Mis Favoritos
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Tus alimentos y preparaciones preferidas guardadas de forma persistente en tu navegador.
          Accede rápidamente a sus macros y agrégalos a tu calculadora con un solo clic.
        </p>
      </div>

      {/* Sub Tabs Switcher */}
      <div className="flex border-b border-stone-200 mb-8">
        <button
          onClick={() => setActiveSubTab('alimentos')}
          className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'alimentos'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Alimentos Guardados</span>
          <span className="bg-stone-100 text-stone-700 text-xs px-2 py-0.5 rounded-full font-semibold">
            {favoriteFoods.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('recetas')}
          className={`flex items-center gap-2 pb-3.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'recetas'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Recetas Guardadas</span>
          <span className="bg-stone-100 text-stone-700 text-xs px-2 py-0.5 rounded-full font-semibold">
            {favoriteRecipes.length}
          </span>
        </button>
      </div>

      {/* Alimentos Tab Content */}
      {activeSubTab === 'alimentos' && (
        <>
          {favoriteFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {favoriteFoods.map((food) => (
                <div
                  key={food.id}
                  onClick={() => setSelectedFoodDetail(food)}
                  className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteFood(food.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-rose-500 text-white shadow-xs hover:bg-rose-600 transition-colors"
                      title="Quitar de favoritos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2.5 bg-stone-900/75 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {food.servingUnitName}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1 font-display">
                        {food.name}
                      </h3>
                      <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                        {food.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-800">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        {food.per100g.calories} kcal/100g
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addFoodToMeal(food);
                        }}
                        className="py-1 px-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-lg transition-colors font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Al plato
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                No tienes alimentos en favoritos
              </h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                Navega por el catálogo de alimentos y presiona el corazón para guardar tus ingredientes preferidos.
              </p>
              <button
                onClick={() => setActiveTab('explorador')}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors"
              >
                Explorar alimentos ahora
              </button>
            </div>
          )}
        </>
      )}

      {/* Recetas Tab Content */}
      {activeSubTab === 'recetas' && (
        <>
          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipeDetail(recipe)}
                  className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteRecipe(recipe.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-rose-500 text-white shadow-xs hover:bg-rose-600 transition-colors"
                      title="Quitar de favoritos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2.5 bg-stone-900/75 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {recipe.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors font-display line-clamp-1">
                        {recipe.title}
                      </h3>
                      <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                        {recipe.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-800">
                        {recipe.caloriesPerServing} kcal / porción
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Ver receta <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                No tienes recetas en favoritos
              </h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                Descubre preparaciones según los ingredientes que tienes en casa y guarda tus favoritas aquí.
              </p>
              <button
                onClick={() => setActiveTab('recetas')}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors"
              >
                Descubrir recetas ahora
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
