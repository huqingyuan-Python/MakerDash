<template>
  <div class="bar-chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataPoint {
  timestamp: number;
  values: Record<string, number>;
}

const props = defineProps<{
  data: DataPoint[];
}>();

const chartData = computed(() => {
  if (props.data.length === 0) {
    return { labels: [], datasets: [] };
  }

  const recentData = props.data.slice(-20);
  const labels = recentData.map((d) => {
    const date = new Date(d.timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  const valueKeys = Object.keys(recentData[0].values);
  const colors = [
    'rgb(99, 102, 241)',
    'rgb(139, 92, 246)',
    'rgb(16, 185, 129)',
    'rgb(245, 158, 11)',
    'rgb(239, 68, 68)',
  ];

  const datasets = valueKeys.map((key, idx) => ({
    label: key,
    data: recentData.map((d) => d.values[key]),
    backgroundColor: colors[idx % colors.length],
    borderRadius: 4,
  }));

  return { labels, datasets };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 200px;
}
</style>