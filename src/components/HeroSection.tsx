import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { FOODS_DATA } from '../data/foodsData';
import {
  Compass,
  UtensilsCrossed,
  Calculator,
  BookOpen,
  ArrowRight,
  Search,
  Sparkles,
  Flame,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setSelectedFoodDetail, setQuickSearchQuery } = useNutrition();
  const [searchInput, setSearchInput] = useState('');

  // Daily featured food
  const featuredFood = FOODS_DATA.find((f) => f.id === 'aguacate') || FOODS_DATA[0];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setQuickSearchQuery(searchInput.trim());
      setActiveTab('explorador');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuickTagClick = (tag: string) => {
    setQuickSearchQuery(tag);
    setActiveTab('explorador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The 4 essential navigation cards (replacing the old stacked buttons)
  const essentialHubCards = [
    {
      id: 'alimentos',
      badge: 'Base de Datos Oficial',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
      icon: <Compass className="w-6 h-6 text-emerald-700" />,
      iconBg: 'bg-emerald-100/70',
      title: 'Explorador de Alimentos',
      description: 'Más de 45 alimentos completos con desglose de macronutrientes, calorías por 100g y por porción.',
      buttonText: 'Explorar alimentos',
      buttonBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      onClick: () => {
        setQuickSearchQuery('');
        setActiveTab('explorador');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'peru',
      badge: 'Biodiversidad 🇵🇪',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200/80',
      icon: (
        <span className="text-2xl" role="img" aria-label="Perú">
          🇵🇪
        </span>
      ),
      iconBg: 'bg-rose-100/70',
      title: 'Superalimentos del Perú (25)',
      description: 'Camu Camu, Lúcuma, Quinua, Aguaymanto, Maca y la riqueza biológica de la Costa, Sierra y Selva.',
      buttonText: 'Ver alimentos del Perú',
      buttonBg: 'bg-rose-700 hover:bg-rose-800 text-white',
      onClick: () => {
        setQuickSearchQuery('Perú');
        setActiveTab('explorador');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'piramide',
      badge: 'Guía Nutricional SENC / OMS',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200/70',
      icon: (
        <svg className="w-6 h-6 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="12 2 2 22 22 22" />
          <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2" />
        </svg>
      ),
      iconBg: 'bg-teal-100/70',
      title: 'Pirámide Alimenticia',
      description: 'Los 6 niveles balanceados oficiales, desde la base hídrica hasta el consumo moderado.',
      buttonText: 'Consultar pirámide',
      buttonBg: 'bg-teal-700 hover:bg-teal-800 text-white',
      onClick: () => {
        setQuickSearchQuery('');
        setActiveTab('explorador');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'recetas',
      badge: 'Aprovechamiento Inteligente',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/70',
      icon: <UtensilsCrossed className="w-6 h-6 text-amber-700" />,
      iconBg: 'bg-amber-100/70',
      title: 'Recetas por Despensa',
      description: 'Selecciona qué ingredientes tienes en casa y te recomendamos platos saludables compatibles.',
      buttonText: 'Cocinar con lo que tengo',
      buttonBg: 'bg-amber-700 hover:bg-amber-800 text-white',
      onClick: () => {
        setActiveTab('recetas');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER: CLEAN, MODERN, UNCLUTTERED */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-emerald-50/60 via-stone-50 to-stone-50 border-b border-stone-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200/80 text-emerald-900 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Plataforma de Nutrición Digital &amp; Bienestar</span>
          </div>

          {/* Slogan */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 font-display tracking-tight leading-tight max-w-3xl mx-auto">
            Conoce lo que comes.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800">
              Transforma tu bienestar.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Explora la composición exacta de alimentos, consulta la pirámide nutricional, crea recetas según tu despensa y calcula tus comidas sin rellenos innecesarios.
          </p>

          {/* Modern Unified Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <form
              onSubmit={handleHeroSearch}
              className="relative flex items-center bg-white p-2 rounded-2xl shadow-md border border-stone-200 focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-transparent transition-all"
            >
              <Search className="w-5 h-5 text-stone-400 ml-2.5 mr-2 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Busca por alimento, nutriente o superalimento (ej. lúcuma, avena, palta)..."
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-stone-800 placeholder-stone-400 py-1"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Buscar
              </button>
            </form>

            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 text-xs">
              <span className="text-stone-400 font-medium text-[11px] mr-1">Búsquedas rápidas:</span>
              {[
                { label: '🇵🇪 Camu Camu', query: 'Camu Camu' },
                { label: '🇵🇪 Lúcuma', query: 'Lúcuma' },
                { label: '🥑 Palta Fuerte', query: 'Palta' },
                { label: '🌾 Quinoa Real', query: 'Quinoa' },
                { label: '🐟 Salmón', query: 'Salmón' },
                { label: '🔺 Pirámide', query: 'pirámide' },
              ].map((chip) => (
                <button
                  key={chip.query}
                  type="button"
                  onClick={() => handleQuickTagClick(chip.query)}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 ESSENTIAL HUB CARDS (RESTRUCTURED CLEAN GRID) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Acceso Directo
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
              Apartados Principales de NutriTech
            </h2>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">
            Selecciona el área que deseas consultar
          </span>
        </div>

        {/* 4 Cards Grid: Modern, Balanced, Equal-height, High legibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {essentialHubCards.map((card) => (
            <div
              key={card.id}
              onClick={card.onClick}
              className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/60 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-200 group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs`}
                  >
                    {card.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors font-display mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  {card.buttonText}
                </span>
                <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-emerald-100 group-hover:text-emerald-700 text-stone-400 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ESSENTIAL SPOTLIGHT: CALCULADORA & CONSEJOS (TWO CRISP ACTION CARDS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Calculadora Nutricional Direct Card */}
          <div
            onClick={() => {
              setActiveTab('calculadora');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Herramienta Práctica
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Calculadora de Macronutrientes &amp; PDF
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Compón tu plato combinando alimentos con gramaje exacto. Visualiza el gráfico interactivo de macronutrientes (proteínas, grasas, carbohidratos) y descarga tu reporte formal en PDF.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-300 pt-3 border-t border-white/10">
              <span>Abrir calculadora nutricional</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Consejos, Hidratación & Mitos Direct Card */}
          <div
            onClick={() => {
              setActiveTab('consejos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-emerald-400"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Educación Científica
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-stone-900 mb-2 group-hover:text-emerald-800 transition-colors">
                Guías, Hidratación &amp; Desmitificador
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">
                Artículos directos sobre la regla 50-25-25 del plato, calculadora de requerimiento hídrico, decodificador de octógonos y laboratorio interactivo de mitos vs realidad.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-700 pt-3 border-t border-stone-100">
              <span>Ver guías y mitos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ALIMENTO DESTACADO: COMPACTO, ELEGANTE Y SIN RELLENO */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={featuredFood.image}
              alt={featuredFood.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 shadow-sm border border-stone-100"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Alimento Destacado
                </span>
                <span className="text-xs text-stone-400 capitalize">{featuredFood.category}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 truncate font-display">
                {featuredFood.name}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                {featuredFood.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
            <div className="flex items-center gap-4 text-xs pr-2">
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Calorías</span>
                <strong className="text-stone-900 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  {featuredFood.per100g.calories} kcal
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Proteína</span>
                <strong className="text-stone-900 font-bold">{featuredFood.per100g.protein}g</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Grasas buenas</span>
                <strong className="text-emerald-700 font-bold">{featuredFood.per100g.fat}g</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedFoodDetail(featuredFood)}
              className="px-4 py-2 text-xs font-bold bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Ver ficha
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AVISO ÉTICO Y RESPONSABILIDAD: COMPACTO Y FORMAL */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Información referencial:</strong> Los valores nutricionales provienen de las Tablas del Instituto Nacional de Salud (INS Perú / CENAN) y el USDA. NutriTech es un recurso educativo que no sustituye la evaluación médica o nutricional colegiada.
          </span>
        </div>
      </section>
    </div>
  );
};
