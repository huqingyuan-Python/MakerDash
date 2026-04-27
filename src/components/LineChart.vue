<template>
  <div class="line-chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

  const labels = props.data.map((d) => {
    const date = new Date(d.timestamp);
    return date.toLocaleTimeString();
  });

  const valueKeys = Object.keys(props.data[0].values);
  const colors = [
    { bg: 'rgba(99, 102, 241, 0.1)', border: 'rgb(99, 102, 241)' },
    { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgb(139, 92, 246)' },
    { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgb(16, 185, 129)' },
    { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgb(245, 158, 11)' },
    { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgb(239, 68, 68)' },
  ];

  const datasets = valueKeys.map((key, idx) => {
    const color = colors[idx % colors.length];
    return {
      label: key,
      data: props.data.map((d) => d.values[key]),
      fill: true,
      backgroundColor: color.bg,
      borderColor: color.border,
      tension: 0.4,
      pointRadius: 2,
      pointHoverRadius: 5,
    };
  });

  return { labels, datasets };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
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
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
};
</script>

<style scoped>
.line-chart-container {
  width: 100%;
  height: 200px;
}
</style>