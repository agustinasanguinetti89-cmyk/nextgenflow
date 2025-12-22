# Diagnosis App - Project TODO

## Phase 1: Setup & Branding
- [x] Generate custom app logo (brand identity)
- [x] Update app.config.ts with app name and logo URL
- [x] Copy logo to all required asset locations (icon.png, splash-icon.png, favicon.png, android-icon-foreground.png)
- [x] Customize theme colors in constants/theme.ts (Purple #3a2459, Pink #751f82, Gold #D4AF37)

## Phase 2: Landing Screen (Pantalla 1)
- [x] Create landing screen component with hero section
- [x] Implement header with NextgenPM.IA logo
- [x] Add hero title and subtitle
- [x] Add highlight text with urgency messaging
- [x] Add social proof section (testimonial + badge)
- [x] Implement dual CTA buttons (Mini Gratis + Pro 297€)
- [x] Style buttons with correct colors and sizing (gray for Mini, gold for Pro)
- [x] Add footer with links and copyright
- [x] Test responsive layout on mobile portrait

## Phase 3: Form Screen (Pantalla 2)
- [x] Create form screen component
- [x] Implement Campo 1: Nombre Empresa (text input)
- [x] Implement Campo 2: Rol User (dropdown select)
- [x] Implement Campo 3: Horas Manuales/Semana (slider + number display)
- [x] Implement Campo 4: Presupuesto Disponible/Mes (radio buttons)
- [x] Implement Campo 5: Descripción Problema (textarea with char counter)
- [x] Add section title that changes based on path (Mini vs Pro)
- [x] Implement field validation (no empty, min/max lengths, etc.)
- [x] Implement submit button (text changes based on path)
- [x] Add error messages for validation failures
- [x] Highlight invalid fields in red
- [x] Prevent submit until all fields are valid
- [x] Test form validation and error states

## Phase 4: Prep Info Screen (Pantalla 2.5)
- [x] Create prep info screen component (Mini path only)
- [x] Add optional fields (Industry, Team size, Current tools, Urgency)
- [x] Implement "Continuar" button
- [x] Make screen optional (allow skip)
- [x] Test navigation to Processing Screen

## Phase 5: Processing Screen (Pantalla 5)
- [x] Create processing screen component
- [x] Implement animated loading indicator (circular progress ring)
- [x] Add sequential status messages
- [x] Simulate progress 0% → 100% over 3-5 seconds
- [x] Add estimated time text
- [x] Test animation smoothness

## Phase 6: Result Screen (Pantalla 6)
- [x] Create result screen component
- [x] Implement summary card with ROI, processes, time saved, confidence
- [x] Add "Descargar PDF" button (simulated download)
- [x] Add "Enviar por Email" button (email form)
- [x] Add "Agendar Call" button (Pro path only)
- [x] Implement email form modal/sheet
- [x] Test all action buttons

## Phase 7: Call Booking Screen (Pantalla 7)
- [ ] Create call booking screen component
- [ ] Integrate Calendly embed (or link)
- [ ] Add fallback contact info
- [ ] Test navigation and display

## Phase 8: Navigation & Routing
- [ ] Set up Expo Router navigation structure
- [ ] Create stack navigator for linear flow
- [ ] Implement navigation between screens
- [ ] Add back button/gesture support
- [ ] Handle path switching (Mini vs Pro)
- [ ] Test all navigation flows end-to-end

## Phase 9: Data Management
- [ ] Create form state management (useState or context)
- [ ] Implement form data persistence (AsyncStorage)
- [ ] Create webhook integration (simulate POST to n8n)
- [ ] Handle form submission and data sending
- [ ] Test data flow through all screens

## Phase 10: Styling & Theme
- [ ] Apply brand colors throughout app
- [ ] Ensure consistent spacing and padding
- [ ] Test dark mode support
- [ ] Test responsive layout on different screen sizes
- [ ] Verify touch targets are ≥ 44pt
- [ ] Test typography scaling and readability

## Phase 11: Testing & QA
- [ ] Test Mini Gratis path end-to-end
- [ ] Test Pro 297€ path end-to-end
- [ ] Test form validation edge cases
- [ ] Test navigation back/forward
- [ ] Test on iOS simulator
- [ ] Test on Android simulator
- [ ] Test on real device (Expo Go)
- [ ] Verify all buttons are functional
- [ ] Check for any console errors or warnings

## Phase 12: Branding & Polish
- [ ] Verify app icon displays correctly
- [ ] Verify splash screen displays correctly
- [ ] Check app name in launcher
- [ ] Verify colors match brand guidelines
- [ ] Polish animations and transitions
- [ ] Add haptic feedback (optional)

## Phase 13: Documentation & Delivery
- [ ] Create checkpoint for first delivery
- [ ] Document setup instructions
- [ ] Provide app preview link to user
- [ ] Prepare for publishing/deployment


## Phase 14: Integración de URLs y Arquitectura de Dos Mundos
- [ ] Configurar dominio https://nextgenpm.es/diagnostico-profesional/
- [ ] Configurar subdominio para Prep Info: https://nextgenpm.es/diagnostico-profesional/prep-info
- [ ] Crear CTA en portal de marca (nextgenpm.es) que redirija a /diagnostico-profesional/
- [ ] Implementar redirección post-pago de Stripe a /prep-info

## Phase 15: Integración de Webhooks y Notion
- [ ] Configurar webhook de n8n para escuchar en /diagnostico-profesional/
- [ ] Mapear los 5 campos del formulario a Notion (campos 1-5)
- [ ] Mapear los 5 campos de Prep Info a Notion (campos 6-10)
- [ ] Mapear campos adicionales a Notion (campos 11-38)
- [ ] Implementar sincronización automática de datos a Notion
- [ ] Crear tabla "Diagnósticos" en Notion
- [ ] Crear tabla "Usuarios" en Notion

## Phase 16: Integración de Stripe y Pago
- [ ] Configurar Stripe API keys en variables de entorno
- [ ] Implementar pantalla de pago (Pro path)
- [ ] Configurar webhook de Stripe para confirmación de pago
- [ ] Implementar redirección post-pago a /prep-info
- [ ] Crear lógica de manejo de pagos fallidos

## Phase 17: Lógica de DQS y Validación
- [ ] Implementar cálculo de DQS (Data Quality Score)
- [ ] Aplicar fórmula: (Accuracy x 0.30) + (Completeness x 0.25) + ...
- [ ] Bloquear procesamiento si DQS < 70
- [ ] Enviar email de "Call de Validación" si DQS < 70
- [ ] Enviar alerta a Slack si DQS < 70
- [ ] Implementar lógica de bifurcación (DQS >= 70 vs < 70)

## Phase 18: Integración de GPT-4 Turbo y Generación de PDF
- [ ] Configurar API de OpenAI (GPT-4 Turbo)
- [ ] Implementar prompt para generación de diagnóstico
- [ ] Configurar generación de PDF con resultados
- [ ] Implementar envío de PDF por email
- [ ] Crear plantilla de email con PDF adjunto
- [ ] Implementar lógica de "Withholding" (no revelar prompts ni configuración)

## Phase 19: Integración de Calendly
- [ ] Configurar embed de Calendly en Pantalla 7
- [ ] Crear enlace de Calendly para Agustina
- [ ] Implementar fallback de contacto por email
- [ ] Probar booking de llamadas

## Phase 20: Segmentación de Modelos (Free vs Pro)
- [ ] Configurar Perplexity Lite para peticiones gratuitas (Mini path)
- [ ] Configurar GPT-4 Turbo para peticiones de pago (Pro path, €297)
- [ ] Implementar lógica de bifurcación de modelos
- [ ] Validar DQS antes de activar cualquier modelo

## Phase 21: Testing y QA Final
- [ ] Probar flujo Mini Gratis completo (Perplexity Lite)
- [ ] Probar flujo Pro 297€ completo (Stripe + GPT-4)
- [ ] Probar validación DQS < 70 (email de call)
- [ ] Probar sincronización con Notion
- [ ] Probar generación y envío de PDF
- [ ] Probar en dispositivos reales (iOS + Android)
- [ ] Verificar URLs y redirecciones
- [ ] Probar webhook de Stripe
- [ ] Probar webhook de n8n
