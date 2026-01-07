import { z } from "zod";

/**
 * Zod schemas for AI output validation
 * Ensures structured, complete responses from LLM
 */

// Apology message versions
export const ApologySmsSchema = z.object({
  short: z.string().min(10, "Short version too brief").max(100, "Short version too long"),
  medium: z.string().min(30, "Medium version too brief").max(300, "Medium version too long"),
  long: z.string().min(100, "Long version too brief").max(800, "Long version too long"),
});

// Communication outline (call or in-person)
export const OutlineSchema = z.array(
  z.object({
    step: z.string(),
    content: z.string(),
    tips: z.string().optional(),
  })
).min(3, "Outline must have at least 3 steps").max(10, "Outline too long");

// Action plan items
export const ActionPlanSchema = z.object({
  immediate: z.array(z.string().min(10)).min(1).max(5),
  week1: z.array(z.string().min(10)).min(1).max(5),
  week2_4: z.array(z.string().min(10)).min(1).max(5),
  verification: z.array(z.string().min(10)).min(1).max(3), // How partner can verify
});

// Possible reply from partner and suggested response
export const PossibleReplySchema = z.object({
  fromPartner: z.string().min(10),
  myResponse: z.string().min(20),
  whyThisWorks: z.string().min(10),
  tone: z.enum(["accepting", "apologetic", "understanding", "giving-space"]),
});

// Red flags to avoid
export const RedFlagsSchema = z.array(z.string().min(10)).min(1).max(10);

// Main response schema
export const RepairPlanSchema = z.object({
  // Apology messages for different channels
  apology_sms: ApologySmsSchema,

  // Communication outlines
  call_outline: OutlineSchema,
  meet_outline: OutlineSchema,

  // Action plans
  action_plan_7d: z.array(z.string().min(10)).min(3).max(7),
  action_plan_30d: z.array(z.string().min(10)).min(3).max(10),

  // Possible responses to partner reactions
  possible_replies: z.array(PossibleReplySchema).min(2).max(6),

  // What NOT to say/do
  red_flags_avoid: RedFlagsSchema,

  // Bottom line summary
  one_sentence_bottom_line: z.string().min(20).max(200),

  // Safety warnings (if needed)
  safety_warning: z.string().optional(),

  // Self-reflection questions for user
  self_reflection: z.array(z.string().min(15)).min(2).max(5).optional(),
});

// Input validation schemas
export const CreateCaseSchema = z.object({
  conflictType: z.enum([
    "lie",
    "broken_promise",
    "cold_violence",
    "verbal_hurt",
    "boundary_issue",
    "forget_important",
    "other",
  ]),
  conflictDate: z.string().datetime(),
  relationshipStage: z.enum([
    "flirting",
    "dating",
    "living_together",
    "long_distance",
    "engaged",
    "married",
    "near_breakup",
  ]),
  whatIdid: z.string().min(20, "Please provide more details").max(5000),
  partnerFeelings: z.string().min(20, "Please describe their feelings").max(5000),
  myAttitude: z.string().min(20, "Please describe your attitude").max(5000),
  redFlags: z.string().max(1000).optional(),
  channel: z.enum(["text", "phone", "in_person", "unsure"]),
  tone: z.enum(["sincere", "gentle", "formal", "casual"]).default("sincere"),
});

export const RegenerateSchema = z.object({
  caseId: z.string().cuid(),
  tone: z.enum(["sincere", "gentle", "formal", "casual"]).optional(),
  feedback: z.string().max(1000).optional(), // What to adjust
});

// Types exported from schemas
export type RepairPlan = z.infer<typeof RepairPlanSchema>;
export type CreateCaseInput = z.infer<typeof CreateCaseSchema>;
export type RegenerateInput = z.infer<typeof RegenerateSchema>;
export type ApologySms = z.infer<typeof ApologySmsSchema>;
export type OutlineStep = z.infer<typeof OutlineSchema>[0];
export type ActionPlan = z.infer<typeof ActionPlanSchema>;
export type PossibleReply = z.infer<typeof PossibleReplySchema>;
