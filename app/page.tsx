import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Heart, Lightbulb, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
            <span className="font-semibold text-lg">情感助手</span>
          </div>
          <nav>
            <Link href="/chat">
              <Button size="sm">开始倾诉</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium">AI 驱动 · 倾听 · 分析 · 建议</span>
          </div>

          <h1 className="text-4xl font-bold">
            生气了吗？<span className="text-rose-500">和 AI 说说话</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            告诉 AI 发生了什么，它会帮你分析情况、给你建议、告诉你该怎么沟通
          </p>
          <Link href="/chat">
            <Button size="lg">开始倾诉</Button>
          </Link>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-12">
            <Card>
              <CardHeader>
                <MessageCircle className="h-5 w-5 text-rose-600 mb-2" />
                <CardTitle>1. 倾听你的倾诉</CardTitle>
                <CardDescription>告诉 AI 发生了什么，它会认真倾听</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-5 w-5 text-blue-600 mb-2" />
                <CardTitle>2. 分析他的行为</CardTitle>
                <CardDescription>帮你客观分析对方做得对不对</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="h-5 w-5 text-green-600 mb-2" />
                <CardTitle>3. 给出沟通建议</CardTitle>
                <CardDescription>告诉你该怎么说、怎么做</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
