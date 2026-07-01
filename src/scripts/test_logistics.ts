import { createShipment } from '../lib/services/logisticsClient';

async function testLogisticsSimulation() {
  console.log("=== Iniciando prueba de simulación de Logística (Proyecto 2) ===");
  
  const result = await createShipment({
    orderId: "TEST-12345",
    items: [
      { sku: "IPHONE-15", cantidad: 1, descripcion: "iPhone 15 Pro Max" },
      { sku: "FUNDA-IP15", cantidad: 2, descripcion: "Funda Transparente" }
    ],
    direccion: {
      calle: "Av. Providencia",
      numero: "1234",
      ciudad: "Santiago",
      region: "Metropolitana",
      codigoPostal: "7500000",
      pais: "Chile"
    },
    cliente: {
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      telefono: "+56912345678"
    }
  });

  console.log("\n=== Resultado de la simulación ===");
  console.log(JSON.stringify(result, null, 2));
}

testLogisticsSimulation().catch(console.error);
