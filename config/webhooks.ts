/**
 * Configuración de Webhooks y Endpoints
 * 
 * Arquitectura de Dos Mundos:
 * - Portal de Marca: https://nextgenpm.es/
 * - Motor de Conversión (App): https://nextgenpm.es/diagnostico-profesional/
 * - Prep Info Gate: https://nextgenpm.es/diagnostico-profesional/prep-info
 */

// URLs del Ecosistema
export const ECOSYSTEM_URLS = {
  brandPortal: "https://nextgenpm.es",
  diagnosisApp: "https://nextgenpm.es/diagnostico-profesional",
  prepInfoGate: "https://nextgenpm.es/diagnostico-profesional/prep-info",
  supportEmail: "soporte@nextgenpm.ia",
};

// Webhooks de n8n
export const N8N_WEBHOOKS = {
  // Webhook principal para recibir datos del formulario
  formSubmission: process.env.EXPO_PUBLIC_N8N_WEBHOOK_FORM || "https://n8n.nextgenpm.ia/webhook/diagnosis-form",
  
  // Webhook para validación de datos (DQS)
  dqsValidation: process.env.EXPO_PUBLIC_N8N_WEBHOOK_DQS || "https://n8n.nextgenpm.ia/webhook/dqs-validation",
  
  // Webhook para procesamiento de IA
  aiProcessing: process.env.EXPO_PUBLIC_N8N_WEBHOOK_AI || "https://n8n.nextgenpm.ia/webhook/ai-processing",
  
  // Webhook para confirmación de pago (Stripe)
  stripeConfirmation: process.env.EXPO_PUBLIC_N8N_WEBHOOK_STRIPE || "https://n8n.nextgenpm.ia/webhook/stripe-confirmation",
};

// Integraciones Externas
export const EXTERNAL_APIS = {
  // Stripe
  stripe: {
    publicKey: process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY || "",
    priceId: process.env.EXPO_PUBLIC_STRIPE_PRICE_ID || "", // Pro 297€
  },
  
  // OpenAI (GPT-4 Turbo)
  openai: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "",
    model: "gpt-4-turbo",
  },
  
  // Perplexity (Free tier)
  perplexity: {
    apiKey: process.env.EXPO_PUBLIC_PERPLEXITY_API_KEY || "",
    model: "pplx-7b-online",
  },
  
  // Notion
  notion: {
    apiKey: process.env.EXPO_PUBLIC_NOTION_API_KEY || "",
    databaseId: process.env.EXPO_PUBLIC_NOTION_DATABASE_ID || "",
  },
  
  // Calendly
  calendly: {
    eventUrl: process.env.EXPO_PUBLIC_CALENDLY_EVENT_URL || "https://calendly.com/agustina-nextgenpm",
  },
};

// Configuración de DQS (Data Quality Score)
export const DQS_CONFIG = {
  threshold: 70, // Mínimo requerido para procesar
  weights: {
    accuracy: 0.30,
    completeness: 0.25,
    consistency: 0.20,
    timeliness: 0.15,
    validity: 0.10,
  },
};

// Configuración de Modelos IA
export const AI_MODELS = {
  free: {
    provider: "perplexity",
    model: "pplx-7b-online",
    maxTokens: 1000,
  },
  pro: {
    provider: "openai",
    model: "gpt-4-turbo",
    maxTokens: 2000,
  },
};

// Mapeo de Campos a Notion (1-38)
export const NOTION_FIELD_MAPPING = {
  // Campos del Formulario Base (1-5)
  empresa: "field_1",
  rol: "field_2",
  horas: "field_3",
  presupuesto: "field_4",
  problema: "field_5",
  
  // Campos de Prep Info (6-10)
  sector: "field_6",
  teamSize: "field_7",
  currentTools: "field_8",
  urgency: "field_9",
  additionalNotes: "field_10",
  
  // Campos de Resultado (11-38)
  roiEstimado: "field_11",
  procesosIdentificados: "field_12",
  tiempoAhorrado: "field_13",
  scoreConfianza: "field_14",
  dqsScore: "field_15",
  modeloUtilizado: "field_16",
  fechaProcesamiento: "field_17",
  emailEnviado: "field_18",
  pdfUrl: "field_19",
  // ... campos 20-38 para datos adicionales
};

// Plantillas de Email
export const EMAIL_TEMPLATES = {
  diagnosisResult: {
    subject: "Tu Diagnóstico IA Profesional está listo",
    template: "diagnosis-result",
  },
  validationCall: {
    subject: "Validemos tu diagnóstico - Llamada con Agustina",
    template: "validation-call",
  },
  paymentConfirmation: {
    subject: "Confirmación de pago - Análisis Pro 297€",
    template: "payment-confirmation",
  },
};

/**
 * Función para enviar datos al webhook de n8n
 */
export async function sendToWebhook(
  webhookUrl: string,
  data: Record<string, any>,
  plan: "mini" | "pro"
) {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        plan,
        timestamp: new Date().toISOString(),
        source: "diagnosis-app",
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending to webhook:", error);
    throw error;
  }
}

/**
 * Función para calcular DQS
 */
export function calculateDQS(data: Record<string, any>): number {
  // Implementar lógica de cálculo según Doc 09
  const accuracy = data.empresa && data.rol ? 1 : 0;
  const completeness = Object.values(data).filter((v) => v).length / Object.keys(data).length;
  const consistency = 1; // Validar consistencia de datos
  const timeliness = 1; // Datos recientes
  const validity = data.horas >= 1 && data.horas <= 40 ? 1 : 0;

  const weights = DQS_CONFIG.weights;
  const dqs =
    accuracy * weights.accuracy +
    completeness * weights.completeness +
    consistency * weights.consistency +
    timeliness * weights.timeliness +
    validity * weights.validity;

  return Math.round(dqs * 100);
}

/**
 * Función para determinar el modelo IA a usar
 */
export function selectAIModel(plan: "mini" | "pro", dqsScore: number) {
  if (dqsScore < DQS_CONFIG.threshold) {
    return null; // Bloquear procesamiento
  }

  return plan === "pro" ? AI_MODELS.pro : AI_MODELS.free;
}
