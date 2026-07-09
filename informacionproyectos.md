Proyecto 1: Plataforma de gestión de atención primaria de salud domiciliaria

Este proyecto consiste en construir una plataforma que permita coordinar y gestionar la atención de pacientes en sus domicilios, orientada a clínicas privadas, empresas de hospitalización domiciliaria o aseguradoras. El sistema debe permitir registrar pacientes, programar visitas, asignar profesionales (médicos, enfermeros, kinesiólogos), registrar atenciones y hacer seguimiento longitudinal. El alcance incluye una interfaz web para coordinadores, una app o interfaz simplificada para profesionales en terreno y un backend con lógica de negocio. Se esperan entregas incrementales: primero agenda básica, luego fichas clínicas, luego integración con notificaciones y analítica.

En términos de gestión, el equipo deberá trabajar con múltiples stakeholders simulados (operaciones, profesionales de salud, administración), manejar cambios de requerimientos (por ejemplo, nuevas prestaciones), y priorizar funcionalidades críticas. Roles diferenciados incluyen Product Owner con foco clínico, Scrum Master, equipo de desarrollo y un responsable de integración.

Las dependencias son clave: requiere autenticación del sistema de identidad (Proyecto 12), envía recordatorios vía notificaciones (Proyecto 6), y exporta datos anonimizados hacia analítica (Proyecto 9). Además, puede consumir datos de sensores (Proyecto 8) como signos vitales simulados. Comparte datos como agenda de visitas, estados de atención, historial de pacientes (anonimizado). La comunicación se realiza mediante APIs REST para consultas y eventos para actualizaciones de estado (ej: “visita realizada”). Riesgos incluyen complejidad en el modelo de datos clínico y coordinación con múltiples servicios.

Alcance técnico y entregables
- Módulos de plataforma: se necesitan APIs REST que expongan agendas, fichas clínicas y reportes de seguimiento; un scheduler para coordinar visitas y alertas de desvío; una interfaz web para coordinadores con filtros por paciente, profesional y zona; y una app (o versión PWA) para personal en terreno con check-in/out, registro rápido de mediciones y capacidad offline.
- Experiencia profesional: los profesionales verán itinerarios, formularios guiados, plantillas de atenciones y checklists de protocolos. El backend valida criterios de continuidad (seguimientos pendientes, pacientes frágiles, necesidad de segunda visita) antes de permitir cierres de atención.
- Automatizaciones: incluir reglas de prioridad (ej. pacientes con altas tasas de reingreso, pacientes nuevos) que ajusten la asignación de equipos, junto con alarmas cuando una visita queda sin registro en el plazo esperado.
- Integraciones y datos: las fichas deben registrar señales esenciales (medidas, observaciones, plan de cuidado) y permitir adjuntar fotos u otros documentos. Se comparte el estado de cada visita con notificaciones, se exporta semanalmente a analítica y se consulta el perfil de identidad en cada sesión con Proyecto 12.
- Seguridad: roles diferenciados (coordinador, profesional, supervisor) con controles de acceso y auditoría de cambios; cumplimiento básico de normativas de salud mediante trazabilidad de datos sensibles y encriptación en tránsito.

Iteraciones sugeridas
1. Agenda y gestión de equipos: agenda básica, creación de pacientes, asignación manual de profesionales y notificaciones de primera visita.
2. Fichas clínicas y seguimiento longitudinal: registro estructurado de atenciones, controles periódicos, integración con sensores y síntesis de plan de cuidado.
3. Inteligencia y analítica operativa: dashboards para supervisores, alertas de riesgo, exportación anonimizada, y tendencias de carga de trabajo.

Definición de éxito
- Coordinadores reducen en un 30 % el tiempo de planificación semanal mediante filtros y replanificación asistida.
- Profesionales completan atenciones en campo con menos de 5 minutos de post-registro gracias a formularios guiados.
- Integración continua con notificaciones y analítica se valida en pruebas de extremo a extremo antes de poner en producción.

Requisitos de testing
- Pruebas end-to-end con datos reales simulados (agenda, fichas, notificaciones) para asegurar continuidad del flujo desde la programación hasta el cierre.
- Tests de integración con Proyecto 6, 8, 9 y 12 que validen autenticación, notificaciones y exportación de datos; usar mocks para escenarios de error (notificaciones fallidas, sensor fuera de rango).
- Pruebas de usabilidad y performance en la app en terreno: validar que el registro offline, sincronización y validación de formularios no genere pérdida de datos ni duplicados.


Proyecto 2 (este no está asignado a ningún grupo, por lo tanto, no existe): Sistema de logística y despacho de última milla

Este proyecto desarrolla un sistema que permita planificar, asignar y monitorear entregas de productos en una ciudad, optimizando rutas en función de restricciones reales (horarios, capacidad, zonas). El sistema debe incluir gestión de flotas, asignación de pedidos a repartidores y visualización de rutas. Entregas incrementales: asignación manual de rutas, luego optimización básica, luego tracking en tiempo real.

Desde la gestión, el equipo deberá coordinar con el sistema de pedidos (Proyecto 3), manejar cambios en la demanda (simulados), y responder a incidentes (Proyecto 11). Roles incluyen un PO orientado a operaciones logísticas, desarrolladores backend/frontend y responsable de integración.

Depende fuertemente de pedidos (Proyecto 3) para recibir órdenes, de IoT (Proyecto 8) para tracking de vehículos y de notificaciones (Proyecto 6) para informar estados. Comparte datos como órdenes asignadas, rutas, ubicación de vehículos y estados de entrega. La comunicación será híbrida: APIs para consulta de rutas y eventos para tracking en tiempo real. Riesgos: complejidad en optimización, dependencia de datos externos y sincronización en tiempo real.

Alcance técnico y requisitos
- Gestión de flota: servicio que registra vehículos, perfiles de repartidores, capacidades (volumen/peso), zonas geográficas habilitadas y disponibilidad en ventanas.
- Planificador de rutas: algoritmos que respeten horarios de entrega, franjas de clientes y capacidad de vehículos. Debe permitir replanificación en caliente cuando surgen incidentes o nuevas órdenes urgentes.
- Panel de despacho: vista para coordinadores con estado de cada ruta, pasos visitados, alertas (retrasos, reasignaciones) y métricas de cumplimiento.
- Seguimiento en campo: integración con Proyecto 8 para recibir telemetría de vehículos (GPS, batería), y con la app de notificaciones (Proyecto 6) para enviar avisos a clientes y coordinadores con checkpoints de entrega.

Iteraciones planeadas
1. Asignación manual y validación: creación de órdenes, asignación manual de rutas, validar geocercas y ventanas horarias.
2. Optimización automática y simulación: algoritmo heurístico que sugiere rutas, permite comparar escenarios y calcular costos de combustible hasta la siguiente hora.
3. Tracking en tiempo real: visualización de flota en mapa, alertas proactivas y dashboard con KPIs de puntualidad.

Integraciones y calidad de datos
- APIs con Proyecto 3 para recibir pedidos confirmados (estado “listo para despachar”), y con Proyecto 5 para verificar stock en bodegas antes de asignar.
- Eventos para cambios de estado (“pedido asignado”, “en tránsito”, “entregado”), con trazabilidad que permita auditoría.
- Requerimientos de accesibilidad: las interfaces deben funcionar en dispositivos móviles de bajo consumo, con modos offline para momentos sin cobertura.

Definición de éxito
- Reducción de 15 % en kilómetros recorridos por ruta comparado con asignación manual.
- Visualización unificada del 100 % de los pedidos activos con estado actualizado cada 30 segundos.
- Coordinadores y repartidores reciben notificaciones y KPI diarios sin intervención manual.

Requisitos de testing
- Tests unitarios y de integración del planificador de rutas con escenarios de restricciones (ventanas, capacidad, nuevos pedidos urgentes).
- Pruebas de simulación de carga para el tracking en tiempo real (actualizaciones cada 30 s) y pruebas de latencia conectando Proyecto 8 y 6.
- Pruebas de regresión de la interfaz de despacho con usuarios multitarea; incluir pruebas manuales sobre dispositivos móviles con baja conectividad.

Proyecto 3 (el nuestro): Plataforma de gestión de pedidos omnicanal

Este sistema centraliza la recepción y gestión de pedidos desde distintos canales (web, app, call center). Debe permitir crear pedidos, gestionarlos, integrarlos con pagos, inventario y despacho. Entregas: MVP con creación de pedidos, luego integración con pagos, luego flujo completo con despacho.

El equipo deberá gestionar múltiples integraciones, priorizar funcionalidades core y manejar inconsistencias (por ejemplo, stock insuficiente). Roles incluyen PO con visión comercial, desarrolladores y líder técnico.

Depende de pagos (Proyecto 4), inventario (Proyecto 5) y logística (Proyecto 2). Comparte datos como órdenes, estados, clientes y montos. Usa APIs REST para operaciones sincrónicas y eventos para cambios de estado (“pedido pagado”, “pedido despachado”). Riesgos: acoplamiento excesivo y manejo de estados distribuidos.

Alcance y funcionalidades clave
- Gestión omnicanal: ingesta de pedidos desde web, app y call center con normalización de datos (cliente, productos, dirección, canal de venta, descuentos). Cada canal tiene validaciones particulares.
- Orquestación de flujos: el sistema gestiona estados (“creado”, “verificado”, “pagado”, “listo para despacho”, “entregado”) y coordina llamadas a servicios externos (pagos, inventario, logística).
- Panel operativo: permite visualizar paneles de pedidos con filtros por canal, prioridad, y detectar inconsistencias (por ejemplo, stock insuficiente o pagos rechazados).
- Herramientas de soporte: permite reintentos de pagos, reasignar stock, emitir notas de crédito parcial y escalonar tickets a CRM (Proyecto 7).

Milestones sugeridos
1. MVP de recepción: aceptar pedidos multicanal, validarlos, persistirlos y mostrar una vista de estado general.
2. Integración con pagos e inventario: reservas de stock, ejecución de cobros, y manejo de rollback ante fallas.
3. Orquestación completa: conexión con logística (Proyecto 2), notificaciones (Proyecto 6) y reportes de desempeño diario.

Requerimientos de datos e integraciones
- API REST para consultar disponibilidad de stock y actualizar niveles en inventario (Proyecto 5).
- Webhooks o eventos para notificar al sistema de pagos (Proyecto 4) cuando un cobro es aprobado o rechazado.
- Eventos emitidos hacia CRM, analítica y gestión de incidentes cuando hay problemas de cumplimiento.

Definición de éxito
- Capacidad de procesar pedidos desde tres canales con la misma lógica de validación.
- 0 errores críticos en la transición de estados en pruebas de integración.
- Documentación de APIs disponible para los equipos de integración que consumen el sistema.

Requisitos de testing
- Pruebas de contratos (consumer-driven) con los servicios de pagos (4), inventario (5) y logística (2) para validar estados de pedido por canal.
- Tests de integración que aseguren consistencia en la evolución de estados y los reintentos automáticos (pagos rechazados, stock insuficiente).
- Pruebas de carga centradas en la recepción multicanal y en la orquestación de flujos para evitar bloqueos en picos de pedidos.

Proyecto 4: Pasarela de pagos y conciliación financiera

Este proyecto simula una pasarela de pagos que procese transacciones y permita conciliación financiera. Debe manejar pagos, rechazos, reintentos y cierres diarios. Entregas: procesamiento básico, luego conciliación, luego reportes.

El equipo trabajará con requerimientos de alta criticidad (consistencia, auditoría), priorizando confiabilidad. Roles incluyen PO financiero, desarrolladores y responsable de seguridad.

Depende indirectamente de pedidos (Proyecto 3) y suscripciones (Proyecto 10). Comparte transacciones, estados de pago y reportes con analítica (Proyecto 9). Usa APIs seguras y eventos para auditoría. Riesgos: consistencia de datos y manejo de errores.

Alcance y detalle operativo
- Procesamiento de pagos: pasarela expone endpoints para iniciar transacciones de pago, consultar su estado y cancelar pagos en casos autorizados. Debe soportar múltiples medios (tarjetas, transferencias, billeteras) y configuraciones de retry.
- Conciliación: módulo que recibe archivos diarios de entidades financieras, los cruza con transacciones internas y marca diferencias para revisión manual. Debe generar reportes y alertas cuando faltan registros o hay rechazados inusuales.
- Seguridad y auditoría: registros inmutables de cada intento, campos hash y seguimiento de quién aprobó conciliaciones. Implementar alertas cuando hay inconsistencias o reintentos sospechosos.
- Dashboards y monitoreo: KPIs de volumen, tasas de rechazo, nivel de disponibilidad y tolerancia de errores definido por SLA (ej. 99.5 % uptime).

Entregables por fase
1. Pasarela base: API de cobros y pagos, validaciones de datos, registros de auditoría y tests de integración con simuladores bancarios.
2. Conciliación automatizada: ingestión de archivos, reglas de matching, alertas y dashboards para el equipo financiero.
3. Reportería y analítica: métricas en vivo, exportación a Proyecto 9 y capacidad de emitir reportes diarios de cierre.

Definición de éxito
- Transacciones procesadas con <0.5 % de errores cuando los sistemas consumidores proporcionan datos válidos.
- Conciliación diaria completada en menos de 30 minutos con alertas activas en caso de diferencias.
- Sistemas dependientes (pedidos, suscripciones) confirman que reciben estados de pago en <10 segundos desde el cambio de estado inicial.

Requisitos de testing
- Pruebas de transacciones (unitarias y de integración) que cubran retiros, cancelaciones y rollbacks, incluyendo cargas de seguimiento de auditoría.
- Testing de conciliación: simulación de archivos bancarios y validación de reglas de matching, alertas y reportes.
- Pruebas de seguridad/fuzzing para endpoints de pagos y controles de SLA (latencia, tasa de errores); incluir pruebas de resiliencia bajo fallas de proveedores externos.

Proyecto 5: Sistema de gestión de inventario distribuido

Sistema para controlar stock en múltiples ubicaciones, con movimientos y alertas. Entregas: control básico, luego multi-bodega, luego reposición automática.

El equipo deberá coordinar con pedidos y logística, manejar conflictos de stock y priorizar consistencia vs. performance.

Depende de pedidos (Proyecto 3) y logística (Proyecto 2). Comparte niveles de stock, movimientos y alertas. Usa eventos para cambios de stock y APIs para consultas. Riesgos: concurrencia y sincronización.

Alcance funcional
- Catálogo de ubicaciones: registrar bodegas, centros de distribución y puntos de atención con capacidades, horarios y restricciones de transporte. Asociar inventario disponible y reservas por ubicación.
- Movimientos y transacciones: registrar entradas/salidas, transferencias entre ubicaciones y devoluciones; incluir validaciones para impedir negativos y crear alertas de stock críticos.
- Reposiciones y alertas: reglas de umbral por SKU, con disparadores automáticos para pedidos a proveedores y notificaciones al equipo de compras.
- APIs para consumidores: endpoints para consultar stock en tiempo real, reservar artículos para pedidos (Proyecto 3) y confirmar liberaciones para logística (Proyecto 2).

Fases planteadas
1. Control básico: registros de stock por ubicación con movimientos manuales y reportes simples de niveles.
2. Multi-bodega: sincronización entre almacenes, reglas de prioridad de ubicación, y soporte para picking por lotes.
3. Reposición inteligente: integración con alertas, propuestas de órdenes de compra y simulaciones de demanda.

Datos e integraciones
- Eventos para cada cambio de stock ("stock reservado", "stock liberado", "stock agotado") hacia logística y CRM.
- Reconciliaciones periódicas con bienes físicos (auditoría) y exportación de datos a analítica (Proyecto 9) para detectar fugas.

Indicadores de éxito
- Balance de inventario con menos del 2 % de diferencia frente a auditoría física.
- Reservas automáticas completadas en menos de 5 segundos antes de confirmar pedidos.
- Alertas proactivas que evitan quiebres en el 95 % de los casos críticos detectados.

Requisitos de testing
- Pruebas unitarias de movimientos y transferencias, con validaciones de negativos y alertas de stock crítico.
- Tests de integración con Pedidos (3) y Logística (2) para verificar reservas y liberaciones en tiempo real.
- Pruebas de consistencia mediante reconciliaciones simuladas y validaciones de eventos con el sistema de analítica (Proyecto 9).

Proyecto 6: Plataforma de notificaciones multicanal

Servicio transversal que permite enviar notificaciones. Entregas: envío básico, luego múltiples canales, luego tracking.

El equipo gestionará múltiples clientes internos, priorizando disponibilidad.

Es consumido por casi todos los proyectos. Comparte mensajes, estados y métricas. Usa APIs para envío y eventos para confirmación. Riesgos: sobrecarga y dependencia crítica.

Alcance y arquitectura propuesta
- Motor de notificaciones: servicio central que acepta solicitudes de envío con plantilla, canal deseado (email, SMS, push) y prioridad; reintenta automáticamente cuando hay fallas temporales.
- Canalización y tracking: cada envío genera eventos de estado (“enviado”, “entregado”, “rechazado”), se almacena el historial de entregas y se exponen métricas de latencia y tasa de éxito.
- Personalización y plantillas: soporte para variables dinámicas, previsualización y validaciones de contenido; se incluye fallback a canal alternativo cuando el principal falla.
- Gateways y proveedores: adaptadores para distintos proveedores (ej. Amazon SES, Twilio) con configuraciones y llaves inyectadas, rotación de llaves y monitoreo de costos.

Roadmap
1. Envío básico: API REST para disparar notificaciones y consola para visualizar estado.
2. Multicanal: soporte de correo, SMS y push, con prioridad por canal y dashboard de entregas.
3. Tracking y analítica: exportación de métricas, integración con analítica (Proyecto 9) y notificaciones internas a incidentes.

Requerimientos de confiabilidad
- SLA mínimo de 99.9 % de disponibilidad para servicios críticos.
- Backpressure: el sistema debe aceptar colas y aplicar rate limiting para evitar sobrecarga cuando varios proyectos envían simultáneamente.
- Seguridad: logs encriptados, rotación de credenciales y cumplimiento de normativas de privacidad (no almacenar datos sensibles).

Indicadores de éxito
- El 100 % de los proyectos registran confirmaciones de entrega dentro de 1 minuto del envío.
- No más de 3 reintentos por notificación antes de escalar a incidentes.
- Dashboard con métricas visibles para el equipo de operaciones y seguimiento de costos por proveedor.

Requisitos de testing
- Pruebas de integración con todos los proyectos emisores (1-11) para asegurar entrega y seguimiento de estados (“enviado”, “entregado”, “rechazado”).
- Tests de fallbacks y reintentos cruzando canales y proveedores para comprobar resiliencia; incluir tráfico simulado de alto volumen para validar rate limiting y backpressure.
- Pruebas de métricas y reporting: comparar datos en dashboards vs. logs para garantizar precisión y detección de errores.

Proyecto 7: CRM de clientes y soporte

Sistema para gestionar clientes, tickets y soporte. Entregas: gestión de clientes, luego tickets, luego integración completa.

El equipo trabajará con múltiples fuentes de datos y requerimientos cambiantes.

Depende de pedidos, salud y suscripciones. Comparte perfiles, tickets e historial. APIs para consultas y eventos para nuevos casos. Riesgos: calidad de datos.

Alcance y definición funcional
- Gestión de clientes: perfil único que reúne datos básicos, contactos y vínculos con contratos, pedidos, suscripciones y estado de salud. Permite reconocer duplicados y actualizar datos maestros.
- Tiquetería y soporte: sistema para registrar incidentes con categorización (prioridad, tipo de servicio), asignar responsables y hacer seguimiento (SLA). Incluye integración con analítica y notificaciones para avisos de escalamiento.
- Canales y trazabilidad: captura interacciones desde chat, email, teléfono o app, con histórico completo en cada ticket. Permite enlazar eventos a proyectos dependientes (por ejemplo, asociar un ticket a un pedido específico).
- Capacitaciones y base de conocimiento: integra artículos y procedimientos que los agentes pueden consultar o sugerir automáticamente según el tipo de incidencia.

Esquema de entregas
1. Registro de clientes: perfiles unificados y vista de historial de incidentes.
2. Tickets y escalamiento: creación, asignación automática, alertas y panel de seguimiento.
3. Integraciones: conectores con pedidos, suscripciones y salud para enriquecer contextos, plus reporte de métricas y tendencias.

Requisitos de calidad
- API REST con filtros por cliente, estado, prioridad y canal.
- Eventos salientes hacia analítica (Proyecto 9) y notificaciones (Proyecto 6) para incidentes críticos.
- Estrategia de validación de datos maestros para evitar inconsistencias (DOBs, duplicados, etc.).

Definición de éxito
- Tickets críticos resueltos en menos de 8 horas durante el piloto.
- Equipos de soporte utilizan la base de conocimiento en al menos el 60 % de los casos.
- Integraciones con otros proyectos actualizadas sin intervención manual y con trazabilidad completa.

Requisitos de testing
- Pruebas de integración con pedidos (3), salud (1), suscripciones (10) y pagos (4) para mantener consistencia en datos maestros y tickets asociados.
- Tests de SLA del sistema de tickets, incluyendo escalamiento automático y alertas hacia incidentes (11) y notificaciones (6).
- Validaciones manuales y automáticas del buscador y filtros por cliente/estado/canal para asegurar la calidad de los perfiles.

Proyecto 8: Plataforma IoT para monitoreo de activos

Simula sensores y transmite datos en tiempo real. Entregas: simulación básica, luego streaming, luego integración.

El equipo deberá manejar datos en tiempo real y escalabilidad.

Depende de logística y salud. Comparte telemetría vía streaming y eventos. Riesgos: volumen de datos.

Alcance y componentes principales
- Simulación y adquisición: capa que simula sensores y también puede conectarse a dispositivos reales; capta mediciones (GPS, temperatura, humedad, aceleración) y las encola para procesamiento.
- Ingestión en tiempo real: pipeline que recibe datos, los valida y los enruta. Implementa mecanismos de throttling para evitar saturar downstream (Analítica, logística) y soporta batching para cargas masivas.
- Observabilidad y alertas: telemetría viene con metadatos (tipo de sensor, ubicación, nivel de batería) y alimenta dashboards con KPIs como latencia de datos, calidad de señal e incidencias (pérdida de conexión, desviaciones).
- APIs y eventos: exposiciones para consultar el estado de un activo, recibir streams de eventos filtrados y emitir notificaciones a incidentes o logística cuando se detecta un umbral crítico.

Fases
1. Simulación básica y visualización: generar series de datos, almacenarlos y mostrar tendencias en paneles.
2. Streaming y soporte de eventos: integrar con Kafka/EventBridge para sumar datos en tiempo real y conectar con logística y salud.
3. Integración operativa: alertas conectadas a incidentes (Proyecto 11), dashboards de analítica (Proyecto 9) y triggers hacia notificaciones (Proyecto 6).

Requisitos técnicos
- Soporte para al menos 1.000 sensores simultáneos con la capacidad de escalar en la nube.
- Tolerancia a fallas en la captación de datos y reintentos con backpressure.
- Políticas de retención y agregación para evitar almacenamiento innecesario mientras se conserva información útil.

Éxito
- Equipos de logística y salud obtienen vistas en <5 segundos de los últimos eventos de los activos clave.
- Menos de 1 % de paquetes rechazados por formato inválido gracias a validaciones tempranas.
- Alertas automatizadas disparan tickets en incidentes operacionales relacionados con activos críticos.

Requisitos de testing
- Pruebas de validación de ingestión: asegurar que cada paquete de telemetría cumple esquema, no se pierden eventos y se aplican throttling/backpressure.
- Tests de escalabilidad para al menos 1.000 sensores simultáneos, incluyendo simulaciones de ráfagas y degradación controlada.
- Pruebas de integración con logística (2), salud (1), analítica (9), notificaciones (6) e incidentes (11) para evaluar alertas y dashboards.

Proyecto 9: Plataforma de analítica y BI operacional

Centraliza datos para generar KPIs y dashboards. Entregas: ingestión, luego dashboards, luego análisis.

El equipo coordina con todos los sistemas, gestionando calidad de datos.

Consume datos de todos los proyectos. Comparte indicadores. Riesgos: integración y consistencia.

Alcance y capacidades
- Ingestión y modelado: canaliza datos desde APIs, eventos y dumps batch de cada proyecto, los normaliza y los acomoda en una plataforma dimensional flexible para consultas ad-hoc.
- Dashboards operacionales: paneles para operaciones, finanzas y liderazgo que muestran KPIs claves (rendimiento, tiempos de atención, cumplimiento de rutas, incidencias).
- Self-service y alertas: consola para analistas con queries predefinidas, sistemas de suscripción a alertas (ej: volumen de incidentes en un área, pagos rechazados).
- Gobernanza de datos: catálogos de métricas con definiciones, registros de calidad y trazabilidad a los eventos originales para auditoría.

Roadmap
1. Data lake y pipelines: ingestión batch inicial, limpieza básica, y storage para procesamiento posterior.
2. Dashboards para operaciones: paneles preconfigurados (salud, logística, pagos) y reportes ejecutivos.
3. Analítica avanzada: modelos de correlación entre proyectos, forecasting y alertas automatizadas.

Requerimientos
- Integraciones con cada proyecto: Proyecto 1 a 12 enviando datasets cruciales con metadatos (canal, horizonte temporal, responsables).
- Herramientas de visualización y BI conectadas (Power BI, Superset) con control de acceso y versionado.
- Procesos de validación para asegurar que eventos reflejan el estado real (ej. conciliación entre datos de logística y pagos).

Definición de éxito
- Equipos reciben informes automáticos diarios con insights accionables.
- Alertas detectan y escalan anomalías (ej: caída de entregas o pagos) con menos de 15 minutos de retraso.
- Catálogo de métricas con versiones aprobadas accesible para todos los stakeholders.

Requisitos de testing
- Pruebas unitarias y de integración de pipelines (ingestión, limpieza, modelado) con datasets representativos para detectar degradación de calidad.
- Tests de validación cruzada entre proyectos (ej. conciliación entre logística y pagos) para asegurar consistencia y detectar eventos faltantes.
- Pruebas de dashboards y alertas configuradas (Power BI/Superset) con scripts automatizados que comparen valores esperados y tiempos de actualización.

Proyecto 10: Sistema de gestión de suscripciones y contratos

Gestiona planes y ciclos de cobro. Entregas: contratos, luego ciclos, luego integración.

Depende de pagos, CRM y notificaciones. Comparte contratos y estados. Riesgos: lógica de negocio compleja.

Alcance funcional
- Contratos y planes: sistema que define productos, ciclos de facturación, descuentos por volumen y condiciones de renovación. Permite crear contratos, planificar cobros y manejar cambios a mitad del ciclo.
- Ciclos de cobro: automatiza calendarios de facturación, envío de recordatorios (vía Proyecto 6), y gestión de reintentos ante fallas con parámetros configurables.
- Portal de clientes: ofrece vista de estado del contrato, próximas facturaciones, historial de pagos y posibilidad de modificar datos.
- Gobernanza y cumplimiento: registra aprobaciones, auditoría y soporte para políticas de cancelación y cumplimiento normativo.

Milestones
1. Registro de contratos: definiciones de planes, asociación a clientes y vistas de estado.
2. Ciclos automáticos: cálculo de fechas, disparo de eventos hacia pagos (Proyecto 4) y envíos de notificaciones.
3. Integración total: portal de clientes, analítica de renewals, y enlace a CRM/Incident response.

Integraciones
- Envía eventos a pagos sobre montos y fechas clave; recibe confirmaciones de cobros para actualizar estados.
- Se enlaza con CRM para mostrar contexto de soporte y prioridades.
- Interactúa con notificaciones para avisos proactivos de renovación o cambios en card info.

Definición de éxito
- Ciclos de cobro con menos del 2 % de fallos por errores de timing.
- Clientes pueden ver y modificar su contrato sin tocar soporte en al menos el 60 % de los casos.
- Los indicadores de renovación apuntan a un porcentaje objetivo (ej: 80 % al año).

Requisitos de testing
- Pruebas end-to-end de ciclos de cobro que cubran diferencias de tiempo, reintentos y notificaciones para renovaciones.
- Tests de integración con pagos (4), CRM (7) y notificaciones (6) para verificar eventos, correos y actualizaciones de estado.
- Pruebas de portal de clientes (UI) y datos mostrando contratos y facturaciones; incluir pruebas automatizadas de regresión del portal.

Proyecto 11: Plataforma de gestión de incidentes operacionales

Gestiona incidentes en la operación. Entregas: registro, luego priorización, luego integración.

Depende de todos los sistemas. Comparte incidentes y estados. Riesgos: coordinación.

Alcance y funcionalidades
- Registro de incidentes: formulario estandarizado para describir la categoría, gravedad, origen del sistema afectado y responsables. Permite adjuntar evidencias y vínculos a eventos de otros proyectos.
- Priorización y rutas de escalamiento: reglas que asignan niveles SLA según criticidad, y notifica automáticamente a los responsables adecuados.
- Panel operativo: tablero con incidentes activos, tendencias de tiempos de resolución y capacidad de seguimiento en tiempo real.
- Interfaz de post mortem y aprendizaje: para cada incidente cerrado se genera resumen, causas raíz y acciones preventivas.

Fases propuestas
1. Registro y seguimiento: sistema básico de tickets con SLA, notificaciones a responsables y capacidad de search.
2. Integración y automatización: ingestión de alertas desde monitoreo, enlaces a notificaciones y CRM para comunicar a clientes afectados.
3. Mejora continua: dashboards de tendencias, reporting para analítica (Proyecto 9) y playbooks automatizados.

Requerimientos de integridad
- Eventos entrantes desde todos los proyectos (sobrecargas, fallos de pago) con metadata de timeseries.
- Capacidad de establecer runbooks que guíen a los equipos (logística, salud) para acciones correctivas.
- Sistema de alertas a escalas múltiples (email, móvil, escritorio) para garantizar respuesta rápida.

Definición de éxito
- Tiempo medio de respuesta cae por debajo del SLA establecido en 80 % de incidentes.
- Los playbooks reducen pasos manuales repetitivos en 50 %.
- Analítica detecta patrones recurrentes y los emplea para prevenir incidentes críticos.

Requisitos de testing
- Pruebas de flujo de incidentes, desde creación por alertas externas (IoT, pagos, logística) hasta cierre con playbooks automatizados.
- Tests de integración con notificaciones (6) y analítica (9) para validar escalamiento y reportes analíticos.
- Simulaciones de carga para garantizar que la plataforma responde dentro del SLA a múltiples incidentes simultáneos.

Proyecto 12: Sistema de identidad, autenticación y control de acceso

Sistema central de usuarios y roles. Entregas: autenticación, luego autorización, luego SSO.

Es crítico para todos los proyectos. Comparte identidad y tokens. Riesgos: seguridad y disponibilidad.

Alcance y componentes
- Autenticación y autorización: servicio de autenticación con soporte para passwordless, OAuth2 y multi-factor, y autorización basada en roles y atributos que definen permisos por proyecto.
- Gestión de ciclos de vida: incluye creación de cuentas, updates de perfiles, revocación de accesos y auditorías de sesiones activas.
- Single Sign-On y federación: permite a los usuarios moverse entre proyectos (salud, pagos, logística) sin volver a autenticarse, respetando scopes de acceso.
- Protección y monitoreo: detección de patrones anómalos (brute force, accesos desde ubicaciones extrañas), bloqueo temporal y alertas en panel de seguridad.

Fases
1. Autenticación centralizada: endpoints para login y refresh, almacenamiento seguro de credenciales y logs básicos.
2. Autorización escalonada: roles definidos, policies por proyecto y capacidad de consulta para autorizar acciones.
3. MFA/SSO y federación: integraciones con proveedores externos, SSO cross-service y auditoría forense de accesos.

Requisitos de resiliencia
- Distribución geográfica para garantizar disponibilidad global (99.95 % uptime) y latencias bajas.
- Rotación de llaves, cifrado, y almacenamiento seguro de secretos siguiendo normas de la industria.
- APIs con límites de rate y protección contra abuso.

Indicadores de éxito
- Los proyectos consumidores verifican tokens en menos de 50 ms en promedio.
- Los reportes de seguridad muestran cero incidentes graves durante enero-marzo 2026.
- Las revisiones de roles y permisos se automatizan cada trimestre sin fallas.

Requisitos de testing
- Pruebas de seguridad: fuzzing, análisis de vulnerabilidades y tests de MFA para detectar brechas de autenticación/autorización.
- Tests de integración SSO/MFA con las aplicaciones consumidoras y simulaciones de tokens expirados/revocados.
- Pruebas de resiliencia (rate limiting, failover) y monitoreo para garantizar la disponibilidad 99.95 % y detectar accesos anómalos.



Conexiones entre proyectos: 


1. Descripción escrita
----------------------
- **Proyecto 1 – Salud domiciliaria**
  - Dependencias: identidades y accesos (Proyecto 12) para autenticar coordinadores y profesionales; notificaciones (Proyecto 6) para recordatorios y confirmaciones; IoT (Proyecto 8) para mediciones remotas; analítica (Proyecto 9) para reportes longitudinales.
  - Consumidores: CRM (Proyecto 7) cuando un paciente requiere soporte.
- **Proyecto 2 – Logística última milla**
  - Dependencias: pedidos omnicanal (Proyecto 3) e inventario distribuido (Proyecto 5) para planificar rutas; IoT (Proyecto 8) para tracking de vehículos; notificaciones (Proyecto 6) para avisos a clientes.
  - Consumidores: incidentes operacionales (Proyecto 11) y analítica (Proyecto 9) para indicadores y reportes.
- **Proyecto 3 – Pedidos omnicanal**
  - Dependencias: pagos (Proyecto 4) para cobros; inventario (Proyecto 5) para disponibilidad; logística (Proyecto 2) para despacho.
  - Consumidores: CRM (Proyecto 7) y analítica (Proyecto 9) para seguimiento de flujos.
- **Proyecto 4 – Pasarela de pagos y conciliación**
  - Dependencias: pedidos y suscripciones (Proyecto 3 y 10) para procesar montos; identidad (Proyecto 12) para autorizar accesos de operadores.
  - Consumidores: analítica (Proyecto 9) y gestión de incidentes (Proyecto 11) ante fallas.
- **Proyecto 5 – Inventario distribuido**
  - Dependencias: pedidos (Proyecto 3) y logística (Proyecto 2).
  - Consumidores: incidentes (Proyecto 11) para alertas y analítica (Proyecto 9) para métricas; notificaciones (Proyecto 6) para avisos de reposición.
- **Proyecto 6 – Notificaciones multicanal**
  - Dependencias: solicitudes de los proyectos 1-11.
  - Consumidores: CRM (Proyecto 7), incidentes (Proyecto 11) y analítica (Proyecto 9) para visibilidad de comunicaciones.
- **Proyecto 7 – CRM y soporte**
  - Dependencias: pedidos (Proyecto 3), salud (Proyecto 1), suscripciones (Proyecto 10) y pagos (Proyecto 4).
  - Consumidores: incidentes (Proyecto 11) y analítica (Proyecto 9) mediante tickets y reportes.
- **Proyecto 8 – IoT para activos**
  - Dependencias: foco en telemetría, sin consumos directos de otros proyectos.
  - Consumidores: logística (Proyecto 2), salud (Proyecto 1) y analítica (Proyecto 9); notificaciones (Proyecto 6) e incidentes (Proyecto 11) manejan alertas asociadas.
- **Proyecto 9 – Analítica y BI**
  - Dependencias: datos de todos los proyectos (1-12).
  - Consumidores: retroalimentación de KPIs a salud (1), logística (2), pagos (4) y otros dominios.
- **Proyecto 10 – Suscripciones y contratos**
  - Dependencias: pagos (Proyecto 4) y CRM (Proyecto 7) para contextos comerciales.
  - Consumidores: notificaciones (Proyecto 6) y analítica (Proyecto 9) para renovaciones.
- **Proyecto 11 – Incidentes operacionales**
  - Dependencias: alertas provenientes de IoT, pagos, logística y otros proyectos críticos.
  - Consumidores: notificaciones (Proyecto 6) y analítica (Proyecto 9) para seguimiento y métricas.
- **Proyecto 12 – Identidad y acceso**
  - Dependencias: servicios transversales (no consume directamente otros proyectos).
  - Consumidores: incidentes (Proyecto 11) y analítica (Proyecto 9) con métricas de seguridad.

2. Matriz de relaciones
-----------------------
Cada fila representa un proyecto que consume servicios o datos del proyecto indicado en la columna (marcado con “X”).

| Proyecto →       | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|------------------|---|---|---|---|---|---|---|---|---|----|----|----|
| 01 Salud         |   |   |   |   |   | X |   | X | X |    | X  | X  |
| 02 Logística     |   |   | X |   | X | X |   | X | X |    | X  |    |
| 03 Pedidos       |   |   |   | X | X |   | X |   | X |    | X  |    |
| 04 Pagos         |   |   | X |   |   |   |   |   | X | X  | X  | X  |
| 05 Inventario    |   | X | X |   |   | X |   |   | X |    | X  |    |
| 06 Notifs        | X | X | X | X | X |   | X | X | X | X  | X  |    |
| 07 CRM           | X |   | X | X |   | X |   |   | X | X  | X  |    |
| 08 IoT           | X | X |   |   |   | X |   |   | X |    | X  |    |
| 09 Analítica     | X | X | X | X | X | X | X | X |   | X  | X  | X  |
| 10 Subs/contratos|   |   |   | X |   | X | X |   | X |    | X  |    |
| 11 Incidentes    | X | X | X | X | X | X | X | X | X | X  |    | X  |
| 12 Identidad     | X | X | X | X | X | X | X | X | X | X  | X  |    |

Notas
- La matriz muestra relaciones bidireccionales
- Las filas en blanco indican que el proyecto no depende directamente
