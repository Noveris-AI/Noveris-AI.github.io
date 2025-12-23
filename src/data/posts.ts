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
}

export const categories: Category[] = [
  { id: 'machine-learning', name: 'Machine Learning', nameZh: '机器学习' },
  { id: 'deep-learning', name: 'Deep Learning', nameZh: '深度学习' },
  { id: 'nlp', name: 'NLP', nameZh: '自然语言处理' },
  { id: 'computer-vision', name: 'Computer Vision', nameZh: '计算机视觉' },
  { id: 'tutorials', name: 'Tutorials', nameZh: '教程' }
]

export const posts: Post[] = [
  {
    slug: 'introduction-to-transformers',
    title: 'Introduction to Transformer Architecture',
    titleZh: 'Transformer架构入门',
    excerpt: 'A comprehensive guide to understanding the Transformer architecture that powers modern NLP models like GPT and BERT.',
    excerptZh: '一份全面的指南，帮助你理解驱动GPT和BERT等现代NLP模型的Transformer架构。',
    category: 'deep-learning',
    date: '2024-01-15',
    readTime: 10,
    icon: '🤖',
    color: '#6366f1',
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
## 什么是Transformer?

Transformer是2017年Vaswani等人在论文"Attention Is All You Need"中提出的神经网络架构。它已成为现代NLP模型的基础。

### 关键组件

1. **自注意力机制**：允许模型权衡输入不同部分的重要性。

2. **多头注意力**：并行运行多个注意力操作。

3. **位置编码**：添加关于序列中标记位置的信息。

### 为什么选择Transformer?

- 序列的并行处理
- 更好地处理长距离依赖
- 在许多NLP任务上达到最先进的性能

\`\`\`python
import torch
from transformers import BertModel

model = BertModel.from_pretrained('bert-base-uncased')
\`\`\`

### 结论

Transformer已经彻底改变了NLP，并继续推动AI研究的进步。
    `
  },
  {
    slug: 'getting-started-with-pytorch',
    title: 'Getting Started with PyTorch',
    titleZh: 'PyTorch入门指南',
    excerpt: 'Learn the basics of PyTorch, the popular deep learning framework used by researchers and practitioners.',
    excerptZh: '学习PyTorch的基础知识，这是研究人员和从业者使用的流行深度学习框架。',
    category: 'tutorials',
    date: '2024-01-10',
    readTime: 8,
    icon: '🔥',
    color: '#ef4444',
    content: `
## Getting Started with PyTorch

PyTorch is an open-source machine learning library developed by Facebook's AI Research lab.

### Installation

\`\`\`bash
pip install torch torchvision
\`\`\`

### Basic Tensor Operations

\`\`\`python
import torch

# Create a tensor
x = torch.tensor([1, 2, 3, 4, 5])
print(x)

# Basic operations
y = x + 10
z = x * 2
\`\`\`

### Building a Simple Neural Network

\`\`\`python
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x
\`\`\`

### Next Steps

- Explore autograd for automatic differentiation
- Learn about DataLoaders for handling datasets
- Experiment with pre-trained models
    `,
    contentZh: `
## PyTorch入门

PyTorch是由Facebook AI Research实验室开发的开源机器学习库。

### 安装

\`\`\`bash
pip install torch torchvision
\`\`\`

### 基本张量操作

\`\`\`python
import torch

# 创建张量
x = torch.tensor([1, 2, 3, 4, 5])
print(x)

# 基本操作
y = x + 10
z = x * 2
\`\`\`

### 构建简单的神经网络

\`\`\`python
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x
\`\`\`

### 下一步

- 探索autograd进行自动微分
- 学习DataLoaders处理数据集
- 尝试预训练模型
    `
  },
  {
    slug: 'understanding-gpt-models',
    title: 'Understanding GPT Models: From GPT-1 to GPT-4',
    titleZh: '理解GPT模型：从GPT-1到GPT-4',
    excerpt: 'A deep dive into the evolution of GPT models and how they have transformed the AI landscape.',
    excerptZh: '深入探讨GPT模型的演变以及它们如何改变AI格局。',
    category: 'nlp',
    date: '2024-01-05',
    readTime: 12,
    icon: '💬',
    color: '#10b981',
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
## GPT的演变

GPT（生成式预训练Transformer）模型一直处于AI进步的前沿。

### GPT-1 (2018)
- 1.17亿参数
- 引入了无监督预训练的概念

### GPT-2 (2019)
- 15亿参数
- 展示了令人印象深刻的文本生成能力

### GPT-3 (2020)
- 1750亿参数
- 引入了少样本学习

### GPT-4 (2023)
- 多模态能力
- 改进的推理和安全性

### 关键要点

从GPT-1到GPT-4的进展展示了规模和架构改进在AI中的力量。
    `
  },
  {
    slug: 'image-classification-cnn',
    title: 'Image Classification with Convolutional Neural Networks',
    titleZh: '使用卷积神经网络进行图像分类',
    excerpt: 'Learn how to build and train a CNN for image classification tasks using Python and TensorFlow.',
    excerptZh: '学习如何使用Python和TensorFlow构建和训练用于图像分类任务的CNN。',
    category: 'computer-vision',
    date: '2024-01-01',
    readTime: 15,
    icon: '👁️',
    color: '#f59e0b',
    content: `
## Image Classification with CNNs

Convolutional Neural Networks are the backbone of modern computer vision.

### Architecture Components

1. **Convolutional Layers**: Extract features from images
2. **Pooling Layers**: Reduce spatial dimensions
3. **Fully Connected Layers**: Make final predictions

### Building a CNN

\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
\`\`\`

### Training Tips

- Use data augmentation
- Apply batch normalization
- Use learning rate scheduling
    `,
    contentZh: `
## 使用CNN进行图像分类

卷积神经网络是现代计算机视觉的支柱。

### 架构组件

1. **卷积层**：从图像中提取特征
2. **池化层**：减少空间维度
3. **全连接层**：做出最终预测

### 构建CNN

\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
\`\`\`

### 训练技巧

- 使用数据增强
- 应用批量归一化
- 使用学习率调度
    `
  },
  {
    slug: 'reinforcement-learning-basics',
    title: 'Reinforcement Learning: A Beginner\'s Guide',
    titleZh: '强化学习：初学者指南',
    excerpt: 'An introduction to reinforcement learning concepts including agents, environments, and reward functions.',
    excerptZh: '介绍强化学习概念，包括智能体、环境和奖励函数。',
    category: 'machine-learning',
    date: '2023-12-28',
    readTime: 11,
    icon: '🎮',
    color: '#8b5cf6',
    content: `
## Reinforcement Learning Basics

Reinforcement Learning (RL) is a type of machine learning where an agent learns by interacting with an environment.

### Key Concepts

1. **Agent**: The learner/decision maker
2. **Environment**: What the agent interacts with
3. **State**: Current situation
4. **Action**: What the agent can do
5. **Reward**: Feedback from the environment

### Q-Learning

\`\`\`python
import numpy as np

# Initialize Q-table
Q = np.zeros((n_states, n_actions))

# Update rule
Q[state, action] = Q[state, action] + alpha * (
    reward + gamma * np.max(Q[next_state]) - Q[state, action]
)
\`\`\`

### Applications

- Game playing (AlphaGo, Atari)
- Robotics
- Autonomous vehicles
- Resource management
    `,
    contentZh: `
## 强化学习基础

强化学习（RL）是一种机器学习类型，智能体通过与环境交互来学习。

### 关键概念

1. **智能体**：学习者/决策者
2. **环境**：智能体交互的对象
3. **状态**：当前情况
4. **动作**：智能体可以做什么
5. **奖励**：来自环境的反馈

### Q学习

\`\`\`python
import numpy as np

# 初始化Q表
Q = np.zeros((n_states, n_actions))

# 更新规则
Q[state, action] = Q[state, action] + alpha * (
    reward + gamma * np.max(Q[next_state]) - Q[state, action]
)
\`\`\`

### 应用

- 游戏（AlphaGo、Atari）
- 机器人技术
- 自动驾驶车辆
- 资源管理
    `
  },
  {
    slug: 'attention-mechanism-explained',
    title: 'The Attention Mechanism Explained',
    titleZh: '注意力机制详解',
    excerpt: 'A detailed explanation of the attention mechanism and its role in modern deep learning models.',
    excerptZh: '详细解释注意力机制及其在现代深度学习模型中的作用。',
    category: 'deep-learning',
    date: '2023-12-20',
    readTime: 9,
    icon: '🎯',
    color: '#ec4899',
    content: `
## Understanding Attention

Attention mechanisms allow models to focus on relevant parts of the input.

### Self-Attention

Self-attention computes relationships between all positions in a sequence.

\`\`\`python
def attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    attention_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attention_weights, V)
\`\`\`

### Multi-Head Attention

Multiple attention heads allow the model to attend to information from different representation subspaces.

### Applications

- Machine Translation
- Text Summarization
- Image Captioning
- Speech Recognition
    `,
    contentZh: `
## 理解注意力机制

注意力机制允许模型专注于输入的相关部分。

### 自注意力

自注意力计算序列中所有位置之间的关系。

\`\`\`python
def attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    attention_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attention_weights, V)
\`\`\`

### 多头注意力

多个注意力头允许模型关注来自不同表示子空间的信息。

### 应用

- 机器翻译
- 文本摘要
- 图像描述
- 语音识别
    `
  }
]
