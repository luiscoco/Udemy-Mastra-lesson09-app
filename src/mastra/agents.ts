import { makeAgent, type AgentModel } from "../core.js";
export const instructions = "Create a study card grounded only in the supplied source. Supply the required topic, summary, prerequisites and exactly three key points. Do not fabricate supporting facts.";
export function createTutor(model?: AgentModel) { return makeAgent("lesson-9-tutor", "Lesson 9 tutor", instructions, model); }
export const tutor = createTutor();
