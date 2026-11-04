/**
 * Search and Google Integration utilities for NutriTech
 */

export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const getGoogleNutritionUrl = (foodOrQuery: string): string => {
  const query = encodeURIComponent(`informacion nutricional calorias y macronutrientes ${foodOrQuery}`);
  return `https://www.google.com/search?q=${query}`;
};

export const getGoogleRecipeUrl = (recipeName: string): string => {
  const query = encodeURIComponent(`receta saludable paso a paso ${recipeName}`);
  return `https://www.google.com/search?q=${query}`;
};

/**
 * Initialize Browser Google Speech Recognition for voice search
 */
export const startVoiceRecognition = (
  onResult: (transcript: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
): { stop: () => void } | null => {
  const SpeechRecognitionClass =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    onError('Tu navegador no soporta reconocimiento de voz nativo de Google.');
    return null;
  }

  try {
    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      onResult(speechToText);
    };

    recognition.onerror = (event: any) => {
      onError(event.error === 'not-allowed' ? 'Permiso de micrófono denegado.' : 'No se detectó audio.');
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  } catch (e) {
    onError('Error al iniciar el micrófono.');
    return null;
  }
};
