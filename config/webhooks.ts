/**
 * Configuración de Webhooks y Endpoints
 * NEXTGENFLOW v3.0 FINAL
 */

export const N8N_WEBHOOKS = {
  // Webhook unificado para NextGenFlow
  main: "https://n8n.nextgenpm.es/webhook/nextgenflow",
};

export const EXTERNAL_APIS = {
  stripe: {
    publicKey: process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY || "pk_live_...", // Reemplazar con real
  },
};

export const BANK_INFO = {
  iban: "ES91 2100 0418 4502 0005 1332",
  bank: "CaixaBank",
  owner: "NextGenFlow Team",
};

export async function sendToNextGenWebhook(data: any) {
  try {
    const response = await fetch(N8N_WEBHOOKS.main, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: "nextgenflow-app",
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
