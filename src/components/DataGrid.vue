<template>
  <div class="data-grid-container">
    <table class="data-table" v-if="data.length > 0">
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
          <td v-for="key in dataKeys" :key="key">{{ formatValue(point.values[key]) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="empty-state" v-else>
      <p>No data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface DataPoint {
  timestamp: number;
  values: Record<string, number>;
}

const props = defineProps<{
  data: DataPoint[];
}>();

const dataKeys = computed(() => {
  if (props.data.length === 0) return [];
  return Object.keys(props.data[0].values);
});

const displayData = computed(() => {
  return props.data.slice(-10).reverse();
});

function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

function formatValue(value: number | undefined) {
  if (value === undefined) return '-';
  return value.toFixed(2);
}
</script>

<style scoped lang="scss">
.data-grid-container {
  width: 100%;
  max-height: 200px;
  overflow: auto;

  .data-table {
    width: 100%;
    font-size: 13px;

    th, td {
      padding: 8px 12px;
    }
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    color: var(--text-secondary);
  }
}
</style>