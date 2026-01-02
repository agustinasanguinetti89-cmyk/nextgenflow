import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

app.use(cors());
app.use(express.json());

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface DiagnosisFormData {
  empresa: string;
  rol: string;
  horas: number;
  presupuesto: string;
  problema: string;
  plan: 'mini' | 'pro';
  prepInfo?: {
    sector?: string;
    teamSize?: string;
    tools?: string[];
    urgency?: string;
    notes?: string;
  };
}

interface DiagnosisResponse {
  success: boolean;
  dqsScore: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  accuracy: string;
  estimatedROI: number;
  processes: string[];
  processingTime: string;
  timestamp: string;
  message?: string;
  error?: string;
}

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Calculate DQS (Data Quality Score)
 * 5 dimensiones ponderadas:
 * - Accuracy (30%): empresa + rol filled properly
 * - Completeness (25%): all 5 required fields
 * - Consistency (20%): data makes sense together
 * - Timeliness (15%): submitted on time
 * - Validity (10%): constraints met (horas 1-40, etc)
 */
function calculateDQS(data: DiagnosisFormData): {
  score: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  accuracy: string;
} {
  // Accuracy: empresa + rol filled and min length
  const accuracyScore =
    (data.empresa && data.empresa.length >= 3 ? 0.5 : 0) +
    (data.rol && data.rol.length > 0 ? 0.5 : 0);

  // Completeness: all 5 required fields
  const requiredFields = ['empresa', 'rol', 'horas', 'presupuesto', 'problema'];
  const filledFields = requiredFields.filter((field) => {
    const value = data[field as keyof DiagnosisFormData];
    return value !== null && value !== undefined && String(value).trim().length > 0;
  }).length;
  const completenessScore = filledFields / requiredFields.length;

  // Consistency: data makes logical sense
  let consistencyScore = 0;
  if (data.horas >= 1 && data.horas <= 40) consistencyScore += 0.5;
  if (data.problema && data.problema.length >= 20) consistencyScore += 0.5;

  // Timeliness: assume submitted on time
  const timelinessScore = 1;

  // Validity: constraints met
  let validityScore = 0;
  if (data.horas >= 1 && data.horas <= 40) validityScore += 0.5;
  if (data.presupuesto && data.presupuesto.length > 0) validityScore += 0.5;

  // Weighted sum (0-1)
  const dqs =
    accuracyScore * 0.3 +
    completenessScore * 0.25 +
    consistencyScore * 0.2 +
    timelinessScore * 0.15 +
    validityScore * 0.1;

  // Convert to 0-100
  const score = Math.round(dqs * 100);

  // Determine tier
  let tier: 'Bronze' | 'Silver' | 'Gold';
  if (score >= 85) {
    tier = 'Gold';
  } else if (score >= 70) {
    tier = 'Silver';
  } else {
    tier = 'Bronze';
  }

  return {
    score,
    tier,
    accuracy: `${score}%`,
  };
}

/**
 * Get estimated processes based on role
 */
function getProcessesByRole(rol: string, limit: number = 5): string[] {
  const processesByRole: Record<string, string[]> = {
    'CEO / Founder': [
      'Strategic Planning Automation',
      'Financial Dashboard',
      'Sales Pipeline Management',
      'Weekly Reporting',
      'Stakeholder Updates',
    ],
    'Director Operaciones': [
      'Project Timeline Tracking',
      'Resource Allocation',
      'Risk Management',
      'Vendor Management',
      'Team Performance Metrics',
    ],
    'PM / Project Manager': [
      'Milestone Tracking',
      'Sprint Planning',
      'Backlog Prioritization',
      'Stakeholder Communication',
      'Resource Planning',
    ],
    'Marketing Manager': [
      'Campaign Scheduling',
      'Lead Scoring',
      'Content Calendar',
      'Performance Analytics',
      'Social Media Management',
    ],
    'CFO / Director Finanzas': [
      'Revenue Forecasting',
      'Budget Variance Analysis',
      'Cash Flow Projection',
      'Invoice Tracking',
      'Financial Reporting',
    ],
  };

  const processes = processesByRole[rol] || [
    'Process Optimization',
    'Data Integration',
    'Workflow Automation',
  ];

  return processes.slice(0, limit);
}

/**
 * Calculate estimated ROI based on hours
 */
function estimateROI(horas: number): number {
  // Base: €500
  // Per hour: €30
  const baseROI = 500;
  const hourlyRate = 30;
  return baseROI + horas * hourlyRate;
}

// ═══════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════

/**
 * Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: '✅ Mock backend is running',
  });
});

/**
 * Main diagnosis endpoint
 * POST /api/diagnosis
 *
 * Body:
 * {
 *   "empresa": "Acme Corp",
 *   "rol": "CEO / Founder",
 *   "horas": 20,
 *   "presupuesto": "5.000-10.000€",
 *   "problema": "Gastamos 20 horas semanales en reportes manuales...",
 *   "plan": "pro"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "dqsScore": 78,
 *   "tier": "Silver",
 *   "accuracy": "78%",
 *   "estimatedROI": 1100,
 *   "processes": [...],
 *   "processingTime": "2 seconds",
 *   "timestamp": "2026-01-02T20:01:00.000Z"
 * }
 */
app.post('/api/diagnosis', (req: Request, res: Response) => {
  try {
    const data: DiagnosisFormData = req.body;

    // ═══════════════════════════════════════════════════════════
    // VALIDATION
    // ═══════════════════════════════════════════════════════════

    if (!data.empresa || data.empresa.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing or empty field: empresa',
      });
    }

    if (!data.rol || data.rol.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing or empty field: rol',
      });
    }

    if (data.horas === undefined || data.horas === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing field: horas',
      });
    }

    if (typeof data.horas !== 'number' || data.horas < 1 || data.horas > 40) {
      return res.status(400).json({
        success: false,
        error: 'Field horas must be a number between 1 and 40',
      });
    }

    if (!data.presupuesto || data.presupuesto.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing or empty field: presupuesto',
      });
    }

    if (!data.problema || data.problema.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing or empty field: problema',
      });
    }

    if (data.problema.length < 20) {
      return res.status(400).json({
        success: false,
        error: 'Field problema must be at least 20 characters',
      });
    }

    if (!data.plan || (data.plan !== 'mini' && data.plan !== 'pro')) {
      return res.status(400).json({
        success: false,
        error: 'Field plan must be "mini" or "pro"',
      });
    }

    // ═══════════════════════════════════════════════════════════
    // PROCESS
    // ═══════════════════════════════════════════════════════════

    // Calculate DQS
    const { score, tier, accuracy } = calculateDQS(data);

    // Get processes (1 for mini, 5 for pro)
    const processCount = data.plan === 'pro' ? 5 : 1;
    const processes = getProcessesByRole(data.rol, processCount);

    // Estimate ROI
    const estimatedROI = estimateROI(data.horas);

    // Log for debugging
    console.log(`📊 Diagnosis processed:`);
    console.log(`   Empresa: ${data.empresa}`);
    console.log(`   Rol: ${data.rol}`);
    console.log(`   Horas: ${data.horas}`);
    console.log(`   Plan: ${data.plan}`);
    console.log(`   DQS Score: ${score} (${tier})`);
    console.log(`   ROI: €${estimatedROI}/month`);
    console.log(`   Processes: ${processCount}`);

    // Simulate processing time (1-3 seconds)
    const processingTimeMs = Math.random() * 2000 + 1000;
    const processingTimeSeconds = Math.ceil(processingTimeMs / 1000);

    // Build response
    const response: DiagnosisResponse = {
      success: true,
      dqsScore: score,
      tier,
      accuracy,
      estimatedROI,
      processes,
      processingTime: `${processingTimeSeconds} seconds`,
      timestamp: new Date().toISOString(),
      message: `✅ Diagnosis completed in ${processingTimeSeconds}s`,
    };

    // Simulate network delay (optional)
    setTimeout(() => {
      res.json(response);
    }, processingTimeMs);

  } catch (error) {
    console.error('❌ Error processing diagnosis:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: (error as any).message,
    });
  }
});

/**
 * Echo endpoint (for testing)
 */
app.post('/api/echo', (req: Request, res: Response) => {
  res.json({
    echo: req.body,
    timestamp: new Date().toISOString(),
  });
});

// ═══════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.path}`,
  });
});

app.use((err: any, req: Request, res: Response) => {
  console.error('🔴 Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// ═══════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    🚀 MOCK BACKEND STARTED                     ║
╚════════════════════════════════════════════════════════════════╝

📍 Base URL: http://localhost:${PORT}

📝 Endpoints:
   GET    /health                    Health check
   POST   /api/diagnosis             Process diagnosis form
   POST   /api/echo                  Echo test (debugging)

🧪 Test with cURL:
   curl -X POST http://localhost:${PORT}/api/diagnosis \\
     -H "Content-Type: application/json" \\
     -d '{
       "empresa": "Test Corp",
       "rol": "CEO / Founder",
       "horas": 20,
       "presupuesto": "5.000-10.000€",
       "problema": "We spend 20 hours per week on manual reporting and it is killing our productivity",
       "plan": "pro"
     }'

📊 DQS Calculation:
   - Accuracy (30%): empresa + rol filled
   - Completeness (25%): all 5 fields
   - Consistency (20%): data logical
   - Timeliness (15%): on time
   - Validity (10%): constraints met

🎯 Min DQS for processing: 70

═══════════════════════════════════════════════════════════════════

  ✅ Ready to receive requests from Expo app on http://localhost:3001

═══════════════════════════════════════════════════════════════════
  `);
});
