"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
 DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 使用无密码登录方式
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      alert(mode === "signup"
        ? "请查收邮箱中的注册确认链接"
        : "请查收邮箱中的登录链接"
      );

      setOpen(false);
      setEmail("");
    } catch (error) {
      console.error("Auth error:", error);
      alert(error instanceof Error ? error.message : "操作失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [supabase]);

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {user.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          退出
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>登录 / 注册</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "登录" : "注册"}</DialogTitle>
          <DialogDescription>
            输入邮箱，我们将发送登录链接到您的邮箱
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <DialogFooter className="flex-col gap-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  发送中...
                </>
              ) : mode === "signin" ? (
                "发送登录链接"
              ) : (
                "发送注册链接"
              )}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              {mode === "signin" ? (
                <>
                  还没有账号？
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-primary hover:underline ml-1"
                  >
                    注册
                  </button>
                </>
              ) : (
                <>
                  已有账号？
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-primary hover:underline ml-1"
                  >
                    登录
                  </button>
                </>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
