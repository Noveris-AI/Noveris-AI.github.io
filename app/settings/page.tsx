"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ArrowLeft, Loader2, Trash2, Save, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type UserPreferences = {
  preferredProvider: string;
  defaultTone: string;
  saveRawInputs: boolean;
  enableAnalytics: boolean;
};

type UserData = {
  id: string;
  email: string | null;
  name: string | null;
  preferences: UserPreferences | null;
};

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Form state
  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredProvider: "qwen",  // 默认使用阿里云通义千问
    defaultTone: "sincere",
    saveRawInputs: false,
    enableAnalytics: true,
  });

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
        return;
      }

      // Fetch user preferences from our API
      const response = await fetch("/api/user/preferences");
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        if (data.user.preferences) {
          setPreferences(data.user.preferences);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/user/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast({
        title: "保存成功",
        description: "设置已更新",
      });
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const response = await fetch("/api/user/account", {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast({
        title: "账号已删除",
        description: "所有数据已被永久删除",
      });

      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
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
          <h1 className="font-semibold">设置</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                账号信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>邮箱</Label>
                <p className="text-sm text-muted-foreground mt-1">{userData?.email}</p>
              </div>
              <div>
                <Label>用户ID</Label>
                <p className="text-sm text-muted-foreground mt-1 font-mono">{userData?.id}</p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                退出登录
              </Button>
            </CardContent>
          </Card>

          {/* AI Provider Settings */}
          <Card>
            <CardHeader>
              <CardTitle>AI 设置</CardTitle>
              <CardDescription>
                选择 AI 提供商（当前使用默认配置）
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>AI 提供商</Label>
                <Select
                  value={preferences.preferredProvider}
                  onValueChange={(value) =>
                    setPreferences({ ...preferences, preferredProvider: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qwen">阿里云通义千问</SelectItem>
                    <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                    <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Default Tone */}
          <Card>
            <CardHeader>
              <CardTitle>默认语气风格</CardTitle>
              <CardDescription>
                新建案例时的默认语气
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={preferences.defaultTone}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, defaultTone: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sincere">克制真诚</SelectItem>
                  <SelectItem value="gentle">更柔和温暖</SelectItem>
                  <SelectItem value="formal">更正式严肃</SelectItem>
                  <SelectItem value="casual">更自然口语化</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>隐私设置</CardTitle>
              <CardDescription>
                控制如何存储和使用你的数据
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>保存原始输入</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    开启后会保存你填写的详细描述。关闭后只保存摘要。
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.saveRawInputs}
                  onChange={(e) =>
                    setPreferences({ ...preferences, saveRawInputs: e.target.checked })
                  }
                  className="w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>使用统计</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    帮助我们改进服务（不记录敏感内容）
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.enableAnalytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, enableAnalytics: e.target.checked })
                  }
                  className="w-4 h-4"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  保存设置
                </>
              )}
            </Button>
          </div>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">危险区域</CardTitle>
              <CardDescription>
                这些操作不可撤销
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除账号
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>确定要删除账号吗？</DialogTitle>
                    <DialogDescription>
                      此操作将永久删除你的账号和所有数据，包括所有案例和生成内容。此操作不可撤销。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteDialog(false)}
                    >
                      取消
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          删除中...
                        </>
                      ) : (
                        "确认删除"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
