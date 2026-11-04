export interface MythItem {
  id: string;
  topic: string;
  category: 'peso' | 'carbohidratos' | 'hidratacion' | 'alimentos' | 'habitos';
  myth: string;
  verdict: string;
  scientificExplanation: string;
  practicalTip: string;
  sources: string[];
  articleId?: string;
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: 'contar-calorias-obsesion',
    topic: 'Calorías & Metabolismo',
    category: 'peso',
    myth: 'Para comer saludable y perder peso es indispensable contar matemáticamente cada caloría todos los días.',
    verdict: 'Falso • La matriz alimentaria y la saciedad superan al conteo aritmético.',
    scientificExplanation:
      'El cuerpo humano no es una bomba calorimétrica cerrada. 100 kcal de almendras ricas en fibra, magnesio y grasas insaturadas generan una respuesta hormonal, glucémica y de saciedad radicalmente opuesta a 100 kcal de refresco azucarado. Contar calorías de forma obsesiva desconecta las señales biológicas de hambre y saciedad.',
    practicalTip:
      'Aplica la regla del Plato de Harvard (50% vegetales, 25% proteína de calidad, 25% granos integrales) y prioriza la densidad nutricional sobre los números abstractos.',
    sources: ['Harvard T.H. Chan School of Public Health', 'Organización Mundial de la Salud (OMS)'],
    articleId: 'plato-harvard-equilibrio',
  },
  {
    id: 'hidratacion-esperar-sed',
    topic: 'Hidratación Celular',
    category: 'hidratacion',
    myth: 'Si no tienes sensación de sed, significa que tu cuerpo está perfectamente hidratado.',
    verdict: 'Falso • El reflejo de la sed es tardío y disminuye con la edad.',
    scientificExplanation:
      'El centro hipotalámico de la sed suele activarse cuando ya existe entre un 1% y un 2% de pérdida hídrica corporal relativa. En adultos mayores y personas concentradas en el trabajo o deporte, este mecanismo se atenúa todavía más, provocando fatiga sutil, dolor de cabeza o falsa hambre.',
    practicalTip:
      'Monitorea el color de tu orina: debe asemejarse al tono de una limonada pálida. Incorpora frutas con agua biológica y electrolitos como sandía, pepino y mandarinas.',
    sources: ['European Food Safety Authority (EFSA)', 'American College of Sports Medicine'],
    articleId: 'hidratacion-inteligente',
  },
  {
    id: 'carbohidratos-nocturnos',
    topic: 'Cronobiología & Carbohidratos',
    category: 'carbohidratos',
    myth: 'Cenar carbohidratos después de las 7:00 PM hace engordar porque no tienes tiempo de quemarlos mientras duermes.',
    verdict: 'Falso • El metabolismo basal nocturno sigue activo y reparando tejidos.',
    scientificExplanation:
      'Durante el sueño, el cuerpo sintetiza proteínas, repara fibras musculares y mantiene las funciones vitales. Diversos ensayos clínicos controlados han demostrado que, a igualdad de calorías totales y calidad de la dieta, el horario de consumo de carbohidratos complejos no determina la acumulación de tejido adiposo.',
    practicalTip:
      'Una porción moderada de hidratos complejos (como camote al horno, quinoa o avena) en la cena favorece la liberación de serotonina y melatonina, promoviendo un descanso reparador.',
    sources: ['Journal of Clinical Endocrinology & Metabolism', 'British Journal of Nutrition'],
    articleId: 'mitos-carbohidratos',
  },
  {
    id: 'etiquetas-light-fitness',
    topic: 'Etiquetado & Marketing',
    category: 'alimentos',
    myth: 'Si un producto lleva sellos de "Light", "Fitness" o "Cero Grasa", puedes comerlo sin ningún límite.',
    verdict: 'Falso • Frecuentemente compensan la reducción de grasa con azúcares y aditivos.',
    scientificExplanation:
      'La legislación permite llamar "light" a cualquier producto que reduzca un 30% un nutriente respecto a su versión estándar. En muchos yogures y galletas "0% grasa", los fabricantes agregan almidones modificados y azúcares añadidos para preservar la textura y palatabilidad, manteniendo un alto impacto glucémico.',
    practicalTip:
      'Ignora las frases del frente del empaque. Gira el producto y lee los primeros 3 ingredientes: si aparece azúcar, jarabes o harinas refinadas, trátalo como ultraprocesado.',
    sources: ['Reglamento (UE) Nº 1169/2011', 'Agencia Española de Seguridad Alimentaria (AESAN)'],
    articleId: 'lectura-etiquetas-nutricionales',
  },
  {
    id: 'masticacion-comer-rapido',
    topic: 'Fisiología Digestiva',
    category: 'habitos',
    myth: 'Comer rápido o distraído no afecta tu nutrición mientras la comida sea saludable.',
    verdict: 'Falso • La digestión química inicia en la boca y la saciedad tarda 20 minutos.',
    scientificExplanation:
      'La saliva contiene amilasa y lipasa lingual indispensables para pre-digerir los alimentos. Tragar trozos grandes obliga al estómago a hipersecretar ácido clorhídrico, generando reflujo y fermentación bacteriana intestinal. Además, las hormonas de la saciedad (leptina y GLP-1) tardan entre 15 y 20 minutos en llegar al cerebro.',
    practicalTip:
      'Suelta los cubiertos entre bocado y bocado, mastica cada porción al menos 15-20 veces y evita comer frente a pantallas o respondiendo correos electrónicos.',
    sources: ['The American Journal of Clinical Nutrition', 'Center for Mindful Eating (TCME)'],
    articleId: 'alimentacion-consciente-mindful-eating',
  },
  {
    id: 'huevo-colesterol-cardiaco',
    topic: 'Huevos & Colesterol',
    category: 'alimentos',
    myth: 'Comer huevos a diario es malo para el corazón porque su yema eleva el colesterol en sangre.',
    verdict: 'Falso • El colesterol de los alimentos tiene mínimo impacto en el colesterol sérico en la mayoría.',
    scientificExplanation:
      'El 75-80% del colesterol en el cuerpo es producido por el propio hígado, estimulado principalmente por grasas trans y azúcares refinados, no por el colesterol dietético natural. Los huevos aportan colina esencial para el cerebro, luteína para la vista y proteínas de altísimo valor biológico (PDCAAS = 1.0).',
    practicalTip:
      'Puedes consumir de 1 a 2 huevos diarios dentro de una dieta variada con abundantes vegetales y grasas saludables (AOVE, aguacate o frutos secos).',
    sources: ['American Heart Association (AHA)', 'Harvard Health Publishing - Eggs and your health'],
  },
  {
    id: 'jugos-detox-toxinas',
    topic: 'Mito de las Dietas Detox',
    category: 'habitos',
    myth: 'Los zumos verdes y jugos detox son necesarios para "limpiar las toxinas" acumuladas en el cuerpo.',
    verdict: 'Falso • Tu hígado, riñones y pulmones son los únicos órganos detoxificantes.',
    scientificExplanation:
      'Ningún zumo tiene la capacidad farmacológica ni fisiológica de "desintoxicar". Al exprimir frutas o verduras, eliminas la fibra estructural, provocando una rápida absorción de fructosa libre. El hígado y los riñones eliminan desechos de forma continua las 24 horas del día gracias a un adecuado aporte de agua, fibra y micronutrientes.',
    practicalTip:
      'Consume la fruta entera en vez de licuada o colada, bebe suficiente agua y apoya tu función hepática con crucíferas (brócoli, coliflor) y alcachofa.',
    sources: ['British Dietetic Association (BDA)', 'Johns Hopkins Medicine - The truth about detoxes'],
  },
];
