# MakerDash

> Maker Data Dashboard - Open Source Cross-Platform Data Visualization Tool

<!-- Badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows/macOS/Android](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Android-brightgreen)](https://github.com/huqingyuan-Python/MakerDash)
[![Language: Vue + Rust](https://img.shields.io/badge/Language-Vue%20%2B%20Rust-orange)](https://github.com/huqingyuan-Python/MakerDash)
[![Stars](https://img.shields.io/github/stars/huqingyuan-Python/MakerDash?style=social)](https://github.com/huqingyuan-Python/MakerDash)

---

> *"Making data visualization simple, making maker work more efficient"*

MakerDash is an open-source data visualization tool designed for makers, embedded developers, and electronics enthusiasts. It supports multiple connection methods including serial port, Bluetooth, and network, providing real-time charts, dashboards, data recording, and export capabilities.

[English](README.en.md) | [中文](README.md) | [日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

---

## ✨ Features

### 📡 Multi-Protocol Connection
- **Serial (UART)** - Supports Arduino, ESP32, STM32 and all serial devices
- **Bluetooth (BLE)** - Low energy Bluetooth device connection
- **Network (TCP)** - Remote device data acquisition

### 📊 Data Visualization
- **Line Chart** - Real-time data trend display
- **Gauge** - Intuitive current value display
- **Bar Chart** - Multi-channel data comparison
- **Data Grid** - Detailed value viewing

### 💾 Data Management
- **Real-time Recording** - Record while collecting
- **Data Export** - Supports CSV/JSON format
- **History Playback** - View historical data

### 🎛️ Device Control
- **Slider Control** - LED brightness, motor speed, servo angle
- **Button Panel** - Quick command sending
- **Custom Commands** - Send any serial command

### 🎨 Interface Features
- **Native Experience** - Unified design language across three platforms
- **Multi-language** - Simplified Chinese, Traditional Chinese, English, Japanese
- **Theme Switching** - Light/Dark/System

---

## 🚀 Quick Start

### Environment Requirements

| Platform | Requirements |
|----------|-------------|
| Windows | Windows 10+ |
| macOS | macOS 10.15+ |
| Android | Android 7.0+ |

### Build from Source

```bash
# Clone the project
git clone https://github.com/huqingyuan-Python/MakerDash.git
cd MakerDash

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build the application
npm run tauri build
```

### Download Pre-built Version

Go to the [Releases](https://github.com/huqingyuan-Python/MakerDash/releases) page to download the latest version.

---

## 📖 User Guide

### 1. Connect Device

#### Serial Connection
1. Connect your device to the computer using a USB cable
2. Select the corresponding serial port on the connection management page
3. Set the baud rate (default 115200)
4. Click the connect button

#### Bluetooth Connection
1. Make sure the device is paired
2. Enter the Bluetooth device address
3. Click the connect button

### 2. Data Format

MakerDash supports multiple data formats:

**JSON format (Recommended)**
```json
{"temperature":25.5,"humidity":60}
```

**CSV format**
```
25.5,60,1000
```

### 3. Add Widgets

1. Click "Add Widget" on the dashboard
2. Select the required widget type
3. Automatically start displaying data

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | Vue 3 + TypeScript |
| State Management | Pinia |
| Chart Library | Chart.js |
| Desktop Framework | Tauri 2.0 |
| Backend Language | Rust |
| Serial Communication | serialport |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - Build cross-platform desktop apps
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Chart.js](https://www.chartjs.org/) - Simple yet flexible JavaScript charting
- [Serial Studio](https://github.com/Serial-Studio/Serial-Studio) - Data visualization inspiration

---

## 📬 Contact

- **GitHub**: [huqingyuan-Python/MakerDash](https://github.com/huqingyuan-Python/MakerDash)

---

<p align="center">
  <strong>Made with ❤️ by Hu Qingyuan</strong>
</p>