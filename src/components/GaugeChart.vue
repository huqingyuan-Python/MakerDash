<template>
  <div class="gauge-chart">
    <svg viewBox="0 0 200 120" class="gauge-svg">
      <!-- 背景弧 -->
      <path
        :d="arcPath(0, 180)"
        fill="none"
        stroke="var(--bg-tertiary)"
        stroke-width="16"
        stroke-linecap="round"
      />
      <!-- 值弧 -->
      <path
        :d="arcPath(0, progress)"
        fill="none"
        stroke="var(--primary)"
        stroke-width="16"
        stroke-linecap="round"
        class="value-arc"
      />
      <!-- 刻度 -->
      <g class="ticks">
        <line
          v-for="i in 11"
          :key="i"
          :x1="50 + 40 * Math.cos(Math.PI * (1 - (i - 1) / 10))"
          :y1="95 - 40 * Math.sin(Math.PI * (1 - (i - 1) / 10))"
          :x2="50 + 48 * Math.cos(Math.PI * (1 - (i - 1) / 10))"
          :y2="95 - 48 * Math.sin(Math.PI * (1 - (i - 1) / 10))"
          stroke="var(--text-secondary)"
          stroke-width="2"
        />
      </g>
    </svg>
    <div class="gauge-value">{{ displayValue }}</div>
    <div class="gauge-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number;
  min?: number;
  max?: number;
  label?: string;
}>();

const min = computed(() => props.min ?? 0);
const max = computed(() => props.max ?? 100);
const label = computed(() => props.label ?? '');

const progress = computed(() => {
  const range = max.value - min.value;
  const normalized = (props.value - min.value) / range;
  return Math.max(0, Math.min(180, normalized * 180));
});

const displayValue = computed(() => {
  return props.value.toFixed(1);
});

function arcPath(startAngle: number, endAngle: number): string {
  const startRad = Math.PI * (1 - startAngle / 180);
  const endRad = Math.PI * (1 - endAngle / 180);
  const x1 = 50 + 40 * Math.cos(startRad);
  const y1 = 95 - 40 * Math.sin(startRad);
  const x2 = 50 + 40 * Math.cos(endRad);
  const y2 = 95 - 40 * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2}`;
}
</script>

<style scoped lang="scss">
.gauge-chart {
  position: relative;
  width: 200px;
  height: 140px;

  .gauge-svg {
    width: 100%;
    height: 100%;
  }

  .value-arc {
    transition: d 0.3s ease;
  }

  .gauge-value {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .gauge-label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: var(--text-secondary);
  }
}
</style>