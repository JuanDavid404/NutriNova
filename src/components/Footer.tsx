import React from 'react';
import { useNutrition } from '../context/NutritionContext';
import { ShieldAlert, Heart, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useNutrition();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand & Project Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Nutri<span className="text-emerald-400">Tech</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Plataforma web de nutrición digital y educación alimentaria basada en ciencia.
              Desarrollada para empoderar a las personas en el conocimiento real de los alimentos,
              el aprovechamiento de ingredientes y la salud integral.
            </p>
            <div className="text-[11px] text-stone-500">
              Proyecto de Innovación Digital en Nutrición & Bienestar
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => setActiveTab('inicio')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Inicio & Presentación
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('explorador')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Explorador de Alimentos (Macros por 100g)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('recetas')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Creador de Recetas por Despensa
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('calculadora')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Calculadora Nutricional de Platos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('consejos')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Guías Educativas & Mitos Desmentidos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('favoritos')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Colección de Favoritos
                </button>
              </li>
            </ul>
          </div>

          {/* Scientific Sources (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Bases de Datos & Referencias Científicas
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Los datos nutricionales se fundamentan en las siguientes fuentes oficiales de composición de alimentos:
            </p>
            <ul className="space-y-1.5 text-stone-400 text-[11px]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span><strong>USDA FoodData Central:</strong> Departamento de Agricultura de los Estados Unidos.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span><strong>BEDCA:</strong> Base de Datos Española de Composición de Alimentos.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span><strong>OMS / FAO / EFSA:</strong> Directrices sobre ingestas dietéticas de referencia (DRI / AMDR).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Responsibility Medical Disclaimer Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Aviso de Responsabilidad & Seguridad Nutricional</span>
          </div>
          <p className="text-[11px] leading-relaxed text-stone-400">
            Los valores calóricos, macronutricionales y micronutricionales expuestos en NutriTech son{' '}
            <strong>estimaciones y aproximaciones de referencia general</strong>. La composición real de los
            alimentos puede variar sensiblemente según la variedad agrícola, grado de maduración, tipo de cocción,
            origen geográfico y estacionalidad.
          </p>
          <p className="text-[11px] leading-relaxed text-stone-400">
            <strong>Esta plataforma tiene un propósito exclusivamente educativo e informativo.</strong> No
            constituye asesoramiento médico, diagnóstico clínico ni prescripción dietoterapéutica. Ante cualquier
            condición de salud (como diabetes, celiaquía, nefropatías, hipertensión o alergias alimentarias), consulte
            siempre con un <strong>dietista-nutricionista colegiado o profesional médico cualificado</strong>.
          </p>
        </div>

        {/* Copyright and signature */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} NutriTech Platform. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Diseñado con rigor científico, elegancia y pasión por la salud.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
