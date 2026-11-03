import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 9,
  "title": "Structured Output Validation and Typed Results",
  "shortTitle": "Structured output",
  "eyebrow": "SCHEMA · VALIDATE · CONSUME",
  "hero": "Turn an answer into",
  "accent": "typed data.",
  "description": "Validate a study-card candidate locally, then use Mastra structuredOutput to generate and consume the same typed contract with a model.",
  "labTitle": "Validate a study card",
  "labDescription": "Edit the candidate object and inspect exact Zod issues. Shape validation is real code execution; it does not certify that a plausible summary is factually supported.",
  "localMode": "Actual Zod output-contract validation · no model call",
  "defaultQuestion": "Create a study card from the supplied source passage, without adding unsupported claims.",
  "objectives": [
    {
      "title": "Define the output contract",
      "text": "The study-card schema requires a topic, summary, prerequisites and exactly three key points. The TypeScript result type is inferred from that schema."
    },
    {
      "title": "Reject malformed candidates",
      "text": "Wrong types, missing fields and extra keys produce explicit validation issues. The app does not silently substitute success data."
    },
    {
      "title": "Generate structured data",
      "text": "The live path calls generate with structuredOutput.schema and reads response.object, using the actual Mastra API."
    },
    {
      "title": "Validate the returned object",
      "text": "The same contract checks model output before the application presents typed data. It does not scrape JSON from prose with a regex."
    },
    {
      "title": "Separate shape from truth",
      "text": "A structurally valid but inaccurate summary can still pass. Compare the study card with the supplied passage as a separate review."
    },
    {
      "title": "Review consumers when the schema changes",
      "text": "Field names and constraints affect the UI and downstream logic. Regenerate source-linked pages and rerun tests after changing the contract."
    }
  ],
  "workflow": [
    "Validate topic and source input",
    "Parse the candidate or request model generation",
    "Apply the study-card Zod schema",
    "Expose exact structural findings",
    "Consume a validated typed object",
    "Compare claims with the source passage"
  ],
  "scope": "Local mode validates the submitted object and makes no model call. Live mode uses real Mastra structured output. Both paths distinguish structural validity from factual support.",
  "examples": [
    {
      "name": "Validate a complete study card",
      "input": {
        "topic": "Mastra tools",
        "sourceText": "A Mastra tool describes an operation, validates its input schema and executes application code. Its result can supply evidence to an agent.",
        "candidate": {
          "topic": "Mastra tools",
          "summary": "Tools expose typed application operations to an agent.",
          "prerequisites": [
            "TypeScript basics"
          ],
          "keyPoints": [
            "Descriptions guide tool selection",
            "Schemas validate supplied input",
            "Application code performs the operation"
          ]
        }
      },
      "expected": "The exact candidate is accepted as a typed study card; source support still needs review."
    },
    {
      "name": "Reject malformed output",
      "input": {
        "topic": "Mastra tools",
        "sourceText": "A Mastra tool describes an operation, validates its input schema and executes application code.",
        "candidate": {
          "topic": "Mastra tools",
          "summary": 42,
          "keyPoints": [
            "One point"
          ]
        }
      },
      "expected": "Missing and incorrectly typed fields are reported, without a fabricated fallback object."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/schema.ts",
    "src/mastra/agents.ts",
    "src/mastra/index.ts"
  ],
  "exercise": "Create a shape-valid but inaccurate candidate and observe that validation alone does not detect the false claim. Then restore accuracy by comparing the supplied source.",
  "checks": [
    {
      "question": "Does structured output guarantee truth?",
      "answer": "No. It constrains output shape. The result's claims still need task- and source-level evaluation."
    },
    {
      "question": "Where does the live object come from?",
      "answer": "The implementation reads response.object from Mastra's structuredOutput generation and validates it with the shared schema."
    },
    {
      "question": "Should a failed parse be labelled successful with a default object?",
      "answer": "No. This app reports the failure boundary rather than silently treating fallback data as a valid model result."
    }
  ],
  "docs": [
    {
      "title": "Structured output",
      "url": "https://mastra.ai/docs/agents/structured-output"
    },
    {
      "title": "Agent generation",
      "url": "https://mastra.ai/reference/agents/generate"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Validate request envelope",
      "component": "src/lab.ts",
      "behavior": "Accept a topic, bounded source text and an unknown candidate object."
    },
    {
      "step": "Validate candidate",
      "component": "src/mastra/schema.ts",
      "behavior": "Run the strict studyCard Zod schema with exactly three key points."
    },
    {
      "step": "Expose findings",
      "component": "src/lab.ts",
      "behavior": "Return the validated value or field-level issues; never invent a replacement success object."
    },
    {
      "step": "Review meaning",
      "component": "src/lab.ts",
      "behavior": "Keep factualAccuracyVerified=false because schema shape is not factual grounding."
    }
  ],
  "liveWorkflow": [
    "Call the actual agent.generate() with structuredOutput.schema=studyCard.",
    "Read response.object, validate it with the same schema and render the resulting JSON with syntax colors."
  ],
  "outcomeNotes": [
    "An invalid summary type, missing prerequisite list or wrong key-point count produces Needs attention.",
    "A valid schema does not prove that the generated claims follow the source.",
    "A provider/schema failure is not silently converted into success."
  ]
} satisfies LessonMetadata;
