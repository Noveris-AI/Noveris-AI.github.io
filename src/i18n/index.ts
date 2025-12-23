import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact'
    },
    home: {
      title: 'Noveris AI',
      subtitle: 'Exploring the Frontiers of Artificial Intelligence',
      description: 'A technical blog dedicated to AI research, machine learning, and cutting-edge technology insights.',
      latestPosts: 'Latest Posts',
      readMore: 'Read More',
      viewAll: 'View All Articles'
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
    about: {
      title: 'About',
      subtitle: 'Learn more about Noveris AI',
      intro: 'Noveris AI is a technology blog focused on artificial intelligence, machine learning, and deep learning. We share technical insights, tutorials, and research findings.',
      mission: 'Our Mission',
      missionText: 'To make AI knowledge accessible and help developers stay at the forefront of AI technology.',
      topics: 'Topics We Cover',
      topicsList: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'AI Ethics']
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with us',
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
      about: '关于',
      contact: '联系'
    },
    home: {
      title: 'Noveris AI',
      subtitle: '探索人工智能的前沿领域',
      description: '一个专注于AI研究、机器学习和前沿技术洞察的技术博客。',
      latestPosts: '最新文章',
      readMore: '阅读更多',
      viewAll: '查看所有文章'
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
    about: {
      title: '关于',
      subtitle: '了解更多关于 Noveris AI',
      intro: 'Noveris AI 是一个专注于人工智能、机器学习和深度学习的技术博客。我们分享技术见解、教程和研究成果。',
      mission: '我们的使命',
      missionText: '让AI知识触手可及，帮助开发者站在AI技术的最前沿。',
      topics: '我们涵盖的主题',
      topicsList: ['机器学习', '深度学习', '自然语言处理', '计算机视觉', '强化学习', 'AI伦理']
    },
    contact: {
      title: '联系',
      subtitle: '与我们取得联系',
      email: '邮箱',
      form: {
        name: '您的姓名',
        email: '您的邮箱',
        message: '您的留言',
        send: '发送消息'
      }
    },
    footer: {
      rights: '保留所有权利。',
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
