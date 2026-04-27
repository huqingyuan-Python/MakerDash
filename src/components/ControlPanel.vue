<template>
  <div class="control-panel">
    <div class="control-item">
      <label>LED</label>
      <input type="range" min="0" max="255" v-model="ledValue" @change="sendLedCommand" />
      <span class="value">{{ ledValue }}</span>
    </div>
    <div class="control-item">
      <label>Motor</label>
      <input type="range" min="0" max="100" v-model="motorValue" @change="sendMotorCommand" />
      <span class="value">{{ motorValue }}%</span>
    </div>
    <div class="control-item">
      <label>Servo</label>
      <input type="range" min="0" max="180" v-model="servoValue" @change="sendServoCommand" />
      <span class="value">{{ servoValue }}°</span>
    </div>

    <div class="button-grid">
      <button @click="sendCommand('buzzer:on')">🔊 On</button>
      <button @click="sendCommand('buzzer:off')">🔇 Off</button>
      <button @click="sendCommand('relay:toggle')">🔌 Relay</button>
      <button @click="sendCommand('motor:forward')">⬆️ FWD</button>
      <button @click="sendCommand('motor:stop')">⏹ STOP</button>
      <button @click="sendCommand('motor:reverse')">⬇️ REV</button>
    </div>

    <div class="custom-command">
      <input
        type="text"
        v-model="customCommand"
        placeholder="Custom command..."
        @keyup.enter="sendCustomCommand"
      />
      <button class="btn btn-primary btn-sm" @click="sendCustomCommand">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';

const ledValue = ref(0);
const motorValue = ref(0);
const servoValue = ref(0);
const customCommand = ref('');

async function sendCommand(cmd: string) {
  try {
    await invoke('send_command', { command: cmd });
    console.log('Command sent:', cmd);
  } catch (e) {
    console.error('Failed to send command:', e);
  }
}

async function sendLedCommand() {
  await sendCommand(`led:${ledValue.value}`);
}

async function sendMotorCommand() {
  await sendCommand(`motor:${motorValue.value}`);
}

async function sendServoCommand() {
  await sendCommand(`servo:${servoValue.value}`);
}

async function sendCustomCommand() {
  if (customCommand.value.trim()) {
    await sendCommand(customCommand.value.trim());
    customCommand.value = '';
  }
}
</script>

<style scoped lang="scss">
.control-panel {
  width: 100%;

  .control-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    label {
      width: 60px;
      font-size: 14px;
    }

    input[type="range"] {
      flex: 1;
    }

    .value {
      width: 50px;
      text-align: right;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 16px;

    button {
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;

      &:hover {
        border-color: var(--primary);
        background-color: rgba(99, 102, 241, 0.05);
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }

  .custom-command {
    display: flex;
    gap: 8px;
    margin-top: 16px;

    input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 13px;
      background-color: var(--bg-primary);
      color: var(--text-primary);

      &:focus {
        outline: none;
        border-color: var(--primary);
      }
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 13px;
    }
  }
}
</style>