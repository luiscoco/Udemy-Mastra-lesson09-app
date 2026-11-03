import { z } from "zod";
export const studyCard = z.object({
  topic: z.string().trim().min(3).max(120),
  summary: z.string().trim().min(20).max(600),
  prerequisites: z.array(z.string().trim().min(1).max(120)).max(5),
  keyPoints: z.array(z.string().trim().min(5).max(240)).length(3),
}).strict();
export type StudyCard = z.infer<typeof studyCard>;
