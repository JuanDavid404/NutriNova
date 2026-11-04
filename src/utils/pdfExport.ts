import jsPDF from 'jspdf';
import { MealItem } from '../types/nutrition';
import { PYRAMID_TIERS_INFO } from '../data/foodsData';

interface ExportPdfParams {
  mealItems: MealItem[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    potassium: number;
    calcium: number;
    iron: number;
    vitaminC: number;
    sodium: number;
    totalGrams: number;
  };
  pctMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export const exportMealToPdf = ({
  mealItems,
  totals,
  pctMacros,
  dailyGoals,
}: ExportPdfParams): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let currentY = 16;

  // 1. Header Banner
  doc.setFillColor(6, 95, 70); // Emerald 800
  doc.rect(margin, currentY, pageWidth - margin * 2, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('NutriTech - Reporte de Análisis Nutricional', margin + 6, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Plataforma Web de Nutrición Inteligente & Bienestar', margin + 6, currentY + 16);

  // Date and Time on the right
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  doc.setFontSize(8);
  doc.text(`Fecha: ${dateStr} ${timeStr}`, pageWidth - margin - 6, currentY + 10, { align: 'right' });
  doc.text(`Alimentos analizados: ${mealItems.length}`, pageWidth - margin - 6, currentY + 16, { align: 'right' });

  currentY += 28;

  // 2. Main Metric Cards (Calories, Protein, Carbs, Fat, Fiber)
  const cardWidth = (pageWidth - margin * 2 - 8) / 4;
  const cardHeight = 20;

  // Box 1: Calorías
  doc.setFillColor(254, 243, 199); // Amber 100
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, currentY, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('ENERGÍA TOTAL', margin + cardWidth / 2, currentY + 5.5, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`${totals.calories}`, margin + cardWidth / 2, currentY + 13, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('kcal', margin + cardWidth / 2, currentY + 17.5, { align: 'center' });

  // Box 2: Proteínas
  const xBox2 = margin + cardWidth + 2.6;
  doc.setFillColor(236, 253, 245); // Emerald 50
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(xBox2, currentY, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setTextColor(6, 95, 70);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PROTEÍNAS', xBox2 + cardWidth / 2, currentY + 5.5, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`${totals.protein} g`, xBox2 + cardWidth / 2, currentY + 13, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${pctMacros.protein}% de calorías`, xBox2 + cardWidth / 2, currentY + 17.5, { align: 'center' });

  // Box 3: Carbohidratos
  const xBox3 = xBox2 + cardWidth + 2.6;
  doc.setFillColor(240, 249, 255); // Sky 50
  doc.setDrawColor(56, 189, 248);
  doc.roundedRect(xBox3, currentY, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setTextColor(3, 105, 161);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('CARBOHIDRATOS', xBox3 + cardWidth / 2, currentY + 5.5, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`${totals.carbs} g`, xBox3 + cardWidth / 2, currentY + 13, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${pctMacros.carbs}% de calorías`, xBox3 + cardWidth / 2, currentY + 17.5, { align: 'center' });

  // Box 4: Grasas
  const xBox4 = xBox3 + cardWidth + 2.6;
  doc.setFillColor(255, 247, 237); // Orange 50
  doc.setDrawColor(249, 115, 22);
  doc.roundedRect(xBox4, currentY, cardWidth, cardHeight, 2, 2, 'FD');
  doc.setTextColor(154, 52, 18);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('GRASAS TOTALES', xBox4 + cardWidth / 2, currentY + 5.5, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`${totals.fat} g`, xBox4 + cardWidth / 2, currentY + 13, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${pctMacros.fat}% de calorías`, xBox4 + cardWidth / 2, currentY + 17.5, { align: 'center' });

  currentY += 26;

  // 3. Sub-banner: Meta diaria y Fibra
  doc.setFillColor(245, 245, 244);
  doc.rect(margin, currentY, pageWidth - margin * 2, 10, 'F');
  doc.setTextColor(68, 64, 60);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Peso total del plato: ${Math.round(totals.totalGrams)} g   |   Fibra dietética: ${totals.fiber} g (${Math.round((totals.fiber / dailyGoals.fiber) * 100)}% de meta diaria ${dailyGoals.fiber}g)   |   Aporte sobre meta diaria (${dailyGoals.calories} kcal): ${Math.round((totals.calories / dailyGoals.calories) * 100)}%`,
    margin + 4,
    currentY + 6.5
  );

  currentY += 16;

  // 4. Table of Ingredients
  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Detalle de Alimentos Comprendidos en el Plato', margin, currentY);
  currentY += 5;

  // Table Header
  const colWidths = {
    name: 65,
    tier: 40,
    grams: 20,
    calories: 20,
    protein: 17,
    carbs: 17,
    fat: 17,
  };

  doc.setFillColor(229, 231, 235);
  doc.rect(margin, currentY, pageWidth - margin * 2, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(31, 41, 55);

  let colX = margin + 3;
  doc.text('Alimento', colX, currentY + 4.8);
  colX += colWidths.name;
  doc.text('Nivel Pirámide', colX, currentY + 4.8);
  colX += colWidths.tier;
  doc.text('Cantidad', colX, currentY + 4.8, { align: 'right' });
  colX += colWidths.grams;
  doc.text('Energía', colX, currentY + 4.8, { align: 'right' });
  colX += colWidths.calories;
  doc.text('Prot.', colX, currentY + 4.8, { align: 'right' });
  colX += colWidths.protein;
  doc.text('Carbs.', colX, currentY + 4.8, { align: 'right' });
  colX += colWidths.fat;
  doc.text('Grasa', colX, currentY + 4.8, { align: 'right' });

  currentY += 7;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);

  mealItems.forEach((item, index) => {
    const mult = item.grams / 100;
    const cal = Math.round(item.food.per100g.calories * mult);
    const p = (item.food.per100g.protein * mult).toFixed(1);
    const c = (item.food.per100g.carbs * mult).toFixed(1);
    const f = (item.food.per100g.fat * mult).toFixed(1);
    const tierName = PYRAMID_TIERS_INFO[item.food.pyramidTier]?.shortTitle || item.food.category;

    if (index % 2 === 1) {
      doc.setFillColor(250, 250, 249);
      doc.rect(margin, currentY, pageWidth - margin * 2, 6.5, 'F');
    }

    doc.setTextColor(55, 65, 81);
    let rowX = margin + 3;
    const cleanName = item.food.name.length > 35 ? item.food.name.substring(0, 32) + '...' : item.food.name;
    doc.text(cleanName, rowX, currentY + 4.5);
    rowX += colWidths.name;
    doc.text(tierName, rowX, currentY + 4.5);
    rowX += colWidths.tier;
    doc.text(`${item.grams} g`, rowX, currentY + 4.5, { align: 'right' });
    rowX += colWidths.grams;
    doc.text(`${cal} kcal`, rowX, currentY + 4.5, { align: 'right' });
    rowX += colWidths.calories;
    doc.text(`${p} g`, rowX, currentY + 4.5, { align: 'right' });
    rowX += colWidths.protein;
    doc.text(`${c} g`, rowX, currentY + 4.5, { align: 'right' });
    rowX += colWidths.fat;
    doc.text(`${f} g`, rowX, currentY + 4.5, { align: 'right' });

    currentY += 6.5;
  });

  // Total summary row
  doc.setFillColor(243, 244, 246);
  doc.rect(margin, currentY, pageWidth - margin * 2, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);

  let totX = margin + 3;
  doc.text('TOTALES ACUMULADOS', totX, currentY + 4.8);
  totX += colWidths.name + colWidths.tier;
  doc.text(`${Math.round(totals.totalGrams)} g`, totX, currentY + 4.8, { align: 'right' });
  totX += colWidths.grams;
  doc.text(`${totals.calories} kcal`, totX, currentY + 4.8, { align: 'right' });
  totX += colWidths.calories;
  doc.text(`${totals.protein} g`, totX, currentY + 4.8, { align: 'right' });
  totX += colWidths.protein;
  doc.text(`${totals.carbs} g`, totX, currentY + 4.8, { align: 'right' });
  totX += colWidths.fat;
  doc.text(`${totals.fat} g`, totX, currentY + 4.8, { align: 'right' });

  currentY += 14;

  // 5. Micronutrients Box
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70);
  doc.text('MICRONUTRIENTES CLAVE ACUMULADOS', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(55, 65, 81);

  const microColWidth = (pageWidth - margin * 2 - 8) / 5;
  const microY = currentY + 14;

  // Potasio
  doc.text(`Potasio: ${totals.potassium} mg`, margin + 4, microY);
  // Calcio
  doc.text(`Calcio: ${totals.calcium} mg`, margin + 4 + microColWidth, microY);
  // Hierro
  doc.text(`Hierro: ${totals.iron} mg`, margin + 4 + microColWidth * 2, microY);
  // Vitamina C
  doc.text(`Vitamina C: ${totals.vitaminC} mg`, margin + 4 + microColWidth * 3, microY);
  // Sodio
  doc.text(`Sodio: ${totals.sodium} mg`, margin + 4 + microColWidth * 4, microY);

  currentY += 30;

  // 6. Educational & Scientific Reference Box
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(22, 101, 52);
  doc.text('Distribución de Macronutrientes vs. Rangos de Referencia (AMDR / OMS):', margin + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(21, 128, 61);
  doc.text(
    `• Proteínas en tu plato: ${pctMacros.protein}% (Rango sugerido: 10% - 35% del total calórico)\n• Carbohidratos en tu plato: ${pctMacros.carbs}% (Rango sugerido: 45% - 65% del total calórico)\n• Grasas en tu plato: ${pctMacros.fat}% (Rango sugerido: 20% - 35% del total calórico)`,
    margin + 4,
    currentY + 9.5
  );

  currentY += 24;

  // 7. Medical Disclaimer Footer (at the bottom of page)
  const footerY = pageHeight - 16;
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 113, 108);
  const disclaimerText =
    'AVISO DE RESPONSABILIDAD: Los valores nutricionales presentados son estimaciones basadas en tablas estandarizadas (USDA FoodData Central y BEDCA). La composición real puede variar según variedad agrícola, grado de maduración y cocción. Este documento tiene fines exclusivamente educativos y no constituye diagnóstico ni prescripción médica. Consulte siempre con un profesional dietista-nutricionista colegiado.';
  doc.text(doc.splitTextToSize(disclaimerText, pageWidth - margin * 2), margin, footerY);

  // Save the PDF
  const filename = `NutriTech_Reporte_${dateStr.replace(/\//g, '-')}.pdf`;
  doc.save(filename);
};
