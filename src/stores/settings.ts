import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

type Theme = 'light' | 'dark' | 'system';
type Language = 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW';

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Theme>('system');
  const language = ref<Language>('zh-CN');
  const autoConnect = ref(false);
  const dataRefreshRate = ref(60); // FPS
  const maxDataPoints = ref(100);

  // 从 localStorage 加载设置
  function loadSettings() {
    const saved = localStorage.getItem('makerdash-settings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        theme.value = settings.theme || 'system';
        language.value = settings.language || 'zh-CN';
        autoConnect.value = settings.autoConnect || false;
        dataRefreshRate.value = settings.dataRefreshRate || 60;
        maxDataPoints.value = settings.maxDataPoints || 100;
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
    applyTheme();
  }

  // 保存设置到 localStorage
  function saveSettings() {
    localStorage.setItem(
      'makerdash-settings',
      JSON.stringify({
        theme: theme.value,
        language: language.value,
        autoConnect: autoConnect.value,
        dataRefreshRate: dataRefreshRate.value,
        maxDataPoints: maxDataPoints.value,
      })
    );
  }

  // 应用主题
  function applyTheme() {
    const root = document.documentElement;
    if (theme.value === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme.value === 'dark');
    }
  }

  // 监听系统主题变化
  function setupThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme();
      }
    });
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme;
    applyTheme();
    saveSettings();
  }

  function setLanguage(newLanguage: Language) {
    language.value = newLanguage;
    saveSettings();
  }

  // 初始化
  loadSettings();
  setupThemeListener();

  return {
    theme,
    language,
    autoConnect,
    dataRefreshRate,
    maxDataPoints,
    loadSettings,
    saveSettings,
    setTheme,
    setLanguage,
  };
});