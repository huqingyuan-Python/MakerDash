# MakerDash

> メーカーデータダッシュボード - オープンソースのクロスプラットフォームデータ可視化ツール

<!-- バッジ -->
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows/macOS/Android](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Android-brightgreen)](https://github.com/huqingyuan-Python/MakerDash)
[![Language: Vue + Rust](https://img.shields.io/badge/Language-Vue%20%2B%20Rust-orange)](https://github.com/huqingyuan-Python/MakerDash)
[![Stars](https://img.shields.io/github/stars/huqingyuan-Python/MakerDash?style=social)](https://github.com/huqingyuan-Python/MakerDash)

---

> *"データ可視化をシンプルに、メーカーの作業をスムーズに"*

MakerDashは、メーカー、組み込み開発者、エレクトロニクス愛好家のために設計されたオープンソースのデータ可視化ツールです。シリアルポート、Bluetooth、ネットワークなど複数の接続方式をサポートし、リアルタイムチャート、ダッシュボード、データ記録、エクスポートなどの豊富な機能を提供します。

[English](README.en.md) | [中文](README.md) | [日本語](README.ja.md) | [繁體中文](README.zh-TW.md)

---

## ✨ 機能特徴

### 📡 マルチプロトコル接続
- **シリアル (UART)** - Arduino、ESP32、STM32などすべてのシリアルデバイスに対応
- **Bluetooth (BLE)** - 省電力Bluetoothデバイス接続
- **ネットワーク (TCP)** - リモートデバイスからのデータ取得

### 📊 データ可視化
- **折れ線グラフ** - リアルタイムデータトレンド表示
- **ゲージ** - 直感的な現在値の表示
- **棒グラフ** - マルチチャネルデータの比較
- **データグリッド** - 詳細データの確認

### 💾 データ管理
- **リアルタイム記録** - 収集しながら記録
- **データエクスポート** - CSV/JSON形式をサポート
- **履歴再生** - 過去のデータを確認

### 🎛️ デバイス制御
- **スライダー制御** - LED明るさ、モーター速度、サーボ角度
- **ボタン面板** - クイックコマンド送信
- **カスタムコマンド** - 任意のシリアルコマンドを送信

### 🎨 インターフェース特徴
- **ネイティブ体験** - 3プラットフォームで統一されたデザイン言語
- **多言語** - 簡体字中国語、繁体字中国語、英語、日本語
- **テーマ切替** - ライト/ダーク/システム設定

---

## 🚀 クイックスタート

### 動作環境

| プラットフォーム | 必要環境 |
|----------------|---------|
| Windows | Windows 10以上 |
| macOS | macOS 10.15以上 |
| Android | Android 7.0以上 |

### ソースからビルド

```bash
# プロジェクトのクローン
git clone https://github.com/huqingyuan-Python/MakerDash.git
cd MakerDash

# 依存関係のインストール
npm install

# 開発モードで実行
npm run tauri dev

# アプリケーションをビルド
npm run tauri build
```

### ビルド済みバージョンのダウンロード

[Releases](https://github.com/huqingyuan-Python/MakerDash/releases) ページから最新バージョンをダウンロードできます。

---

## 📖 使い方ガイド

### 1. デバイスを接続

#### シリアル接続
1. USBケーブルでデバイスをパソコンに接続
2. 接続管理ページで対応するシリアルポートを選択
3. ボーレートを設定（デフォルト 115200）
4. 接続ボタンをクリック

#### Bluetooth接続
1. デバイスがペアリングされていることを確認
2. Bluetoothデバイスアドレスを入力
3. 接続ボタンをクリック

### 2. データ形式

MakerDashは複数のデータ形式をサポートしています：

**JSON形式（推奨）**
```json
{"temperature":25.5,"humidity":60}
```

**CSV形式**
```
25.5,60,1000
```

### 3. ウィジェットの追加

1. ダッシュボードで「ウィジェット追加」をクリック
2. 必要なウィジェットタイプを選択
3. 自動的にデータの表示を開始

---

## 🛠️ 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンドフレームワーク | Vue 3 + TypeScript |
| 状態管理 | Pinia |
| チャートライブラリ | Chart.js |
| デスクトップフレームワーク | Tauri 2.0 |
| バックエンド言語 | Rust |
| シリアル通信 | serialport |

---

## 🤝 コントリビュート

コントリビューションを歓迎します！IssueやPull Requestをお気軽にどうぞ。

1. このリポジトリをFork
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを作成

---

## 📄 ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。

---

## 🙏 謝辞

- [Tauri](https://tauri.app/) - クロスプラットフォームデスクトップアプリの構築
- [Vue.js](https://vuejs.org/) - 漸進的なJavaScriptフレームワーク
- [Chart.js](https://www.chartjs.org/) - シンプルで柔軟なJavaScriptチャート
- [Serial Studio](https://github.com/Serial-Studio/Serial-Studio) - データ可視化のインスピレーション

---

## 📬 お問い合わせ

- **GitHub**: [huqingyuan-Python/MakerDash](https://github.com/huqingyuan-Python/MakerDash)

---

<p align="center">
  <strong>❤️ で制作 by 胡清源</strong>
</p>