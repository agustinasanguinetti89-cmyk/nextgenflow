# NextGenFlow App - Mobile Interface Design

## Overview

The **NextGenFlow App** is a mobile-first application that guides users through a diagnostic workflow to identify business automation opportunities. The app implements a dual-path strategy: a free "Mini Gratis" option and a premium "Pro 297€" option, each with different data collection requirements.

**Design Principles:**
- Mobile portrait orientation (9:16)
- One-handed usage (primary actions in thumb zone)
- Apple HIG compliance (iOS-first aesthetic)
- Clear visual hierarchy with dual CTA psychology
- Brand colors: Purple (#3a2459) and Pink (#751f82)

---

## Screen List

1. **Landing Screen (Pantalla 1)** — Hero + Dual CTA
2. **Form Screen (Pantalla 2)** — 5-field data collection
3. **Prep Info Screen (Pantalla 2.5)** — Additional context (free path only)
4. **Processing Screen (Pantalla 5)** — Loading + IA animation
5. **Result Screen (Pantalla 6)** — PDF + Email delivery
6. **Call Booking Screen (Pantalla 7)** — Calendly integration

---

## Screen Details

### 1. Landing Screen (Pantalla 1)

**Purpose:** Create urgency and allow users to choose between free and premium paths.

**Content:**
- **Header:** NextgenPM.IA logo (color #5B21B6)
- **Hero Section:**
  - Title: "Diagnóstico IA Profesional"
  - Subtitle: "Descubre procesos que roban 10h/semana"
  - Highlight: "Análisis IA en 5 minutos. ROI € exacto antes de invertir. Blindado por Estándares PM: Charter + Risk Register + Go-Live."
  - Social proof: "Usado por 200+ startups y PYMEs • ROI promedio: 750€/mes"
  - Badge: 5 stars, "NPS 9/10 (promedio clientes)"

- **CTA Dual (Psychology Critical):**
  - **Button 1 (Left, Gray #6B7280, MEDIUM size):**
    - Text: "Mini Gratis"
    - Subtext: "90 segundos | 1 proceso | ROI estimado"
    - Hover: Gray darker (#4B5563)
    - Action: Navigate to Form Screen (Mini path)
  
  - **Button 2 (Right, Gold #D4AF37, LARGE size):**
    - Text: "Pro 297€"
    - Subtext: "5 procesos | Análisis completo | Método Validado"
    - Hover: Gold darker (#C9A227)
    - Action: Navigate to Form Screen (Pro path)

- **Footer:** Links (Home, Servicios, Contact), Copyright, Privacy Policy

**Layout:**
- Centered, grid 2-column on desktop (responsive)
- Full-screen hero on mobile
- Safe area padding for notch/home indicator

---

### 2. Form Screen (Pantalla 2)

**Purpose:** Collect 5 mandatory fields for nextgenflow initiation.

**Content:**

**Section Title (before form):**
- **Mini path:** "PASO 1: Cuéntanos sobre tu negocio (Toma 90 segundos)"
- **Pro path:** "PASO 1: Información para análisis profesional (2 minutos)"

**5 Required Fields:**

1. **Campo 1: NOMBRE EMPRESA**
   - Label: "¿Cuál es tu empresa?"
   - Type: Text input
   - Placeholder: "Ej: TechStartup SL, Consultoría X, etc"
   - Max length: 100 characters
   - Validation: No empty, min 3 characters
   - Required: YES

2. **Campo 2: ROL USER**
   - Label: "¿Cuál es tu rol?"
   - Type: Dropdown (select)
   - Options:
     - CEO / Founder
     - Director Operaciones
     - PM / Project Manager
     - Marketing Manager
     - CFO / Director Finanzas
     - Otro (specify)
   - Validation: Must select
   - Required: YES

3. **Campo 3: HORAS MANUALES/SEMANA**
   - Label: "¿Cuántas horas/semana gastas en tareas MANUALES?"
   - Type: Slider + number display
   - Range: 0-40 horas
   - Default: 15
   - Step: 1
   - Display format: "{{value}}/semana"
   - Tooltip: "Reportes, emails, consolidar datos, seguimiento manual..."
   - Validation: Between 1-40
   - Required: YES

4. **Campo 4: PRESUPUESTO DISPONIBLE/MES**
   - Label: "¿Cuál es tu presupuesto disponible para automatización?"
   - Type: Radio buttons or dropdown
   - Options:
     - Menos de 1.000€
     - 1.000-5.000€
     - 5.000-10.000€
     - Más de 10.000€
   - Note: "(small) Esto nos ayuda a priorizar soluciones"
   - Validation: Must select
   - Required: YES

5. **Campo 5: DESCRIPCIÓN PROBLEMA**
   - Label: "¿Cuál es la PRINCIPAL frustración con procesos manuales?"
   - Type: Textarea
   - Placeholder: "Ej: Gasto 15h/semana en reportes Excel + clasificar leads manual..."
   - Max length: 500 characters
   - Char counter: "X / 500" (shown below)
   - Validation: Min 20 characters (no demasiado corto)
   - Required: YES

**Validation:**
- Before submit:
  - ✓ Empresa: No vacío, min 3 caracteres
  - ✓ Rol: Seleccionado
  - ✓ Horas: Entre 1-40
  - ✓ Presupuesto: Seleccionado
  - ✓ Problema: Min 20 caracteres (no demasiado corto)

- If validation fails:
  - Error message: "Por favor completa todos los campos"
  - Highlight empty fields in RED
  - Do NOT submit until 100% complete

**Submit Button:**
- **Mini path:**
  - Text: "Generar Mi Diagnóstico Gratis"
  - Color: Gray #4B5563
  - Disabled state: Gray clear #9CA3AF (until all fields valid)

- **Pro path:**
  - Text: "Continuar al Análisis Pro" or "Procesar Análisis Pro"
  - Color: Gold #D4AF37
  - Disabled state: Gold faded

**Layout:**
- Vertical stack (mobile-first)
- Padding: 16pt (safe area)
- Field spacing: 16pt between fields
- Form width: max 600px (centered on larger screens)

---

### 3. Prep Info Screen (Pantalla 2.5)

**Purpose:** Collect additional context for Mini path only (optional but recommended).

**Content:**
- Title: "Información Adicional (Opcional)"
- Subtitle: "Ayúdanos a personalizar tu diagnóstico"

**Optional Fields (3-5 fields):**
- Industry/Sector (dropdown)
- Team size (dropdown: 1-5, 5-10, 10-50, 50+)
- Current tools used (multi-select checkboxes)
- Urgency level (radio: Low, Medium, High)

**Action:**
- "Continuar" button → Navigate to Processing Screen

---

### 4. Processing Screen (Pantalla 5)

**Purpose:** Show progress while IA generates nextgenflow.

**Content:**
- **Title:** "Analizando tu negocio..."
- **Animated Loading Indicator:**
  - Circular progress ring (animated)
  - Percentage: 0% → 100% (simulated)
  - Duration: 3-5 seconds
  - Animation: Smooth spin + fill
- **Status Messages (sequential):**
  - "Validando datos..."
  - "Procesando con IA..."
  - "Generando reporte..."
  - "Finalizando..."
- **Estimated time:** "Esto toma ~30 segundos"

**Layout:**
- Centered, full-screen
- Vertical alignment: center
- Safe area padding

---

### 5. Result Screen (Pantalla 6)

**Purpose:** Display nextgenflow result and enable PDF download + email.

**Content:**
- **Title:** "Tu Diagnóstico está listo"
- **Summary Card:**
  - ROI estimado: "€XXX/mes"
  - Procesos identificados: "N procesos"
  - Tiempo ahorrado: "XXh/semana"
  - Confidence score: "XX% confianza"

- **Actions:**
  - **Button 1:** "Descargar PDF"
    - Action: Trigger PDF download (simulated)
  - **Button 2:** "Enviar por Email"
    - Action: Open email form (pre-filled with user email if available)
  - **Button 3:** "Agendar Call" (Pro path only)
    - Action: Navigate to Call Booking Screen

- **Footer:** "¿Preguntas?" → soporte@nextgenpm.ia

**Layout:**
- Card-based design
- Buttons stacked vertically (mobile)
- Safe area padding

---

### 6. Call Booking Screen (Pantalla 7)

**Purpose:** Integrate Calendly for scheduling consultations.

**Content:**
- **Title:** "Agendar Consultoría (15 min)"
- **Calendly Embed:** Iframe or deep link to Calendly
- **Fallback:** "¿No puedes agendar? Contáctanos: soporte@nextgenpm.ia"

**Layout:**
- Full-screen embed
- Safe area padding

---

## Key User Flows

### Flow 1: Mini Gratis Path
1. User lands on Landing Screen
2. Taps "Mini Gratis" button
3. Fills 5-field form (Pantalla 2)
4. (Optional) Fills Prep Info (Pantalla 2.5)
5. Taps "Generar Mi Diagnóstico Gratis"
6. Sees Processing Screen (3-5 sec animation)
7. Sees Result Screen with ROI estimate
8. Can download PDF or email result

### Flow 2: Pro 297€ Path
1. User lands on Landing Screen
2. Taps "Pro 297€" button
3. Fills 5-field form (Pantalla 2)
4. Taps "Procesar Análisis Pro"
5. (Future) Payment screen (not in scope for MVP)
6. Sees Processing Screen
7. Sees Result Screen with detailed analysis
8. Can download PDF, email, or book call

---

## Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary Brand | Purple | #3a2459 | Headers, accents |
| Secondary Brand | Pink | #751f82 | Highlights, CTAs |
| CTA Primary (Pro) | Gold | #D4AF37 | "Pro 297€" button |
| CTA Secondary (Mini) | Gray | #6B7280 | "Mini Gratis" button |
| Text Primary | Dark Gray | #11181C | Body text |
| Text Secondary | Medium Gray | #687076 | Labels, hints |
| Text Disabled | Light Gray | #9CA3AF | Disabled states |
| Background | White | #FFFFFF | Main background |
| Surface | Light Gray | #F3F4F6 | Card backgrounds |
| Error | Red | #EF4444 | Validation errors |
| Success | Green | #10B981 | Success messages |

---

## Typography

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Title (H1) | 32pt | Bold (700) | Screen titles |
| Subtitle (H2) | 20pt | Bold (700) | Section headers |
| Body | 16pt | Regular (400) | Main content |
| Body Semibold | 16pt | Semibold (600) | Emphasis |
| Caption | 12pt | Regular (400) | Hints, labels |
| Caption Semibold | 12pt | Semibold (600) | Field labels |

**Line height:** 1.4× font size (minimum)

---

## Spacing & Layout

| Element | Spacing |
|---------|---------|
| Safe area padding | 16pt |
| Field spacing | 16pt |
| Section spacing | 24pt |
| Button height | 48pt (touch target ≥ 44pt) |
| Button padding | 12pt vertical, 24pt horizontal |

---

## Component Style

- **Buttons:** Rounded corners (8-12pt), no shadows (flat design)
- **Cards:** Rounded corners (12-16pt), subtle shadow or border
- **Inputs:** Rounded corners (8pt), border on focus
- **Icons:** 24-28pt for buttons, 20-24pt for inline

---

## Navigation

- **Primary:** Tab-based (if multi-screen app) or stack-based (linear flow)
- **For NextGenFlow App:** Stack-based (linear flow through screens)
- **Gestures:** Swipe back to previous screen (standard iOS)

---

## Accessibility

- **Min touch target:** 44pt × 44pt
- **Color contrast:** WCAG AA (4.5:1 for text)
- **Text scaling:** Support dynamic type (iOS)
- **Dark mode:** Support both light and dark themes

---

## Notes

- **Branding:** All visual elements must use the institutional colors (Purple #3a2459, Pink #751f82)
- **Dual CTA Psychology:** The "Pro 297€" button (gold, larger) is visually dominant to encourage premium conversion, while "Mini Gratis" (gray, smaller) provides a low-friction entry point
- **Data Validation:** Strict validation before submission to ensure DQS ≥ 70 (backend requirement)
- **Webhook Integration:** Form submission triggers a POST to the n8n Webhook with all 5 fields + optional Prep Info fields
- **PDF Generation:** Handled by backend (n8n + GPT-4); app only displays result
- **Email Delivery:** Handled by backend; app provides email input field
