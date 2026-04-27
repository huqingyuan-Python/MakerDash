# 构建指南

## 环境要求

### Windows
- Windows 10+ (64-bit)
- WebView2 Runtime (Windows 11 已内置)

### macOS
- macOS 10.15 (Catalina)+
- Xcode Command Line Tools

### Android
- Android 7.0+ (API 24)
- Android Studio (用于调试)

## 构建步骤

### 1. 安装 Node.js
```bash
# Windows
winget install OpenJS.NodeJS.LTS

# macOS
brew install node
```

### 2. 安装 Rust
```bash
# Windows/macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 3. 克隆项目
```bash
git clone https://github.com/huqingyuan-Python/MakerDash.git
cd MakerDash
```

### 4. 安装依赖
```bash
npm install
```

### 5. 开发模式运行
```bash
npm run tauri dev
```

### 6. 构建发布版本

#### Windows
```bash
npm run tauri build -- --bundles nsis
# 输出: src-tauri/target/release/bundle/nsis/MakerDash_x.x.x_x64-setup.exe
```

#### macOS
```bash
npm run tauri build -- --bundles dmg
# 输出: src-tauri/target/release/bundle/dmg/MakerDash_x.x.x_x64.dmg
```

#### Android
```bash
npm run tauri build -- --bundles apk
# 输出: src-tauri/target/release/bundle/android/app/build/outputs/apk/debug/app-debug.apk
```

### 7. 安装 Rust 目标平台 (Android)
```bash
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android
```

## 故障排除

### 串口权限问题 (Linux/macOS)
```bash
sudo usermod -a -G dialout $USER
# 然后重新登录
```

### Android SDK 未找到
确保设置 ANDROID_HOME 环境变量:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

### 构建失败
尝试清理并重新构建:
```bash
cargo clean
npm run tauri build
```

## 技术支持

如有问题，请提交 [Issue](https://github.com/huqingyuan-Python/MakerDash/issues)