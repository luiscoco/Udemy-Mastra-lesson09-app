import { z } from "zod";
import { mastra } from "./mastra/index.js";
import { createTutor } from "./mastra/agents.js";
import { studyCard } from "./mastra/schema.js";
import { assertActive, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
export const inputSchema = z.object({ topic: z.string().trim().min(3).max(120), sourceText: z.string().trim().min(30).max(7000), candidate: z.unknown() }).strict();
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  const input = inputSchema.parse(raw); assertActive(signal); const checked = studyCard.safeParse(input.candidate);
  emit({ type: "stage", text: "Ran the actual study-card Zod schema against the supplied candidate." });
  return { status: checked.success ? "pass" : "needs-attention", summary: checked.success ? "The candidate satisfies the schema. Compare its statements with the source before accepting its meaning." : "The candidate failed schema validation. No replacement success object was invented.",
    data: { validShape: checked.success, value: checked.success ? checked.data : null, issues: checked.success ? [] : checked.error.issues.map(issue => ({ path: issue.path.join("."), message: issue.message })), factualAccuracyVerified: false } };
}
export const liveModel = (_?: unknown) => modelId();
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const input = inputSchema.parse(raw); assertActive(signal);
  const agent = model ? createTutor(model) : mastra.getAgent("tutor");
  emit({ type: "stage", text: "Calling generate() with the real structuredOutput.schema option." });
  const response = await agent.generate(`${question}\nTopic: ${input.topic}\nSource data: ${JSON.stringify(input.sourceText)}`, { maxSteps: 3, abortSignal: signal, modelSettings: { maxOutputTokens: 1400 }, structuredOutput: { schema: studyCard } });
  assertActive(signal); if (response.error) throw response.error;
  const checked = studyCard.safeParse(response.object);
  emit({ type: "answer", text: checked.success ? `## Generated study card\n\n\`\`\`json\n${JSON.stringify(checked.data, null, 2)}\n\`\`\`\n\nShape validated; compare every claim with the source.` : "## Validation failed\n\nNo valid study card was returned." });
  return { finished: response.finishReason === "stop" && checked.success, steps: response.steps.length, details: { schemaValid: checked.success, factualAccuracyVerified: false, finishReason: response.finishReason } };
}
export async function dispose() {}
