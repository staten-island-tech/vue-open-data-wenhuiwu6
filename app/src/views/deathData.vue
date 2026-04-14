<template>
  <div v-if="death" class="card">
    <h1>{{ death.leading_cause }}</h1>

    <p><strong>Year:</strong> {{ death.year }}</p>
    <p><strong>Deaths:</strong> {{ death.deaths }}</p>
    <p><strong>Death Rate:</strong> {{ death.death_rate }}</p>
    <p><strong>Age Adjusted Rate:</strong> {{ death.age_adjusted_death_rate }}</p>

    <!-- Chart -->
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

Chart.register(Title, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale)

const route = useRoute()
const death = ref(null)
const chartRef = ref(null)
let chartInstance = null

async function getDeath(id) {
  const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
  const data = await response.json()

  death.value = data[Number(id) - 1]

  await nextTick()
  renderChart()
}

function renderChart() {
  if (!death.value || !chartRef.value) return

  const ctx = chartRef.value.getContext('2d')

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Deaths', 'Death Rate', 'Age-adjusted Rate'],
      datasets: [
        {
          label: death.value.leading_cause,
          data: [
            Number(death.value.deaths) || 0,
            Number(death.value.death_rate) || 0,
            Number(death.value.age_adjusted_death_rate) || 0,
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
}

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy()
})

watch(
  () => route.params.id,
  (id) => getDeath(id),
)

onMounted(() => getDeath(route.params.id))
</script>

<style scoped>
.card {
  width: 80vw;
  margin: 30px auto;
  background: aliceblue;
  padding: 20px;
  text-align: center;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}
</style>
