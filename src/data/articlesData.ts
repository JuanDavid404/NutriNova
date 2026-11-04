import { Article } from '../types/nutrition';

export const ARTICLES_DATA: Article[] = [
  // ==========================================
  // FUNDAMENTOS
  // ==========================================
  {
    id: 'plato-harvard-equilibrio',
    title: 'El Plato para Comer Saludable: La Regla de Oro Nutricional',
    category: 'Fundamentos',
    readTimeMin: 4,
    summary: 'Aprende a estructurar tus comidas visualmente sin necesidad de pesar obsesivamente cada gramo de comida.',
    content: [
      'Creado por expertos en nutrición de la Escuela de Salud Pública de Harvard, el "Plato para Comer Saludable" es una guía visual simple y científicamente fundamentada para diseñar comidas balanceadas.',
      'La regla 50-25-25 es el corazón de esta metodología:',
      '1. 1/2 del plato (50%): Vegetales y hortalizas variadas, además de fruta fresca. Mientras mayor sea la variedad cromática, mayor diversidad de fitonutrientes y antioxidantes aportarás.',
      '2. 1/4 del plato (25%): Granos integrales e intactos (arroz integral, quinoa, avena, trigo sarraceno). Tienen un efecto más suave sobre el azúcar en la sangre y la insulina que los granos refinados.',
      '3. 1/4 del plato (25%): Proteína de calidad (pescados, aves, legumbres como lentejas y garbanzos, huevos o frutos secos). Son fuentes saludables y versátiles que promueven la reparación celular y la saciedad.',
      'Recuerda acompañar con aceites vegetales saludables en moderación (como el aceite de oliva virgen extra) y mantener el agua como la bebida principal.',
    ],
    keyTakeaways: [
      '50% del plato vegetales variados y fruta entera.',
      '25% carbohidratos complejos e integrales.',
      '25% proteína magra o vegetal de alto valor biológico.',
      'Prioriza el agua como bebida esencial y el AOVE como grasa de elección.',
    ],
    mythVsFact: {
      myth: 'Para comer saludable y perder peso es indispensable contar cada caloría de forma matemática todos los días.',
      fact: 'La calidad nutricional y la densidad de nutrientes de los alimentos modulan el apetito, la microbiota y la saciedad mucho más que el número aislado de calorías.',
    },
    sources: [
      'Harvard T.H. Chan School of Public Health - The Healthy Eating Plate',
      'Organización Mundial de la Salud (OMS) - Dieta sana y equilibrada (2020)',
    ],
  },
  {
    id: 'macronutrientes-esenciales',
    title: 'Macronutrientes en Equilibrio: Proteínas, Carbohidratos y Grasas Buenas',
    category: 'Fundamentos',
    readTimeMin: 5,
    summary: 'Comprende el rol biológico de cada macronutriente y cómo interactúan para darte saciedad, energía constante y reparación muscular.',
    content: [
      'Los macronutrientes son los pilares energéticos que sustentan la vida humana. Sin embargo, décadas de dietas de moda han demonizado alternativamente a las grasas o a los carbohidratos.',
      '• Proteínas (4 kcal/g): Son los ladrillos estructurales del cuerpo. Participan en la síntesis de enzimas, anticuerpos y tejido muscular. Las guías modernas recomiendan entre 1.2g y 2.0g por kg de peso según el nivel de actividad física.',
      '• Carbohidratos (4 kcal/g): El combustible primario del cerebro y del sistema nervioso central. Los carbohidratos complejos ricos en fibra soluble e insoluble alimentan a las bacterias simbióticas del colon, produciendo ácidos grasos de cadena corta (AGCC) antiinflamatorios.',
      '• Grasas Saludables (9 kcal/g): Indispensables para la absorción de vitaminas liposolubles (A, D, E, K), la síntesis de hormonas esteroideas y la integridad de las membranas celulares. Prioriza ácidos grasos monoinsaturados (palta, AOVE) y poliinsaturados omega-3 (salmón, sacha inchi, chía).',
    ],
    keyTakeaways: [
      'Ningún macronutriente debe ser eliminado de forma restrictiva en personas sanas.',
      'La proteína estimula las hormonas de la saciedad PYY y GLP-1.',
      'La fibra en los carbohidratos regula los picos de glucosa posprandiales.',
      'Las grasas no provocan aumento de peso si provienen de alimentos enteros y no refinados.',
    ],
    mythVsFact: {
      myth: 'Comer grasa automáticamente se traduce en grasa corporal almacenada.',
      fact: 'Las grasas insaturadas de alimentos enteros aceleran la saciedad y son esenciales para el equilibrio hormonal y cerebral.',
    },
    sources: [
      'Institute of Medicine (US) - Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, and Protein',
      'FAO/WHO Joint Expert Consultation on Human Nutrition',
    ],
  },
  {
    id: 'densidad-nutricional-alimentos',
    title: 'Densidad Nutricional vs Densidad Calórica: La Clave de la Vitalidad',
    category: 'Fundamentos',
    readTimeMin: 4,
    summary: 'Aprende a elegir alimentos ricos en micronutrientes por caloría consumida para rendir al máximo sin hambre.',
    content: [
      'La densidad calórica mide la cantidad de calorías por gramo de alimento, mientras que la densidad nutricional evalúa cuántas vitaminas, minerales, antioxidantes y fibra aporta ese alimento por cada caloría.',
      'Dos alimentos con exactamente 200 kcal pueden generar respuestas biológicas opuestas: una porción de brócoli al vapor con aceite de oliva aporta vitamina C, calcio, sulforafano y agua biológica saciante; 200 kcal de galletas refinadas aportan azúcares libres y sodio sin ningún micronutriente protector.',
      'Los superalimentos andinos y amazónicos del Perú (como la lúcuma, el camu camu y la quinoa) son ejemplos extraordinarios de alta densidad nutricional: aportan antioxidantes con un mínimo impacto glucémico.',
    ],
    keyTakeaways: [
      'Maximiza los micronutrientes por caloría para evitar la malnutrición oculta.',
      'Los vegetales de hoja verde oscura y frutos rojos tienen la mayor densidad micronutricional del reino vegetal.',
      'Alimentarse con alta densidad nutricional elimina la necesidad de contar calorías compulsivamente.',
    ],
    sources: [
      'American Journal of Clinical Nutrition - The concept of nutrient density',
      'Instituto Nacional de Salud (INS Perú) - Tablas Peruanas de Composición de Alimentos',
    ],
  },

  // ==========================================
  // HIDRATACIÓN
  // ==========================================
  {
    id: 'hidratacion-inteligente',
    title: 'Hidratación Inteligente: Mucho Más que los "2 Litros al Día"',
    category: 'Hidratación',
    readTimeMin: 3,
    summary: 'Descubre cómo los electrolitos, las frutas ricas en agua biológica y tus señales fisiológicas determinan tu verdadera necesidad hídrica.',
    content: [
      'El famoso mantra de "beber 2 litros de agua diarios" es una simplificación excesiva. La necesidad hídrica varía según el clima, la masa corporal, el nivel de actividad y los alimentos consumidos.',
      'Aproximadamente entre el 20% y el 30% del agua que tu cuerpo necesita a diario proviene de alimentos sólidos, especialmente frutas (sandía, naranja, fresas) y verduras frescas (pepino, calabacín, tomate).',
      'Beber agua pura en exceso sin un balance adecuado de electrolitos puede provocar hiponatremia por dilución. Para una hidratación óptima celular, es crucial la presencia de potasio, magnesio y sodio suave en la dieta.',
      'La mejor brújula cotidiana para saber si estás bien hidratado es el color de tu orina: debe presentar un tono amarillo pálido semejante a la limonada clara.',
    ],
    keyTakeaways: [
      'Las necesidades de agua son individuales y dinámicas, no una cifra estática universal.',
      'Las frutas y verduras frescas aportan hasta un tercio de la hidratación total con sales minerales asociadas.',
      'El color de la orina es el biomarcador visual más fidedigno en personas sanas.',
    ],
    mythVsFact: {
      myth: 'Si no tienes sed, significa que tu cuerpo está perfectamente hidratado.',
      fact: 'El mecanismo de la sed suele activarse cuando ya existe un 1-2% de deshidratación leve a nivel celular.',
    },
    sources: [
      'European Food Safety Authority (EFSA) - Scientific Opinion on Dietary Reference Values for water',
      'American College of Sports Medicine - Exercise and Fluid Replacement',
    ],
  },
  {
    id: 'electrolitos-agua-biologica',
    title: 'Electrolitos y Agua Celular: Por qué las Frutas Hidratan a Nivel Profundo',
    category: 'Hidratación',
    readTimeMin: 4,
    summary: 'La diferencia entre beber agua destilada y absorber agua estructurada en una matriz vegetal rica en potasio y magnesio.',
    content: [
      'El agua dentro de las células vegetales no es simplemente H2O estéril; es un gel coloidal cargado de iones de potasio, magnesio, calcio y flavonoides que facilitan el paso osmótico a través de las acuaporinas en las membranas celulares humanas.',
      'Alimentos como la sandía (92% de agua), el pepino (96% de agua), las fresas y la granadilla peruana permiten retener los fluidos en el espacio intracelular sin sobrecargar la filtración renal.',
      'Si sudas copiosamente por ejercicio o clima cálido, añadir una pizca de sal marina y unas gotas de limón al agua natural replica de forma casera y sin azúcares añadidos una solución isotónica de rehidratación.',
    ],
    keyTakeaways: [
      'Las frutas frescas hidratan con agua enriquecida en electrolitos naturales.',
      'El potasio intracelular balancea el sodio extracelular.',
      'Evita los refrescos comerciales con colorantes y azúcares como sustitutos del agua.',
    ],
    sources: [
      'Nutrients Journal - Cellular Hydration and Plant Water Matrices',
      'Harvard Medical School - How much water should you drink?',
    ],
  },
  {
    id: 'hidratacion-deportiva-calor',
    title: 'Hidratación en el Deporte y Días Calurosos: Pautas de Reposición',
    category: 'Hidratación',
    readTimeMin: 4,
    summary: 'Aprende a calcular tu tasa de sudoración y reponer fluidos antes, durante y después del ejercicio.',
    content: [
      'Una pérdida de fluidos de tan solo el 2% del peso corporal reduce la resistencia cardiovascular en un 15% y deteriora la capacidad de concentración y toma de decisiones.',
      'Pauta recomendada para la actividad física:',
      '• 2 horas antes: Consume entre 400 y 500 ml de agua.',
      '• Durante la sesión: Pequeños sorbos de 150-200 ml cada 15 a 20 minutos.',
      '• Tras finalizar: Por cada medio kilo perdido en la balanza tras entrenar, repone aproximadamente 600-750 ml de líquido con minerales.',
      'El agua de coco natural es una bebida isotónica natural insuperable por su riqueza en potasio (más de 250 mg por 100 ml).',
    ],
    keyTakeaways: [
      'La deshidratación leve disminuye el rendimiento muscular y la coordinación motriz.',
      'El agua de coco es una alternativa natural perfecta a las bebidas deportivas azucaradas.',
      'Bebe a sorbos espaciados para facilitar la absorción gástrica sin pesadez.',
    ],
    sources: [
      'National Athletic Trainers’ Association (NATA) - Fluid Replacement for Athletes',
      'Sports Medicine Journal - Electrolyte balance during physical exertion',
    ],
  },

  // ==========================================
  // MITOS
  // ==========================================
  {
    id: 'mitos-carbohidratos',
    title: 'Mitos y Verdades: ¿Realmente los Carbohidratos Engordan de Noche?',
    category: 'Mitos',
    readTimeMin: 4,
    summary: 'Desmontando el miedo injustificado a los hidratos de carbono y comprendiendo la diferencia entre calidad e índice glucémico.',
    content: [
      'El mito de que consumir hidratos de carbono después de las 18:00 o 20:00 se convierte automáticamente en grasa corporal es uno de los dogmas más extendidos y refutados por la cronobiología nutricional.',
      'El cuerpo humano no apaga su metabolismo basal al ponerse el sol. Si la ingesta calórica total diaria es equilibrada, el momento específico en el que se consumen carbohidratos de calidad (como avena, arroz integral o patata cocida) no genera ganancia de grasa.',
      'De hecho, una cena que incluya una porción moderada de carbohidratos complejos puede favorecer la entrada de triptófano al cerebro y aumentar la síntesis de serotonina y melatonina, mejorando la calidad del sueño nocturno.',
      'El problema no son los carbohidratos, sino el consumo nocturno de ultraprocesados densos en azúcares libres y grasas hidrogenadas consumidos frente a pantallas.',
    ],
    keyTakeaways: [
      'El balance energético y la calidad del alimento prevalecen sobre el horario del reloj.',
      'Los carbohidratos complejos nocturnos pueden favorecer la conciliación del sueño.',
      'Diferencia siempre entre carbohidratos densos en fibra (legumbres, granos) y azúcares refinados procesados.',
    ],
    mythVsFact: {
      myth: 'Cenar carbohidratos te hace engordar porque no tienes tiempo de quemarlos mientras duermes.',
      fact: 'El metabolismo nocturno sigue activo regenerando tejidos. Lo determinante es el balance metabólico global y la calidad del alimento.',
    },
    sources: [
      'Journal of Clinical Endocrinology & Metabolism - Chrononutrition studies',
      'British Journal of Nutrition - Carbohydrate intake and sleep architecture',
    ],
  },
  {
    id: 'mito-dietas-detox-jugos',
    title: 'El Mito de las Dietas Detox: Tu Hígado y Riñones Hacen el Trabajo Real',
    category: 'Mitos',
    readTimeMin: 4,
    summary: 'Por qué no necesitas batidos mágicos ni zumos purificantes para eliminar desechos metabólicos.',
    content: [
      'La industria de las "dietas détox" genera miles de millones promocionando jugos depurativos y caldos que prometen "eliminar toxinas". Desde el punto de vista médico y fisiológico, el concepto es falso.',
      'El cuerpo cuenta con un sofisticado sistema de detoxificación compuesto por el hígado (a través del citocromo P450), los riñones, los pulmones, la piel y el tracto gastrointestinal, trabajando ininterrumpidamente las 24 horas del día.',
      'Exprimir frutas y verduras elimina la fibra insoluble y acelera la absorción de fructosa libre. Para apoyar verdaderamente la función hepática, se requiere agua, antioxidantes, aminoácidos sulfurados (presentes en huevos, brócoli y ajo) y fibra.',
    ],
    keyTakeaways: [
      'Ningún producto comercial o zumo líquido desintoxica el organismo.',
      'Los órganos vitales realizan la verdadera depuración biológica.',
      'La fibra entera previene la reabsorción de toxinas en el colon.',
    ],
    mythVsFact: {
      myth: 'Hacer ayunos de jugos verdes 3 días al mes limpia el hígado de toxinas.',
      fact: 'El ayuno exclusivo de zumos puede inducir pérdida de masa muscular y picos de insulina sin ningún beneficio detoxificante real.',
    },
    sources: [
      'British Dietetic Association (BDA) - Detox Diets Fact Sheet',
      'Johns Hopkins Medicine - The Truth Behind Detox Diets',
    ],
  },
  {
    id: 'mito-grasas-colesterol',
    title: 'Grasas y Huevos: La Ciencia que Absolvió al Colesterol Dietético',
    category: 'Mitos',
    readTimeMin: 4,
    summary: 'Cómo los estudios modernos demostraron que el colesterol de los alimentos no es la causa primaria de los problemas cardiovasculares.',
    content: [
      'Durante los años 80 y 90, se recomendó limitar el consumo de huevos a un máximo de 2 por semana por temor a su contenido de colesterol en la yema. Hoy sabemos que esa hipótesis fue un error histórico.',
      'Aproximadamente el 80% del colesterol circulante en sangre es producido por el propio hígado, estimulado por el consumo de grasas trans artificiales, azúcares añadidos y aceites proinflamatorios refinados.',
      'Los huevos son uno de los alimentos más completos del planeta: aportan colina (imprescindible para la memoria y el neurotransmisor acetilcolina), luteína, zeaxantina y proteína con valor biológico de 100%. Consumir 1 a 2 huevos al día es seguro y beneficioso para la gran mayoría de la población.',
    ],
    keyTakeaways: [
      'El colesterol dietético tiene una influencia mínima en el colesterol LDL de la mayoría de personas.',
      'La yema del huevo contiene casi todos los micronutrientes esenciales excepto vitamina C.',
      'La grasa vegetal del aguacate y el AOVE protege las arterias contra la oxidación.',
    ],
    sources: [
      'American Heart Association (AHA) - Dietary Cholesterol and Cardiovascular Risk',
      'The BMJ - Association of egg intake with cardiovascular disease',
    ],
  },

  // ==========================================
  // ETIQUETADO
  // ==========================================
  {
    id: 'lectura-etiquetas-nutricionales',
    title: 'Cómo Leer una Etiqueta Nutricional sin Caer en Trampas de Marketing',
    category: 'Etiquetado',
    readTimeMin: 5,
    summary: 'Guía práctica para entender la lista de ingredientes y la tabla nutricional en el supermercado en 30 segundos.',
    content: [
      'El frente del paquete está diseñado por departamentos de marketing para captar tu atención con reclamos como "0% azúcares añadidos", "Rico en fibra" o "100% natural". La verdad objetiva del producto reside en la parte posterior.',
      'Regla 1: La lista de ingredientes está ordenada por peso descendente. El primer ingrediente es el que se encuentra en mayor cantidad.',
      'Regla 2: El azúcar tiene más de 50 nombres distintos (maltodextrina, jarabe de glucosa, dextrosa, concentrado de zumo, néctar de agave, panela). Si aparece en los primeros tres lugares, el producto es predominantemente azucarado.',
      'Regla 3: En la tabla nutricional, revisa los gramos de azúcar por 100g. Menos de 5g/100g se considera bajo; más de 15g/100g es alto.',
      'Regla 4: Corta es mejor. Si un alimento tiene más de 10 o 15 ingredientes que no tendrías en tu cocina (emulsionantes, potenciadores de sabor, colorantes), clasifícalo como ultraprocesado ocasional.',
    ],
    keyTakeaways: [
      'La lista de ingredientes siempre va de mayor a menor cantidad.',
      'Detecta los alias del azúcar en los primeros ingredientes.',
      'Compara productos siempre por 100g, no por las porciones arbitrarias de la marca.',
      'Prioriza la comida real con 1 solo ingrediente (ej. "lentejas", "avena").',
    ],
    mythVsFact: {
      myth: 'Si un producto lleva la etiqueta "Light" o "Fitness", puedes consumirlo sin moderación.',
      fact: '"Light" solo significa que tiene un 30% menos de algún nutriente respecto a su versión original; frecuentemente reducen grasa pero añaden azúcares o almidones para mantener el sabor.',
    },
    sources: [
      'Reglamento (UE) Nº 1169/2011 sobre información alimentaria facilitada al consumidor',
      'Agencia Española de Seguridad Alimentaria y Nutrición (AESAN)',
    ],
  },
  {
    id: 'octogonos-advertencia-peru',
    title: 'Sellos y Octógonos de Advertencia: Cómo Decodificarlos al Comprar',
    category: 'Etiquetado',
    readTimeMin: 4,
    summary: 'Entiende qué significan los sellos negros "Alto en Azúcar", "Alto en Sodio", "Alto en Grasas Saturadas" y "Contiene Grasas Trans".',
    content: [
      'El modelo de advertencias nutricionales frontales mediante octógonos negros (adoptado en Perú, Chile, México y recomendado por la OPS/OMS) busca alertar de un vistazo sobre ingredientes críticos asociados a enfermedades no transmisibles.',
      '1. ALTO EN AZÚCAR: Significa que contiene ≥ 10g de azúcar total por cada 100g en sólidos, o ≥ 5g por 100 ml en líquidos. Frecuente en cereales de desayuno "infantiles", néctares y galletas.',
      '2. ALTO EN SODIO: Significa que supera los 400 mg de sodio por cada 100g de sólido. Común en snacks fritos, embutidos y sopas instantáneas.',
      '3. ALTO EN GRASAS SATURADAS: Supera los 4g de grasas saturadas por 100g. Presente en chocolates comerciales, bollería y frituras.',
      '4. CONTIENE GRASAS TRANS: El sello de mayor riesgo celular. Las grasas parcialmente hidrogenadas elevan el LDL oxidado y dañan el endotelio arterial.',
    ],
    keyTakeaways: [
      'Los octógonos son una herramienta visual rápida para descartar ultraprocesados dañinos.',
      'La ausencia de sellos en alimentos frescos (frutas, verduras, legumbres secas) confirma su pureza nutricional.',
      'Evita los productos que acumulan 2 o más octógonos como consumo habitual.',
    ],
    sources: [
      'Ministerio de Salud del Perú (MINSA) - Ley Nº 30021 de Promoción de la Alimentación Saludable',
      'Organización Panamericana de la Salud (OPS) - Modelo de perfil de nutrientes',
    ],
  },
  {
    id: 'los-50-alias-del-azucar',
    title: 'El Diccionario Oculto del Azúcar: Identifica Ingredientes Camuflados',
    category: 'Etiquetado',
    readTimeMin: 4,
    summary: 'Aprende a reconocer cuando un alimento procesado disfraza su carga dulce bajo nombres técnicos.',
    content: [
      'Muchos fabricantes dividen los endulzantes en 3 o 4 tipos distintos para que ninguno de ellos aparezca como primer ingrediente en la lista.',
      'Nombres habituales que son químicamente azúcares simples libres:',
      '• Terminados en "-osa": sacarosa, fructosa, glucosa, dextrosa, maltosa, galactosa.',
      '• Jarabes y siropes: jarabe de maíz de alta fructosa (JMAF), jarabe de agave, sirope de arroz, jarabe de malta.',
      '• Extractos y concentrados: concentrado de zumo de manzana, jugo evaporado de caña, melaza, panela, miel de caña.',
      '• Almidones hidrolizados: maltodextrina, almidón modificado, dextrina.',
      'Cualquiera de ellos estimula de forma inmediata la secreción de insulina pancreática sin aportar matriz de fibra saciante.',
    ],
    keyTakeaways: [
      'Revisa si la lista contiene más de un tipo de endulzante.',
      'El azúcar libre sigue siendo azúcar libre aunque se llame "néctar de agave" o "azúcar de coco".',
      'Opta por endulzar de forma natural con lúcuma en polvo, canela o rodajas de fruta entera.',
    ],
    sources: [
      'World Health Organization (WHO) - Guideline: Sugars intake for adults and children',
      'American Heart Association - Added Sugars',
    ],
  },

  // ==========================================
  // HÁBITOS
  // ==========================================
  {
    id: 'alimentacion-consciente-mindful-eating',
    title: 'Mindful Eating: El Arte de Comer con Plena Atención y Reconectar con tu Saciedad',
    category: 'Hábitos',
    readTimeMin: 4,
    summary: 'Herramientas prácticas para reconectar con tus señales biológicas de saciedad y erradicar el comer impulsivo o frente a pantallas.',
    content: [
      'Comer mientras trabajamos frente al ordenador o hacemos scroll en redes sociales desconecta la señal vagal que conecta el estómago con el hipotálamo.',
      'El cerebro tarda aproximadamente 20 minutos desde el primer bocado en recibir las señales hormonales de saciedad mediadas por la colecistoquinina (CCK) y el péptido YY.',
      'Consejos prácticos para aplicar hoy mismo:',
      '• Suelta los cubiertos entre bocado y bocado mientras masticas.',
      '• Mastica cada bocado buscando identificar texturas y aromas sutiles.',
      '• Apaga las pantallas durante la comida principal; haz del acto de nutrirte un momento de desconexión y disfrute.',
      '• Evalúa tu hambre en una escala del 1 al 10 antes de sentarte a la mesa.',
    ],
    keyTakeaways: [
      'El hipotálamo tarda unos 20 minutos en registrar la saciedad hormonal.',
      'Comer distraído frente a pantallas incrementa la ingesta calórica involuntaria en hasta un 25%.',
      'La masticación pausada mejora la digestión enzimática salival y alivia la hinchazón.',
    ],
    mythVsFact: {
      myth: 'Comer rápido no influye en la digestión si los alimentos son saludables.',
      fact: 'La digestión de carbohidratos comienza en la boca con la amilasa salival. Tragar sin masticar sobrecarga el estómago provocando acidez y gases.',
    },
    sources: [
      'The American Journal of Clinical Nutrition - Eating slowly increases satiety and reduces energy intake',
      'Center for Mindful Eating (TCME)',
    ],
  },
  {
    id: 'crononutricion-ritmos-circadianos',
    title: 'Crononutrición: Cómo los Horarios y la Luz Regulan tu Metabolismo',
    category: 'Hábitos',
    readTimeMin: 4,
    summary: 'Por qué cuándo comes es tan importante como qué comes para la sensibilidad a la insulina y el sueño.',
    content: [
      'Nuestras células contienen relojes circadianos moleculares que anticipan el día y la noche. Por la mañana, la sensibilidad a la insulina en los músculos es máxima, mientras que por la noche disminuye progresivamente.',
      'Cenar al menos 2 horas y media antes de ir a dormir permite que la temperatura corporal central descienda, facilitando la secreción de melatonina y la fase profunda del sueño REM.',
      'Mantener horarios de comida consistentes sincroniza la microbiota intestinal y previene la secreción desordenada de grelina (la hormona del apetito).',
    ],
    keyTakeaways: [
      'La sensibilidad a la insulina es mayor durante las horas de luz solar.',
      'Cena temprano y ligero para proteger la calidad del sueño profundo.',
      'La regularidad de horarios previene los atracones vespertinos.',
    ],
    sources: [
      'Cell Metabolism - Circadian timing of food intake',
      'Nature Reviews Endocrinology - Chrononutrition in health and disease',
    ],
  },
  {
    id: 'batch-cooking-planificacion',
    title: 'Planificación Semanal & Batch Cooking: Come Sano sin Esclavizarte en la Cocina',
    category: 'Hábitos',
    readTimeMin: 4,
    summary: 'El método de cocinar bases nutritivas 2 horas el fin de semana para tener platos listos y balanceados de lunes a viernes.',
    content: [
      'La principal causa por la que las personas recurren a la comida rápida o a ultraprocesados no es la falta de voluntad, sino la falta de disponibilidad de comida real cuando llegan con hambre y fatiga del trabajo.',
      'El sistema de Batch Cooking consiste en cocinar ingredientes base versátiles:',
      '1. Dos fuentes de carbohidratos complejos: por ejemplo, una bandeja de camote y papas asadas, y una olla de quinoa andina.',
      '2. Dos bases de proteína: lentejas cocidas y pechuga o tofu marinado.',
      '3. Verduras asadas y lavadas: hojas verdes secas en recipientes herméticos y verduras al horno.',
      'Durante la semana, solo necesitas combinar en 3 minutos: 50% de verduras, 25% de granos y 25% de proteína.',
    ],
    keyTakeaways: [
      'El ambiente y la disponibilidad vencen a la fuerza de voluntad.',
      'Los recipientes de vidrio herméticos mantienen los vegetales crujientes hasta 5 días en la nevera.',
      'Ahorra dinero, tiempo y reduce el desperdicio de comida.',
    ],
    sources: [
      'Harvard Health Publishing - Meal prep for beginners',
      'Food Quality and Preference Journal - Food preparation habits and diet quality',
    ],
  },
];
