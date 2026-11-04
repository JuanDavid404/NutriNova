import React from 'react';
import { NutritionProvider, useNutrition } from './context/NutritionContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FoodExplorer } from './components/FoodExplorer';
import { RecipeCreator } from './components/RecipeCreator';
import { NutritionCalculator } from './components/NutritionCalculator';
import { NutritionTips } from './components/NutritionTips';
import { FavoritesView } from './components/FavoritesView';
import { FoodDetailModal } from './components/FoodDetailModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';

import { MobileBottomNav } from './components/MobileBottomNav';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    selectedFoodDetail,
    setSelectedFoodDetail,
    selectedRecipeDetail,
    setSelectedRecipeDetail,
  } = useNutrition();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic View with padding on mobile to accommodate bottom nav */}
      <main className="flex-1 pb-20 lg:pb-0">
        {activeTab === 'inicio' && <HeroSection />}
        {activeTab === 'explorador' && <FoodExplorer />}
        {activeTab === 'recetas' && <RecipeCreator />}
        {activeTab === 'calculadora' && <NutritionCalculator />}
        {activeTab === 'consejos' && <NutritionTips />}
        {activeTab === 'favoritos' && <FavoritesView />}
      </main>

      {/* Global Modals for deep inspection */}
      {selectedFoodDetail && (
        <FoodDetailModal
          food={selectedFoodDetail}
          onClose={() => setSelectedFoodDetail(null)}
        />
      )}

      {selectedRecipeDetail && (
        <RecipeDetailModal
          recipe={selectedRecipeDetail}
          onClose={() => setSelectedRecipeDetail(null)}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Native-style Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <NutritionProvider>
      <MainAppContent />
    </NutritionProvider>
  );
}
