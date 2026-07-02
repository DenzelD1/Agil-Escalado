import { sendNotification } from '../lib/services/notificationClient';

async function probarIntegracion() {
  console.log("Enviando aviso de prueba al Proyecto 6...");

  const resultado = await sendNotification({
    channel: "sms",
    recipient: {
      telefono: "+569" // poner el número tuyo para hacer la prueba de SMS
    },
    body: {
      sms: "¡Hola! Esta es la prueba directa de SMS desde el Proyecto 3."
    }
  });

  if (resultado.success) {
    console.log("¡Enviado con éxito! Revisa tu bandeja de entrada (y la carpeta de SPAM por si acaso).");
  } else {
    console.log("Hubo un error al enviar:", resultado.error);
  }
}

probarIntegracion();