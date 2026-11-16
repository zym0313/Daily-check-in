# 小打卡 PWA - v3.0

完全离线、无后端、纯本地 IndexedDB 存储的习惯打卡 + 日志应用。

## 功能总览

- **今日**：完成率环形图、今日待办、7天概览、生理期横幅
- **打卡**：自定义打卡项目（完成/暂缓/放弃）、30天补卡、生理期记录、用药打卡（间隔N天/疗程式）
- **日志**：图文时间轴（文字+最多6张压缩图片）、关键词搜索、日期联动查看当天所有记录
- **任务**：周/月视图看板，长期重复任务（带结束日期）/一次性任务
- **统计**：热力图/柱状图切换，打卡/用药/生理期三类统计，日期翻页
- **我的**：CSV导出导入、鼓励弹窗设置、选择性清空

## 本地运行

```powershell
cd C:\Users\Zyima\Desktop\mark
python -m http.server 8080
```

浏览器访问 http://localhost:8080，首次加载后 `Ctrl+Shift+R` 强刷。

---

## 一、PWA 部署到手机教程

### 方法 A：通过 HTTPS 静态托管（推荐，可安装到主屏）

PWA 安装到手机主屏需要 HTTPS（localhost 除外）。免费托管：

1. 把 `mark/` 目录下所有文件上传到 GitHub 仓库
2. 仓库 Settings → Pages → 选择 main 分支根目录 → 保存
3. 等待 1 分钟，手机浏览器访问 `https://你的用户名.github.io/仓库名/`
4. 浏览器菜单 → "添加到主屏幕" / "安装应用"
5. 桌面出现图标，点开即全屏运行，离线可用

### 方法 B：局域网测试（仅浏览，不能安装）

1. 电脑和手机连同一 WiFi
2. 电脑运行 `python -m http.server 8080`
3. 查电脑 IP：`ipconfig` 找 IPv4（如 192.168.1.100）
4. 手机浏览器访问 `http://192.168.1.100:8080`
5. 注意：HTTP 局域网访问不能"添加到主屏"，仅用于测试

### 离线验证

手机打开一次后，关 WiFi 再打开 App，仍能正常加载和打卡。

---

## 二、打包安卓 APK 完整教程

PWA 转 APK 推荐用 [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)（Google 官方）：

### 前置条件

1. 安装 [Node.js](https://nodejs.org/)（LTS 版）
2. 安装 [JDK 17+](https://adoptium.net/)
3. 安装 [Android SDK](https://developer.android.com/studio)（只需 command line tools）

### 步骤

```bash
# 1. 安装 bubblewrap
npm i -g @bubblewrap/cli

# 2. 准备好已部署的 HTTPS 地址（如 GitHub Pages 地址）
# 3. 初始化项目（在空目录执行）
bubblewrap init --manifest https://你的域名/manifest.webmanifest

# 4. 按提示填写：应用名、版本号、包名、图标等
# 5. 构建 APK
bubblewrap build

# 6. 生成的 app-release-signed-apk 文件即为可安装 APK
```

把 APK 传到手机，允许"安装未知来源应用"后安装即可。APK 版可实现锁屏推送提醒（PWA 版受浏览器限制做不到）。

### 替代方案（更简单）

- [PWABuilder](https://www.pwabuilder.com/)：网页版，输入 HTTPS 地址，直接下载 APK，无需命令行。

---

## 数据安全

- 所有数据仅存本机浏览器 IndexedDB，不上传任何服务器
- CSV 备份不含日志图片，图片需手动截图保存
- 清理浏览器数据会丢失所有数据，重要内容先导出 CSV
- 换设备：导出 CSV → 新设备导入，图片需手动迁移
