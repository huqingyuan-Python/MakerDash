<template>
  <div class="settings-view">
    <div class="grid grid-2">
      <!-- 语言设置 -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ t('settings.language') }}</h3>
        </div>
        <div class="language-selector">
          <button
            v-for="lang in languages"
            :key="lang.code"
            :class="{ active: settingsStore.language === lang.code }"
            @click="settingsStore.setLanguage(lang.code)"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>

      <!-- 主题设置 -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ t('settings.theme') }}</h3>
        </div>
        <div class="theme-selector">
          <button
            class="light"
            :class="{ active: settingsStore.theme === 'light' }"
            @click="settingsStore.setTheme('light')"
            :title="t('settings.themes.light')"
          ></button>
          <button
            class="dark"
            :class="{ active: settingsStore.theme === 'dark' }"
            @click="settingsStore.setTheme('dark')"
            :title="t('settings.themes.dark')"
          ></button>
          <button
            class="system"
            :class="{ active: settingsStore.theme === 'system' }"
            @click="settingsStore.setTheme('system')"
            :title="t('settings.themes.system')"
          ></button>
        </div>
      </div>

      <!-- 关于 -->
      <div class="card" style="grid-column: span 2;">
        <div class="card-header">
          <h3 class="card-title">{{ t('settings.about') }}</h3>
        </div>
        <div class="about-content">
          <div class="about-logo">
            <div class="logo-icon-lg">M</div>
            <div class="about-info">
              <h2>{{ t('app.title') }}</h2>
              <p>{{ t('app.subtitle') }}</p>
            </div>
          </div>
          <div class="about-details">
            <div class="about-row">
              <span class="label">{{ t('settings.version') }}:</span>
              <span class="value">1.0.0</span>
            </div>
            <div class="about-row">
              <span class="label">{{ t('settings.github') }}:</span>
              <a href="https://github.com/huqingyuan-Python/MakerDash" target="_blank">
                github.com/huqingyuan-Python/MakerDash
              </a>
            </div>
            <div class="about-row">
              <span class="label">License:</span>
              <span class="value">MIT License</span>
            </div>
          </div>
          <div class="about-description">
            <p>
              MakerDash 是一个开源的跨平台创客数据可视化工具，支持串口、蓝牙、网络等多种连接方式，
              提供实时数据可视化、数据记录与导出、设备控制等功能。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../stores/settings';

const { t } = useI18n();
const settingsStore = useSettingsStore();

const languages = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en-US', name: 'English' },
  { code: 'ja-JP', name: '日本語' },
];
</script>

<style scoped lang="scss">
.about-content {
  .about-logo {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    .logo-icon-lg {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 32px;
    }

    .about-info {
      h2 {
        font-size: 24px;
        margin-bottom: 4px;
      }

      p {
        color: var(--text-secondary);
      }
    }
  }

  .about-details {
    margin-bottom: 20px;

    .about-row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;

      .label {
        color: var(--text-secondary);
        min-width: 80px;
      }

      .value {
        font-weight: 500;
      }

      a {
        color: var(--primary);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .about-description {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.8;
  }
}
</style>