# Assets 文件夹

这个文件夹包含网站所需的所有静态资源。

## 文件夹结构

```
assets/
├── images/
│   ├── work-1.jpg              # 主页作品展示图片
│   ├── work-2.jpg
│   ├── work-3.jpg
│   ├── product-1.jpg           # 主页产品展示图片
│   ├── product-2.jpg
│   ├── product-3.jpg
│   ├── profile.jpg             # 个人照片
│   ├── og-image.jpg            # Open Graph 分享图片
│   ├── screenshot-desktop.png  # 桌面版截图
│   ├── screenshot-mobile.png   # 移动版截图
│   ├── portfolio/              # 作品集页面图片
│   │   ├── web-1.jpg
│   │   ├── brand-1.jpg
│   │   ├── ui-1.jpg
│   │   ├── mobile-1.jpg
│   │   ├── web-2.jpg
│   │   └── brand-2.jpg
│   └── products/               # 商店页面产品图片
│       ├── template-1.jpg
│       ├── font-1.jpg
│       ├── icons-1.jpg
│       ├── graphics-1.jpg
│       ├── template-2.jpg
│       └── font-2.jpg
└── icons/
    ├── favicon.ico             # 网站图标
    ├── apple-touch-icon.png    # Apple 设备图标
    ├── icon-72x72.png          # PWA 图标 (各种尺寸)
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    ├── icon-512x512.png
    ├── badge-72x72.png         # 通知徽章图标
    ├── portfolio-icon.png      # 快捷方式图标
    ├── contact-icon.png
    ├── shop-icon.png
    ├── checkmark.png           # 通知操作图标
    └── xmark.png
```

## 图片要求

### 主要图片
- **格式**: JPG/PNG
- **质量**: 高质量，适合网页显示
- **尺寸**: 建议最小宽度 800px

### 作品集图片
- **尺寸**: 800x600px 或更高
- **格式**: JPG (压缩后)
- **质量**: 85-90%

### 产品图片
- **尺寸**: 600x400px
- **格式**: JPG
- **背景**: 建议白色或透明

### 图标文件
- **格式**: PNG (支持透明)
- **PWA图标**: 必须是正方形
- **Favicon**: 32x32px ICO格式

## 优化建议

1. **图片压缩**: 使用工具如 TinyPNG 压缩图片
2. **WebP格式**: 考虑提供 WebP 格式以提高性能
3. **响应式图片**: 为不同设备提供不同尺寸
4. **懒加载**: 所有图片都已设置 loading="lazy"

## 替换说明

要使用您自己的图片，请：

1. 准备相应尺寸的图片
2. 使用相同的文件名替换现有图片
3. 确保图片质量和格式符合要求
4. 测试在不同设备上的显示效果

## 版权说明

请确保您使用的所有图片都有适当的使用权限。建议使用：
- 自己拍摄的照片
- 免费图库 (如 Unsplash, Pexels)
- 购买的商业图片
- 自己设计的图形
