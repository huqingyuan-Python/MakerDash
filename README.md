# MakerDash

> 创客数据仪表盘 - 开源跨平台数据可视化工具

<!-- 徽章 -->
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows/macOS/Android](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Android-brightgreen)](https://github.com/huqingyuan-Python/MakerDash)
[![Language: Vue + Rust](https://img.shields.io/badge/Language-Vue%20%2B%20Rust-orange)](https://github.com/huqingyuan-Python/MakerDash)
[![Stars](https://img.shields.io/github/stars/huqingyuan-Python/MakerDash?style=social)](https://github.com/huqingyuan-Python/MakerDash)

---

> *"让数据可视化变得简单，让创客工作更高效"*

MakerDash 是一款专为创客、嵌入式开发者和电子爱好者设计的开源数据可视化工具。支持串口、蓝牙、网络等多种连接方式，提供实时图表、仪表盘、数据记录与导出等丰富功能。

[English](README.en.md) | [中文](README.md) | [日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

---

## ✨ 功能特点

### 📡 多协议连接
- **串口 (UART)** - 支持 Arduino、ESP32、STM32 等所有串口设备
- **蓝牙 (BLE)** - 低功耗蓝牙设备连接
- **网络 (TCP)** - 远程设备数据采集

### 📊 数据可视化
- **折线图** - 实时数据趋势展示
- **仪表盘** - 直观显示当前数值
- **柱状图** - 多通道数据对比
- **数据表格** - 详细数值查看

### 💾 数据管理
- **实时记录** - 边采集边记录
- **数据导出** - 支持 CSV/JSON 格式
- **历史回放** - 查看历史数据

### 🎛️ 设备控制
- **滑块控制** - LED亮度、电机速度、舵机角度
- **按钮面板** - 快捷命令发送
- **自定义指令** - 发送任意串口命令

### 🎨 界面特色
- **原生体验** - 三端统一设计语言
- **多语言** - 简体中文、繁体中文、英语、日语
- **主题切换** - 浅色/深色/跟随系统

---

## 🚀 快速开始

### 环境要求

| 平台 | 要求 |
|------|------|
| Windows | Windows 10+ |
| macOS | macOS 10.15+ |
| Android | Android 7.0+ |

### 从源码构建

```bash
# 克隆项目
git clone https://github.com/huqingyuan-Python/MakerDash.git
cd MakerDash

# 安装依赖
npm install

# 开发模式运行
npm run tauri dev

# 构建应用
npm run tauri build
```

### 下载预编译版本

前往 [Releases](https://github.com/huqingyuan-Python/MakerDash/releases) 页面下载最新版本。

---

## 📖 使用指南

### 1. 连接设备

#### 串口连接
1. 使用 USB 数据线连接设备到电脑
2. 在连接管理页面选择对应的串口号
3. 设置波特率（默认 115200）
4. 点击连接按钮

#### 蓝牙连接
1. 确保设备已配对
2. 输入蓝牙设备地址
3. 点击连接按钮

### 2. 数据格式

MakerDash 支持多种数据格式：

**JSON 格式（推荐）**
```json
{"temperature":25.5,"humidity":60}
```

**CSV 格式**
```
25.5,60,1000
```

### 3. 添加组件

1. 在数据面板点击「添加组件」
2. 选择需要的组件类型
3. 自动开始显示数据

---

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Vue 3 + TypeScript |
| 状态管理 | Pinia |
| 图表库 | Chart.js |
| 桌面框架 | Tauri 2.0 |
| 后端语言 | Rust |
| 串口通信 | serialport |

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

## 🙏 致谢

- [Tauri](https://tauri.app/) - 构建跨平台桌面应用
- [Vue.js](https://vuejs.org/) - 渐进式前端框架
- [Chart.js](https://www.chartjs.org/) - 简洁而强大的图表库
- [Serial Studio](https://github.com/Serial-Studio/Serial-Studio) - 数据可视化灵感来源

---

## 📬 联系方式

- **GitHub**: [huqingyuan-Python/MakerDash](https://github.com/huqingyuan-Python/MakerDash)
- **邮箱**: (请访问 GitHub 获取)

---

<p align="center">
  <strong>Made with ❤️ by 胡清源</strong>
</p>