/**
 * Configuración de Webhooks y Endpoints
 * MANUS.IA v2.3 FINAL - Brand Compliance
 * 
 * Arquitectura de Dos Mundos:
 * - Portal de Marca: https://nextgenpm.es/
 * - Motor de Conversión (App): https://nextgenpm.es/diagnostico-profesional/
 * - DQS Gate: https://nextgenpm.es/diagnostico-profesional/dqs-gate
 */

// URLs del Ecosistema
export const ECOSYSTEM_URLS = {
  brandPortal: "https://nextgenpm.es",
  diagnosisApp: "https://nextgenpm.es/diagnostico-profesional",
  dqsGate: "https://nextgenpm.es/diagnostico-profesional/dqs-gate",
  supportEmail: "soporte@nextgenpm.ia",
};

// Webhooks de n8n
export const N8N_WEBHOOKS = {
  // Webhook principal para recibir datos del formulario
  formSubmission: process.env.EXPO_PUBLIC_N8N_WEBHOOK_FORM || "https://n8n.nextgenpm.es/webhook/diagnosis-ready",
  
  // Webhook para validación de datos (DQS < 70)
  dqsLow: process.env.EXPO_PUBLIC_N8N_WEBHOOK_DQS_LOW || "https://n8n.nextgenpm.es/webhook/dqs-low",
  
  // Webhook para procesamiento de IA (DQS >= 70)
  aiProcessing: process.env.EXPO_PUBLIC_N8N_WEBHOOK_AI || "https://n8n.nextgenpm.es/webhook/ai-processing",
  
  // Webhook para confirmación de pago (Stripe)
  stripeConfirmation: process.env.EXPO_PUBLIC_N8N_WEBHOOK_STRIPE || "https://n8n.nextgenpm.es/webhook/stripe",
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
  threshold: 70, // Mínimo requerido para procesar automáticamente
  weights: {
    accuracy: 0.30,
    completeness: 0.25,
    consistency: 0.20,
    timeliness: 0.15,
    context: 0.10,
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
  
  // Campos de DQS Gate (6-10)
  systems: "field_6",
  integrations: "field_7",
  constraints: "field_8",
  isCurrentData: "field_9",
  dqsScore: "field_10",
  
  // Campos de Resultado (11-38)
  roiEstimado: "field_11",
  procesosIdentificados: "field_12",
  tiempoAhorrado: "field_13",
  scoreConfianza: "field_14",
  modeloUtilizado: "field_15",
  fechaProcesamiento: "field_16",
  emailEnviado: "field_17",
  pdfUrl: "field_18",
  // ... campos 19-38 para datos adicionales
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
 * Calcula Data Quality Score (DQS) - Rango 0-100
 * Threshold: ≥70 para procesar diagnóstico automático
 * <70: Requiere call 15min validación
 * 
 * Dimensiones:
 * - Accuracy (30%): Datos básicos + sistemas
 * - Completeness (25%): Porcentaje de campos llenos
 * - Consistency (20%): Validación lógica
 * - Timeliness (15%): Datos actuales
 * - Context (10%): Información contextual
 */
export function calculateDQS(data: Record<string, any>): number {
  // Dimensión 1: Accuracy (30%) - Datos básicos + sistemas
  const hasBasicData = !!(data.empresa && data.rol && data.horas);
  const hasSystemsData = Array.isArray(data.systems) && data.systems.length > 0;
  const accuracy = (hasBasicData && hasSystemsData) ? 1 : (hasBasicData ? 0.7 : 0.3);

  // Dimensión 2: Completeness (25%) - % campos llenos
  const totalFields = Object.keys(data).length || 1;
  const filledFields = Object.values(data).filter(v => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'string') return v.trim() !== '';
    return v !== null && v !== undefined && v !== false;
  }).length;
  const completeness = Math.min(filledFields / totalFields, 1);

  // Dimensión 3: Consistency (20%) - Validación lógica
  const horasValid = typeof data.horas === 'number' && data.horas >= 1 && data.horas <= 40;
  const presupuestoValid = data.presupuesto && data.presupuesto !== '';
  const consistency = (horasValid && presupuestoValid) ? 1 : 0.7;

  // Dimensión 4: Timeliness (15%) - Datos actuales
  const timeliness = data.isCurrentData ? 1 : 0.3;

  // Dimensión 5: Context (10%) - Información contextual
  const hasConstraints = typeof data.constraints === 'string' && data.constraints.length > 20;
  const hasIntegrations = data.integrations && data.integrations !== '';
  const context = (hasConstraints && hasIntegrations) ? 1 : (hasIntegrations ? 0.7 : 0.4);

  // Fórmula ponderada DQS
  const weights = DQS_CONFIG.weights;
  const dqs = 
    (accuracy * weights.accuracy) + 
    (completeness * weights.completeness) + 
    (consistency * weights.consistency) + 
    (timeliness * weights.timeliness) + 
    (context * weights.context);

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
