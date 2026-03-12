# Git 仓库设置指南

## 快速设置步骤

### 步骤1：打开 PowerShell 或 CMD
1. 按 `Win + R`，输入 `powershell` 或 `cmd`，回车
2. 切换到项目目录：
   ```powershell
   cd "c:\Users\OMEN\WorkBuddy\20260312185029"
   ```

### 步骤2：初始化 Git 仓库
```powershell
# 1. 初始化
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "初始化暗区突围博客项目

- 完成所有页面开发
- 更新依赖包到最新版本
- 添加设计系统和文档
- 准备部署"
```

### 步骤3：连接到 GitHub（可选）

**在 GitHub 创建仓库：**
1. 访问 https://github.com
2. 登录您的账号
3. 点击右上角 "+" → "New repository"
4. 填写仓库信息：
   - Repository name: `darkzone-blog`（或其他名称）
   - Description: `暗区突围个人博客网站`
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

**连接本地仓库：**
```powershell
# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/darkzone-blog.git

# 重命名主分支（如果需要）
git branch -M main

# 推送代码
git push -u origin main
```

## 手动操作指南

如果上面的命令不工作，可以手动操作：

### 方法A：使用文件资源管理器
1. 在文件夹中右键 → "Git Bash Here"（如果安装了 Git）
2. 依次执行上面的命令

### 方法B：使用 VSCode
1. 用 VSCode 打开项目文件夹
2. 按 `Ctrl + Shift + P`
3. 输入 "Git: Initialize Repository"
4. 点击源代码管理图标（左侧边栏）
5. 输入提交信息，点击提交
6. 点击推送按钮

### 方法C：使用 Git GUI 工具
1. 下载安装 GitKraken 或 SourceTree
2. 打开工具，选择 "Clone/New"
3. 选择项目文件夹
4. 点击 "Initialize Repository"

## 验证设置成功

运行以下命令检查：
```powershell
# 检查状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v
```

应该看到：
- `git status`: "nothing to commit, working tree clean"
- `git log`: 显示您的提交记录
- `git remote -v`: 显示远程仓库地址（如果已添加）

## 常见问题解决

### 问题1：`git` 命令不存在
- **解决方法**：安装 Git
  1. 访问 https://git-scm.com/download/win
  2. 下载并安装
  3. 重启终端

### 问题2：权限被拒绝
```powershell
# 检查权限
Get-Acl "c:\Users\OMEN\WorkBuddy\20260312185029"

# 或使用管理员权限打开终端
```

### 问题3：大文件问题
如果文件太大，可以：
```powershell
# 删除不需要的大文件
git rm --cached 大文件路径

# 重新提交
git add .
git commit -m "移除大文件"
```

## Git 基本命令参考

### 日常使用
```powershell
# 查看状态
git status

# 添加文件
git add 文件名
git add .                    # 添加所有

# 提交更改
git commit -m "提交信息"

# 查看历史
git log
git log --oneline           # 简洁显示
```

### 分支管理
```powershell
# 查看分支
git branch

# 创建分支
git branch 新分支名

# 切换分支
git checkout 分支名

# 合并分支
git merge 分支名
```

### 远程操作
```powershell
# 拉取更新
git pull origin main

# 推送更改
git push origin main

# 查看远程
git remote -v
```

## 项目文件说明

以下文件已准备好提交：

### 源代码文件
```
src/                    # React 组件和页面
├── components/        # 布局组件
├── pages/            # 所有页面
├── data/             # 文章数据
└── types/            # TypeScript 类型
```

### 配置文件
```
package.json          # 项目依赖
vite.config.ts        # 构建配置
tailwind.config.js    # 样式配置
tsconfig.json         # TypeScript 配置
```

### 文档文件
```
README.md            # 项目说明
design-system.md     # 设计系统
DEPLOYMENT.md        # 部署指南
CHANGELOG.md         # 更新日志
.gitignore          # Git 忽略规则
```

### 其他文件
```
index.html           # 入口文件
PREVIEW.html         # 项目预览
PROJECT_STRUCTURE.md # 项目结构
```

## 下一步操作

### 1. 完成 Git 初始化
按照上面的步骤执行命令

### 2. 部署到 GitHub
```powershell
# 创建 GitHub 仓库
# 添加远程仓库
# 推送代码
```

### 3. 部署到 Vercel/Netlify
- 参考 `DEPLOYMENT.md` 文件
- 选择喜欢的托管平台
- 获取公网访问链接

### 4. 分享网站
将部署后的链接分享给朋友：
- `https://your-site.vercel.app`
- 或 `https://username.github.io/darkzone-blog`

## 获取帮助

如果遇到问题：
1. 检查错误信息
2. 参考本文档的"常见问题"
3. 搜索错误信息 + "Git"
4. 或向我提问

---
*Git 设置完成即可开始部署！*