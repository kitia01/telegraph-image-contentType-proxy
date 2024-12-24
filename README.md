# telegraph-image-contentType-proxy

使用telegraph-image图床的url链接时可以在新标签页打开图片而不是下载图片

本仓库包含一个 Cloudflare Worker 脚本，用于动态设置文件的 `Content-Type` 和 `Content-Disposition` 响应头，确保图片文件在浏览器中显示而不是被下载。该脚本还会在文件类型不是图片时保留原始的 `Content-Type`。

## 功能

- **动态设置 `Content-Type`**：自动检测图片文件类型（例如 `.jpg`、`.png`、`.webp`）并设置相应的 `Content-Type`（如 `image/jpeg`、`image/png`、`image/webp`）。
- **图片内联显示**：对于支持的图片文件类型，设置 `Content-Disposition` 为 `inline`，确保它们直接在浏览器中显示。
- **保留原始 `Content-Type`**：对于非图片文件，保留原始的 `Content-Type`，以便浏览器按预期处理这些文件。

## 工作原理

该 Worker 脚本：
1. **检查请求的文件扩展名**。
2. **为已知的图片格式**（如 `.jpg`、`.png`、`.webp`）设置相应的 `Content-Type`（`image/jpeg`、`image/png`、`image/webp`）。
3. **修改 `Content-Disposition`** 为 `inline`，确保图片在浏览器中内联显示。
4. **保留非图片文件的原始 `Content-Type`**，让浏览器按照其原始类型处理这些文件。

## 前提条件

要使用此 Worker，您需要：
- 一个 你的域名。
- 一个 Cloudflare 账户。
- Cloudflare已经代理了你的域名。
- 一个已设置好的 Cloudflare Worker（[如何设置 Cloudflare Worker](https://developers.cloudflare.com/workers/)）。

1. **在 Cloudflare 上设置 Worker**：
   - 登录到您的 Cloudflare 仪表盘。
   - 进入 "Workers 和 Pages" 部分并创建一个新的 Worker。
   - 将本仓库中的 `index.js` 脚本复制并粘贴到 Cloudflare 的 Worker 编辑器中并点击部署。
2. **配置 Worker 路由**：
   - 设置 Worker 的路由，把你的telegraph-image网址以通配符方式输入，例如 `https://images.example.com/*` 来处理所有图片请求。
    ![image](https://github.com/user-attachments/assets/e0f9ba36-ad3c-4234-a52b-f7935fc66ad7)
    ![image](https://github.com/user-attachments/assets/e4694ad1-423c-4dba-9a16-cb1048f81077)

