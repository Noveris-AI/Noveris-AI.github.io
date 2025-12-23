import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      categories: 'Categories',
      about: 'About'
    },
    home: {
      title: 'Noveris',
      subtitle: 'Tech Blog by Passion',
      description: 'A technical blog covering AI, Cloud Native, Development, and LLM topics.',
      latestPosts: 'Latest Posts',
      readMore: 'Read More',
      viewAll: 'View All Articles',
      featuredCategories: 'Featured Categories'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Technical articles and insights',
      search: 'Search articles...',
      noResults: 'No articles found',
      categories: 'Categories',
      all: 'All',
      readTime: 'min read'
    },
    categories: {
      title: 'Categories',
      subtitle: 'Explore topics by category',
      ai: 'Artificial Intelligence',
      aiDesc: 'Machine learning, deep learning, and AI research.',
      cloudNative: 'Cloud Native',
      cloudNativeDesc: 'Kubernetes, Docker, microservices, and cloud infrastructure.',
      development: 'Development',
      developmentDesc: 'Programming, software engineering, and best practices.',
      llm: 'Large Language Models',
      llmDesc: 'GPT, LLaMA, prompt engineering, and LLM applications.',
      viewPosts: 'View Posts'
    },
    about: {
      title: 'About',
      subtitle: 'Get to know me',
      greeting: 'Hey there!',
      intro: "I'm Liu Yaojie, but everyone calls me Passion. I'm a tech enthusiast who loves exploring the intersection of AI, cloud computing, and software development.",
      what: 'What I Do',
      whatText: 'I write about AI, Cloud Native technologies, software development, and Large Language Models. My goal is to share practical knowledge and insights that help developers stay ahead in the rapidly evolving tech landscape.',
      topics: 'Topics I Cover',
      topicsList: ['Artificial Intelligence', 'Cloud Native', 'Software Development', 'Large Language Models', 'DevOps', 'System Design'],
      connect: 'Connect',
      connectText: 'Feel free to reach out if you want to discuss tech, collaborate on projects, or just say hi!'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch',
      email: 'Email',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        send: 'Send Message'
      }
    },
    footer: {
      rights: 'All rights reserved.',
      poweredBy: 'Powered by Vue 3 & Vite'
    },
    theme: {
      light: 'Light',
      dark: 'Dark'
    }
  },
  zh: {
    nav: {
      home: '首页',
      blog: '博客',
      categories: '分类',
      about: '关于'
    },
    home: {
      title: 'Noveris',
      subtitle: 'Passion 的技术博客',
      description: '一个涵盖 AI, 云原生, 开发和大模型主题的技术博客.',
      latestPosts: '最新文章',
      readMore: '阅读更多',
      viewAll: '查看所有文章',
      featuredCategories: '精选分类'
    },
    blog: {
      title: '博客',
      subtitle: '技术文章与洞见',
      search: '搜索文章...',
      noResults: '未找到文章',
      categories: '分类',
      all: '全部',
      readTime: '分钟阅读'
    },
    categories: {
      title: '分类',
      subtitle: '按分类探索主题',
      ai: '人工智能',
      aiDesc: '机器学习, 深度学习和 AI 研究.',
      cloudNative: '云原生',
      cloudNativeDesc: 'Kubernetes, Docker, 微服务和云基础设施.',
      development: '开发',
      developmentDesc: '编程, 软件工程和最佳实践.',
      llm: '大语言模型',
      llmDesc: 'GPT, LLaMA, 提示工程和 LLM 应用.',
      viewPosts: '查看文章'
    },
    about: {
      title: '关于',
      subtitle: '了解我',
      greeting: '嗨!',
      intro: '我是刘耀杰, 大家都叫我 Passion. 我是一个热爱探索 AI, 云计算和软件开发交叉领域的技术爱好者.',
      what: '我做什么',
      whatText: '我写关于 AI, 云原生技术, 软件开发和大语言模型的文章. 我的目标是分享实用的知识和见解, 帮助开发者在快速发展的技术领域保持领先.',
      topics: '我涉及的主题',
      topicsList: ['人工智能', '云原生', '软件开发', '大语言模型', 'DevOps', '系统设计'],
      connect: '联系方式',
      connectText: '如果你想讨论技术, 合作项目, 或者只是打个招呼, 随时联系我!'
    },
    contact: {
      title: '联系',
      subtitle: '与我联系',
      email: '邮箱',
      form: {
        name: '您的姓名',
        email: '您的邮箱',
        message: '您的留言',
        send: '发送消息'
      }
    },
    footer: {
      rights: '保留所有权利.',
      poweredBy: '由 Vue 3 & Vite 驱动'
    },
    theme: {
      light: '浅色',
      dark: '深色'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'en',
  messages
})

export default i18n
