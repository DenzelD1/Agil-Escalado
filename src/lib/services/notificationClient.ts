export interface NotificationPayload {
  channel: 'email' | 'sms';
  recipient: {
    email?: string;
    telefono?: string;
  };
  subject?: string;
  body: {
    email?: string;
    sms?: string;
  };
}

// URL y la llave que te dieron
const NOTIFICATION_URL = 'https://ucn-agil-notificaciones.up.railway.app/notifications/send';
const API_KEY = '7KpQmXvRnB2sYwZ9eHtJdF5gCuA3LiN8'; 

// Ffunción que envía los datos
export async function sendNotification(payload: NotificationPayload) {
  try {
    const response = await fetch(NOTIFICATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Generalmente las API keys se envían en el header 'x-api-key' o 'Authorization'.
        // Si te da error de autenticación, cámbialo a: 'Authorization': `Bearer ${API_KEY}`
        'x-api-key': API_KEY, 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error del Proyecto 6: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Notificación enviada con éxito:", data);
    return { success: true, data };
    
  } catch (error) {
    console.error("Fallo al contactar al servicio de notificaciones:", error);
    return { success: false, error };
  }
}