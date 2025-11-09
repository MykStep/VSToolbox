import { reactive, computed } from 'vue';

// 1. We move the reactive state from data() here
const valuationMetrics = reactive({
  dvmLA: 150,
  dvmPSQM: 0 // Added this, as your computed property uses it
});

// 2. We convert computed properties
const dvmPrice = computed(() => {
  const area = parseFloat(valuationMetrics.dvmLA) || 0;
  const psqm = parseFloat(valuationMetrics.dvmPSQM) || 0;
  return (area * psqm).toFixed(0);
});

const dvmConfidenceIntervalARG = computed(() => {
  // We can access the .value of another computed property
  const price = parseFloat(dvmPrice.value);
  const lower = price / 1.2;
  const upper = price / 0.95;
  return { lower: lower.toFixed(0), upper: upper.toFixed(0) };
});

const dvmConfidenceIntervalING = computed(() => {
  const price = parseFloat(dvmPrice.value);
  const lower = price / 1.1;
  const upper = price / 0.9;
  return { lower: lower.toFixed(0), upper: upper.toFixed(0) };
});

export function useValuation() {
  // 3. We export everything for the component to use
  return {
    valuationMetrics, // The reactive state
    dvmPrice, // The computed refs
    dvmConfidenceIntervalARG,
    dvmConfidenceIntervalING
  };
}