import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      categories: 'Categories',
      about: 'About',
      contact: 'Contact'
    },
    home: {
      title: 'Noveris',
      subtitle: 'Tech Blog by Passion',
      description: 'A technical blog covering AI, Cloud Native, Development, and LLM topics.',
      latestPosts: 'Latest Posts',
      readMore: 'Read More',
      viewAll: 'View All Articles',
      featuredCategories: 'Featured Categories',
      noPosts: 'No posts yet',
      noPostsDesc: 'Stay tuned for upcoming articles!'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Technical articles and insights',
      search: 'Search articles...',
      noResults: 'No articles found',
      categories: 'Categories',
      all: 'All',
      readTime: 'min read',
      noPosts: 'No posts yet',
      noPostsDesc: 'Check back soon for new content!',
      loading: 'Loading articles...'
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
      viewPosts: 'View Posts',
      postsCount: '{count} posts'
    },
    about: {
      title: 'About',
      subtitle: 'Get to know me',
      name: 'Liu Yaojie',
      greeting: 'Hey there!',
      intro: "I'm Liu Yaojie, but everyone calls me Passion. I'm a tech enthusiast who loves exploring the intersection of AI, cloud computing, and software development.",
      what: 'What I Do',
      whatText: 'I write about AI, Cloud Native technologies, software development, and Large Language Models. My goal is to share practical knowledge and insights that help developers stay ahead in the rapidly evolving tech landscape.',
      topics: 'Topics I Cover',
      topicsList: ['Artificial Intelligence', 'Cloud Native', 'Software Development', 'Large Language Models', 'DevOps', 'System Design'],
      connect: 'Connect',
      connectText: 'Feel free to reach out if you want to discuss tech, collaborate on projects, or just say hi!',
      techStack: 'Tech Stack',
      techCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        devops: 'DevOps',
        ai: 'AI & ML'
      }
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch',
      email: 'Email',
      primaryEmail: 'Primary Email',
      companyEmail: 'Company / Team',
      internationalEmail: 'International'
    },
    post: {
      back: 'Back',
      backToBlog: 'Back to Blog',
      publishedOn: 'Published on',
      updatedOn: 'Updated on',
      author: 'Author',
      share: 'Share',
      copyLink: 'Copy Link',
      linkCopied: 'Link copied!',
      tableOfContents: 'Table of Contents',
      relatedPosts: 'Related Posts',
      prevPost: 'Previous Post',
      nextPost: 'Next Post',
      comments: 'Comments',
      noComments: 'No comments yet',
      beFirstComment: 'Be the first to comment!',
      writeComment: 'Write a comment...',
      yourName: 'Your name',
      yourEmail: 'Your email',
      submit: 'Submit',
      reply: 'Reply',
      like: 'Like',
      likes: 'Likes',
      appreciation: 'Support',
      appreciationDesc: 'If you found this article helpful, consider supporting the author!',
      appreciationThanks: 'Thank you for your support!'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      search: 'Search',
      noData: 'No data',
      viewMore: 'View More',
      showLess: 'Show Less'
    },
    footer: {
      rights: 'All rights reserved.',
      poweredBy: 'Powered by Vue 3 & Vite',
      navigation: 'Navigation',
      resources: 'Resources',
      social: 'Social',
      email: 'Email'
    },
    theme: {
      title: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    language: {
      title: 'Language',
      zh: '中文',
      en: 'English'
    }
  },
  zh: {
    nav: {
      home: '首页',
      blog: '博客',
      categories: '分类',
      about: '关于',
      contact: '联系'
    },
    home: {
      title: 'Noveris',
      subtitle: 'Passion 的技术博客',
      description: '一个涵盖 AI, 云原生, 开发和大模型主题的技术博客.',
      latestPosts: '最新文章',
      readMore: '阅读更多',
      viewAll: '查看所有文章',
      featuredCategories: '精选分类',
      noPosts: '暂无文章',
      noPostsDesc: '敬请期待即将发布的文章!'
    },
    blog: {
      title: '博客',
      subtitle: '技术文章与洞见',
      search: '搜索文章...',
      noResults: '未找到文章',
      categories: '分类',
      all: '全部',
      readTime: '分钟阅读',
      noPosts: '暂无文章',
      noPostsDesc: '敬请期待新内容!',
      loading: '加载文章中...'
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
      viewPosts: '查看文章',
      postsCount: '{count} 篇文章'
    },
    about: {
      title: '关于',
      subtitle: '了解我',
      name: '刘耀杰',
      greeting: '嗨!',
      intro: '我是刘耀杰, 大家都叫我 Passion. 我是一个热爱探索 AI, 云计算和软件开发交叉领域的技术爱好者.',
      what: '我做什么',
      whatText: '我写关于 AI, 云原生技术, 软件开发和大语言模型的文章. 我的目标是分享实用的知识和见解, 帮助开发者在快速发展的技术领域保持领先.',
      topics: '我涉及的主题',
      topicsList: ['人工智能', '云原生', '软件开发', '大语言模型', 'DevOps', '系统设计'],
      connect: '联系方式',
      connectText: '如果你想讨论技术, 合作项目, 或者只是打个招呼, 随时联系我!',
      techStack: '技术栈',
      techCategories: {
        frontend: '前端',
        backend: '后端',
        devops: 'DevOps',
        ai: 'AI & ML'
      }
    },
    contact: {
      title: '联系',
      subtitle: '与我联系',
      email: '邮箱',
      primaryEmail: '常用邮箱',
      companyEmail: '公司/团队邮箱',
      internationalEmail: '海外邮箱'
    },
    post: {
      back: '返回',
      backToBlog: '返回博客',
      publishedOn: '发布于',
      updatedOn: '更新于',
      author: '作者',
      share: '分享',
      copyLink: '复制链接',
      linkCopied: '链接已复制!',
      tableOfContents: '目录',
      relatedPosts: '相关文章',
      prevPost: '上一篇',
      nextPost: '下一篇',
      comments: '评论',
      noComments: '暂无评论',
      beFirstComment: '成为第一个评论的人!',
      writeComment: '写下你的评论...',
      yourName: '你的名字',
      yourEmail: '你的邮箱',
      submit: '提交',
      reply: '回复',
      like: '点赞',
      likes: '赞',
      appreciation: '赞赏',
      appreciationDesc: '如果这篇文章对你有帮助, 可以考虑支持作者!',
      appreciationThanks: '感谢你的支持!'
    },
    common: {
      loading: '加载中...',
      error: '错误',
      retry: '重试',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      search: '搜索',
      noData: '暂无数据',
      viewMore: '查看更多',
      showLess: '收起'
    },
    footer: {
      rights: '保留所有权利.',
      poweredBy: '由 Vue 3 & Vite 驱动',
      navigation: '导航',
      resources: '资源',
      social: '社交',
      email: '邮箱'
    },
    theme: {
      title: '主题',
      light: '浅色',
      dark: '深色',
      system: '跟随系统'
    },
    language: {
      title: '语言',
      zh: '中文',
      en: 'English'
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
