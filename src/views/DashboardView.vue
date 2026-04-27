<template>
  <div class="dashboard-view">
    <div class="welcome-card" v-if="dataStore.parsedData.length === 0">
      <div class="welcome-icon">📊</div>
      <div class="welcome-text">
        <h2>{{ t('dashboard.title') }}</h2>
        <p>{{ t('dashboard.noData') }}</p>
      </div>
    </div>

    <div class="dashboard-content" v-else>
      <div class="dashboard-toolbar">
        <button class="btn btn-primary" @click="showAddWidgetModal = true">
          {{ t('dashboard.addWidget') }}
        </button>
      </div>

      <div class="widget-grid">
        <div
          v-for="widget in dataStore.widgets"
          :key="widget.id"
          class="widget"
        >
          <div class="widget-header">
            <span class="widget-title">{{ widget.title }}</span>
            <div class="widget-actions">
              <button @click="removeWidget(widget.id)">×</button>
            </div>
          </div>
          <div class="widget-content">
            <LineChart v-if="widget.type === 'lineChart'" :data="dataStore.parsedData" />
            <GaugeChart v-else-if="widget.type === 'gauge'" :value="currentValue" />
            <BarChart v-else-if="widget.type === 'barChart'" :data="dataStore.parsedData" />
            <DataGrid v-else-if="widget.type === 'dataGrid'" :data="dataStore.parsedData" />
            <ControlPanel v-else-if="widget.type === 'controls'" />
          </div>
        </div>

        <!-- 默认图表 -->
        <div class="widget" v-if="dataStore.widgets.length === 0">
          <div class="widget-header">
            <span class="widget-title">{{ t('dashboard.widgets.lineChart') }}</span>
          </div>
          <div class="widget-content">
            <LineChart :data="dataStore.parsedData" />
          </div>
        </div>
      </div>
    </div>

    <!-- 添加组件模态框 -->
    <div class="modal-overlay" v-if="showAddWidgetModal" @click.self="showAddWidgetModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ t('dashboard.addWidget') }}</h3>
          <button class="close-btn" @click="showAddWidgetModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="widget-type-grid">
            <div
              v-for="type in widgetTypes"
              :key="type.id"
              class="widget-type-item"
              @click="addWidget(type.id)"
            >
              <span class="widget-type-icon">{{ type.icon }}</span>
              <span class="widget-type-name">{{ t(`dashboard.widgets.${type.id}`) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDataStore } from '../stores/connection';
import LineChart from '../components/LineChart.vue';
import GaugeChart from '../components/GaugeChart.vue';
import BarChart from '../components/BarChart.vue';
import DataGrid from '../components/DataGrid.vue';
import ControlPanel from '../components/ControlPanel.vue';

const { t } = useI18n();
const dataStore = useDataStore();
const showAddWidgetModal = ref(false);

const widgetTypes = [
  { id: 'lineChart', icon: '📈' },
  { id: 'gauge', icon: '🎯' },
  { id: 'barChart', icon: '📊' },
  { id: 'dataGrid', icon: '📋' },
  { id: 'controls', icon: '🎮' },
];

const currentValue = computed(() => {
  if (dataStore.parsedData.length === 0) return 0;
  const latest = dataStore.parsedData[dataStore.parsedData.length - 1];
  const firstKey = Object.keys(latest.values)[0];
  return firstKey ? latest.values[firstKey] : 0;
});

function addWidget(type: string) {
  dataStore.addWidget({
    type: type as any,
    title: t(`dashboard.widgets.${type}`),
    config: {},
    data: [],
  });
  showAddWidgetModal.value = false;
}

function removeWidget(id: string) {
  dataStore.removeWidget(id);
}
</script>

<style scoped lang="scss">
.dashboard-view {
  height: 100%;
}

.dashboard-content {
  .dashboard-toolbar {
    margin-bottom: 20px;
  }
}

.widget-type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  .widget-type-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--primary);
      background-color: rgba(99, 102, 241, 0.05);
    }

    .widget-type-icon {
      font-size: 32px;
    }

    .widget-type-name {
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>