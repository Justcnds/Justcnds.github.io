# GitHub Pages 部署指南

本指南将帮助您将这个个人主页网站部署到GitHub Pages。

## 📋 部署前准备

### 1. 准备GitHub账户
- 确保您有GitHub账户
- 如果没有，请访问 [github.com](https://github.com) 注册

### 2. 创建仓库
- 仓库名必须是：`yourusername.github.io`
- 将 `yourusername` 替换为您的GitHub用户名
- 仓库必须是公开的（Public）

### 3. 自定义内容
在部署前，请替换以下内容：

#### 个人信息
- 所有HTML文件中的个人信息
- 联系方式（邮箱、电话、地址）
- 社交媒体链接

#### 图片资源
- `assets/images/` 中的所有图片
- 个人照片、作品图片、产品图片
- 网站图标和PWA图标

#### 配置文件
- `manifest.json` 中的应用信息
- `sitemap.xml` 中的URL
- `robots.txt` 中的网站地址

## 🚀 部署步骤

### 方法一：通过GitHub网页界面

1. **上传文件**
   - 访问您的仓库页面
   - 点击 "uploading an existing file"
   - 拖拽所有项目文件到页面
   - 添加提交信息："Initial commit"
   - 点击 "Commit changes"

2. **启用GitHub Pages**
   - 进入仓库的 Settings 页面
   - 滚动到 "Pages" 部分
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" 或 "master"
   - 文件夹选择 "/ (root)"
   - 点击 "Save"

### 方法二：通过Git命令行

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   cd yourusername.github.io
   ```

2. **添加文件**
   ```bash
   # 将所有项目文件复制到仓库文件夹
   # 然后执行：
   git add .
   git commit -m "Initial commit: Add personal portfolio website"
   git push origin main
   ```

3. **GitHub Pages会自动部署**
   - 通常需要几分钟时间
   - 部署完成后访问：`https://yourusername.github.io`

## ⚙️ 自定义配置

### 1. 域名配置（可选）
如果您有自己的域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为您的域名，如：`www.yourdomain.com`
3. 在域名提供商处设置DNS记录

### 2. HTTPS配置
- GitHub Pages 自动提供HTTPS
- 在仓库设置中确保 "Enforce HTTPS" 已启用

### 3. 自定义404页面
- 创建 `404.html` 文件
- 用户访问不存在页面时会显示此页面

## 🔧 常见问题

### 1. 网站无法访问
- 检查仓库名是否正确：`yourusername.github.io`
- 确认GitHub Pages已启用
- 等待几分钟让部署完成

### 2. 样式或图片不显示
- 检查文件路径是否正确
- 确保所有资源文件都已上传
- 检查文件名大小写是否匹配

### 3. JavaScript功能不工作
- 检查浏览器控制台是否有错误
- 确认所有JS文件都已上传
- 检查文件路径是否正确

### 4. 移动端显示问题
- 确认响应式CSS文件已加载
- 检查viewport meta标签
- 测试不同设备和浏览器

## 📊 性能优化

### 1. 图片优化
- 压缩所有图片文件
- 使用适当的图片格式
- 考虑使用WebP格式

### 2. 代码优化
- 压缩CSS和JavaScript文件
- 移除未使用的代码
- 启用浏览器缓存

### 3. SEO优化
- 确认所有meta标签正确
- 提交网站到搜索引擎
- 创建Google Search Console账户

## 🔄 更新网站

### 1. 内容更新
- 直接在GitHub网页界面编辑文件
- 或者本地修改后推送到仓库

### 2. 自动部署
- 每次推送到main分支都会自动重新部署
- 通常需要几分钟时间生效

### 3. 版本管理
- 使用Git分支管理不同版本
- 为重要更新创建标签

## 📈 监控和分析

### 1. Google Analytics
- 在HTML文件中添加GA代码
- 监控网站访问情况

### 2. Google Search Console
- 验证网站所有权
- 监控搜索表现

### 3. 性能监控
- 使用Lighthouse测试性能
- 定期检查网站速度

## 🆘 获取帮助

如果遇到问题：

1. **GitHub文档**
   - [GitHub Pages官方文档](https://docs.github.com/en/pages)

2. **社区支持**
   - GitHub Community Forum
   - Stack Overflow

3. **联系开发者**
   - 在项目仓库创建Issue
   - 发送邮件咨询

## ✅ 部署检查清单

- [ ] 仓库名正确：`yourusername.github.io`
- [ ] 所有个人信息已更新
- [ ] 图片资源已替换
- [ ] 配置文件已修改
- [ ] GitHub Pages已启用
- [ ] 网站可以正常访问
- [ ] 所有页面功能正常
- [ ] 移动端显示正常
- [ ] SEO设置完成
- [ ] 性能测试通过

完成以上步骤后，您的个人主页网站就成功部署到GitHub Pages了！
