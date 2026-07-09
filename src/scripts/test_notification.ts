import { sendNotification } from '../lib/services/notificationClient';

async function probarIntegracion() {
  console.log("Enviando aviso de prueba al Proyecto 6...");

  const resultado = await sendNotification({
    channel: "email",
    recipient: {
      email: "hola@alumnos.ucn.cl", // pone tu correo para hacer la prueba de email
    },
    subject: "Prueba de Integración - Proyecto 3",
    body: {
      email: "<h1>¡Funciona! 🚀</h1><p>Esta es una prueba directa desde el código del Proyecto 3 para verificar que el servicio del Proyecto 6 está recibiendo nuestros datos correctamente.</p>",
    }
  });

  if (resultado.success) {
    console.log("¡Enviado con éxito! Revisa tu bandeja de entrada (y la carpeta de SPAM por si acaso).");
  } else {
    console.log("Hubo un error al enviar:", resultado.error);
  }
}

probarIntegracion();