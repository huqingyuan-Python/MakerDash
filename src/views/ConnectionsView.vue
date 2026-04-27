<template>
  <div class="connections-view">
    <div class="grid grid-2">
      <!-- 串口连接 -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ t('connection.serial') }}</h3>
        </div>
        <div class="connection-form">
          <div class="form-group">
            <label>{{ t('connection.selectPort') }}</label>
            <select v-model="selectedPort">
              <option value="">{{ t('connection.selectPort') }}</option>
              <option v-for="port in dataStore.availablePorts" :key="port" :value="port">
                {{ port }}
              </option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>{{ t('connection.baudRate') }}</label>
              <select v-model="baudRate">
                <option value="9600">9600</option>
                <option value="57600">57600</option>
                <option value="115200">115200</option>
                <option value="230400">230400</option>
                <option value="460800">460800</option>
                <option value="921600">921600</option>
              </select>
            </div>
          </div>
          <div class="btn-group">
            <button class="btn btn-secondary" @click="refreshPorts">
              {{ t('connection.refresh') }}
            </button>
            <button
              class="btn btn-primary"
              :disabled="!selectedPort || dataStore.isConnected"
              @click="connectSerial"
            >
              {{ t('connection.connect') }}
            </button>
            <button
              class="btn btn-danger"
              :disabled="!dataStore.isConnected || dataStore.connection.type !== 'serial'"
              @click="disconnect"
            >
              {{ t('connection.disconnect') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 蓝牙连接 -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ t('connection.bluetooth') }}</h3>
          <span class="badge badge-warning">{{ t('common.info') }}</span>
        </div>
        <div class="connection-form">
          <div class="form-group">
            <label>{{ t('connection.selectPort') }}</label>
            <input
              type="text"
              v-model="btAddress"
              placeholder="XX:XX:XX:XX:XX:XX"
              :disabled="dataStore.isConnected"
            />
          </div>
          <div class="btn-group">
            <button
              class="btn btn-primary"
              :disabled="!btAddress || dataStore.isConnected"
              @click="connectBluetooth"
            >
              {{ t('connection.connect') }}
            </button>
            <button
              class="btn btn-danger"
              :disabled="!dataStore.isConnected || dataStore.connection.type !== 'bluetooth'"
              @click="disconnect"
            >
              {{ t('connection.disconnect') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 网络连接 -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ t('connection.network') }}</h3>
        </div>
        <div class="connection-form">
          <div class="form-group">
            <label>TCP Address</label>
            <input
              type="text"
              v-model="tcpAddress"
              placeholder="192.168.1.100:8080"
              :disabled="dataStore.isConnected"
            />
          </div>
          <div class="btn-group">
            <button
              class="btn btn-primary"
              :disabled="!tcpAddress || dataStore.isConnected"
              @click="connectNetwork"
            >
              {{ t('connection.connect') }}
            </button>
            <button
              class="btn btn-danger"
              :disabled="!dataStore.isConnected || dataStore.connection.type !== 'network'"
              @click="disconnect"
            >
              {{ t('connection.disconnect') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 实时数据预览 -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Raw Data</h3>
        </div>
        <div class="data-preview">
          <pre>{{ dataStore.rawData || '...' }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDataStore } from '../stores/connection';

const { t } = useI18n();
const dataStore = useDataStore();

const selectedPort = ref('');
const baudRate = ref('115200');
const btAddress = ref('');
const tcpAddress = ref('');

async function refreshPorts() {
  await dataStore.refreshPorts();
}

async function connectSerial() {
  if (!selectedPort.value) return;
  try {
    await dataStore.connect('serial', {
      port: selectedPort.value,
      baudRate: parseInt(baudRate.value),
    });
  } catch (e) {
    console.error('Serial connection failed:', e);
  }
}

async function connectBluetooth() {
  if (!btAddress.value) return;
  try {
    await dataStore.connect('bluetooth', {
      address: btAddress.value,
    });
  } catch (e) {
    console.error('Bluetooth connection failed:', e);
  }
}

async function connectNetwork() {
  if (!tcpAddress.value) return;
  try {
    await dataStore.connect('network', {
      address: tcpAddress.value,
    });
  } catch (e) {
    console.error('Network connection failed:', e);
  }
}

async function disconnect() {
  await dataStore.disconnect();
}
</script>

<style scoped lang="scss">
.btn-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.data-preview {
  background-color: var(--bg-tertiary);
  border-radius: var(--radius);
  padding: 16px;
  max-height: 200px;
  overflow: auto;

  pre {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0;
  }
}
</style>