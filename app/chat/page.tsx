"use client";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Heart, ArrowLeft, Plus, Trash2, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  preview?: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    messages: number;
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 加载会话列表
  useEffect(() => {
    loadSessions();
  }, []);

  // 创建新会话
  const createNewSession = async () => {
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to create session");

      const data = await response.json();
      setCurrentSessionId(data.session.id);
      setMessages([]);
      await loadSessions();
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "创建失败",
        description: "无法创建新会话",
        variant: "destructive",
      });
    }
  };

  // 加载会话列表
  const loadSessions = async () => {
    try {
      const response = await fetch("/api/chats");

      if (!response.ok) throw new Error("Failed to load sessions");

      const data = await response.json();
      setSessions(data.sessions || []);

      // 如果没有当前会话且有会话列表，加载最新的会话
      if (!currentSessionId && data.sessions && data.sessions.length > 0) {
        loadSession(data.sessions[0].id);
      } else if (!currentSessionId && (!data.sessions || data.sessions.length === 0)) {
        // 如果没有任何会话，创建一个新会话
        createNewSession();
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  // 加载特定会话
  const loadSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chats/${sessionId}`);

      if (!response.ok) throw new Error("Failed to load session");

      const data = await response.json();
      setCurrentSessionId(sessionId);

      // 转换消息格式
      const loadedMessages: Message[] = data.session.messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.createdAt),
      }));

      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error loading session:", error);
      toast({
        title: "加载失败",
        description: "无法加载会话",
        variant: "destructive",
      });
    }
  };

  // 删除会话
  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await fetch(`/api/chats/${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete session");

      // 如果删除的是当前会话，清空消息并创建新会话
      if (sessionId === currentSessionId) {
        setMessages([]);
        setCurrentSessionId(null);
      }

      await loadSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast({
        title: "删除失败",
        description: "无法删除会话",
        variant: "destructive",
      });
    }
  };

  // 保存消息
  const saveMessage = async (role: string, content: string) => {
    if (!currentSessionId) return;

    try {
      await fetch(`/api/chats/${currentSessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, content }),
      });

      // 更新会话列表（更新预览）
      await loadSessions();
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleExampleClick = async (exampleText: string) => {
    const userMessage: Message = {
      role: "user",
      content: exampleText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 保存用户消息
    await saveMessage("user", exampleText);

    // 创建一个空的 AI 消息用于流式更新
    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              setIsLoading(false);
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: accumulatedContent,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }

      // 保存 AI 消息
      await saveMessage("assistant", accumulatedContent);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "发送失败",
        description: "请稍后重试",
        variant: "destructive",
      });
      // 移除空的 AI 消息
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // 保存用户消息
    await saveMessage("user", input.trim());

    // 创建一个空的 AI 消息用于流式更新
    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              setIsLoading(false);
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: accumulatedContent,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }

      // 保存 AI 消息
      await saveMessage("assistant", accumulatedContent);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "发送失败",
        description: "请稍后重试",
        variant: "destructive",
      });
      // 移除空的 AI 消息
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-white dark:bg-slate-900 border-r dark:border-slate-800 overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <span className="font-semibold text-sm">情感助手</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={createNewSession}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => loadSession(session.id)}
                className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                  currentSessionId === session.id
                    ? "bg-rose-50 dark:bg-rose-950/20"
                    : "hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{session.title}</p>
                    {session.preview && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {session.preview}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => deleteSession(session.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6 pb-48">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">开始和 AI 聊天吧</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-rose-500 text-white"
                      : "bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900"
                  }`}
                >
                  {message.content === "" && isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                  {message.content !== "" && (
                    <p
                      className={`text-xs mt-2 ${
                        message.role === "user"
                          ? "text-rose-100"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    你
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <div className="border-t bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-4 py-4">
            {/* Example prompts */}
            {messages.length === 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">试着说：</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleExampleClick("我现在很生气，他打游戏一晚上都不理我")}
                    className="text-xs px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    他打游戏不理我
                  </button>
                  <button
                    onClick={() => handleExampleClick("他又忘记了我的生日，我觉得不被重视")}
                    className="text-xs px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    忘记我的生日
                  </button>
                  <button
                    onClick={() => handleExampleClick("他答应的事情又没做到，我很失望")}
                    className="text-xs px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    答应的事没做到
                  </button>
                  <button
                    onClick={() => handleExampleClick("我们吵架了，现在在冷战中")}
                    className="text-xs px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    我们在冷战
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="说出你的感受..."
                disabled={isLoading}
                className="flex-1"
                maxLength={2000}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-rose-600 hover:bg-rose-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2">
              AI 建议仅供参考，重要决定请根据实际情况判断
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
