import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNutrition, NavigationTab } from '../context/NutritionContext';
import { FOODS_DATA } from '../data/foodsData';
import {
  Sparkles,
  Compass,
  UtensilsCrossed,
  Calculator,
  BookOpen,
  Heart,
  Menu,
  X,
  Search,
  Mic,
  MicOff,
  ExternalLink,
  Flame,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { normalizeText, getGoogleNutritionUrl, startVoiceRecognition } from '../utils/searchUtils';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    favoriteFoodIds,
    favoriteRecipeIds,
    quickSearchQuery,
    setQuickSearchQuery,
    setSelectedFoodDetail,
  } = useNutrition();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const totalFavorites = favoriteFoodIds.length + favoriteRecipeIds.length;

  const navLinks: {
    id: NavigationTab;
    label: string;
    shortLabel: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      shortLabel: 'Inicio',
      subtitle: 'Portada & visión nutricional',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'explorador',
      label: 'Alimentos & Pirámide',
      shortLabel: 'Alimentos',
      subtitle: 'Base de datos, 6 niveles & superalimentos del Perú',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'recetas',
      label: 'Recetas',
      shortLabel: 'Recetas',
      subtitle: 'Recomendaciones según tu despensa',
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      id: 'calculadora',
      label: 'Calculadora',
      shortLabel: 'Calculadora',
      subtitle: 'Composición de platos & macros en tiempo real',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'consejos',
      label: 'Consejos',
      shortLabel: 'Consejos',
      subtitle: 'Educación basada en evidencia & mitos',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'favoritos',
      label: 'Favoritos',
      shortLabel: 'Favoritos',
      subtitle: 'Tus alimentos y recetas guardadas',
      icon: <Heart className="w-4 h-4" />,
    },
  ];

  // Instant Autocomplete results matching the query (accent-insensitive)
  const matchingFoods = useMemo(() => {
    if (!quickSearchQuery.trim()) return [];
    const normalized = normalizeText(quickSearchQuery);
    return FOODS_DATA.filter((food) => {
      const matchName = normalizeText(food.name).includes(normalized);
      const matchCat = normalizeText(food.category).includes(normalized);
      const matchTags = food.tags.some((t) => normalizeText(t).includes(normalized));
      const matchRegion = food.regionPeru ? normalizeText(food.regionPeru).includes(normalized) : false;
      return matchName || matchCat || matchTags || matchRegion;
    }).slice(0, 5);
  }, [quickSearchQuery]);

  // Handle outside click to close autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchQuery.trim()) {
      setActiveTab('explorador');
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSelectFood = (food: (typeof FOODS_DATA)[0]) => {
    setSelectedFoodDetail(food);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Google Voice Speech Recognition
  const toggleVoiceSearch = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      setIsListening(true);
      setVoiceToast('Escuchando con Google... Di un alimento (ej. aguacate, lúcuma)');
      const instance = startVoiceRecognition(
        (transcript) => {
          setQuickSearchQuery(transcript);
          setIsListening(false);
          setVoiceToast(`Buscando "${transcript}"...`);
          setDropdownOpen(true);
          setActiveTab('explorador');
          setTimeout(() => setVoiceToast(null), 2500);
        },
        (errorMsg) => {
          setIsListening(false);
          setVoiceToast(errorMsg);
          setTimeout(() => setVoiceToast(null), 3000);
        },
        () => {
          setIsListening(false);
        }
      );
      recognitionRef.current = instance;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Logo Brand */}
            <button
              onClick={() => handleNavClick('inicio')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-xl p-1 flex-shrink-0 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-stone-900 tracking-tight">
                    Nutri<span className="text-emerald-700">Tech</span>
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-200/60 uppercase tracking-wider">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                  Nutrición Inteligente &amp; Bienestar
                </p>
              </div>
            </button>

            {/* Desktop Search Bar with Instant Autocomplete & Google Voice */}
            <div ref={searchContainerRef} className="hidden md:block relative max-w-xs xl:max-w-sm w-full mx-2">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={quickSearchQuery}
                  onFocus={() => setDropdownOpen(true)}
                  onChange={(e) => {
                    setQuickSearchQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  placeholder="Buscar alimento, pirámide o Perú..."
                  className="w-full pl-9 pr-14 py-2 text-xs bg-stone-100/80 hover:bg-stone-100 border border-stone-200/90 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-stone-800 placeholder-stone-400 transition-all shadow-2xs"
                />
                {/* Google Voice Search Button */}
                <button
                  type="button"
                  onClick={toggleVoiceSearch}
                  className={`absolute right-2 p-1 rounded-full transition-colors ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-stone-400 hover:text-emerald-700 hover:bg-stone-200/60'
                  }`}
                  title="Búsqueda por voz con Google"
                  aria-label="Búsqueda por voz con Google"
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              </form>

              {/* Voice Toast notification */}
              {voiceToast && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2.5 bg-stone-900 text-white text-xs rounded-xl shadow-lg z-50 text-center animate-in fade-in flex items-center justify-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>{voiceToast}</span>
                </div>
              )}

              {/* Instant Search Autocomplete Dropdown */}
              {dropdownOpen && quickSearchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-2.5 border-b border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-semibold px-3 bg-stone-50/70">
                    <span>Sugerencias directas ({matchingFoods.length})</span>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(false)}
                      className="hover:text-stone-800 text-stone-400 cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>

                  {matchingFoods.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto divide-y divide-stone-100">
                      {matchingFoods.map((food) => (
                        <button
                          key={food.id}
                          type="button"
                          onClick={() => handleSelectFood(food)}
                          className="w-full p-2.5 text-left hover:bg-emerald-50/70 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={food.image}
                              alt={food.name}
                              className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 block truncate">
                                  {food.name}
                                </span>
                                {food.isPeruvianOrigin && (
                                  <span className="text-[9px] bg-rose-50 text-rose-700 font-semibold px-1 rounded border border-rose-100 flex-shrink-0">
                                    🇵🇪 Perú
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-stone-400 capitalize">
                                {food.category} • {food.servingUnitName}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-bold text-amber-800 flex items-center gap-0.5 justify-end">
                              <Flame className="w-3 h-3 text-amber-500" />
                              {food.per100g.calories} kcal
                            </span>
                            <span className="text-[10px] text-emerald-700 font-medium">
                              {food.per100g.protein}g P
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-stone-500">
                      No hay resultados locales directos para &quot;{quickSearchQuery}&quot;
                    </div>
                  )}

                  {/* Google Search Link Shortcut */}
                  <div className="p-2 bg-stone-50 border-t border-stone-100">
                    <a
                      href={getGoogleNutritionUrl(quickSearchQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full py-1.5 px-3 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-stone-200 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <span>Consultar &quot;{quickSearchQuery}&quot; en Google Nutrición</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links: Clean Segmented Bar */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/70 shadow-2xs">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                      isActive
                        ? 'bg-white text-emerald-900 shadow-xs border border-stone-200/90 font-bold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                  >
                    <span className={isActive ? 'text-emerald-700' : 'text-stone-400'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                    {link.id === 'favoritos' && totalFavorites > 0 && (
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full leading-tight ${
                        isActive
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {totalFavorites}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Actions: Favorites quick button + Hamburger Menu */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => handleNavClick('favoritos')}
                className="relative p-2.5 text-stone-600 hover:text-emerald-700 rounded-xl hover:bg-stone-100 focus:outline-none cursor-pointer"
                aria-label="Ver favoritos"
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                    {totalFavorites}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Full-Screen / Sheet Mobile Drawer (No squished 2-column grid!) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet Content */}
          <div className="relative z-10 bg-white rounded-t-3xl shadow-2xl max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250 border-t border-stone-200">
            {/* Sheet Handle & Header */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-display">
                    Navegación NutriTech
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Salud, Alimentos &amp; Recetas
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Bar inside Drawer */}
            <div className="p-4 pb-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={quickSearchQuery}
                  onChange={(e) => setQuickSearchQuery(e.target.value)}
                  placeholder="Buscar en catálogo, pirámide o Perú..."
                  className="w-full pl-10 pr-12 py-2.5 text-xs bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
                />
                <button
                  type="button"
                  onClick={toggleVoiceSearch}
                  className={`absolute right-2.5 top-2 p-1.5 rounded-lg ${
                    isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-stone-400 hover:text-emerald-700'
                  }`}
                  aria-label="Buscar con voz"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </form>

              {voiceToast && (
                <div className="mt-2 p-2 bg-stone-900 text-white text-xs rounded-xl text-center">
                  {voiceToast}
                </div>
              )}
            </div>

            {/* Navigation List: Full-width rows with icons and descriptive subtitles */}
            <div className="p-4 pt-1 overflow-y-auto space-y-1.5 flex-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full p-3 rounded-2xl transition-all flex items-center justify-between text-left cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-50/90 border-emerald-300/80 text-emerald-950 shadow-xs'
                        : 'bg-white hover:bg-stone-50 border-stone-200/70 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold truncate ${isActive ? 'text-emerald-950' : 'text-stone-900'}`}>
                            {link.label}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              Activo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 truncate mt-0.5">
                          {link.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                      {link.id === 'favoritos' && totalFavorites > 0 && (
                        <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                          {totalFavorites}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-300'}`} />
                    </div>
                  </button>
                );
              })}

              {/* Peruvian Biodiversity Quick Highlight Shortcut inside drawer */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuickSearchQuery('Perú');
                    handleNavClick('explorador');
                  }}
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 text-rose-950 flex items-center justify-between text-left cursor-pointer hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇵🇪</span>
                    <div>
                      <span className="text-xs font-bold block">
                        Superalimentos del Perú (25)
                      </span>
                      <span className="text-[11px] text-stone-600">
                        Camu Camu, Lúcuma, Chirimoya, Ají Amarillo y más
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>

            {/* Drawer Footer with scientific disclaimer badge */}
            <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Valores referenciales validados (USDA &amp; INS Perú)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
