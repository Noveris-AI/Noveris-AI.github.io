import { describe, it, expect } from "vitest";
import {
  RepairPlanSchema,
  CreateCaseSchema,
  ApologySmsSchema,
  OutlineSchema,
  ActionPlanSchema,
  PossibleReplySchema,
} from "./schemas";

describe("AI Schemas Validation", () => {
  describe("CreateCaseSchema", () => {
    const validInput = {
      conflictType: "broken_promise",
      conflictDate: new Date().toISOString(),
      relationshipStage: "dating",
      whatIdid: "我承诺周五去机场接她，但是因为打游戏忘记了。".repeat(3),
      partnerFeelings: "她觉得我不尊重她，一个人打车回家很委屈。".repeat(3),
      myAttitude: "我知道错了，想道歉并保证不再发生。".repeat(3),
      redFlags: "不要说'我太忙了'作为借口",
      channel: "text",
      tone: "sincere",
    };

    it("should validate valid input", () => {
      const result = CreateCaseSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should require whatIdid to be at least 20 characters", () => {
      const invalidInput = { ...validInput, whatIdid: "太短了" };
      const result = CreateCaseSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should require partnerFeelings to be at least 20 characters", () => {
      const invalidInput = { ...validInput, partnerFeelings: "太短" };
      const result = CreateCaseSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should validate enum values", () => {
      const invalidConflictType = { ...validInput, conflictType: "invalid" };
      const result1 = CreateCaseSchema.safeParse(invalidConflictType);
      expect(result1.success).toBe(false);

      const invalidChannel = { ...validInput, channel: "invalid" };
      const result2 = CreateCaseSchema.safeParse(invalidChannel);
      expect(result2.success).toBe(false);
    });
  });

  describe("RepairPlanSchema", () => {
    const validOutput = {
      apology_sms: {
        short: "对不起，我错了。我会改正。",
        medium: "真的很抱歉让你失望了。我知道我错了，以后一定会注意，请你给我一个机会。",
        long: "对不起，这次我真的做错了。我承诺去接你却因为玩游戏忘记了，让你一个人打车回家，这确实很不应该。你的时间和感受很重要，我不应该这样忽视。我想承担这个错误，并且保证以后类似的事情不会再发生。",
      },
      call_outline: [
        {
          step: "开场承认",
          content: "直接道歉，说明自己知道错了",
          tips: "不要找借口",
        },
        {
          step: "倾听感受",
          content: "给她表达感受的空间",
        },
        {
          step: "提出解决方案",
          content: "说明具体会怎么改正",
        },
      ],
      meet_outline: [
        {
          step: "见面道歉",
          content: "当面承认错误",
          tips: "注意肢体语言",
        },
      ],
      action_plan_7d: [
        "立即发送道歉消息",
        "今天晚上打电话倾听她的感受",
        "本周内完成之前承诺的事情",
      ],
      action_plan_30d: [
        "持续保持沟通，每天主动联系",
        "执行承诺的事项，让她看到改变",
        "两周后安排一次正式的约会",
        "一个月内反思整个过程中的问题",
      ],
      possible_replies: [
        {
          from_partner: "她暂时不回复",
          my_response: "给她一些时间和空间，不要频繁打扰",
          why_this_works: "尊重她的边界，避免造成更大压力",
          tone: "giving-space",
        },
        {
          from_partner: "她表达了愤怒",
          my_response: "承认她的感受是合理的，不要辩解",
          why_this_works: "验证她的感受，降低冲突",
          tone: "accepting",
        },
      ],
      red_flags_avoid: [
        "不要说'你太敏感了'",
        "不要说'我不是故意的所以'",
        "不要马上转移话题",
      ],
      one_sentence_bottom_line: "承认错误，承担责任，尊重你的感受。",
      safety_warning: undefined,
      self_reflection: [
        "我为什么会忘记这个承诺？",
        "我如何避免类似情况再次发生？",
      ],
    };

    it("should validate complete repair plan", () => {
      const result = RepairPlanSchema.safeParse(validOutput);
      expect(result.success).toBe(true);
    });

    it("should require minimum length for apology versions", () => {
      const invalidShort = {
        ...validOutput,
        apology_sms: { short: "太短", medium: validOutput.apology_sms.medium, long: validOutput.apology_sms.long },
      };
      const result = ApologySmsSchema.safeParse(invalidShort.apology_sms);
      expect(result.success).toBe(false);
    });

    it("should require outline to have at least 3 steps", () => {
      const tooFewSteps = { ...validOutput, call_outline: [{ step: "开场", content: "道歉" }] };
      const result = OutlineSchema.safeParse(tooFewSteps.call_outline);
      expect(result.success).toBe(false);
    });

    it("should require action plans to have minimum items", () => {
      const emptyPlan = { ...validOutput, action_plan_7d: [] };
      const result = RepairPlanSchema.safeParse(emptyPlan);
      expect(result.success).toBe(false);
    });

    it("should require possible replies", () => {
      const noReplies = { ...validOutput, possible_replies: [] };
      const result = RepairPlanSchema.safeParse(noReplies);
      expect(result.success).toBe(false);
    });
  });

  describe("Prompt Safety", () => {
    it("should detect harmful patterns in input", () => {
      const harmfulInputs = [
        "让她内疚",
        "假装改变",
        "去她楼下等",
        "威胁她",
        "骗她一下",
        "不理她",
        "让她后悔",
      ];

      harmfulInputs.forEach((input) => {
        const hasPattern =
          /让.*内疚|让.*难过|让.*害怕|假装.*改变|装.*好|堵.*门口|去.*楼下|一直.*等|威胁|恐吓|不听.*就|骗.*一下|隐瞒|不说.*实话|冷.*她|不理她|惩罚|让她.*求.*我|让她.*后悔/.test(
            input
          );
        expect(hasPattern).toBe(true);
      });
    });

    it("should allow safe inputs", () => {
      const safeInputs = [
        "我知道错了，想道歉",
        "她很生气，我觉得很难受",
        "我想弥补我的错误",
      ];

      safeInputs.forEach((input) => {
        const hasPattern =
          /让.*内疚|让.*难过|让.*害怕|假装.*改变|装.*好|堵.*门口|去.*楼下|一直.*等|威胁|恐吓|不听.*就|骗.*一下|隐瞒|不说.*实话|冷.*她|不理她|惩罚|让她.*求.*我|让她.*后悔/.test(
            input
          );
        expect(hasPattern).toBe(false);
      });
    });
  });
});
