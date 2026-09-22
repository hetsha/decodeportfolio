/**
 * CRM Webhook Service
 *
 * Sends inquiry notifications to the PHP CRM at erp.upparac.com
 */

interface CrmWebhookPayload {
  event: string;
  model: string;
  entry: Record<string, unknown>;
  timestamp: string;
}

/**
 * Send a webhook to the CRM when a new inquiry is created
 */
export async function sendToCrm(payload: CrmWebhookPayload): Promise<boolean> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  const webhookSecret = process.env.CRM_WEBHOOK_SECRET;

  if (!webhookUrl) {
    console.warn('[CRM] CRM_WEBHOOK_URL not configured, skipping webhook');
    return false;
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Strapi-Event': payload.event,
    };

    if (webhookSecret) {
      headers['Authorization'] = `Bearer ${webhookSecret}`;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[CRM] Webhook failed with status ${response.status}`);
      return false;
    }

    console.log(`[CRM] Webhook sent successfully for inquiry: ${payload.entry.fullName}`);
    return true;
  } catch (error) {
    console.error('[CRM] Webhook error:', error);
    return false;
  }
}
