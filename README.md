# Mastra · Lesson 09 · Structured Output Validation and Typed Results

Validate a study-card candidate locally, then use Mastra structuredOutput to generate and consume the same typed contract with a model.

![Lesson 09 application](docs/application-preview.png)

## What this application does

Edit the candidate object and inspect exact Zod issues. Shape validation is real code execution; it does not certify that a plausible summary is factually supported.

**Practical mode:** Actual Zod output-contract validation · no model call.

Local mode validates the submitted object and makes no model call. Live mode uses real Mastra structured output. Both paths distinguish structural validity from factual support.

## Run the application

Use **Node.js 24+**. Each lesson is an independent repository with its own dependency lockfile.

```powershell
git clone https://github.com/luiscoco/Udemy-Mastra-lesson09-app.git
cd Udemy-Mastra-lesson09-app
npm ci
npm start
```

Open **http://127.0.0.1:3209** and choose **Run practical lab**. The practical operation requires no model key. Starting the server does not make a provider request. Keep the terminal open; Ctrl+C stops it. To change the port, set PORT in the environment or local .env file.

## Application pages

| Page | Content |
| --- | --- |
| Application lab | Editable JSON cases, actual execution, formatted result, event log and structured metadata |
| What you will learn | Lesson objectives, comprehension checks and a concrete exercise |
| How to run | Installation, local/live modes, commands and troubleshooting |
| Architecture & workflow | The practical execution sequence and the actual request runner |
| Code walkthrough | Source-derived excerpts with GitHub line references |

The application supports light/dark themes, mobile layouts, sanitized Markdown, syntax-highlighted code and copy-code controls.

## Practical execution workflow

| Stage | Source | Actual behavior |
| --- | --- | --- |
| Validate request envelope | [src/lab.ts](src/lab.ts) | Accept a topic, bounded source text and an unknown candidate object. |
| Validate candidate | [src/mastra/schema.ts](src/mastra/schema.ts) | Run the strict studyCard Zod schema with exactly three key points. |
| Expose findings | [src/lab.ts](src/lab.ts) | Return the validated value or field-level issues; never invent a replacement success object. |
| Review meaning | [src/lab.ts](src/lab.ts) | Keep factualAccuracyVerified=false because schema shape is not factual grounding. |

The browser posts JSON to **POST /api/lab**. The host validates the envelope, runs the lesson implementation and sends NDJSON events. The UI renders the actual result and a separate application outcome. **GET /api/config** exposes public lesson metadata and credential-presence readiness, never credential values.

## Classroom cases and expected outcomes

### 1. Validate a complete study card

```json
{
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
}
```

**Expected:** The exact candidate is accepted as a typed study card; source support still needs review.

### 2. Reject malformed output

```json
{
  "topic": "Mastra tools",
  "sourceText": "A Mastra tool describes an operation, validates its input schema and executes application code.",
  "candidate": {
    "topic": "Mastra tools",
    "summary": 42,
    "keyPoints": [
      "One point"
    ]
  }
}
```

**Expected:** Missing and incorrectly typed fields are reported, without a fabricated fallback object.

## Interpreting the result

- An invalid summary type, missing prerequisite list or wrong key-point count produces Needs attention.
- A valid schema does not prove that the generated claims follow the source.
- A provider/schema failure is not silently converted into success.

**Complete** means the operation met its implemented completion checks. **Needs attention** exposes a business, format or validation finding. **Could not finish** is an execution/request failure. **Cancelled** is a separate user action. Read the evidence before treating any runtime status as task correctness.

## Optional live-agent workflow

1. Call the actual agent.generate() with structuredOutput.schema=studyCard.
2. Read response.object, validate it with the same schema and render the resulting JSON with syntax colors.

The live button uses **POST /api/query** and a real provider, and may incur API usage. Tests use an explicit SDK model adapter; no paid provider call is claimed by the test evidence.

Configure your own credentials locally, preserving any existing .env:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

```dotenv
# Set your own provider credential locally. No credential is copied from another app.
OPENAI_API_KEY=your_api_key
MASTRA_MODEL=openai/gpt-4.1-mini
PORT=3209
```

Choose a model your account can access and restart the server. Credentials remain on the host and are ignored by Git. Existing shell values take precedence over the optional .env file. Provider/model availability and supported parameters must be checked for your selected model.

## Build, samples and verification

```powershell
npm run sample
npm run build
npm test
npm run test:browser
```

- **sample:** executes the default practical case without a provider key.
- **sample:live:** runs an actual provider request after configuration; invoke separately with npm run sample:live.
- **build:** regenerates all five pages, actual-source excerpts, architecture SVG, this README and the browser bundle.
- **test:** typechecks and runs offline local-operation, invalid-input, cancellation, real-SDK adapter, generated-content and HTTP-boundary checks, plus lesson-specific regression cases.
- **test:browser:** uses isolated headless Chrome to execute the real practical lab and its failure case, verify all five pages and mobile layout, check theme persistence, syntax colors and safe Markdown, and save [browser evidence](docs/browser-qa.json). The live-renderer fixture makes no provider request.

Set BROWSER_EXECUTABLE if Chrome/Chromium is not installed at the platform’s standard path. Browser tests are local; GitHub Actions runs npm ci, build and the offline test suite.

## Dependencies

| Runtime package | Pinned version |
| --- | --- |
| @mastra/core | 1.81.0 |
| dompurify | 3.4.17 |
| marked | 18.1.3 |
| zod | 4.6.7 |

The committed package-lock.json fixes the installed dependency tree. A remote model alias is independent of the JavaScript lockfile.

## Student exercise

Create a shape-valid but inaccurate candidate and observe that validation alone does not detect the false claim. Then restore accuracy by comparing the supplied source.

Rebuild after a source change so the explanation pages, line references and README remain consistent with the running code.

## Source and references

- [src/lab.ts](src/lab.ts)
- [src/mastra/schema.ts](src/mastra/schema.ts)
- [src/mastra/agents.ts](src/mastra/agents.ts)
- [src/mastra/index.ts](src/mastra/index.ts)
- [HTTP host](src/server.ts)
- [Execution envelope](src/runner.ts)
- [Page and README generator](scripts/build-pages.ts)
- [Structured output](https://mastra.ai/docs/agents/structured-output)
- [Agent generation](https://mastra.ai/reference/agents/generate)

Prism’s license is included in [public/prism-LICENSE.txt](public/prism-LICENSE.txt).
