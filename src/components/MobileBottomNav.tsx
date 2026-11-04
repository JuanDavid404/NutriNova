import React from 'react';
import { useNutrition, NavigationTab } from '../context/NutritionContext';
import {
  Sparkles,
  Compass,
  UtensilsCrossed,
  Calculator,
  Heart,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    favoriteFoodIds,
    favoriteRecipeIds,
  } = useNutrition();

  const totalFavorites = favoriteFoodIds.length + favoriteRecipeIds.length;

  const tabs: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'explorador',
      label: 'Alimentos',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'recetas',
      label: 'Recetas',
      icon: <UtensilsCrossed className="w-5 h-5" />,
    },
    {
      id: 'calculadora',
      label: 'Calculadora',
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      id: 'favoritos',
      label: 'Favoritos',
      icon: (
        <span className="relative inline-flex items-center justify-center">
          <Heart className="w-5 h-5" />
          {totalFavorites > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-extrabold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center ring-2 ring-white shadow-2xs">
              {totalFavorites}
            </span>
          )}
        </span>
      ),
    },
  ];

  const handleTabClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] lg:hidden"
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'text-emerald-800 font-bold'
                  : 'text-stone-500 hover:text-stone-800 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-emerald-100/80 text-emerald-800' : 'text-stone-500'
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 line-clamp-1">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-emerald-700 rounded-full mt-0.5 animate-in fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
