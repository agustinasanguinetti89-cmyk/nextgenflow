# Diagnosis App - Inventario Detallado Completo

**Proyecto:** Diagnosis App NextgenPM.IA  
**Versión:** 1.0.0  
**Estado:** Checkpoint 1 - Pantallas Base Implementadas  
**Fecha:** 22 Diciembre 2025  

---

## 1. ESTRUCTURA DEL PROYECTO

### 1.1 Árbol de Directorios Principales

```
diagnosis-app/
├── app/                          # Rutas y pantallas (Expo Router)
│   ├── (tabs)/                   # Grupo de tabs para navegación
│   │   ├── _layout.tsx          # Configuración de tab bar
│   │   ├── index.tsx            # Landing Page (Pantalla 1)
│   │   ├── form.tsx             # Formulario (Pantalla 2)
│   │   ├── prepinfo.tsx         # Prep Info (Pantalla 2.5)
│   │   ├── processing.tsx       # Processing (Pantalla 5)
│   │   ├── result.tsx           # Result (Pantalla 6)
│   │   └── landing.tsx          # Landing alternativo (backup)
│   ├── _layout.tsx              # Root layout
│   ├── modal.tsx                # Modal de ejemplo
│   └── oauth/
│       └── callback.tsx         # OAuth callback
├── components/                   # Componentes reutilizables
│   ├── themed-text.tsx          # Texto con soporte dark/light mode
│   ├── themed-view.tsx          # Vista con soporte dark/light mode
│   ├── haptic-tab.tsx           # Tab con feedback háptico
│   ├── hello-wave.tsx           # Componente de saludo
│   ├── parallax-scroll-view.tsx # ScrollView con parallax
│   ├── external-link.tsx        # Link externo
│   └── ui/
│       ├── icon-symbol.tsx      # Mapeo de iconos
│       ├── icon-symbol.ios.tsx  # Iconos específicos iOS
│       └── collapsible.tsx      # Componente colapsible
├── constants/                    # Constantes y configuración
│   ├── theme.ts                 # Colores, tipografía, tema
│   ├── oauth.ts                 # Configuración OAuth
│   └── const.ts                 # Constantes generales
├── config/                       # Configuración técnica
│   └── webhooks.ts              # Webhooks, integraciones, DQS
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts              # Hook de autenticación
│   ├── use-color-scheme.ts      # Hook de tema
│   ├── use-color-scheme.web.ts  # Hook de tema (web)
│   └── use-theme-color.ts       # Hook de colores
├── lib/                          # Librerías y utilidades
│   ├── api.ts                   # Cliente API
│   ├── auth.ts                  # Lógica de autenticación
│   ├── trpc.ts                  # Cliente tRPC
│   └── manus-runtime.ts         # Runtime de Manus
├── server/                       # Backend (tRPC + Express)
│   ├── _core/                   # Core del servidor
│   │   ├── index.ts             # Entrada del servidor
│   │   ├── trpc.ts              # Configuración tRPC
│   │   ├── context.ts           # Contexto de tRPC
│   │   ├── env.ts               # Variables de entorno
│   │   ├── oauth.ts             # OAuth
│   │   ├── llm.ts               # Integración LLM
│   │   ├── imageGeneration.ts   # Generación de imágenes
│   │   ├── notification.ts      # Notificaciones
│   │   └── ... (otros)
│   ├── routers.ts               # Routers de tRPC
│   ├── db.ts                    # Configuración de BD
│   ├── storage.ts               # Almacenamiento
│   └── README.md                # Documentación del servidor
├── shared/                       # Código compartido
│   ├── types.ts                 # Tipos TypeScript
│   ├── const.ts                 # Constantes compartidas
│   └── _core/
│       └── errors.ts            # Manejo de errores
├── assets/
│   └── images/
│       ├── icon.png             # App icon (1024x1024)
│       ├── splash-icon.png      # Splash icon
│       ├── favicon.png          # Favicon web
│       ├── android-icon-foreground.png
│       ├── android-icon-background.png
│       ├── android-icon-monochrome.png
│       └── ... (otros assets)
├── drizzle/                      # Configuración de BD (Drizzle ORM)
│   ├── schema.ts                # Schema de BD
│   ├── relations.ts             # Relaciones de BD
│   └── meta/
├── tests/                        # Tests
│   └── auth.logout.test.ts      # Test de logout
├── design.md                     # Documento de diseño
├── todo.md                       # Lista de tareas
├── app.config.ts                # Configuración de Expo
├── tsconfig.json                # Configuración TypeScript
├── package.json                 # Dependencias
├── drizzle.config.ts            # Configuración Drizzle
└── expo-env.d.ts                # Tipos de Expo
```

---

## 2. PANTALLAS IMPLEMENTADAS

### 2.1 Pantalla 1: Landing Page (index.tsx)

**Ubicación:** `app/(tabs)/index.tsx`

**Propósito:** Página de entrada con dual CTA (Mini Gratis vs Pro 297€)

**Componentes:**
- Header con logo NextgenPM.IA (color púrpura #3a2459)
- Hero Section con título y subtítulo
- Highlight Box con descripción de valor
- Social Proof (200+ empresas, 750€/mes ROI)
- Badge de 5 estrellas (NPS 9/10)
- **Dual CTA Buttons:**
  - Mini Gratis (gris #6B7280, tamaño MEDIUM)
  - Pro 297€ (oro #D4AF37, tamaño LARGE)
- Footer con links (Servicios, Contacto, Privacidad)

**Funcionalidades:**
- Navegación a formulario (plan: "mini" o "plan: "pro")
- Responsive layout (mobile portrait)
- Dark mode support
- Safe area handling

**Estilos:**
- Colores: Púrpura (#3a2459), Rosa (#751f82), Oro (#D4AF37), Gris (#6B7280)
- Tipografía: Title (32pt), Subtitle (20pt), Body (16pt)
- Espaciado: 16pt padding, 24pt section gaps

---

### 2.2 Pantalla 2: Formulario de Recogida de Datos (form.tsx)

**Ubicación:** `app/(tabs)/form.tsx`

**Propósito:** Recopilar 5 campos obligatorios del usuario

**Campos Implementados:**

| Campo | Tipo | Validación | Requerido |
|-------|------|-----------|----------|
| **Campo 1: Nombre Empresa** | Text Input | Min 3 caracteres, Max 100 | ✓ SÍ |
| **Campo 2: Rol User** | Dropdown (6 opciones) | Selección obligatoria | ✓ SÍ |
| **Campo 3: Horas Manuales/Semana** | Slider (0-40) | Entre 1-40 | ✓ SÍ |
| **Campo 4: Presupuesto Disponible** | Radio Buttons (4 opciones) | Selección obligatoria | ✓ SÍ |
| **Campo 5: Descripción Problema** | Textarea | Min 20 caracteres, Max 500 | ✓ SÍ |

**Opciones de Rol:**
- CEO / Founder
- Director Operaciones
- PM / Project Manager
- Marketing Manager
- CFO / Director Finanzas
- Otro (specify)

**Opciones de Presupuesto:**
- Menos de 1.000€
- 1.000-5.000€
- 5.000-10.000€
- Más de 10.000€

**Funcionalidades:**
- Validación en tiempo real
- Mensaje de error personalizado
- Highlight de campos inválidos en rojo
- Bloqueo de submit hasta 100% completo
- Char counter para textarea (X/500)
- Diferente título según plan (Mini vs Pro)
- Botón submit con texto dinámico

**Validaciones Implementadas:**
```
✓ Empresa: No vacío, min 3 caracteres
✓ Rol: Seleccionado
✓ Horas: Entre 1-40
✓ Presupuesto: Seleccionado
✓ Problema: Min 20 caracteres (no demasiado corto)
```

**Estado de Submit:**
- Mini Gratis: "Generar Mi Diagnóstico Gratis" (gris)
- Pro 297€: "Continuar al Análisis Pro" (oro)
- Disabled state: 60% opacity hasta validar

---

### 2.3 Pantalla 2.5: Prep Info (prepinfo.tsx)

**Ubicación:** `app/(tabs)/prepinfo.tsx`

**Propósito:** Recopilar información adicional para personalizar diagnóstico

**Campos Opcionales:**

| Campo | Tipo | Opciones |
|-------|------|----------|
| **Sector/Industria** | Dropdown | Tecnología, Consultoría, E-commerce, Marketing, Finanzas, Logística, Educación, Otro |
| **Tamaño de Equipo** | Dropdown | 1-5, 5-10, 10-50, 50-100, 100+ |
| **Herramientas Actuales** | Multi-select Chips | Excel, Google Sheets, Salesforce, HubSpot, Zapier, Make, n8n, Otro |
| **Nivel de Urgencia** | Dropdown | Baja, Media, Alta |
| **Notas Adicionales** | Textarea (opcional) | Max 500 caracteres |

**Funcionalidades:**
- Pantalla completamente opcional (permite skip)
- Multi-select con chips visuales
- Envío de datos combinados (Form + Prep Info)
- Botón "Procesar Diagnóstico" (principal)
- Botón "Omitir (no recomendado)" (secundario)

**Flujo:**
1. Usuario completa formulario
2. Navega a Prep Info (opcional)
3. Completa campos adicionales
4. Presiona "Procesar" → Processing Screen
5. O presiona "Omitir" → Processing Screen (sin datos adicionales)

---

### 2.4 Pantalla 5: Processing (processing.tsx)

**Ubicación:** `app/(tabs)/processing.tsx`

**Propósito:** Mostrar progreso mientras se procesa el diagnóstico

**Componentes:**
- **Loader Animado:**
  - ActivityIndicator (spinner)
  - Progress Ring visual (0-100%)
  - Porcentaje numérico centrado

- **Mensajes de Estado Secuencial:**
  1. "Validando datos..."
  2. "Procesando con IA..."
  3. "Generando reporte..."
  4. "Finalizando..."

- **Título:** "Analizando tu negocio..."
- **Tiempo Estimado:** "Esto toma ~30 segundos"

**Animación:**
- Progreso simulado: 0% → 100% en 3-5 segundos
- Incrementos aleatorios (0-25% por paso)
- Interval de 800ms entre actualizaciones
- Auto-navegación a Result Screen al 100%

**Lógica:**
```typescript
- Progreso >= 100% → Espera 1 segundo → Navega a Result
- Actualiza mensaje según porcentaje
- Limpia interval al desmontar
```

---

### 2.5 Pantalla 6: Result (result.tsx)

**Ubicación:** `app/(tabs)/result.tsx`

**Propósito:** Mostrar resultados del diagnóstico y opciones de acción

**Componentes:**

**Summary Card:**
| Métrica | Valor | Color |
|---------|-------|-------|
| ROI Estimado | 750€/mes | Púrpura |
| Procesos | 1 (Mini) / 5 (Pro) | Púrpura |
| Tiempo Ahorrado | 10h/semana | Púrpura |
| Confianza | 95% | Púrpura |

**Action Buttons:**
1. **📥 Descargar PDF** (Púrpura #3a2459)
   - Simula descarga de PDF
   - Alert de confirmación

2. **📧 Enviar por Email** (Rosa #751f82)
   - Simula envío por email
   - Alert de confirmación

3. **📞 Agendar Consultoría** (Oro #D4AF37) - **Solo Pro**
   - Redirige a Calendly
   - Alert de confirmación

**Support Section:**
- Texto: "¿Preguntas o necesitas ayuda?"
- Link: "Contacta con soporte@nextgenpm.ia"

**Back Button:**
- "← Volver al inicio"
- Navega a Landing Page

**Funcionalidades:**
- Alerts nativos para cada acción
- Diferente contenido según plan (Mini vs Pro)
- Botones deshabilitados durante procesamiento
- Safe area handling

---

## 3. CONFIGURACIÓN TÉCNICA

### 3.1 Tema y Colores (constants/theme.ts)

**Paleta de Colores:**

| Elemento | Color | Hex | Uso |
|----------|-------|-----|-----|
| Primary Purple | Púrpura | #3a2459 | Headers, accents, botones primarios |
| Secondary Pink | Rosa | #751f82 | Highlights, CTAs secundarias |
| CTA Gold | Oro | #D4AF37 | Botón "Pro 297€" |
| Button Gray | Gris | #6B7280 | Botón "Mini Gratis" |
| Text Primary | Dark Gray | #11181C | Texto principal |
| Text Secondary | Medium Gray | #687076 | Labels, hints |
| Text Disabled | Light Gray | #9CA3AF | Estados deshabilitados |
| Background | Blanco | #FFFFFF | Fondo principal |
| Surface | Light Gray | #F3F4F6 | Card backgrounds |
| Error | Rojo | #EF4444 | Validación errors |
| Success | Verde | #10B981 | Mensajes de éxito |

**Tipografía:**

| Nivel | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| Title (H1) | 32pt | Bold (700) | Screen titles |
| Subtitle (H2) | 20pt | Bold (700) | Section headers |
| Body | 16pt | Regular (400) | Main content |
| Body Semibold | 16pt | Semibold (600) | Emphasis |
| Caption | 12pt | Regular (400) | Hints, labels |

**Dark Mode Support:**
- Colores automáticos según esquema del sistema
- Hook `useColorScheme()` para detectar tema
- Componentes `ThemedText` y `ThemedView` para aplicar tema

---

### 3.2 Configuración de Webhooks (config/webhooks.ts)

**URLs del Ecosistema:**
```typescript
export const ECOSYSTEM_URLS = {
  brandPortal: "https://nextgenpm.es",
  diagnosisApp: "https://nextgenpm.es/diagnostico-profesional",
  prepInfoGate: "https://nextgenpm.es/diagnostico-profesional/prep-info",
  supportEmail: "soporte@nextgenpm.ia",
};
```

**Webhooks de n8n:**
```typescript
export const N8N_WEBHOOKS = {
  formSubmission: "https://n8n.nextgenpm.ia/webhook/diagnosis-form",
  dqsValidation: "https://n8n.nextgenpm.ia/webhook/dqs-validation",
  aiProcessing: "https://n8n.nextgenpm.ia/webhook/ai-processing",
  stripeConfirmation: "https://n8n.nextgenpm.ia/webhook/stripe-confirmation",
};
```

**Integraciones Externas Configuradas:**

| Servicio | Clave | Valor |
|----------|-------|-------|
| **Stripe** | publicKey | EXPO_PUBLIC_STRIPE_PUBLIC_KEY |
| | priceId | EXPO_PUBLIC_STRIPE_PRICE_ID |
| **OpenAI** | apiKey | EXPO_PUBLIC_OPENAI_API_KEY |
| | model | gpt-4-turbo |
| **Perplexity** | apiKey | EXPO_PUBLIC_PERPLEXITY_API_KEY |
| | model | pplx-7b-online |
| **Notion** | apiKey | EXPO_PUBLIC_NOTION_API_KEY |
| | databaseId | EXPO_PUBLIC_NOTION_DATABASE_ID |
| **Calendly** | eventUrl | https://calendly.com/agustina-nextgenpm |

**Configuración de DQS:**
```typescript
export const DQS_CONFIG = {
  threshold: 70, // Mínimo requerido para procesar
  weights: {
    accuracy: 0.30,
    completeness: 0.25,
    consistency: 0.20,
    timeliness: 0.15,
    validity: 0.10,
  },
};
```

**Modelos IA:**
```typescript
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
```

**Mapeo de Campos a Notion (1-38):**
- Campos 1-5: Formulario base
- Campos 6-10: Prep Info
- Campos 11-38: Resultados y datos adicionales

**Funciones Helper:**
- `sendToWebhook()` - Envía datos a webhook de n8n
- `calculateDQS()` - Calcula Data Quality Score
- `selectAIModel()` - Selecciona modelo IA según plan y DQS

---

### 3.3 Configuración de Expo (app.config.ts)

**Branding:**
```typescript
appName: 'Diagnosis App',
appSlug: 'diagnosis-app',
logoUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663245835719/DnbVwgVUchtdnDjd.png',
```

**Bundle IDs:**
- iOS: `space.manus.diagnosis.app.t20251222134532`
- Android: `space.manus.diagnosis.app.t20251222134532`

**Deep Link Scheme:** `manus20251222134532`

**Plugins:**
- expo-router (navegación)
- expo-splash-screen (pantalla de splash)

**Orientación:** Portrait (9:16)

---

## 4. DEPENDENCIAS INSTALADAS

### 4.1 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| **expo** | ~54.0.29 | Framework React Native |
| **react** | 19.1.0 | Librería de UI |
| **react-native** | 0.81.5 | Framework nativo |
| **expo-router** | ~6.0.19 | Navegación y routing |
| **@react-native-community/slider** | ^5.1.1 | Slider para horas |
| **react-native-safe-area-context** | ~5.6.0 | Safe area handling |
| **react-native-reanimated** | ~4.1.1 | Animaciones |
| **@tanstack/react-query** | ^5.60.0 | Data fetching |
| **@trpc/client** | 11.7.2 | Cliente tRPC |
| **drizzle-orm** | ^0.44.5 | ORM para BD |
| **express** | ^4.21.2 | Server backend |
| **zod** | ^4.1.12 | Validación de esquemas |

### 4.2 Dependencias de Desarrollo

| Paquete | Versión | Propósito |
|---------|---------|----------|
| **typescript** | ~5.9.2 | Type checking |
| **vitest** | ^2.1.4 | Testing framework |
| **eslint** | ^9.25.0 | Linting |
| **prettier** | ^3.6.2 | Code formatting |
| **tsx** | ^4.19.1 | TypeScript executor |
| **drizzle-kit** | ^0.31.4 | ORM tools |

---

## 5. NAVEGACIÓN Y RUTAS

### 5.1 Estructura de Rutas (Expo Router)

```
/                              # Landing Page (index.tsx)
├── /(tabs)/                   # Tab navigation group
│   ├── index                  # Landing (default)
│   ├── form                   # Formulario (Pantalla 2)
│   ├── prepinfo               # Prep Info (Pantalla 2.5)
│   ├── processing             # Processing (Pantalla 5)
│   ├── result                 # Result (Pantalla 6)
│   └── landing                # Landing alternativo
├── /modal                      # Modal de ejemplo
└── /oauth/callback             # OAuth callback
```

### 5.2 Flujos de Navegación

**Mini Gratis Path:**
```
Landing (index.tsx)
  ↓ [Click "Mini Gratis"]
Form (form.tsx, plan="mini")
  ↓ [5 campos válidos]
Prep Info (prepinfo.tsx, plan="mini") [OPCIONAL]
  ↓ [Click "Procesar"]
Processing (processing.tsx, plan="mini")
  ↓ [100% progress]
Result (result.tsx, plan="mini")
  ↓ [Click "Volver al inicio"]
Landing (index.tsx)
```

**Pro 297€ Path:**
```
Landing (index.tsx)
  ↓ [Click "Pro 297€"]
Form (form.tsx, plan="pro")
  ↓ [5 campos válidos]
Prep Info (prepinfo.tsx, plan="pro") [OPCIONAL]
  ↓ [Click "Procesar"]
Processing (processing.tsx, plan="pro")
  ↓ [100% progress]
Result (result.tsx, plan="pro")
  ↓ [Click "Agendar Consultoría" o "Volver"]
Calendly o Landing
```

### 5.3 Parámetros de Navegación

| Ruta | Parámetros | Descripción |
|------|-----------|-------------|
| form | `plan: "mini" \| "pro"` | Plan seleccionado |
| prepinfo | `plan: "mini" \| "pro"`, `formData: JSON` | Plan y datos del formulario |
| processing | `plan: "mini" \| "pro"` | Plan para determinar modelo IA |
| result | `plan: "mini" \| "pro"` | Plan para mostrar contenido diferente |

---

## 6. VALIDACIONES Y LÓGICA

### 6.1 Validaciones del Formulario

**Campo 1: Nombre Empresa**
- No puede estar vacío
- Mínimo 3 caracteres
- Máximo 100 caracteres
- Error: "Mínimo 3 caracteres"

**Campo 2: Rol User**
- Debe seleccionar una opción
- 6 opciones disponibles
- Error: "Selecciona un rol"

**Campo 3: Horas Manuales/Semana**
- Slider: 0-40 horas
- Debe estar entre 1-40
- Default: 15 horas
- Error: "Entre 1-40 horas"

**Campo 4: Presupuesto Disponible/Mes**
- Debe seleccionar una opción
- 4 opciones disponibles
- Error: "Selecciona un presupuesto"

**Campo 5: Descripción Problema**
- Mínimo 20 caracteres
- Máximo 500 caracteres
- Char counter visible
- Error: "Mínimo 20 caracteres"

### 6.2 Estados de Validación

**Antes de Submit:**
- Campos vacíos: Highlight en rojo
- Mensaje de error: "Por favor completa todos los campos"
- Botón submit: Deshabilitado (60% opacity)

**Después de Submit:**
- Validación pasa: Navega a siguiente pantalla
- Validación falla: Muestra errores, mantiene en formulario

### 6.3 Lógica de DQS (Preparada)

```typescript
function calculateDQS(data: Record<string, any>): number {
  const accuracy = data.empresa && data.rol ? 1 : 0;
  const completeness = Object.values(data).filter(v => v).length / Object.keys(data).length;
  const consistency = 1;
  const timeliness = 1;
  const validity = data.horas >= 1 && data.horas <= 40 ? 1 : 0;

  const dqs = (accuracy * 0.30) + (completeness * 0.25) + 
              (consistency * 0.20) + (timeliness * 0.15) + 
              (validity * 0.10);

  return Math.round(dqs * 100);
}
```

**Threshold:** 70 (mínimo requerido)

---

## 7. ESTADO ACTUAL DE FEATURES

### 7.1 Features Implementadas ✓

| Feature | Estado | Detalles |
|---------|--------|----------|
| Landing Page | ✓ Completo | Dual CTA, hero, social proof |
| Formulario (5 campos) | ✓ Completo | Validación, error handling |
| Prep Info | ✓ Completo | Campos opcionales, multi-select |
| Processing Screen | ✓ Completo | Animación, mensajes secuenciales |
| Result Screen | ✓ Completo | Summary card, action buttons |
| Tema y Colores | ✓ Completo | Dark mode, brand colors |
| Logo Personalizado | ✓ Completo | Generado y distribuido |
| Navegación | ✓ Completo | Expo Router, parámetros |
| Safe Area Handling | ✓ Completo | Notch, home indicator |
| Responsive Layout | ✓ Completo | Mobile portrait |

### 7.2 Features Preparados (Configuración) 🔧

| Feature | Estado | Detalles |
|---------|--------|----------|
| Webhooks n8n | 🔧 Configurado | URLs y funciones helper |
| DQS Calculation | 🔧 Configurado | Función lista, threshold 70 |
| Notion Integration | 🔧 Configurado | Mapeo de campos 1-38 |
| Stripe Integration | 🔧 Configurado | API keys en env vars |
| OpenAI/Perplexity | 🔧 Configurado | Modelos y endpoints |
| Calendly | 🔧 Configurado | URL de Agustina |

### 7.3 Features Pendientes de Implementación 📋

| Feature | Prioridad | Notas |
|---------|-----------|-------|
| Integración Stripe Payment | ALTA | Pantalla de pago, webhook |
| Envío a Webhook n8n | ALTA | Conectar formulario con backend |
| Sincronización Notion | ALTA | Mapeo de 38 campos |
| Generación de PDF | ALTA | Con resultados del diagnóstico |
| Envío de Email | ALTA | PDF adjunto, plantillas |
| Cálculo DQS Real | ALTA | Validación antes de IA |
| Integración GPT-4 Turbo | MEDIA | Para plan Pro |
| Integración Perplexity Lite | MEDIA | Para plan Mini |
| Calendly Embed | MEDIA | Pantalla 7 |
| Slack Alerts | MEDIA | Para DQS < 70 |
| Call de Validación Email | MEDIA | Si DQS < 70 |

---

## 8. VARIABLES DE ENTORNO REQUERIDAS

### 8.1 Stripe
```
EXPO_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
EXPO_PUBLIC_STRIPE_PRICE_ID=price_...
```

### 8.2 OpenAI
```
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

### 8.3 Perplexity
```
EXPO_PUBLIC_PERPLEXITY_API_KEY=pplx-...
```

### 8.4 Notion
```
EXPO_PUBLIC_NOTION_API_KEY=ntn_...
EXPO_PUBLIC_NOTION_DATABASE_ID=...
```

### 8.5 n8n Webhooks
```
EXPO_PUBLIC_N8N_WEBHOOK_FORM=https://n8n.nextgenpm.ia/webhook/diagnosis-form
EXPO_PUBLIC_N8N_WEBHOOK_DQS=https://n8n.nextgenpm.ia/webhook/dqs-validation
EXPO_PUBLIC_N8N_WEBHOOK_AI=https://n8n.nextgenpm.ia/webhook/ai-processing
EXPO_PUBLIC_N8N_WEBHOOK_STRIPE=https://n8n.nextgenpm.ia/webhook/stripe-confirmation
```

---

## 9. ARCHIVOS CLAVE POR FUNCIONALIDAD

### 9.1 Pantallas
- `app/(tabs)/index.tsx` - Landing
- `app/(tabs)/form.tsx` - Formulario
- `app/(tabs)/prepinfo.tsx` - Prep Info
- `app/(tabs)/processing.tsx` - Processing
- `app/(tabs)/result.tsx` - Result

### 9.2 Configuración
- `constants/theme.ts` - Colores y tipografía
- `config/webhooks.ts` - Webhooks e integraciones
- `app.config.ts` - Configuración de Expo
- `app/(tabs)/_layout.tsx` - Tab navigation

### 9.3 Componentes
- `components/themed-text.tsx` - Texto con tema
- `components/themed-view.tsx` - Vista con tema
- `components/haptic-tab.tsx` - Tab con haptic

### 9.4 Documentación
- `design.md` - Especificaciones de diseño
- `todo.md` - Lista de tareas
- `DETAILED_APP_INVENTORY.md` - Este documento

---

## 10. TAMAÑOS Y MÉTRICAS

### 10.1 Dimensiones de Componentes

| Componente | Dimensión | Valor |
|-----------|-----------|-------|
| Button Height | Min Height | 48pt |
| Button Padding | Vertical | 14pt |
| Button Padding | Horizontal | 24pt |
| Button Border Radius | | 10pt |
| Input Height | Min Height | 44pt |
| Input Padding | | 12pt |
| Textarea Height | Min Height | 100pt |
| Slider Height | | 40pt |
| Safe Area Padding | | 16pt |
| Section Gap | | 24pt |
| Field Gap | | 16pt |

### 10.2 Tamaños de Fuente

| Tipo | Tamaño | Line Height |
|-----|--------|------------|
| Title | 32pt | 40pt |
| Subtitle | 20pt | 28pt |
| Body | 16pt | 24pt |
| Caption | 12pt | 16pt |

---

## 11. TESTING

### 11.1 Tests Existentes
- `tests/auth.logout.test.ts` - Test de logout

### 11.2 Comando de Testing
```bash
pnpm test
```

### 11.3 Framework
- **Vitest** - Testing framework

---

## 12. SCRIPTS DISPONIBLES

```bash
# Desarrollo
pnpm dev                 # Inicia servidor + Metro bundler
pnpm dev:server         # Solo servidor tRPC
pnpm dev:metro          # Solo Metro bundler

# Build y Deploy
pnpm build              # Build para producción
pnpm start              # Inicia servidor de producción

# Calidad de Código
pnpm check              # TypeScript check
pnpm lint               # ESLint
pnpm format             # Prettier format
pnpm test               # Vitest

# Base de Datos
pnpm db:push            # Genera y migra schema

# Plataformas Nativas
pnpm android            # Abre en Android
pnpm ios                # Abre en iOS
pnpm qr                 # Genera QR code
```

---

## 13. PRÓXIMOS PASOS CRÍTICOS

### 13.1 Fase 5: Integración de Webhooks (ALTA PRIORIDAD)
1. Conectar `form.tsx` con webhook de n8n
2. Enviar datos del formulario a `N8N_WEBHOOKS.formSubmission`
3. Implementar error handling y retry logic

### 13.2 Fase 6: Integración de Stripe (ALTA PRIORIDAD)
1. Crear pantalla de pago (antes de Prep Info en Pro path)
2. Integrar Stripe SDK
3. Configurar webhook de confirmación de pago
4. Redirigir a `/prep-info` tras pago exitoso

### 13.3 Fase 7: Cálculo de DQS (ALTA PRIORIDAD)
1. Implementar validación real de DQS
2. Bloquear procesamiento si DQS < 70
3. Enviar email de "Call de Validación" si falla
4. Enviar alerta a Slack

### 13.4 Fase 8: Generación de PDF y Email (ALTA PRIORIDAD)
1. Integrar generación de PDF con resultados
2. Implementar envío de email con PDF adjunto
3. Crear plantillas de email
4. Implementar Withholding (no revelar prompts)

---

## 14. INFORMACIÓN DE CONTACTO Y SOPORTE

**Email de Soporte:** soporte@nextgenpm.ia  
**Portal de Marca:** https://nextgenpm.es  
**Motor de Conversión:** https://nextgenpm.es/diagnostico-profesional  
**Calendly (Agustina):** https://calendly.com/agustina-nextgenpm

---

**Documento Generado:** 22 Diciembre 2025  
**Versión del Proyecto:** 0a1d2cfe  
**Estado:** Checkpoint 1 - Pantallas Base Implementadas
