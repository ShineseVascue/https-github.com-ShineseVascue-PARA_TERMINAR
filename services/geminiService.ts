import { GoogleGenAI } from "@google/genai";

// FIX: Refactored to align with Gemini API key handling guidelines.
// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
// Assume this variable is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function analyzeGitHooks(text: string): Promise<string> {
  try {
    const prompt = `Revisa minuciosamente el siguiente texto que parece ser un conjunto de scripts de hooks de Git y explica de qué se trata cada uno en detalle. Proporciona un resumen general primero y luego un desglose de cada script. El texto contiene nombres de archivo como "applypatch-msg.sample", úsalos como títulos para cada sección. Formatea tu respuesta en un Markdown claro y bien estructurado.

Texto a analizar:
---
${text}
---
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error analyzing the text: ${error.message}`;
    }
    return "An unknown error occurred while analyzing the text.";
  }
}
