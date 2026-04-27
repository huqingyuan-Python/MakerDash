<template>
  <div class="records-view">
    <!-- 统计信息 -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-value">{{ dataStore.recordedData.length }}</div>
        <div class="stat-label">{{ t('records.dataPoints') }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ formattedDuration }}</div>
        <div class="stat-label">{{ t('records.duration') }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ dataStore.isRecording ? '🔴' : '⚪' }}</div>
        <div class="stat-label">{{ dataStore.isRecording ? 'Recording' : 'Stopped' }}</div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="card" style="margin-bottom: 20px;">
      <div class="card-header">
        <h3 class="card-title">{{ t('records.title') }}</h3>
      </div>
      <div class="record-controls">
        <button
          v-if="!dataStore.isRecording"
          class="btn btn-success"
          @click="startRecording"
        >
          {{ t('records.start') }}
        </button>
        <button
          v-else
          class="btn btn-danger"
          @click="stopRecording"
        >
          {{ t('records.stop') }}
        </button>
        <button
          class="btn btn-secondary"
          :disabled="dataStore.recordedData.length === 0"
          @click="showExportModal = true"
        >
          {{ t('records.export') }}
        </button>
        <button
          class="btn btn-secondary"
          :disabled="dataStore.recordedData.length === 0"
          @click="clearRecords"
        >
          {{ t('records.clear') }}
        </button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ t('dashboard.widgets.dataGrid') }}</h3>
      </div>
      <div class="table-container">
        <table class="data-table" v-if="dataStore.recordedData.length > 0">
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th v-for="key in dataKeys" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(point, idx) in displayData" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ formatTime(point.timestamp) }}</td>
              <td v-for="key in dataKeys" :key="key">{{ point.values[key]?.toFixed(2) ?? '-' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="empty-state" v-else>
          <div class="empty-icon">📊</div>
          <p>{{ t('dashboard.noData') }}</p>
        </div>
      </div>
    </div>

    <!-- 导出模态框 -->
    <div class="modal-overlay" v-if="showExportModal" @click.self="showExportModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ t('records.export') }}</h3>
          <button class="close-btn" @click="showExportModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>{{ t('records.format') }}</label>
            <select v-model="exportFormat">
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <div class="export-preview" v-if="exportData">
            <pre>{{ exportData.substring(0, 500) }}{{ exportData.length > 500 ? '...' : '' }}</pre>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showExportModal = false">
            {{ t('common.cancel') }}
          </button>
          <button class="btn btn-primary" @click="downloadExport">
            {{ t('records.export') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDataStore } from '../stores/connection';
import { useSettingsStore } from '../stores/settings';

const { t } = useI18n();
const dataStore = useDataStore();
const settingsStore = useSettingsStore();

const showExportModal = ref(false);
const exportFormat = ref<'csv' | 'json'>('csv');
const recordStartTime = ref(0);

const dataKeys = computed(() => {
  if (dataStore.recordedData.length === 0) return [];
  return Object.keys(dataStore.recordedData[0].values);
});

const displayData = computed(() => {
  return dataStore.recordedData.slice(-50);
});

const formattedDuration = computed(() => {
  if (!dataStore.isRecording || recordStartTime.value === 0) return '00:00';
  const elapsed = Math.floor((Date.now() - recordStartTime.value) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});

const exportData = computed(() => {
  if (dataStore.recordedData.length === 0) return '';
  return dataStore.exportData(exportFormat.value);
});

function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

function startRecording() {
  recordStartTime.value = Date.now();
  dataStore.startRecording();
}

function stopRecording() {
  dataStore.stopRecording();
}

function clearRecords() {
  dataStore.clearRecords();
  recordStartTime.value = 0;
}

function downloadExport() {
  const data = exportData.value;
  if (!data) return;

  const blob = new Blob([data], { type: exportFormat.value === 'json' ? 'application/json' : 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `makerdash-export-${Date.now()}.${exportFormat.value}`;
  a.click();
  URL.revokeObjectURL(url);
  showExportModal.value = false;
}

// 更新时长显示
let timer: number | null = null;
watch(
  () => dataStore.isRecording,
  (recording) => {
    if (recording) {
      timer = window.setInterval(() => {}, 1000);
    } else if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
);

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped lang="scss">
.record-controls {
  display: flex;
  gap: 12px;
}

.table-container {
  max-height: 400px;
  overflow: auto;
}

.export-preview {
  margin-top: 16px;
  padding: 16px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius);
  max-height: 200px;
  overflow: auto;

  pre {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    white-space: pre-wrap;
    margin: 0;
  }
}
</style>