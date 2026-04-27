# MakerDash

> 創客數據儀表盤 - 開源跨平台數據可視化工具

<!-- 徽章 -->
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows/macOS/Android](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Android-brightgreen)](https://github.com/huqingyuan-Python/MakerDash)
[![Language: Vue + Rust](https://img.shields.io/badge/Language-Vue%20%2B%20Rust-orange)](https://github.com/huqingyuan-Python/MakerDash)
[![Stars](https://img.shields.io/github/stars/huqingyuan-Python/MakerDash?style=social)](https://github.com/huqingyuan-Python/MakerDash)

---

> *"讓數據可視化變得簡單，讓創客工作更高效"*

MakerDash 是一款專為創客、嵌入式開發者和電子愛好者設計的開源數據可視化工具。支持串口、藍牙、網路等多種連接方式，提供即時圖表、儀表盤、數據記錄與導出等豐富功能。

[English](README.en.md) | [中文](README.md) | [日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

---

## ✨ 功能特點

### 📡 多協議連接
- **串口 (UART)** - 支持 Arduino、ESP32、STM32 等所有串口設備
- **藍牙 (BLE)** - 低功耗藍牙設備連接
- **網路 (TCP)** - 遠程設備數據採集

### 📊 數據可視化
- **折線圖** - 即時數據趨勢展示
- **儀表盤** - 直觀顯示當前數值
- **柱狀圖** - 多通道數據對比
- **數據表格** - 詳細數值查看

### 💾 數據管理
- **即時記錄** - 邊採集邊記錄
- **數據導出** - 支持 CSV/JSON 格式
- **歷史回放** - 查看歷史數據

### 🎛️ 設備控制
- **滑塊控制** - LED亮度、電機速度、舵機角度
- **按鈕面板** - 快捷命令發送
- **自定義指令** - 發送任意串口命令

### 🎨 介面特色
- **原生體驗** - 三端統一設計語言
- **多語言** - 簡體中文、繁體中文、英語、日語
- **主題切換** - 淺色/深色/跟隨系統

---

## 🚀 快速開始

### 環境要求

| 平台 | 要求 |
|------|------|
| Windows | Windows 10+ |
| macOS | macOS 10.15+ |
| Android | Android 7.0+ |

### 從源碼構建

```bash
# 克隆項目
git clone https://github.com/huqingyuan-Python/MakerDash.git
cd MakerDash

# 安裝依賴
npm install

# 開發模式運行
npm run tauri dev

# 構建應用
npm run tauri build
```

### 下載預編譯版本

前往 [Releases](https://github.com/huqingyuan-Python/MakerDash/releases) 頁面下載最新版本。

---

## 📖 使用指南

### 1. 連接設備

#### 串口連接
1. 使用 USB 數據線連接設備到電腦
2. 在連接管理頁面選擇對應的串口號
3. 設置波特率（默認 115200）
4. 點擊連接按鈕

#### 藍牙連接
1. 確保設備已配對
2. 輸入藍牙設備地址
3. 點擊連接按鈕

### 2. 數據格式

MakerDash 支持多種數據格式：

**JSON 格式（推薦）**
```json
{"temperature":25.5,"humidity":60}
```

**CSV 格式**
```
25.5,60,1000
```

### 3. 添加組件

1. 在數據面板點擊「添加組件」
2. 選擇需要的組件類型
3. 自動開始顯示數據

---

## 🛠️ 技術棧

| 層級 | 技術 |
|------|------|
| 前端框架 | Vue 3 + TypeScript |
| 狀態管理 | Pinia |
| 圖表庫 | Chart.js |
| 桌面框架 | Tauri 2.0 |
| 後端語言 | Rust |
| 串口通信 | serialport |

---

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. Fork 本倉庫
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送至分支 (`git push origin feature/AmazingFeature`)
5. 創建 Pull Request

---

## 📄 許可證

本項目採用 [MIT 許可證](LICENSE)。

---

## 🙏 致謝

- [Tauri](https://tauri.app/) - 構建跨平台桌面應用
- [Vue.js](https://vuejs.org/) - 漸進式前端框架
- [Chart.js](https://www.chartjs.org/) - 簡潔而強大的圖表庫
- [Serial Studio](https://github.com/Serial-Studio/Serial-Studio) - 數據可視化靈感來源

---

## 📬 聯繫方式

- **GitHub**: [huqingyuan-Python/MakerDash](https://github.com/huqingyuan-Python/MakerDash)
- **郵箱**: (請訪問 GitHub 獲取)

---

<p align="center">
  <strong>用心製作 ❤️ by 胡清源</strong>
</p>