import { defineStore } from 'pinia';
import { invoke } from '@tauri-apps/api/core';
import { ref, computed } from 'vue';

export interface DataPoint {
  timestamp: number;
  values: Record<string, number>;
}

export interface Widget {
  id: string;
  type: 'lineChart' | 'gauge' | 'barChart' | 'dataGrid' | 'controls';
  title: string;
  config: Record<string, any>;
  data: DataPoint[];
}

export interface Connection {
  type: 'serial' | 'bluetooth' | 'network';
  status: 'connected' | 'disconnected' | 'connecting';
  port?: string;
  baudRate?: number;
  address?: string;
}

export const useDataStore = defineStore('data', () => {
  const connection = ref<Connection>({
    type: 'serial',
    status: 'disconnected',
    port: '',
    baudRate: 115200,
  });

  const availablePorts = ref<string[]>([]);
  const rawData = ref<string>('');
  const parsedData = ref<DataPoint[]>([]);
  const widgets = ref<Widget[]>([]);
  const isRecording = ref(false);
  const recordedData = ref<DataPoint[]>([]);
  const maxDataPoints = ref(100);

  const isConnected = computed(() => connection.value.status === 'connected');

  async function refreshPorts() {
    try {
      const ports = await invoke<string[]>('list_serial_ports');
      availablePorts.value = ports;
    } catch (e) {
      console.error('Failed to list ports:', e);
      availablePorts.value = [];
    }
  }

  async function connect(type: 'serial' | 'bluetooth' | 'network', config: any) {
    connection.value.status = 'connecting';
    try {
      if (type === 'serial') {
        await invoke('connect_serial', {
          port: config.port,
          baudRate: config.baudRate || 115200,
        });
      } else if (type === 'bluetooth') {
        await invoke('connect_bluetooth', { address: config.address });
      } else if (type === 'network') {
        await invoke('connect_network', { address: config.address });
      }
      connection.value = { type, status: 'connected', ...config };
    } catch (e) {
      console.error('Connection failed:', e);
      connection.value.status = 'disconnected';
      throw e;
    }
  }

  async function disconnect() {
    try {
      await invoke('disconnect');
      connection.value.status = 'disconnected';
    } catch (e) {
      console.error('Disconnect failed:', e);
    }
  }

  function handleIncomingData(data: string) {
    rawData.value = data;
    const point = parseData(data);
    if (point) {
      parsedData.value.push(point);
      if (parsedData.value.length > maxDataPoints.value) {
        parsedData.value.shift();
      }
      if (isRecording.value) {
        recordedData.value.push(point);
      }
    }
  }

  function parseData(data: string): DataPoint | null {
    const trimmed = data.trim();
    if (!trimmed) return null;

    // 支持多种数据格式：
    // 1. JSON: {"temp":25.5,"humidity":60}
    // 2. CSV: 25.5,60,1000
    // 3. 带标签的CSV: temp:25.5,humidity:60

    try {
      // 尝试 JSON 格式
      if (trimmed.startsWith('{')) {
        const obj = JSON.parse(trimmed);
        return {
          timestamp: Date.now(),
          values: obj,
        };
      }

      // CSV 格式
      const parts = trimmed.split(',').map((p) => parseFloat(p.trim()));
      if (parts.every((p) => !isNaN(p))) {
        const values: Record<string, number> = {};
        parts.forEach((val, idx) => {
          values[`ch${idx + 1}`] = val;
        });
        return {
          timestamp: Date.now(),
          values,
        };
      }
    } catch (e) {
      console.warn('Failed to parse data:', data);
    }
    return null;
  }

  function addWidget(widget: Omit<Widget, 'id'>) {
    const id = `widget-${Date.now()}`;
    widgets.value.push({ ...widget, id });
  }

  function removeWidget(id: string) {
    const idx = widgets.value.findIndex((w) => w.id === id);
    if (idx !== -1) {
      widgets.value.splice(idx, 1);
    }
  }

  function updateWidget(id: string, updates: Partial<Widget>) {
    const widget = widgets.value.find((w) => w.id === id);
    if (widget) {
      Object.assign(widget, updates);
    }
  }

  function startRecording() {
    isRecording.value = true;
    recordedData.value = [];
  }

  function stopRecording() {
    isRecording.value = false;
  }

  function clearRecords() {
    recordedData.value = [];
  }

  function exportData(format: 'csv' | 'json') {
    if (recordedData.value.length === 0) return null;

    if (format === 'json') {
      return JSON.stringify(recordedData.value, null, 2);
    }

    // CSV 格式
    const headers = Object.keys(recordedData.value[0].values);
    const rows = recordedData.value.map((point) => {
      return [point.timestamp, ...headers.map((h) => point.values[h])].join(',');
    });
    return ['timestamp,' + headers.join(','), ...rows].join('\n');
  }

  return {
    connection,
    availablePorts,
    rawData,
    parsedData,
    widgets,
    isRecording,
    recordedData,
    maxDataPoints,
    isConnected,
    refreshPorts,
    connect,
    disconnect,
    handleIncomingData,
    addWidget,
    removeWidget,
    updateWidget,
    startRecording,
    stopRecording,
    clearRecords,
    exportData,
  };
});