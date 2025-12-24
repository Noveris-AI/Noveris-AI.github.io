const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-DSgCZjc_.js","assets/vendor-CStMUeR9.js","assets/Navbar-BOjBlwAu.js","assets/styles/Navbar-DNqSpBW9.css","assets/utils-TybtYOGV.js","assets/markdown-CL3C9zIY.js","assets/styles/Home-BUXPVSyg.css","assets/Blog-1y5gdlDS.js","assets/DefaultLayout-BzS1Zba_.js","assets/styles/DefaultLayout-7fQYYznI.css","assets/BlogCard-DzuzJ0Fa.js","assets/styles/BlogCard-B8tUau5e.css","assets/styles/Blog-CVbaGw3q.css","assets/BlogPost-DJ5CdEvE.js","assets/styles/BlogPost-Z4fCanNP.css","assets/Categories-CwGlNItV.js","assets/styles/Categories-DT23jHV7.css","assets/CategoryPosts-0ndtl6nc.js","assets/styles/CategoryPosts-BnRJBVUQ.css","assets/About-D-8NMvvB.js","assets/styles/About-fHpRZKDw.css","assets/Contact-DDlKb1al.js","assets/styles/Contact-CM-G810K.css","assets/NotFound-cPBvqJYz.js","assets/styles/NotFound-CYvdOkAX.css"])))=>i.map(i=>d[i]);
import{r as g,d as L,a as E,e as w,f as A,h as D,j as I,u as T,R as x,k as M,l as O,m as N,p as R,q as z}from"./vendor-CStMUeR9.js";import{r as $,c as B}from"./utils-TybtYOGV.js";import{g as V}from"./markdown-CL3C9zIY.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function l(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function t(r){if(r.ep)return;r.ep=!0;const e=l(r);fetch(r.href,e)}})();var j=$();const H=V(j),f=g("system"),y=g("light");function F(){const n=()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",a=e=>{y.value=e,document.documentElement.setAttribute("data-theme",e),document.documentElement.classList.toggle("dark",e==="dark")},l=()=>{const e=localStorage.getItem("themeMode");e&&(f.value=e),f.value==="system"?a(n()):a(f.value),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",o=>{f.value==="system"&&a(o.matches?"dark":"light")})},t=e=>{f.value=e,localStorage.setItem("themeMode",e),a(e==="system"?n():e)},r=()=>{const e=y.value==="light"?"dark":"light";t(e)};return L(()=>{l()}),E(f,e=>{a(e==="system"?n():e)}),{theme:y,themeMode:f,toggleTheme:r,setThemeMode:t,initTheme:l}}const U=[{id:"ai",name:"Artificial Intelligence",nameZh:"人工智能",icon:"🤖",color:"#0d9488"},{id:"cloud-native",name:"Cloud Native",nameZh:"云原生",icon:"☁️",color:"#0ea5e9"},{id:"development",name:"Development",nameZh:"开发",icon:"💻",color:"#8b5cf6"},{id:"llm",name:"Large Language Models",nameZh:"大语言模型",icon:"🧠",color:"#f59e0b"}],Z=[{slug:"linux-commands",title:"Linux Commands",titleZh:"Linux 命令",excerpt:"Essential Linux command line reference for system administration and daily operations",excerptZh:"Linux 系统管理和日常操作的基本命令行参考",content:`\`\`\`plain
  # 列出当前目录中的文件和子目录
  ls

  # 显示当前工作目录的完整路径
  pwd

  # 切换目录到 /home/user
  cd /home/user

  # 返回上一级目录
  cd ..

  # 创建新目录 mydir
  mkdir mydir

  # 递归创建多级目录 a/b/c
  mkdir -p a/b/c

  # 删除空目录 mydir
  rmdir mydir

  # 强制递归删除目录及其内容（慎用）
  rm -rf mydir

  # 复制文件 file1 为 file2
  cp file1 file2

  # 递归复制目录 dir1 到 dir2
  cp -r dir1 dir2

  # 移动/重命名文件 old 为 new
  mv old new

  # 强制删除文件 file
  rm -f file

  # 查看文件内容（适合小文件）
  cat file

  # 分页查看文件内容（空格翻页，q 退出）
  less file

  # 实时滚动查看文件最新内容
  tail -f file

  # 创建空文件 newfile
  touch newfile

  # 输出文本 Hello
  echo "Hello"

  # 将标准输出重定向到文件（覆盖）
  echo "Hello" > out.txt

  # 将标准输出追加到文件
  echo "World" >> out.txt

  # 查看命令历史记录
  history

  # 清屏
  clear

  # 显示当前用户
  whoami

  # 显示系统运行时间、负载等信息
  uptime

  # 查看磁盘使用情况
  df -h

  # 查看目录/文件大小
  du -sh /path

  # 查看内存使用情况
  free -h

  # 查看进程快照
  ps aux

  # 实时查看进程与系统资源
  top

  # 根据名称查找文件
  find / -name "*.conf"

  # 在文件内搜索字符串
  grep "pattern" file

  # 打包目录为 tar 包
  tar -cvf archive.tar dir/

  # 解包 tar 包
  tar -xvf archive.tar

  # 打包并 gzip 压缩
  tar -czvf archive.tar.gz dir/

  # 解压 .tar.gz 包
  tar -xzvf archive.tar.gz

  # 下载文件
  wget http://example.com/file

  # 查看当前网络接口与地址
  ip a

  # 测试主机连通性
  ping example.com

  # 查看监听端口与对应进程
  ss -tulnp

  # 查看路由表
  ip route

  # 修改文件权限为 755
  chmod 755 file

  # 递归修改目录权限为 644
  chmod -R 644 dir/

  # 修改文件所有者为用户 user、组 group
  chown user:group file

  # 查看当前环境变量
  env

  # 临时导出环境变量
  export MY_VAR=value

  # 查看命令位置
  which python3

  # 查看命令详细路径及手册
  whereis gcc

  # 更新软件包列表（Debian/Ubuntu）
  sudo apt update

  # 升级已安装软件包
  sudo apt upgrade -y

  # 安装软件包
  sudo apt install tree -y

  # 查看命令手册
  man ls

  # 查看内置命令帮助
  help cd

  # linux中清理内存
  sync;echo 3>/proc/sys/vm/drop_caches
  \`\`\``,contentZh:`\`\`\`plain
  # 列出当前目录中的文件和子目录
  ls

  # 显示当前工作目录的完整路径
  pwd

  # 切换目录到 /home/user
  cd /home/user

  # 返回上一级目录
  cd ..

  # 创建新目录 mydir
  mkdir mydir

  # 递归创建多级目录 a/b/c
  mkdir -p a/b/c

  # 删除空目录 mydir
  rmdir mydir

  # 强制递归删除目录及其内容（慎用）
  rm -rf mydir

  # 复制文件 file1 为 file2
  cp file1 file2

  # 递归复制目录 dir1 到 dir2
  cp -r dir1 dir2

  # 移动/重命名文件 old 为 new
  mv old new

  # 强制删除文件 file
  rm -f file

  # 查看文件内容（适合小文件）
  cat file

  # 分页查看文件内容（空格翻页，q 退出）
  less file

  # 实时滚动查看文件最新内容
  tail -f file

  # 创建空文件 newfile
  touch newfile

  # 输出文本 Hello
  echo "Hello"

  # 将标准输出重定向到文件（覆盖）
  echo "Hello" > out.txt

  # 将标准输出追加到文件
  echo "World" >> out.txt

  # 查看命令历史记录
  history

  # 清屏
  clear

  # 显示当前用户
  whoami

  # 显示系统运行时间、负载等信息
  uptime

  # 查看磁盘使用情况
  df -h

  # 查看目录/文件大小
  du -sh /path

  # 查看内存使用情况
  free -h

  # 查看进程快照
  ps aux

  # 实时查看进程与系统资源
  top

  # 根据名称查找文件
  find / -name "*.conf"

  # 在文件内搜索字符串
  grep "pattern" file

  # 打包目录为 tar 包
  tar -cvf archive.tar dir/

  # 解包 tar 包
  tar -xvf archive.tar

  # 打包并 gzip 压缩
  tar -czvf archive.tar.gz dir/

  # 解压 .tar.gz 包
  tar -xzvf archive.tar.gz

  # 下载文件
  wget http://example.com/file

  # 查看当前网络接口与地址
  ip a

  # 测试主机连通性
  ping example.com

  # 查看监听端口与对应进程
  ss -tulnp

  # 查看路由表
  ip route

  # 修改文件权限为 755
  chmod 755 file

  # 递归修改目录权限为 644
  chmod -R 644 dir/

  # 修改文件所有者为用户 user、组 group
  chown user:group file

  # 查看当前环境变量
  env

  # 临时导出环境变量
  export MY_VAR=value

  # 查看命令位置
  which python3

  # 查看命令详细路径及手册
  whereis gcc

  # 更新软件包列表（Debian/Ubuntu）
  sudo apt update

  # 升级已安装软件包
  sudo apt upgrade -y

  # 安装软件包
  sudo apt install tree -y

  # 查看命令手册
  man ls

  # 查看内置命令帮助
  help cd

  # linux中清理内存
  sync;echo 3>/proc/sys/vm/drop_caches
  \`\`\``,category:"cloud-native",createdAt:"2025-12-24T21:47:00+08:00",readTime:5,cover:"",likes:0,comments:[]}],ae=(n,a="zh")=>new Date(n).toLocaleDateString(a==="zh"?"zh-CN":"en-US",{timeZone:"Asia/Shanghai",year:"numeric",month:"long",day:"numeric"}),se=(n,a="zh")=>{const l=new Date,t=new Date(n),r=l.getTime()-t.getTime(),e=Math.floor(r/1e3),o=Math.floor(e/60),c=Math.floor(o/60),i=Math.floor(c/24),s=Math.floor(i/7),u=Math.floor(i/30),m=Math.floor(i/365);return a==="zh"?e<60?"刚刚":o<60?`${o} 分钟前`:c<24?`${c} 小时前`:i<7?`${i} 天前`:s<4?`${s} 周前`:u<12?`${u} 个月前`:`${m} 年前`:e<60?"just now":o<60?`${o} minute${o>1?"s":""} ago`:c<24?`${c} hour${c>1?"s":""} ago`:i<7?`${i} day${i>1?"s":""} ago`:s<4?`${s} week${s>1?"s":""} ago`:u<12?`${u} month${u>1?"s":""} ago`:`${m} year${m>1?"s":""} ago`},h=g(Z),v=g(U),C=g({}),q=g(!1),W=g(null),Y=g(!0),S=()=>{const n={};v.value.forEach(a=>{n[a.id]=h.value.filter(l=>l.category===a.id).length}),C.value=n};S();function ie(){const n=w(()=>h.value.slice(0,5)),a=w(()=>h.value[0]||null);return{posts:h,categories:v,isLoading:q,error:W,isInitialized:Y,latestPosts:n,featuredPost:a,getPostsByCategory:i=>i==="all"?h.value:h.value.filter(s=>s.category===i),searchPosts:i=>{const s=i.toLowerCase();return h.value.filter(u=>u.title.toLowerCase().includes(s)||u.titleZh.toLowerCase().includes(s)||u.excerpt.toLowerCase().includes(s)||u.excerptZh.toLowerCase().includes(s))},getPost:i=>h.value.find(s=>s.slug===i)||null,getCategory:i=>v.value.find(s=>s.id===i)||null,getCategoryPostsCount:i=>C.value[i]||0,refresh:async()=>{S()}}}const J=A({__name:"App",setup(n){const{initTheme:a}=F();return L(()=>{a()}),D(()=>{}),(l,t)=>(M(),I(T(x)))}}),G="modulepreload",K=function(n){return"/"+n},b={},p=function(a,l,t){let r=Promise.resolve();if(l&&l.length>0){let i=function(s){return Promise.all(s.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=i(l.map(s=>{if(s=K(s),s in b)return;b[s]=!0;const u=s.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${m}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":G,u||(d.as="script"),d.crossOrigin="",d.href=s,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((_,k)=>{d.addEventListener("load",_),d.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${s}`)))})}))}function e(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return r.then(o=>{for(const c of o||[])c.status==="rejected"&&e(c.reason);return a().catch(e)})},Q=[{path:"/",name:"Home",component:()=>p(()=>import("./Home-DSgCZjc_.js"),__vite__mapDeps([0,1,2,3,4,5,6]))},{path:"/blog",name:"Blog",component:()=>p(()=>import("./Blog-1y5gdlDS.js"),__vite__mapDeps([7,1,8,2,3,9,10,11,4,5,12]))},{path:"/blog/:slug",name:"BlogPost",component:()=>p(()=>import("./BlogPost-DJ5CdEvE.js"),__vite__mapDeps([13,1,5,8,2,3,9,4,14]))},{path:"/categories",name:"Categories",component:()=>p(()=>import("./Categories-CwGlNItV.js"),__vite__mapDeps([15,1,8,2,3,9,10,11,4,5,16]))},{path:"/categories/:category",name:"CategoryPosts",component:()=>p(()=>import("./CategoryPosts-0ndtl6nc.js"),__vite__mapDeps([17,1,8,2,3,9,10,11,4,5,18]))},{path:"/about",name:"About",component:()=>p(()=>import("./About-D-8NMvvB.js"),__vite__mapDeps([19,2,1,3,8,9,4,5,20]))},{path:"/contact",name:"Contact",component:()=>p(()=>import("./Contact-DDlKb1al.js"),__vite__mapDeps([21,1,8,2,3,9,4,5,22]))},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>p(()=>import("./NotFound-cPBvqJYz.js"),__vite__mapDeps([23,1,8,2,3,9,4,5,24]))}],P=O({history:N(),routes:Q,scrollBehavior(n,a,l){return l||(n.hash?{el:n.hash,behavior:"smooth"}:{top:0,behavior:"smooth"})}}),X={en:{nav:{home:"Home",blog:"Blog",categories:"Categories",about:"About",contact:"Contact"},home:{title:"Noveris",subtitle:"Tech Blog by Passion",description:"A technical blog covering AI, Cloud Native, Development, and LLM topics.",latestPosts:"Latest Posts",readMore:"Read More",viewAll:"View All Articles",featuredCategories:"Featured Categories",noPosts:"No posts yet",noPostsDesc:"Stay tuned for upcoming articles!"},blog:{title:"Blog",subtitle:"Technical articles and insights",search:"Search articles...",noResults:"No articles found",categories:"Categories",all:"All",readTime:"min read",noPosts:"No posts yet",noPostsDesc:"Check back soon for new content!",loading:"Loading articles..."},categories:{title:"Categories",subtitle:"Explore topics by category",backToCategories:"Categories",ai:"Artificial Intelligence",aiDesc:"Machine learning, deep learning, and AI research.",cloudNative:"Cloud Native",cloudNativeDesc:"Kubernetes, Docker, microservices, and cloud infrastructure.",development:"Development",developmentDesc:"Programming, software engineering, and best practices.",llm:"Large Language Models",llmDesc:"GPT, LLaMA, prompt engineering, and LLM applications.",viewPosts:"View Posts",viewAllPosts:"View All Posts",postsCount:"{count} posts",postsSingular:"{count} post",noPosts:"No posts in this category yet."},about:{title:"About",subtitle:"Get to know me",name:"Liu Yaojie",greeting:"Hey there!",intro:"I'm Liu Yaojie, but everyone calls me Passion. I'm a tech enthusiast who loves exploring the intersection of AI, cloud computing, and software development.",what:"What I Do",whatText:"I write about AI, Cloud Native technologies, software development, and Large Language Models. My goal is to share practical knowledge and insights that help developers stay ahead in the rapidly evolving tech landscape.",topics:"Topics I Cover",topicsList:["Artificial Intelligence","Cloud Native","Software Development","Large Language Models","DevOps","System Design"],connect:"Connect",connectText:"Feel free to reach out if you want to discuss tech, collaborate on projects, or just say hi!",techStack:"Tech Stack",techCategories:{frontend:"Frontend",backend:"Backend",devops:"DevOps",ai:"AI & ML"}},contact:{title:"Contact",subtitle:"Get in touch",email:"Email",primaryEmail:"Primary Email",companyEmail:"Company / Team",internationalEmail:"International"},post:{back:"Back",backToBlog:"Back to Blog",publishedOn:"Published on",updatedOn:"Updated on",author:"Author",share:"Share",copyLink:"Copy Link",linkCopied:"Link copied!",tableOfContents:"Table of Contents",relatedPosts:"Related Posts",prevPost:"Previous Post",nextPost:"Next Post",comments:"Comments",noComments:"No comments yet",beFirstComment:"Be the first to comment!",writeComment:"Write a comment...",yourName:"Your name",yourEmail:"Your email",submit:"Submit",reply:"Reply",like:"Like",likes:"Likes",appreciation:"Support",appreciationDesc:"If you found this article helpful, consider supporting the author!",appreciationThanks:"Thank you for your support!"},common:{loading:"Loading...",error:"Error",retry:"Retry",cancel:"Cancel",confirm:"Confirm",save:"Save",delete:"Delete",edit:"Edit",close:"Close",search:"Search",noData:"No data",viewMore:"View More",showLess:"Show Less"},footer:{copyright:"© {year} Liu Yaojie (Passion). All rights reserved.",poweredBy:"Powered by Vue 3 & Vite",navigation:"Navigation",resources:"Resources",social:"Social",email:"Email"},theme:{title:"Theme",light:"Light",dark:"Dark",system:"System"},language:{title:"Language",zh:"中文",en:"English"}},zh:{nav:{home:"首页",blog:"博客",categories:"分类",about:"关于",contact:"联系"},home:{title:"Noveris",subtitle:"Passion 的技术博客",description:"一个涵盖 AI, 云原生, 开发和大模型主题的技术博客.",latestPosts:"最新文章",readMore:"阅读更多",viewAll:"查看所有文章",featuredCategories:"精选分类",noPosts:"暂无文章",noPostsDesc:"敬请期待即将发布的文章!"},blog:{title:"博客",subtitle:"技术文章与洞见",search:"搜索文章...",noResults:"未找到文章",categories:"分类",all:"全部",readTime:"分钟阅读",noPosts:"暂无文章",noPostsDesc:"敬请期待新内容!",loading:"加载文章中..."},categories:{title:"分类",subtitle:"按分类探索主题",backToCategories:"分类",ai:"人工智能",aiDesc:"机器学习、深度学习和 AI 研究。",cloudNative:"云原生",cloudNativeDesc:"Kubernetes、Docker、微服务和云基础设施。",development:"开发",developmentDesc:"编程、软件工程和最佳实践。",llm:"大语言模型",llmDesc:"GPT、LLaMA、提示工程和 LLM 应用。",viewPosts:"查看文章",viewAllPosts:"查看所有文章",postsCount:"{count} 篇文章",postsSingular:"{count} 篇文章",noPosts:"该分类暂无文章。"},about:{title:"关于",subtitle:"了解我",name:"刘耀杰",greeting:"嗨!",intro:"我是刘耀杰, 大家都叫我 Passion. 我是一个热爱探索 AI, 云计算和软件开发交叉领域的技术爱好者.",what:"我做什么",whatText:"我写关于 AI, 云原生技术, 软件开发和大语言模型的文章. 我的目标是分享实用的知识和见解, 帮助开发者在快速发展的技术领域保持领先.",topics:"我涉及的主题",topicsList:["人工智能","云原生","软件开发","大语言模型","DevOps","系统设计"],connect:"联系方式",connectText:"如果你想讨论技术, 合作项目, 或者只是打个招呼, 随时联系我!",techStack:"技术栈",techCategories:{frontend:"前端",backend:"后端",devops:"DevOps",ai:"AI & ML"}},contact:{title:"联系",subtitle:"与我联系",email:"邮箱",primaryEmail:"常用邮箱",companyEmail:"公司/团队邮箱",internationalEmail:"海外邮箱"},post:{back:"返回",backToBlog:"返回博客",publishedOn:"发布于",updatedOn:"更新于",author:"作者",share:"分享",copyLink:"复制链接",linkCopied:"链接已复制!",tableOfContents:"目录",relatedPosts:"相关文章",prevPost:"上一篇",nextPost:"下一篇",comments:"评论",noComments:"暂无评论",beFirstComment:"成为第一个评论的人!",writeComment:"写下你的评论...",yourName:"你的名字",yourEmail:"你的邮箱",submit:"提交",reply:"回复",like:"点赞",likes:"赞",appreciation:"赞赏",appreciationDesc:"如果这篇文章对你有帮助, 可以考虑支持作者!",appreciationThanks:"感谢你的支持!"},common:{loading:"加载中...",error:"错误",retry:"重试",cancel:"取消",confirm:"确认",save:"保存",delete:"删除",edit:"编辑",close:"关闭",search:"搜索",noData:"暂无数据",viewMore:"查看更多",showLess:"收起"},footer:{copyright:"© {year} 刘耀杰（Passion）。保留所有权利。",poweredBy:"由 Vue 3 & Vite 驱动",navigation:"导航",resources:"资源",social:"社交",email:"邮箱"},theme:{title:"主题",light:"浅色",dark:"深色",system:"跟随系统"},language:{title:"语言",zh:"中文",en:"English"}}},ee=R({legacy:!1,locale:localStorage.getItem("locale")||"zh",fallbackLocale:"en",messages:X});async function te(){try{window.addEventListener("error",t=>{var r,e;if(console.error("[Global Error]:",t.error||t.message),window.localStorage)try{const o=JSON.parse(localStorage.getItem("app_errors")||"[]");o.push({message:((r=t.error)==null?void 0:r.message)||t.message,timestamp:new Date().toISOString(),stack:(e=t.error)==null?void 0:e.stack}),localStorage.setItem("app_errors",JSON.stringify(o.slice(-10)))}catch{}}),window.addEventListener("unhandledrejection",t=>{if(console.error("[Unhandled Promise Rejection]:",t.reason),window.localStorage)try{const r=JSON.parse(localStorage.getItem("app_errors")||"[]");r.push({message:`Promise rejection: ${t.reason}`,timestamp:new Date().toISOString()}),localStorage.setItem("app_errors",JSON.stringify(r.slice(-10)))}catch{}});try{H.init({duration:600,easing:"ease-out-cubic",once:!0,offset:50,disable:!1})}catch(t){console.warn("[AOS Init Warning]:",t)}const n=z(J),a=B();n.config.errorHandler=(t,r,e)=>{if(console.error("[Vue Error]:",{error:t,info:e,timestamp:new Date().toISOString()}),window.localStorage)try{const o=JSON.parse(localStorage.getItem("app_errors")||"[]");o.push({type:"vue",message:t instanceof Error?t.message:String(t),info:e,timestamp:new Date().toISOString()}),localStorage.setItem("app_errors",JSON.stringify(o.slice(-10)))}catch{}},n.use(P),n.use(ee),n.use(a),await P.isReady();const l=n.mount("#app");if(setTimeout(()=>{const t=document.getElementById("app-loading");t&&(t.style.transition="opacity 0.3s ease-out",t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300))},500),console.log("[App]:","Mounted successfully at",new Date().toISOString()),window.localStorage)try{localStorage.setItem("app_last_success",new Date().toISOString())}catch{}return l}catch(n){console.error("[App Init Failed]:",n);const a=document.getElementById("app");throw a&&(a.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
          <div style="max-width: 500px;">
            <h1 style="color: #ef4444; font-size: 1.5rem; margin-bottom: 1rem;">⚠️ Application Error</h1>
            <p style="color: #64748b; margin-bottom: 1rem;">The application failed to start. This is usually a temporary issue.</p>
            <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 2rem;">${n instanceof Error?n.message:"Unknown error"}</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button onclick="location.reload()" style="padding: 0.75rem 1.5rem; background: #0d9488; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem; font-weight: 500;">
                Reload Page
              </button>
              <button onclick="localStorage.clear(); location.reload()" style="padding: 0.75rem 1.5rem; background: #64748b; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem; font-weight: 500;">
                Clear Cache & Reload
              </button>
            </div>
            <p style="margin-top: 2rem; font-size: 0.75rem; color: #94a3b8;">
              If this persists, please try clearing your browser cache or contact support.
            </p>
          </div>
        </div>
      `),n}}te().catch(n=>{console.error("[Fatal Error]:",n)});export{F as a,U as c,ae as f,se as g,Z as p,ie as u};
