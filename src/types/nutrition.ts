export type FoodCategory =
  | 'frutas'
  | 'verduras'
  | 'proteinas'
  | 'cereales'
  | 'lacteos'
  | 'grasas'
  | 'bebidas';

export type PyramidTier =
  | 'base_hidratacion'
  | 'granos_tuberculos'
  | 'frutas_verduras'
  | 'lacteos_frutos_secos'
  | 'proteinas_magras'
  | 'consumo_ocasional';

export interface FoodNutrients {
  calories: number; // kcal
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  fiber: number;    // g
  sugar?: number;   // g
  sodium?: number;  // mg
  potassium?: number; // mg
  vitaminC?: number; // mg
  calcium?: number;  // mg
  iron?: number;    // mg
}

export interface FoodItem {
  id: string;
  name: string;
  scientificOrCommonName?: string;
  category: FoodCategory;
  pyramidTier: PyramidTier;
  image: string;
  description: string;
  defaultServingGrams: number;
  servingUnitName: string; // e.g. "1 unidad mediana (180g)"
  per100g: FoodNutrients;
  glycemicIndex?: 'Bajo' | 'Medio' | 'Alto';
  tags: string[];
  healthBenefits: string[];
  culinaryTip: string;
  seasonality?: string;
  isPeruvianOrigin?: boolean;
  regionPeru?: 'Costa' | 'Sierra' | 'Selva' | 'Nacional';
}

export interface RecipeIngredient {
  foodId?: string;
  name: string;
  amount: number;
  unit: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'Desayunos' | 'Almuerzos' | 'Cenas' | 'Snacks & Bebidas';
  image: string;
  prepTimeMin: number;
  cookTimeMin: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  servings: number;
  tags: string[];
  caloriesPerServing: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  chefTip: string;
}

export interface MealItem {
  id: string;
  foodId: string;
  food: FoodItem;
  grams: number;
}

export interface Article {
  id: string;
  title: string;
  category: 'Fundamentos' | 'Mitos' | 'Hidratación' | 'Etiquetado' | 'Hábitos';
  readTimeMin: number;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  mythVsFact?: {
    myth: string;
    fact: string;
  };
  sources: string[];
}
