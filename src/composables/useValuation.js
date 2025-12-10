import { reactive, computed } from 'vue';

function computeCI(tx, min, max){
  // We can access the .value of another computed property
  const price = parseFloat(tx);
  const lower = price / max;
  const upper = price / min;
  return { lower: lower.toFixed(0), upper: upper.toFixed(0) };
}



export function useValuation() {
  const valuationMetrics = reactive({
    dvmLA: 150,
    dvmPSQM: 2500 // Added this, as your computed property uses it
  });

  // 2. We convert computed properties
  const dvmPrice = computed(() => {
    const area = parseFloat(valuationMetrics.dvmLA) || 0;
    const psqm = parseFloat(valuationMetrics.dvmPSQM) || 0;
    return (area * psqm).toFixed(0);
  });

  const dvmConfidenceIntervalARG = computed(() => {
    const ci = computeCI(dvmPrice.value, 0.95, 1.2);
    return `[ ${ ci.lower } ; ${ ci.upper } ]`;
  });

  const dvmConfidenceIntervalING = computed(() => {
    const ci = computeCI(dvmPrice.value, 0.9, 1.1);
    return `[ ${ ci.lower } ; ${ ci.upper } ]`;
  });

  // 3. We export everything for the component to use
  return {
    valuationMetrics, // The reactive state
    dvmPrice, // The computed refs
    dvmConfidenceIntervalARG,
    dvmConfidenceIntervalING
  };
}