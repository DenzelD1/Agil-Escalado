const { execSync } = require('child_process');
const fs = require('fs');

const commands = [
  { name: 'P02 (Logística) - Pruebas Unitarias', cmd: 'npx vitest run tests/services/shipmentClient.test.ts' },
  { name: 'P04 (Pagos)', cmd: 'node test-p4.js' },
  { name: 'P05 (Inventario)', cmd: 'node test-p5.js' },
  { name: 'P06 (Notificaciones)', cmd: 'node test-p6.js' },
  { name: 'P07 (CRM)', cmd: 'node test-p7.js' },
  { name: 'P09 (Analítica)', cmd: 'node test-p9.js' },
  { name: 'P11 (Incidentes)', cmd: 'node test-p11.js' },
  { name: 'P12 (Identidad)', cmd: 'node test-p12.js' },
];

const logFile = 'RESULTADOS_INTEGRACION.log';
const mdFile = 'RESULTADOS_INTEGRACION.md';

let logOutput = `=======================================\nRESULTADOS DE PRUEBAS DE INTEGRACIÓN\nFecha: ${new Date().toISOString()}\n=======================================\n\n`;
let mdOutput = `# Resultados de Pruebas de Integración\n\nFecha de ejecución: ${new Date().toISOString()}\n\n`;

for (const task of commands) {
  console.log(`Ejecutando: ${task.name}...`);
  logOutput += `\n---------------------------------------\n[TEST] ${task.name}\n---------------------------------------\n`;
  mdOutput += `## ${task.name}\n\n\`\`\`text\n`;
  
  try {
    const output = execSync(task.cmd, { encoding: 'utf8', stdio: 'pipe' });
    logOutput += output;
    mdOutput += output;
    console.log(`✅ ${task.name} completado.`);
  } catch (error) {
    logOutput += error.stdout + '\n' + error.stderr;
    mdOutput += error.stdout + '\n' + error.stderr;
    console.log(`❌ ${task.name} finalizó con código de error, pero el output fue capturado.`);
  }
  
  logOutput += `\n`;
  mdOutput += `\n\`\`\`\n\n`;
}

fs.writeFileSync(logFile, logOutput);
fs.writeFileSync(mdFile, mdOutput);

console.log(`\n¡Pruebas finalizadas! Los resultados se han guardado en '${logFile}' y '${mdFile}'.`);
