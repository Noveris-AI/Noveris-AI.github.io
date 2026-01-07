"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NewCasePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    conflictType: "",
    conflictDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    relationshipStage: "",
    whatIdid: "",
    partnerFeelings: "",
    myAttitude: "",
    redFlags: "",
    channel: "unsure",
    tone: "sincere",
  });

  // Auth check - 如果没有配置 Supabase，跳过认证
  const [checkingAuth, setCheckingAuth] = useState(
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.conflictType || !formData.relationshipStage ||
        !formData.whatIdid || !formData.partnerFeelings || !formData.myAttitude) {
      toast({
        title: "请填写所有必填项",
        description: "这些信息对生成个性化方案很重要",
        variant: "destructive",
      });
      return;
    }

    if (formData.whatIdid.length < 20) {
      toast({
        title: "描述太简短",
        description: "请至少提供20字的描述，帮助AI更好地理解情况",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // 如果没有配置 Supabase，暂时使用 demo 模式
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        toast({
          title: "演示模式",
          description: "未配置 Supabase，将使用模拟数据",
          variant: "default",
        });
        // 暂时跳过真实创建
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "演示模式：案例已创建",
          description: "由于未配置 Supabase，这只是一个演示",
        });
        return;
      }

      // Create case via API
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "创建失败");
      }

      toast({
        title: "案例创建成功",
        description: "正在生成修复方案...",
      });

      // Redirect to the case page
      router.push(`/case/${data.caseId}`);
    } catch (error) {
      console.error("Error creating case:", error);
      toast({
        title: "创建失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-semibold">创建修复方案</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Info card */}
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                填写提示
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• 越详细、越诚实的描述，生成的方案越有效</p>
              <p>• 承认错误比美化自己更有帮助</p>
              <p>• AI 会基于你的输入生成个性化内容，不是通用模板</p>
              <p>• 所有输入仅用于生成建议，可随时删除</p>
              {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
                <p className="text-amber-600 dark:text-amber-400 mt-2 pt-2 border-t">
                  ⚠️ 演示模式：未配置 Supabase，数据不会被保存
                </p>
              )}
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>描述你的情况</CardTitle>
              <CardDescription>
                带星号(*)的为必填项
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Conflict Type */}
                <div className="space-y-2">
                  <Label htmlFor="conflictType">
                    冲突类型 <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.conflictType}
                    onValueChange={(value) => setFormData({ ...formData, conflictType: value })}
                  >
                    <SelectTrigger id="conflictType">
                      <SelectValue placeholder="选择最符合的类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lie">撒谎/隐瞒</SelectItem>
                      <SelectItem value="broken_promise">违背承诺/失约</SelectItem>
                      <SelectItem value="cold_violence">冷暴力/忽视</SelectItem>
                      <SelectItem value="verbal_hurt">言语伤害</SelectItem>
                      <SelectItem value="boundary_issue">边界问题/不尊重</SelectItem>
                      <SelectItem value="forget_important">忘记重要事项</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conflict Date */}
                <div className="space-y-2">
                  <Label htmlFor="conflictDate">
                    发生时间 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="conflictDate"
                    type="datetime-local"
                    value={formData.conflictDate}
                    onChange={(e) => setFormData({ ...formData, conflictDate: e.target.value })}
                    max={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                {/* Relationship Stage */}
                <div className="space-y-2">
                  <Label htmlFor="relationshipStage">
                    关系阶段 <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.relationshipStage}
                    onValueChange={(value) => setFormData({ ...formData, relationshipStage: value })}
                  >
                    <SelectTrigger id="relationshipStage">
                      <SelectValue placeholder="选择你们的关系阶段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flirting">暧昧期</SelectItem>
                      <SelectItem value="dating">恋爱中</SelectItem>
                      <SelectItem value="living_together">同居</SelectItem>
                      <SelectItem value="long_distance">异地</SelectItem>
                      <SelectItem value="engaged">已订婚</SelectItem>
                      <SelectItem value="married">已婚</SelectItem>
                      <SelectItem value="near_breakup">分手边缘</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* What I did */}
                <div className="space-y-2">
                  <Label htmlFor="whatIdid">
                    我做了什么 <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="whatIdid"
                    placeholder="具体描述你的行为，越详细越好。例如：我承诺周五晚上去机场接她，但是因为和朋友打游戏忘记了..."
                    value={formData.whatIdid}
                    onChange={(e) => setFormData({ ...formData, whatIdid: e.target.value })}
                    rows={5}
                    minLength={20}
                    maxLength={5000}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.whatIdid.length}/5000
                  </p>
                </div>

                {/* Partner's feelings */}
                <div className="space-y-2">
                  <Label htmlFor="partnerFeelings">
                    对方的感受与诉求 <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="partnerFeelings"
                    placeholder="她的反应和感受是什么？她希望你怎么做？例如：她一个人打车带着行李回家，觉得我不尊重她的时间和感受..."
                    value={formData.partnerFeelings}
                    onChange={(e) => setFormData({ ...formData, partnerFeelings: e.target.value })}
                    rows={4}
                    minLength={20}
                    maxLength={5000}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.partnerFeelings.length}/5000
                  </p>
                </div>

                {/* My attitude */}
                <div className="space-y-2">
                  <Label htmlFor="myAttitude">
                    我现在的态度和想补救的方式 <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="myAttitude"
                    placeholder="你现在的真实想法是什么？你准备怎么补救？例如：我知道我错了，想真诚道歉并保证不再发生类似事情..."
                    value={formData.myAttitude}
                    onChange={(e) => setFormData({ ...formData, myAttitude: e.target.value })}
                    rows={4}
                    minLength={20}
                    maxLength={5000}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.myAttitude.length}/5000
                  </p>
                </div>

                {/* Red flags (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="redFlags">
                    对方的雷点/不能提的内容（可选）
                  </Label>
                  <Textarea
                    id="redFlags"
                    placeholder="哪些话题绝对不能提？哪些话可能会让她更生气？例如：不要说'我太忙了'作为借口，不要提到之前的类似问题..."
                    value={formData.redFlags}
                    onChange={(e) => setFormData({ ...formData, redFlags: e.target.value })}
                    rows={3}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.redFlags.length}/1000
                  </p>
                </div>

                {/* Channel */}
                <div className="space-y-2">
                  <Label htmlFor="channel">
                    期望沟通渠道
                  </Label>
                  <Select
                    value={formData.channel}
                    onValueChange={(value) => setFormData({ ...formData, channel: value })}
                  >
                    <SelectTrigger id="channel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">文字消息</SelectItem>
                      <SelectItem value="phone">电话</SelectItem>
                      <SelectItem value="in_person">当面沟通</SelectItem>
                      <SelectItem value="unsure">不确定</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone */}
                <div className="space-y-2">
                  <Label htmlFor="tone">
                    语气风格
                  </Label>
                  <Select
                    value={formData.tone}
                    onValueChange={(value) => setFormData({ ...formData, tone: value })}
                  >
                    <SelectTrigger id="tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sincere">克制真诚（推荐）</SelectItem>
                      <SelectItem value="gentle">更柔和温暖</SelectItem>
                      <SelectItem value="formal">更正式严肃</SelectItem>
                      <SelectItem value="casual">更自然口语化</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      "生成修复方案"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
