"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  MessageSquare,
  Phone,
  User,
  Calendar,
  AlertCircle,
  Send,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { copyToClipboard } from "@/lib/utils";

type RepairPlanOutput = {
  apology_sms: {
    short: string;
    medium: string;
    long: string;
  };
  call_outline: Array<{
    step: string;
    content: string;
    tips?: string;
  }>;
  meet_outline: Array<{
    step: string;
    content: string;
    tips?: string;
  }>;
  action_plan_7d: string[];
  action_plan_30d: string[];
  possible_replies: Array<{
    from_partner: string;
    my_response: string;
    why_this_works: string;
    tone: string;
  }>;
  red_flags_avoid: string[];
  one_sentence_bottom_line: string;
  safety_warning?: string;
  self_reflection?: string[];
};

type CaseData = {
  id: string;
  conflictType: string;
  conflictDate: string;
  relationshipStage: string;
  generationStatus: string;
  toneUsed: string;
  createdAt: string;
  markedSent: boolean;
  feedbackNote?: string;
  generatedOutput?: RepairPlanOutput;
};

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [newTone, setNewTone] = useState(caseData?.toneUsed || "sincere");

  // Fetch case data
  const fetchCase = async () => {
    try {
      const response = await fetch(`/api/cases/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      setCaseData(data.case);

      // If still generating, poll for updates
      if (data.case.generationStatus === "generating" && !polling) {
        setPolling(true);
        setTimeout(() => {
          setPolling(false);
          fetchCase();
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching case:", error);
      toast({
        title: "加载失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [params.id]);

  // Copy handler
  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(id);
      toast({
        title: "已复制",
        description: "内容已复制到剪贴板",
      });
      setTimeout(() => setCopied(null), 2000);
    }
  };

  // Regenerate handler
  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const response = await fetch(`/api/cases/${params.id}/regenerate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tone: newTone,
          feedback: feedback,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Regeneration failed");
      }

      toast({
        title: "重新生成成功",
        description: "方案已更新",
      });

      setShowRegenerateDialog(false);
      setFeedback("");
      fetchCase();
    } catch (error) {
      console.error("Error regenerating:", error);
      toast({
        title: "重新生成失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setRegenerating(false);
    }
  };

  // Mark as sent
  const handleMarkSent = async () => {
    try {
      const response = await fetch(`/api/cases/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markedSent: true }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast({
        title: "已标记",
        description: "已标记为已发送",
      });

      fetchCase();
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  // Delete case
  const handleDelete = async () => {
    if (!confirm("确定要删除这个案例吗？此操作不可恢复。")) return;

    try {
      const response = await fetch(`/api/cases/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast({
        title: "已删除",
        description: "案例已删除",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  // Conflict type labels
  const conflictTypeLabels: Record<string, string> = {
    lie: "撒谎/隐瞒",
    broken_promise: "违背承诺/失约",
    cold_violence: "冷暴力/忽视",
    verbal_hurt: "言语伤害",
    boundary_issue: "边界问题/不尊重",
    forget_important: "忘记重要事项",
    other: "其他",
  };

  // Stage labels
  const stageLabels: Record<string, string> = {
    flirting: "暧昧期",
    dating: "恋爱中",
    living_together: "同居",
    long_distance: "异地",
    engaged: "已订婚",
    married: "已婚",
    near_breakup: "分手边缘",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>案例不存在</CardTitle>
            <CardDescription>该案例可能已被删除</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>返回首页</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold">修复方案</h1>
              <p className="text-xs text-muted-foreground">
                {conflictTypeLabels[caseData.conflictType] || caseData.conflictType} ·
                {stageLabels[caseData.relationshipStage] || caseData.relationshipStage}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {caseData.markedSent ? (
              <Button variant="outline" size="sm" disabled>
                <Check className="mr-2 h-4 w-4" />
                已发送
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={handleMarkSent}>
                <Send className="mr-2 h-4 w-4" />
                标记已发送
              </Button>
            )}
            <Dialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>重新生成方案</DialogTitle>
                  <DialogDescription>
                    调整语气或提供反馈，重新生成更符合你需求的方案
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>语气风格</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["sincere", "gentle", "formal", "casual"].map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setNewTone(tone)}
                          className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                            newTone === tone
                              ? "bg-primary text-primary-foreground"
                              : "bg-background hover:bg-accent"
                          }`}
                        >
                          {tone === "sincere" && "克制真诚"}
                          {tone === "gentle" && "更柔和"}
                          {tone === "formal" && "更正式"}
                          {tone === "casual" && "更口语"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>反馈（可选）</Label>
                    <Textarea
                      placeholder="例如：希望更强调我的悔意，或者调整某些措辞..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowRegenerateDialog(false)}
                  >
                    取消
                  </Button>
                  <Button onClick={handleRegenerate} disabled={regenerating}>
                    {regenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      "重新生成"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {caseData.generationStatus === "generating" ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center">
                  <p className="font-medium">正在生成修复方案...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    AI 正在分析你的情况，这可能需要 20-40 秒
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : caseData.generationStatus === "failed" ? (
          <Card className="max-w-2xl mx-auto border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                生成失败
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                很抱歉，生成方案时遇到问题。请稍后重试，或联系客服。
              </p>
              <Button onClick={() => setShowRegenerateDialog(true)}>
                重新生成
              </Button>
            </CardContent>
          </Card>
        ) : !caseData.generatedOutput ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                暂无生成内容
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="messages" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="messages">道歉消息</TabsTrigger>
              <TabsTrigger value="outlines">沟通提纲</TabsTrigger>
              <TabsTrigger value="actions">行动计划</TabsTrigger>
              <TabsTrigger value="replies">应对回复</TabsTrigger>
            </TabsList>

            {/* Safety warning */}
            {caseData.generatedOutput.safety_warning && (
              <Card className="mb-6 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">
                <CardContent className="pt-4">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    {caseData.generatedOutput.safety_warning}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    道歉消息（三个版本）
                  </CardTitle>
                  <CardDescription>
                    根据不同场景选择合适长度，可直接复制发送
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Short */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold">短版（50字内）</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopy(caseData.generatedOutput!.apology_sms.short, "short")
                        }
                      >
                        {copied === "short" ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" />
                            复制
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm p-3 bg-muted rounded-md">
                      {caseData.generatedOutput.apology_sms.short}
                    </p>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold">中版（100-300字）</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopy(caseData.generatedOutput!.apology_sms.medium, "medium")
                        }
                      >
                        {copied === "medium" ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" />
                            复制
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm p-3 bg-muted rounded-md whitespace-pre-wrap">
                      {caseData.generatedOutput.apology_sms.medium}
                    </p>
                  </div>

                  {/* Long */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold">长版（300-500字）</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopy(caseData.generatedOutput!.apology_sms.long, "long")
                        }
                      >
                        {copied === "long" ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" />
                            复制
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm p-3 bg-muted rounded-md whitespace-pre-wrap">
                      {caseData.generatedOutput.apology_sms.long}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Red flags */}
              {caseData.generatedOutput.red_flags_avoid.length > 0 && (
                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      绝对不要说/做的事
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {caseData.generatedOutput.red_flags_avoid.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive mt-0.5">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Bottom line */}
              <Card className="border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium mb-2">核心态度</p>
                  <p className="text-sm text-muted-foreground">
                    {caseData.generatedOutput.one_sentence_bottom_line}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Outlines Tab */}
            <TabsContent value="outlines" className="space-y-6">
              {/* Call outline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    电话沟通提纲
                  </CardTitle>
                  <CardDescription>
                    按步骤进行，强调倾听和承认错误
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.generatedOutput.call_outline.map((step, idx) => (
                      <div key={idx} className="border-l-2 border-primary pl-4">
                        <p className="font-medium text-sm">{step.step}</p>
                        <p className="text-sm text-muted-foreground mt-1">{step.content}</p>
                        {step.tips && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            💡 {step.tips}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Meet outline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    见面沟通提纲
                  </CardTitle>
                  <CardDescription>
                    当面沟通更要注意肢体语言和倾听
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.generatedOutput.meet_outline.map((step, idx) => (
                      <div key={idx} className="border-l-2 border-primary pl-4">
                        <p className="font-medium text-sm">{step.step}</p>
                        <p className="text-sm text-muted-foreground mt-1">{step.content}</p>
                        {step.tips && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            💡 {step.tips}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-6">
              {/* 7-day plan */}
              <Card>
                <CardHeader>
                  <CardTitle>7天行动计划</CardTitle>
                  <CardDescription>
                    立即可以执行的具体行动
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {caseData.generatedOutput.action_plan_7d.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 30-day plan */}
              <Card>
                <CardHeader>
                  <CardTitle>30天持续行动</CardTitle>
                  <CardDescription>
                    长期改进和重建信任的步骤
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {caseData.generatedOutput.action_plan_30d.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Self reflection */}
              {caseData.generatedOutput.self_reflection && (
                <Card className="border-blue-200 dark:border-blue-900">
                  <CardHeader>
                    <CardTitle>自我反思问题</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {caseData.generatedOutput.self_reflection.map((question, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span>•</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Replies Tab */}
            <TabsContent value="replies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>对方可能回复及应对</CardTitle>
                  <CardDescription>
                    根据对方反应调整回应方式
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {caseData.generatedOutput.possible_replies.map((reply, idx) => (
                    <div key={idx} className="space-y-3 p-4 border rounded-lg">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          对方可能的回复：
                        </p>
                        <p className="text-sm italic">"{reply.from_partner}"</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          你的回应：
                        </p>
                        <p className="text-sm">{reply.my_response}</p>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          💡 {reply.why_this_works}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
