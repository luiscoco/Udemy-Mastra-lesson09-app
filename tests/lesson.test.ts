import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("invalid study card reports issues without a fabricated success object", async () => {
  const result = await run(LESSON.examples[1].input);
  const data = result.data as { validShape: boolean; value: unknown; issues: { path: string }[]; factualAccuracyVerified: boolean };
  assert.equal(result.status, "needs-attention"); assert.equal(data.validShape, false); assert.equal(data.value, null);
  assert(data.issues.some(issue => issue.path === "summary")); assert.equal(data.factualAccuracyVerified, false);
});
