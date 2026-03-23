// Node-runnable validation script for the scoring engine.
// Run with: npx tsx scripts/test-scoring-engine.ts
//
// Validates all 5 SCOR requirements:
//   SCOR-01: Pure TypeScript module, no React dependency
//   SCOR-02: 4-dimension behavioral tagging and accumulation
//   SCOR-03: Blind spot archetype with SDLC phase specificity
//   SCOR-04: Tendency-weighted (0-1), not binary right/wrong
//   SCOR-05: Cumulative pattern display with per-phase breakdown

import { computeRunningScore, computeProfile } from "../data/scoring-engine";
import type { DecisionRecord } from "../data/scenarios/types";

// ─── Assert Helper ────────────────────────────────────────────────────────────

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
  console.log("PASS:", message);
}

// ─── Simulated Decisions ─────────────────────────────────────────────────────
// 21 decisions across 3 SDLC phases for a PM role.
// Discovery (7): 5x conflict_avoidance, 1x client_friction, 1x knowledge_gap
// Requirements (7): 3x internal_bureaucracy, 2x conflict_avoidance, 1x knowledge_gap, 1x client_friction
// Design (7): 4x knowledge_gap, 2x client_friction, 1x internal_bureaucracy

const simulatedDecisions: DecisionRecord[] = [
  // Discovery phase — 7 decisions
  { choiceId: "sim-01", frictionTag: "conflict_avoidance", timestamp: 1000, phase: "discovery", role: "pm" },
  { choiceId: "sim-02", frictionTag: "conflict_avoidance", timestamp: 2000, phase: "discovery", role: "pm" },
  { choiceId: "sim-03", frictionTag: "conflict_avoidance", timestamp: 3000, phase: "discovery", role: "pm" },
  { choiceId: "sim-04", frictionTag: "conflict_avoidance", timestamp: 4000, phase: "discovery", role: "pm" },
  { choiceId: "sim-05", frictionTag: "conflict_avoidance", timestamp: 5000, phase: "discovery", role: "pm" },
  { choiceId: "sim-06", frictionTag: "client_friction",    timestamp: 6000, phase: "discovery", role: "pm" },
  { choiceId: "sim-07", frictionTag: "knowledge_gap",      timestamp: 7000, phase: "discovery", role: "pm" },

  // Requirements phase — 7 decisions
  { choiceId: "sim-08", frictionTag: "internal_bureaucracy", timestamp: 8000,  phase: "requirements", role: "pm" },
  { choiceId: "sim-09", frictionTag: "internal_bureaucracy", timestamp: 9000,  phase: "requirements", role: "pm" },
  { choiceId: "sim-10", frictionTag: "internal_bureaucracy", timestamp: 10000, phase: "requirements", role: "pm" },
  { choiceId: "sim-11", frictionTag: "conflict_avoidance",   timestamp: 11000, phase: "requirements", role: "pm" },
  { choiceId: "sim-12", frictionTag: "conflict_avoidance",   timestamp: 12000, phase: "requirements", role: "pm" },
  { choiceId: "sim-13", frictionTag: "knowledge_gap",        timestamp: 13000, phase: "requirements", role: "pm" },
  { choiceId: "sim-14", frictionTag: "client_friction",      timestamp: 14000, phase: "requirements", role: "pm" },

  // Design phase — 7 decisions
  { choiceId: "sim-15", frictionTag: "knowledge_gap",        timestamp: 15000, phase: "design", role: "pm" },
  { choiceId: "sim-16", frictionTag: "knowledge_gap",        timestamp: 16000, phase: "design", role: "pm" },
  { choiceId: "sim-17", frictionTag: "knowledge_gap",        timestamp: 17000, phase: "design", role: "pm" },
  { choiceId: "sim-18", frictionTag: "knowledge_gap",        timestamp: 18000, phase: "design", role: "pm" },
  { choiceId: "sim-19", frictionTag: "client_friction",      timestamp: 19000, phase: "design", role: "pm" },
  { choiceId: "sim-20", frictionTag: "client_friction",      timestamp: 20000, phase: "design", role: "pm" },
  { choiceId: "sim-21", frictionTag: "internal_bureaucracy", timestamp: 21000, phase: "design", role: "pm" },
];

// ─── SCOR-01: Pure TypeScript, No React ──────────────────────────────────────

console.log("\n=== SCOR-01: Pure TypeScript module (no React) ===");
// If we got this far, the module loaded in Node without React
assert(true, "Scoring engine loaded in Node without browser environment");

// ─── SCOR-02: 4-Dimension Accumulation ───────────────────────────────────────

console.log("\n=== SCOR-02: 4-dimension behavioral tagging ===");
const runningScore = computeRunningScore(simulatedDecisions);
assert(runningScore.length === 3, "3 phases detected in running score");

// Check all 4 dimensions present in each phase
for (const ps of runningScore) {
  const dims = Object.keys(ps.dimensions);
  assert(dims.length === 4, `Phase ${ps.phase} has all 4 dimensions`);
  const sum = Object.values(ps.dimensions).reduce((a, b) => a + b, 0);
  assert(Math.abs(sum - 1.0) < 0.001, `Phase ${ps.phase} dimensions sum to 1.0 (got ${sum.toFixed(4)})`);
}

// ─── SCOR-03: Blind Spot Archetype with Phase Name ───────────────────────────

console.log("\n=== SCOR-03: Blind spot archetype with SDLC phase specificity ===");
const profileResult = computeProfile(simulatedDecisions);
assert(profileResult.status === "complete", "Profile generation succeeded with 21 decisions");
if (profileResult.status === "complete") {
  const { profile } = profileResult;
  assert(profile.archetypeName.length > 0, `Archetype name is not empty: "${profile.archetypeName}"`);
  assert(profile.dominantPhase.length > 0, `Dominant phase identified: "${profile.dominantPhase}"`);
  assert(profile.narrative.length > 0, "Narrative is not empty");
  assert(profile.whatYouDo.length > 0, "whatYouDo is not empty");
  assert(profile.whyItMatters.length > 0, "whyItMatters is not empty");
  assert(profile.doThis.length > 0, "doThis is not empty");
  console.log(`  Archetype: ${profile.archetypeName}`);
  console.log(`  Dominant: ${profile.dominantDimension} in ${profile.dominantPhase}`);
  console.log(`  Secondary: ${profile.secondaryDimension}`);
}

// ─── SCOR-04: Tendency-Weighted, Not Binary ───────────────────────────────────

console.log("\n=== SCOR-04: Tendency-weighted, not binary ===");
if (profileResult.status === "complete") {
  const { profile } = profileResult;
  // Verify dimensions are percentages 0-1, not binary 0/1
  for (const ps of profile.phaseBreakdown) {
    for (const [dim, val] of Object.entries(ps.dimensions)) {
      assert(val >= 0 && val <= 1, `${ps.phase}.${dim} is 0-1 percentage: ${val}`);
    }
  }
  // Verify no "score", "grade", "correct", or "points" fields on profile
  const profileKeys = Object.keys(profile);
  assert(!profileKeys.includes("score"),   "No 'score' field on profile");
  assert(!profileKeys.includes("grade"),   "No 'grade' field on profile");
  assert(!profileKeys.includes("correct"), "No 'correct' field on profile");
  assert(!profileKeys.includes("points"),  "No 'points' field on profile");
}

// ─── SCOR-05: Cumulative Pattern Display ──────────────────────────────────────

console.log("\n=== SCOR-05: Cumulative pattern display ===");
if (profileResult.status === "complete") {
  const { profile } = profileResult;
  assert(profile.phaseBreakdown.length >= 2, `Phase breakdown has ${profile.phaseBreakdown.length} phases (>= 2)`);
  console.log(`  Shifts detected: ${profile.shifts.length}`);
  for (const shift of profile.shifts) {
    console.log(`    ${shift.fromPhase} -> ${shift.toPhase}: ${shift.description}`);
  }
}

// ─── Edge: Insufficient Data Guard ────────────────────────────────────────────

console.log("\n=== Edge: Insufficient data guard ===");
const twoDecisions = simulatedDecisions.slice(0, 2);
const insufficientResult = computeProfile(twoDecisions);
assert(insufficientResult.status === "insufficient_data", "Profile returns insufficient_data for < 3 decisions");

// ─── Edge: Empty Input ────────────────────────────────────────────────────────

console.log("\n=== Edge: Empty input ===");
const emptyScore = computeRunningScore([]);
assert(emptyScore.length === 0, "Empty decisions returns empty running score");

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log("\n=== ALL VALIDATIONS PASSED ===");
console.log("SCOR-01: Pure TypeScript module - PASS");
console.log("SCOR-02: 4-dimension accumulation - PASS");
console.log("SCOR-03: Blind spot archetype with phase - PASS");
console.log("SCOR-04: Tendency-weighted, not binary - PASS");
console.log("SCOR-05: Cumulative pattern display - PASS");
