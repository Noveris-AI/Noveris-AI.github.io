export interface Post {
  slug: string
  title: string
  titleZh: string
  excerpt: string
  excerptZh: string
  content: string
  contentZh: string
  category: string
  date: string
  readTime: number
  icon?: string
  color?: string
}

export interface Category {
  id: string
  name: string
  nameZh: string
  icon: string
  color: string
}

export const categories: Category[] = [
  { id: 'ai', name: 'Artificial Intelligence', nameZh: '人工智能', icon: '🤖', color: '#0d9488' },
  { id: 'cloud-native', name: 'Cloud Native', nameZh: '云原生', icon: '☁️', color: '#0ea5e9' },
  { id: 'development', name: 'Development', nameZh: '开发', icon: '💻', color: '#8b5cf6' },
  { id: 'llm', name: 'Large Language Models', nameZh: '大语言模型', icon: '🧠', color: '#f59e0b' }
]

export const posts: Post[] = [
  // AI Posts
  {
    slug: 'introduction-to-transformers',
    title: 'Introduction to Transformer Architecture',
    titleZh: 'Transformer 架构入门',
    excerpt: 'A comprehensive guide to understanding the Transformer architecture that powers modern NLP models like GPT and BERT.',
    excerptZh: '一份全面的指南, 帮助你理解驱动 GPT 和 BERT 等现代 NLP 模型的 Transformer 架构.',
    category: 'ai',
    date: '2024-01-15',
    readTime: 10,
    icon: '🤖',
    color: '#0d9488',
    content: `
## What is a Transformer?

The Transformer is a neural network architecture introduced in the paper "Attention Is All You Need" by Vaswani et al. in 2017. It has become the foundation for modern NLP models.

### Key Components

1. **Self-Attention Mechanism**: Allows the model to weigh the importance of different parts of the input.
2. **Multi-Head Attention**: Runs multiple attention operations in parallel.
3. **Positional Encoding**: Adds information about the position of tokens in the sequence.

### Why Transformers?

- Parallel processing of sequences
- Better handling of long-range dependencies
- State-of-the-art performance on many NLP tasks

\`\`\`python
import torch
from transformers import BertModel

model = BertModel.from_pretrained('bert-base-uncased')
\`\`\`

### Conclusion

Transformers have revolutionized NLP and continue to drive advances in AI research.
    `,
    contentZh: `
## 什么是 Transformer?

Transformer 是 2017 年 Vaswani 等人在论文 "Attention Is All You Need" 中提出的神经网络架构. 它已成为现代 NLP 模型的基础.

### 关键组件

1. **自注意力机制**: 允许模型权衡输入不同部分的重要性.
2. **多头注意力**: 并行运行多个注意力操作.
3. **位置编码**: 添加关于序列中标记位置的信息.

### 为什么选择 Transformer?

- 序列的并行处理
- 更好地处理长距离依赖
- 在许多 NLP 任务上达到最先进的性能

\`\`\`python
import torch
from transformers import BertModel

model = BertModel.from_pretrained('bert-base-uncased')
\`\`\`

### 结论

Transformer 已经彻底改变了 NLP, 并继续推动 AI 研究的进步.
    `
  },
  // Cloud Native Posts
  {
    slug: 'kubernetes-basics',
    title: 'Kubernetes Fundamentals: Getting Started',
    titleZh: 'Kubernetes 基础: 入门指南',
    excerpt: 'Learn the core concepts of Kubernetes, including pods, deployments, services, and how to orchestrate containers.',
    excerptZh: '学习 Kubernetes 的核心概念, 包括 Pod, Deployment, Service 以及如何编排容器.',
    category: 'cloud-native',
    date: '2024-01-12',
    readTime: 12,
    icon: '☁️',
    color: '#0ea5e9',
    content: `
## What is Kubernetes?

Kubernetes (K8s) is an open-source container orchestration platform that automates deploying, scaling, and managing containerized applications.

### Core Concepts

1. **Pods**: The smallest deployable unit in Kubernetes
2. **Deployments**: Manage the desired state of your application
3. **Services**: Expose your application to the network
4. **ConfigMaps & Secrets**: Manage configuration and sensitive data

### Basic Commands

\`\`\`bash
# Get all pods
kubectl get pods

# Create a deployment
kubectl create deployment nginx --image=nginx

# Expose a deployment
kubectl expose deployment nginx --port=80 --type=LoadBalancer
\`\`\`

### Why Kubernetes?

- Automatic scaling and self-healing
- Service discovery and load balancing
- Rolling updates and rollbacks
- Secret and configuration management
    `,
    contentZh: `
## 什么是 Kubernetes?

Kubernetes (K8s) 是一个开源的容器编排平台, 可自动化部署, 扩展和管理容器化应用程序.

### 核心概念

1. **Pods**: Kubernetes 中最小的可部署单元
2. **Deployments**: 管理应用程序的期望状态
3. **Services**: 将应用程序暴露到网络
4. **ConfigMaps & Secrets**: 管理配置和敏感数据

### 基本命令

\`\`\`bash
# 获取所有 pods
kubectl get pods

# 创建 deployment
kubectl create deployment nginx --image=nginx

# 暴露 deployment
kubectl expose deployment nginx --port=80 --type=LoadBalancer
\`\`\`

### 为什么选择 Kubernetes?

- 自动扩展和自愈
- 服务发现和负载均衡
- 滚动更新和回滚
- 密钥和配置管理
    `
  },
  // Development Posts
  {
    slug: 'clean-code-principles',
    title: 'Clean Code Principles Every Developer Should Know',
    titleZh: '每个开发者都应该知道的整洁代码原则',
    excerpt: 'Master the art of writing clean, maintainable code with these essential principles and best practices.',
    excerptZh: '掌握编写整洁, 可维护代码的艺术, 了解这些基本原则和最佳实践.',
    category: 'development',
    date: '2024-01-10',
    readTime: 8,
    icon: '💻',
    color: '#8b5cf6',
    content: `
## Why Clean Code Matters

Clean code is not just about making code work; it's about making code that others (and your future self) can understand and maintain.

### Key Principles

1. **Meaningful Names**: Use intention-revealing names
2. **Small Functions**: Functions should do one thing
3. **DRY**: Don't Repeat Yourself
4. **Comments**: Good code is self-documenting

### Example

\`\`\`typescript
// Bad
function d(a: number[]): number {
  let t = 0;
  for (let i = 0; i < a.length; i++) {
    t += a[i];
  }
  return t;
}

// Good
function calculateSum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`

### Remember

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler
    `,
    contentZh: `
## 为什么整洁代码很重要

整洁代码不仅仅是让代码运行; 而是让其他人(以及未来的你)能够理解和维护代码.

### 关键原则

1. **有意义的命名**: 使用能揭示意图的名称
2. **小函数**: 函数应该只做一件事
3. **DRY**: 不要重复自己
4. **注释**: 好的代码是自文档化的

### 示例

\`\`\`typescript
// 不好
function d(a: number[]): number {
  let t = 0;
  for (let i = 0; i < a.length; i++) {
    t += a[i];
  }
  return t;
}

// 好
function calculateSum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`

### 记住

> "任何傻瓜都能写出计算机能理解的代码. 优秀的程序员写出人类能理解的代码." - Martin Fowler
    `
  },
  // LLM Posts
  {
    slug: 'prompt-engineering-guide',
    title: 'Prompt Engineering: A Practical Guide',
    titleZh: '提示工程: 实用指南',
    excerpt: 'Learn how to craft effective prompts for LLMs to get better results from ChatGPT, Claude, and other AI models.',
    excerptZh: '学习如何为 LLM 编写有效的提示词, 从 ChatGPT, Claude 和其他 AI 模型获得更好的结果.',
    category: 'llm',
    date: '2024-01-08',
    readTime: 15,
    icon: '🧠',
    color: '#f59e0b',
    content: `
## What is Prompt Engineering?

Prompt engineering is the art and science of designing inputs for AI models to get desired outputs.

### Key Techniques

1. **Be Specific**: Clear instructions lead to better results
2. **Provide Context**: Give the model relevant background
3. **Use Examples**: Few-shot learning improves accuracy
4. **Iterate**: Refine your prompts based on results

### Example Prompts

\`\`\`
# Basic
Summarize this article.

# Better
You are a technical writer. Summarize the following article in 3 bullet points, focusing on the key takeaways for software developers:

[article content]
\`\`\`

### Advanced Techniques

- Chain-of-thought prompting
- Role-playing prompts
- System prompts for context
- Temperature and parameter tuning
    `,
    contentZh: `
## 什么是提示工程?

提示工程是为 AI 模型设计输入以获得期望输出的艺术和科学.

### 关键技术

1. **具体明确**: 清晰的指令带来更好的结果
2. **提供上下文**: 给模型相关的背景信息
3. **使用示例**: 少样本学习提高准确性
4. **迭代改进**: 根据结果优化你的提示词

### 示例提示词

\`\`\`
# 基础
总结这篇文章.

# 更好
你是一名技术作家. 用 3 个要点总结以下文章, 重点关注对软件开发者的关键启示:

[文章内容]
\`\`\`

### 高级技术

- 思维链提示
- 角色扮演提示
- 系统提示提供上下文
- 温度和参数调优
    `
  },
  {
    slug: 'understanding-gpt-models',
    title: 'Understanding GPT Models: From GPT-1 to GPT-4',
    titleZh: '理解 GPT 模型: 从 GPT-1 到 GPT-4',
    excerpt: 'A deep dive into the evolution of GPT models and how they have transformed the AI landscape.',
    excerptZh: '深入探讨 GPT 模型的演变以及它们如何改变 AI 格局.',
    category: 'llm',
    date: '2024-01-05',
    readTime: 12,
    icon: '🧠',
    color: '#f59e0b',
    content: `
## The Evolution of GPT

GPT (Generative Pre-trained Transformer) models have been at the forefront of AI advancement.

### GPT-1 (2018)
- 117 million parameters
- Introduced the concept of unsupervised pre-training

### GPT-2 (2019)
- 1.5 billion parameters
- Demonstrated impressive text generation capabilities

### GPT-3 (2020)
- 175 billion parameters
- Introduced few-shot learning

### GPT-4 (2023)
- Multimodal capabilities
- Improved reasoning and safety

### Key Takeaways

The progression from GPT-1 to GPT-4 shows the power of scale and architectural improvements in AI.
    `,
    contentZh: `
## GPT 的演变

GPT (生成式预训练 Transformer) 模型一直处于 AI 进步的前沿.

### GPT-1 (2018)
- 1.17 亿参数
- 引入了无监督预训练的概念

### GPT-2 (2019)
- 15 亿参数
- 展示了令人印象深刻的文本生成能力

### GPT-3 (2020)
- 1750 亿参数
- 引入了少样本学习

### GPT-4 (2023)
- 多模态能力
- 改进的推理和安全性

### 关键要点

从 GPT-1 到 GPT-4 的进展展示了规模和架构改进在 AI 中的力量.
    `
  },
  {
    slug: 'docker-for-developers',
    title: 'Docker for Developers: A Complete Guide',
    titleZh: 'Docker 开发者完全指南',
    excerpt: 'Master Docker containers and learn how to streamline your development workflow with containerization.',
    excerptZh: '掌握 Docker 容器, 学习如何通过容器化简化你的开发工作流.',
    category: 'cloud-native',
    date: '2024-01-03',
    readTime: 10,
    icon: '🐳',
    color: '#0ea5e9',
    content: `
## Why Docker?

Docker containers provide a consistent environment from development to production.

### Basic Commands

\`\`\`bash
# Build an image
docker build -t myapp .

# Run a container
docker run -p 3000:3000 myapp

# List containers
docker ps
\`\`\`

### Dockerfile Example

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Best Practices

- Use multi-stage builds
- Keep images small
- Don't run as root
- Use .dockerignore
    `,
    contentZh: `
## 为什么选择 Docker?

Docker 容器提供了从开发到生产的一致环境.

### 基本命令

\`\`\`bash
# 构建镜像
docker build -t myapp .

# 运行容器
docker run -p 3000:3000 myapp

# 列出容器
docker ps
\`\`\`

### Dockerfile 示例

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### 最佳实践

- 使用多阶段构建
- 保持镜像小巧
- 不要以 root 用户运行
- 使用 .dockerignore
    `
  }
]
