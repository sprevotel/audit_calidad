import { AuditState, AnswerType } from '../types';
import { AUDIT_SECTIONS } from '../constants';
import { GoogleGenAI } from "@google/genai";

export const analyzeAudit = async (state: AuditState): Promise<string> => {
  // 1. Intentar obtener la clave del entorno (desarrollo local)
  let apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

  // 2. Si no hay clave (en GitHub Pages), pedirla al usuario
  if (!apiKey) {
    const userKey = window.prompt("Para usar la Inteligencia Artificial, por favor ingresa tu API Key de Google Gemini:\n(Tu clave no se guardará en ningún servidor, solo se usa en tu navegador)");
    if (userKey) {
        apiKey = userKey;
    } else {
        return "Nota: Se requiere una API Key para realizar el análisis inteligente. El análisis no se pudo generar.";
    }
  }

  try {
      const ai = new GoogleGenAI({ apiKey: apiKey });

      // Construct a prompt based on the state
      const criticalIssues = Object.entries(state.answers)
        .filter(([_, ans]) => ans.value === AnswerType.NO || ans.value === AnswerType.NM)
        .map(([qId, ans]) => {
          // Find question text
          let qText = '';
          AUDIT_SECTIONS.forEach(sec => {
            const q = sec.questions.find(q => q.id === qId);
            if (q) qText = q.text;
          });
          return `- Pregunta: "${qText}" | Respuesta: ${ans.value} | Obs: ${ans.observation}`;
        })
        .join('\n');

      const prompt = `
        Actúa como un experto auditor de calidad en salud especializado en centros de diálisis.
        Analiza los siguientes resultados negativos o a mejorar de una autoevaluación:

        ${criticalIssues || "No se encontraron puntos negativos mayores."}

        Datos del centro: ${state.generalInfo.establishmentName}, Director: ${state.generalInfo.medicalDirector}.

        Por favor, genera un resumen ejecutivo breve (máximo 2 párrafos) y 3 recomendaciones prioritarias para mejorar la calidad del servicio basándote en los hallazgos.
        Usa un tono profesional, constructivo y formal.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || "No se pudo generar el análisis.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al conectar con Gemini. Verifique que su API Key sea válida y tenga saldo/cuota disponible.";
  }
};