import { z } from "zod";

// ─── Enum Schemas ────────────────────────────────────────────────────────────

export const FrictionDimensionSchema = z.enum([
  "client_friction",
  "internal_bureaucracy",
  "knowledge_gap",
  "conflict_avoidance",
]);

export const SDLCPhaseSchema = z.enum([
  "discovery",
  "requirements",
  "design",
  "development",
  "testing",
  "launch",
  "maintenance",
]);

export const DesignationSchema = z.enum([
  "sales",
  "pm",
  "developer",
  "qa",
  "designer",
  "ba",
  "crm",
  "strategy",
]);

// ─── Nested Object Schemas ───────────────────────────────────────────────────

export const CrossRoleImpactSchema = z.object({
  affectedRole: DesignationSchema,
  affectedPhase: SDLCPhaseSchema,
  description: z.string().min(1),
  severity: z.enum(["low", "medium", "high"]),
});

export const ChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  frictionTag: FrictionDimensionSchema,
  // Required array — empty is allowed, but the field must be present
  crossRoleImpact: z.array(CrossRoleImpactSchema),
});

export const DebriefSchema = z.object({
  whatHappened: z.string().min(1),
  why: z.string().min(1),
  how: z.string().min(1),
  whoBecame: z.string().min(1),
  tomorrowAction: z.string().min(1),
});

// ─── Root Scenario Schema ────────────────────────────────────────────────────

export const ScenarioConfigSchema = z.object({
  id: z.string().min(1),
  role: DesignationSchema,
  phase: SDLCPhaseSchema,
  frictionDimension: FrictionDimensionSchema,
  title: z.string().min(1),
  setup: z.string().min(1),
  choices: z.array(ChoiceSchema).min(2),
  debrief: DebriefSchema,
});

// ─── Derived TypeScript Types (for import convenience) ───────────────────────

export type ScenarioConfig = z.infer<typeof ScenarioConfigSchema>;

// ─── Validation Function ─────────────────────────────────────────────────────

/**
 * Validates a raw unknown value against ScenarioConfigSchema.
 * Throws a descriptive Error on failure (includes file path and Zod issue details).
 * Returns a fully typed ScenarioConfig on success.
 */
export function validateScenario(raw: unknown, filePath?: string): ScenarioConfig {
  const result = ScenarioConfigSchema.safeParse(raw);
  if (!result.success) {
    const location = filePath ? ` in ${filePath}` : "";
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `[validateScenario] Invalid scenario${location}:\n${issues}`
    );
  }
  return result.data;
}
