# NutriTech 🌿✨
**Plataforma Web de Nutrición Inteligente y Bienestar**

> *"Conoce lo que comes. Transforma tu bienestar."*

NutriTech es una aplicación web interactiva, moderna y rigurosa diseñada para transformar la relación de las personas con la comida. Combina tecnología frontend de alto rendimiento, diseño visual inspirado en la naturaleza (verde esmeralda, cremas y acentos cítricos) y bases de datos nutricionales referenciales (USDA / BEDCA).

---

## 🌟 Características Principales

### 1. Inicio Impactante (`HeroSection`)
- Presentación estética y profesional con el eslogan oficial.
- Barra de búsqueda rápida de alimentos con navegación directa.
- **Alimento destacado del día** con desglose bromatológico en tarjeta visual.
- Tarjetas interactivas de acceso directo a cada módulo principal.
- Banner de responsabilidad y rigor científico.

### 2. Explorador de Alimentos, Pirámide Alimenticia & Biodiversidad del Perú (`FoodExplorer`)
- **Pirámide Nutricional Oficial Completa (SENC / OMS):**
  - **Nivel 1 (Base):** Hidratación Fundamental (Agua mineral natural, Agua de coco, Té matcha, Infusión digestiva, Café filtrado).
  - **Nivel 2:** Granos Integrales & Tubérculos (Copos de avena integral, Quinoa real, Arroz integral, Patata cocida, Boniato asado, Pan 100% integral de masa madre).
  - **Nivel 3:** Frutas Frescas, Verduras & Aceite de Oliva Virgen Extra (AOVE, Aguacate, Espinacas, Brócoli, Manzana, Plátano, Naranja, Fresas, Arándanos, Kiwi, Tomate, Zanahoria, Calabacín).
  - **Nivel 4:** Lácteos Fermentados & Frutos Secos (Yogur griego natural, Kéfir, Requesón, Nueces de nogal, Almendras naturales).
  - **Nivel 5:** Proteínas Magras, Pescados, Legumbres & Huevos (Salmón fresco, Merluza blanca, Pechuga de pollo, Pechuga de pavo, Huevos camperos, Lentejas, Garbanzos, Tofu firme).
  - **Nivel 6 (Cúspide):** Consumo Ocasional y Moderado (Ternera magra, Jamón ibérico de bellota, Chocolate negro 85% cacao, Miel pura artesanal).
- **🇵🇪 Colección Completa de Frutas y Verduras del Perú (INS / MIDAGRI):**
  - **Frutas Emblemáticas Peruanas:** Camu Camu (récord de 2780 mg vit. C), Lúcuma (*Oro de los Incas*), Chirimoya de Cumbe, Aguaymanto (Golden Berry andino), Granadilla, Maracuyá, Cocona amazónica, Pitahaya Amarilla, Tumbo serrano, Pacae (Guaba), Mango Kent de Piura y Plátano Bellaco.
  - **Verduras, Ajíes, Tubérculos & Hierbas del Perú:** Ají Amarillo (base gastronómica), Ají Limo (cebiche), Rocoto Arequipeño, Papa Amarilla Tumbay, Papa Huayro morada nativa, Camote morado de Cañete, Yuca amazónica, Olluco andino, Choclo Cusqueño de grano gigante, Zapallo Loche de Lambayeque, Huacatay andino y Maca Andina.
  - **Filtros por Regiones Geográficas:** Pestañas directas para explorar alimentos de la **Costa Peruana**, **Sierra & Andes**, y **Selva Amazónica**.
  - **Identificación Botánica y Cultural:** Nombre científico, región biogeográfica, beneficios celulares y consejos de cocina tradicional y moderna.
- **Buscador Potenciado & Vinculado con Google:**
  - **Búsqueda instantánea en vivo:** Despliega sugerencias predictivas automáticas mientras escribes en la barra de navegación o en el explorador.
  - **Tolerante a tildes y mayúsculas:** Coincidencia perfecta al escribir *"chirimoya"*, *"lucuma"*, *"aji amarillo"*, *"platano"*, *"brocoli"*, *"te"*, *"salmon"*, *"limon"*.
  - **Búsqueda por Voz con Google (Web Speech API):** Botón de micrófono integrado para hablar directamente en español y buscar con comodidad.
  - **Vinculación con Google Nutrición:** Acceso directo a fichas oficiales de Google y tablas USDA en cada alimento y búsqueda.
- **Modal de Detalle Completo:**
  - Selector de porción interactivo (100g, porción habitual del hogar o personalizada mediante slider en gramos).
  - Distribución de calorías y macronutrientes (Proteínas, Carbohidratos, Grasas y Fibra).
  - Distintivo y banner de origen peruano avalado con las Tablas del Instituto Nacional de Salud (INS Perú / CENAN).
  - Barra visual de proporción calórica (% kcal).
  - Micronutrientes clave (Potasio, Vitamina C, Calcio, Hierro y Sodio).
  - Beneficios celulares y consejo culinario del nutricionista.
  - Botón directo para añadir al plato en la Calculadora.

### 3. Creador y Recomendador de Recetas (`RecipeCreator`)
- **Despensa interactiva:** El usuario selecciona qué ingredientes tiene en su casa (o añade ingredientes propios).
- **Algoritmo de coincidencia:** Calcula el porcentaje de afinidad de cada receta con los ingredientes disponibles e indica si tienes el 100% o qué ingredientes te faltan.
- **Filtros por tipo de dieta:** Vegetarianas, preparaciones rápidas (≤20 min) y altas en proteína.
- **Modal de Receta:**
  - Escalador de porciones en tiempo real (+/-) que recalcula cantidades de ingredientes y aporte nutricional.
  - Lista de ingredientes con opción para tachar, omitir o añadir ingredientes opcionales.
  - Pasos de preparación con casillas de verificación interactivas para marcar el progreso en la cocina.
  - Consejos del chef sobre técnicas de cocción saludable.

### 4. Calculadora Nutricional de Platos (`NutritionCalculator`)
- **Compositor de comidas:** Permite agregar múltiples alimentos de la base de datos y especificar la cantidad exacta en gramos.
- **Cálculo instantáneo:** Sumatoria precisa de energía total (kcal), proteínas, hidratos de carbono, grasas totales y fibra dietética.
- **Gráfico de reparto calórico:** Visualización de porcentajes frente a los rangos de distribución aceptables de macronutrientes (AMDR).
- **Metas diarias personalizables:** Ajuste de objetivos de calorías, proteínas y fibra con barras de progreso relativo.
- **Carga de platos modelo:** Presets preconfigurados (Desayuno Vital, Almuerzo Mediterráneo, Cena Ligera Fit y Snack Saludable).
- **Exportación en PDF descargable:** Generación de un reporte formal en formato PDF (usando `jsPDF`) con diseño editorial, tabla de ingredientes por nivel de la pirámide, desglose de macronutrientes, micronutrientes, porcentajes AMDR y aviso de responsabilidad.
- **Portapapeles:** Botón para copiar el resumen de la comida al portapapeles con un solo clic.

### 5. Consejos y Educación Nutricional (`NutritionTips`)
- Artículos educativos redactados en lenguaje accesible y riguroso:
  - El Plato de Harvard (regla 50-25-25).
  - Hidratación inteligente y biomarcadores hídricos.
  - Mitos y verdades sobre los carbohidratos de noche.
  - Cómo leer etiquetas nutricionales en el supermercado.
  - Mindful eating y señales biológicas de saciedad.
- **Zona Interactiva Mito vs Realidad:** Tarjetas con volteo interactivo para desmitificar creencias populares sobre la alimentación.
- Referencias bibliográficas a organismos internacionales (OMS, Harvard School of Public Health, EFSA, AESAN).

### 6. Colección de Favoritos (`FavoritesView`)
- Guardado persistente de alimentos y recetas favoritas en el navegador mediante `localStorage`.
- Pestañas organizadas para acceder a alimentos guardados o preparaciones con un clic.

---

## 🔒 Seguridad y Responsabilidad Nutricional

NutriTech cumple estrictamente con las pautas de divulgación de la salud:
1. **Valores aproximados:** Los datos nutricionales se presentan explícitamente como aproximaciones de referencia basadas en tablas estandarizadas (USDA y BEDCA), recordando que la cocción y el origen alteran la composición real.
2. **Sin diagnósticos médicos:** La plataforma no diagnostica patologías ni prescribe dietas terapéuticas restrictivas.
3. **Aviso explícito:** Se incluye un aviso visible en pie de página y modales indicando que la información educativa no reemplaza la atención individualizada de un profesional colegiado de la nutrición.

---

## 💻 Requisitos del Sistema

- **Node.js:** Versión 18.0 o superior (recomendado Node 20 LTS o 22).
- **NPM:** Versión 9.0 o superior.
- **Navegador web moderno:** Google Chrome, Mozilla Firefox, Safari o Microsoft Edge con soporte para JavaScript ES2022.

---

## 🚀 Instrucciones de Instalación y Ejecución

Sigue estos pasos en tu terminal para ejecutar el proyecto en tu máquina local:

### 1. Clonar o descargar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd nutritech
```

### 2. Instalar las dependencias del proyecto
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo local
```bash
npm run dev
```
La aplicación estará disponible inmediatamente en tu navegador en:
`http://localhost:3000` (o la dirección que indique la terminal).

### 4. Compilar para producción (Build)
```bash
npm run build
```
Esto generará los archivos estáticos listos para producción en la carpeta `dist/`.

### 5. Verificar tipado y sintaxis (Lint)
```bash
npm run lint
```

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **Framework:** React 19 con TypeScript para máxima robustez tipada.
- **Gráficos Interactivos:** Recharts (`recharts`) para gráficos de dona SVG de alta precisión y reactividad.
- **Generación de Reportes PDF:** jsPDF (`jspdf`) para crear documentos descargables client-side sin dependencia de servidores.
- **Empaquetador & Dev Server:** Vite 8 con soporte ultrarrápido.
- **Estilos:** Tailwind CSS v4 para un diseño limpio, moderno, con paleta de verdes esmeralda, cremas y acentos cálidos.
- **Iconografía:** Lucide React (`lucide-react`) con íconos semánticos y elegantes.
- **Fuentes Tipográficas:** *Plus Jakarta Sans* para lectura cómoda y *Outfit* para títulos con presencia visual.
- **Almacenamiento Local:** Web Storage API (`localStorage`) para persistencia sin necesidad de autenticación externa.

---

*Desarrollado como proyecto de demostración universitaria de alta fidelidad para el sector de la salud y la nutrición inteligente.*
