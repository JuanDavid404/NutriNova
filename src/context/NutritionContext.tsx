import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, Recipe, MealItem, PyramidTier } from '../types/nutrition';
import { FOODS_DATA } from '../data/foodsData';

export type NavigationTab =
  | 'inicio'
  | 'explorador'
  | 'recetas'
  | 'calculadora'
  | 'consejos'
  | 'favoritos';

interface NutritionContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  favoriteFoodIds: string[];
  favoriteRecipeIds: string[];
  toggleFavoriteFood: (id: string) => void;
  toggleFavoriteRecipe: (id: string) => void;
  isFoodFavorite: (id: string) => boolean;
  isRecipeFavorite: (id: string) => boolean;
  mealItems: MealItem[];
  addFoodToMeal: (food: FoodItem, grams?: number) => void;
  removeFoodFromMeal: (mealItemId: string) => void;
  updateMealItemGrams: (mealItemId: string, grams: number) => void;
  clearMeal: () => void;
  loadPresetMeal: (presetKey: string) => void;
  selectedFoodDetail: FoodItem | null;
  setSelectedFoodDetail: (food: FoodItem | null) => void;
  selectedRecipeDetail: Recipe | null;
  setSelectedRecipeDetail: (recipe: Recipe | null) => void;
  quickSearchQuery: string;
  setQuickSearchQuery: (query: string) => void;
  selectedPyramidTier: PyramidTier | 'todas';
  setSelectedPyramidTier: (tier: PyramidTier | 'todas') => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

const STORAGE_KEY_FAV_FOODS = 'nutrinova_fav_foods_v1';
const STORAGE_KEY_FAV_RECIPES = 'nutrinova_fav_recipes_v1';
const STORAGE_KEY_MEAL = 'nutrinova_meal_builder_v1';

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('inicio');
  const [selectedFoodDetail, setSelectedFoodDetail] = useState<FoodItem | null>(null);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [selectedPyramidTier, setSelectedPyramidTier] = useState<PyramidTier | 'todas'>('todas');

  // Local storage favorites
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAV_FOODS);
      return saved ? JSON.parse(saved) : ['aguacate', 'arandanos', 'salmon-noruego'];
    } catch {
      return ['aguacate', 'arandanos', 'salmon-noruego'];
    }
  });

  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAV_RECIPES);
      return saved ? JSON.parse(saved) : ['bowl-quinoa-salmon'];
    } catch {
      return ['bowl-quinoa-salmon'];
    }
  });

  // Local storage meal items for calculator
  const [mealItems, setMealItems] = useState<MealItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEAL);
      if (saved) {
        const parsed: { id: string; foodId: string; grams: number }[] = JSON.parse(saved);
        return parsed
          .map((item) => {
            const found = FOODS_DATA.find((f) => f.id === item.foodId);
            return found ? { id: item.id, foodId: item.foodId, food: found, grams: item.grams } : null;
          })
          .filter(Boolean) as MealItem[];
      }
    } catch {
      // ignore
    }
    // Default starter meal (e.g. Desayuno Saludable NutriTech)
    const defAvena = FOODS_DATA.find((f) => f.id === 'avena-integral');
    const defArandanos = FOODS_DATA.find((f) => f.id === 'arandanos');
    const defYogur = FOODS_DATA.find((f) => f.id === 'yogur-griego');
    const defNueces = FOODS_DATA.find((f) => f.id === 'nueces');

    const starter: MealItem[] = [];
    if (defAvena) starter.push({ id: 'init-1', foodId: defAvena.id, food: defAvena, grams: 50 });
    if (defYogur) starter.push({ id: 'init-2', foodId: defYogur.id, food: defYogur, grams: 125 });
    if (defArandanos) starter.push({ id: 'init-3', foodId: defArandanos.id, food: defArandanos, grams: 75 });
    if (defNueces) starter.push({ id: 'init-4', foodId: defNueces.id, food: defNueces, grams: 20 });
    return starter;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAV_FOODS, JSON.stringify(favoriteFoodIds));
    } catch {
      // storage error handled
    }
  }, [favoriteFoodIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAV_RECIPES, JSON.stringify(favoriteRecipeIds));
    } catch {
      // storage error handled
    }
  }, [favoriteRecipeIds]);

  useEffect(() => {
    try {
      const serializable = mealItems.map((m) => ({ id: m.id, foodId: m.foodId, grams: m.grams }));
      localStorage.setItem(STORAGE_KEY_MEAL, JSON.stringify(serializable));
    } catch {
      // storage error handled
    }
  }, [mealItems]);

  const toggleFavoriteFood = (id: string) => {
    setFavoriteFoodIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFavoriteRecipe = (id: string) => {
    setFavoriteRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFoodFavorite = (id: string) => favoriteFoodIds.includes(id);
  const isRecipeFavorite = (id: string) => favoriteRecipeIds.includes(id);

  const addFoodToMeal = (food: FoodItem, grams?: number) => {
    const qty = grams && grams > 0 ? grams : food.defaultServingGrams;
    const existingIndex = mealItems.findIndex((m) => m.foodId === food.id);
    if (existingIndex >= 0) {
      // Increment grams
      setMealItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, grams: Math.round(item.grams + qty) } : item
        )
      );
    } else {
      setMealItems((prev) => [
        ...prev,
        {
          id: `${food.id}-${Date.now()}`,
          foodId: food.id,
          food,
          grams: qty,
        },
      ]);
    }
  };

  const removeFoodFromMeal = (mealItemId: string) => {
    setMealItems((prev) => prev.filter((item) => item.id !== mealItemId));
  };

  const updateMealItemGrams = (mealItemId: string, grams: number) => {
    const validGrams = Math.max(1, Math.min(2000, Math.round(grams || 1)));
    setMealItems((prev) =>
      prev.map((item) => (item.id === mealItemId ? { ...item, grams: validGrams } : item))
    );
  };

  const clearMeal = () => {
    setMealItems([]);
  };

  const loadPresetMeal = (presetKey: string) => {
    const findFood = (id: string) => FOODS_DATA.find((f) => f.id === id);

    if (presetKey === 'desayuno_vital') {
      const avena = findFood('avena-integral');
      const yogur = findFood('yogur-griego');
      const arandanos = findFood('arandanos');
      const nueces = findFood('nueces');
      const items: MealItem[] = [];
      if (avena) items.push({ id: `p-${Date.now()}-1`, foodId: avena.id, food: avena, grams: 50 });
      if (yogur) items.push({ id: `p-${Date.now()}-2`, foodId: yogur.id, food: yogur, grams: 125 });
      if (arandanos) items.push({ id: `p-${Date.now()}-3`, foodId: arandanos.id, food: arandanos, grams: 80 });
      if (nueces) items.push({ id: `p-${Date.now()}-4`, foodId: nueces.id, food: nueces, grams: 25 });
      setMealItems(items);
    } else if (presetKey === 'almuerzo_mediterraneo') {
      const salmon = findFood('salmon-noruego');
      const quinoa = findFood('quinoa-real');
      const aguacate = findFood('aguacate');
      const espinacas = findFood('espinacas');
      const aove = findFood('aove');
      const items: MealItem[] = [];
      if (salmon) items.push({ id: `p-${Date.now()}-1`, foodId: salmon.id, food: salmon, grams: 150 });
      if (quinoa) items.push({ id: `p-${Date.now()}-2`, foodId: quinoa.id, food: quinoa, grams: 120 });
      if (aguacate) items.push({ id: `p-${Date.now()}-3`, foodId: aguacate.id, food: aguacate, grams: 60 });
      if (espinacas) items.push({ id: `p-${Date.now()}-4`, foodId: espinacas.id, food: espinacas, grams: 70 });
      if (aove) items.push({ id: `p-${Date.now()}-5`, foodId: aove.id, food: aove, grams: 12 });
      setMealItems(items);
    } else if (presetKey === 'cena_ligera_fit') {
      const pollo = findFood('pechuga-pollo');
      const brocoli = findFood('brocoli');
      const calabacin = findFood('calabacin');
      const aove = findFood('aove');
      const items: MealItem[] = [];
      if (pollo) items.push({ id: `p-${Date.now()}-1`, foodId: pollo.id, food: pollo, grams: 160 });
      if (brocoli) items.push({ id: `p-${Date.now()}-2`, foodId: brocoli.id, food: brocoli, grams: 150 });
      if (calabacin) items.push({ id: `p-${Date.now()}-3`, foodId: calabacin.id, food: calabacin, grams: 120 });
      if (aove) items.push({ id: `p-${Date.now()}-4`, foodId: aove.id, food: aove, grams: 10 });
      setMealItems(items);
    } else if (presetKey === 'snack_recuperacion') {
      const platano = findFood('platano');
      const almendras = findFood('almendras');
      const kefir = findFood('kefir');
      const items: MealItem[] = [];
      if (platano) items.push({ id: `p-${Date.now()}-1`, foodId: platano.id, food: platano, grams: 110 });
      if (almendras) items.push({ id: `p-${Date.now()}-2`, foodId: almendras.id, food: almendras, grams: 25 });
      if (kefir) items.push({ id: `p-${Date.now()}-3`, foodId: kefir.id, food: kefir, grams: 150 });
      setMealItems(items);
    }
  };

  return (
    <NutritionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        favoriteFoodIds,
        favoriteRecipeIds,
        toggleFavoriteFood,
        toggleFavoriteRecipe,
        isFoodFavorite,
        isRecipeFavorite,
        mealItems,
        addFoodToMeal,
        removeFoodFromMeal,
        updateMealItemGrams,
        clearMeal,
        loadPresetMeal,
        selectedFoodDetail,
        setSelectedFoodDetail,
        selectedRecipeDetail,
        setSelectedRecipeDetail,
        quickSearchQuery,
        setQuickSearchQuery,
        selectedPyramidTier,
        setSelectedPyramidTier,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
