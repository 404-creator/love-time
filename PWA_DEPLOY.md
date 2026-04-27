# 零成本发布步骤

## 方案 A：Cloudflare Pages

1. 注册 Cloudflare。
2. 进入 Workers & Pages。
3. 新建 Pages 项目。
4. 选择“直接上传”。
5. 上传当前目录里的静态文件。
6. 发布后得到一个 HTTPS 链接。
7. 手机浏览器打开链接，添加到主屏幕。

## 方案 B：GitHub Pages

1. 新建一个 GitHub 仓库。
2. 上传这些文件：

```text
index.html
styles.css
app-pwa.js
manifest.webmanifest
service-worker.js
icons/
vendor/
```

3. 打开仓库 Settings。
4. 找到 Pages。
5. Source 选择主分支。
6. 保存后等待 GitHub 生成 Pages 链接。
7. 手机浏览器打开链接，添加到主屏幕。

## 方案 C：Netlify

1. 打开 Netlify。
2. 新建站点。
3. 直接拖拽当前文件夹上传。
4. 发布后得到 HTTPS 链接。

## 不建议直接打开本地文件

直接打开 `index.html` 可以看到页面，但 PWA 离线缓存、添加到桌面和二维码导入链接会受限制。正式使用建议部署到 HTTPS 静态托管。
