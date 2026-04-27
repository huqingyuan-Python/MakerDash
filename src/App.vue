<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">M</div>
        <div class="logo-text">
          <div class="title">{{ t('app.title') }}</div>
          <div class="subtitle">{{ t('app.subtitle') }}</div>
        </div>
      </div>

      <nav class="nav-menu">
        <div
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: currentView === item.id }"
          @click="currentView = item.id"
        >
          <span class="icon">{{ item.icon }}</span>
          <span>{{ t(item.label) }}</span>
        </div>
      </nav>
    </aside>

    <main class="main-content">
      <header class="header">
        <h1 class="page-title">{{ t(`nav.${currentView}`) }}</h1>
        <div
          class="connection-status"
          :class="dataStore.isConnected ? 'connected' : 'disconnected'"
        >
          <span class="status-dot" :class="{ pulse: dataStore.connection.status === 'connecting' }"></span>
          <span>{{ t(`connection.${dataStore.connection.status}`) }}</span>
        </div>
      </header>

      <div class="content">
        <DashboardView v-if="currentView === 'dashboard'" />
        <ConnectionsView v-else-if="currentView === 'connections'" />
        <RecordsView v-else-if="currentView === 'records'" />
        <SettingsView v-else-if="currentView === 'settings'" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { listen } from '@tauri-apps/api/event';
import { useDataStore } from './stores/connection';
import { useSettingsStore } from './stores/settings';
import DashboardView from './views/DashboardView.vue';
import ConnectionsView from './views/ConnectionsView.vue';
import RecordsView from './views/RecordsView.vue';
import SettingsView from './views/SettingsView.vue';

const { t, locale } = useI18n();
const dataStore = useDataStore();
const settingsStore = useSettingsStore();

const currentView = ref('dashboard');

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'nav.dashboard' },
  { id: 'connections', icon: '🔌', label: 'nav.connections' },
  { id: 'records', icon: '💾', label: 'nav.records' },
  { id: 'settings', icon: '⚙️', label: 'nav.settings' },
];

// 监听语言变化
watch(
  () => settingsStore.language,
  (newLang) => {
    locale.value = newLang;
  },
  { immediate: true }
);

// 监听后端数据
onMounted(async () => {
  await dataStore.refreshPorts();

  // 监听串口数据
  await listen('serial-data', (event: any) => {
    dataStore.handleIncomingData(event.payload as string);
  });
});
</script>