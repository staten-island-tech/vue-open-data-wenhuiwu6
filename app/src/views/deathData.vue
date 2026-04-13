<template>
  <div class="wrapper">
    <div v-if="death">
      <h1>{{ death.leading_cause }}</h1>
      <p class="subtitle">{{ death.sex }} · {{ death.race_ethnicity }}</p>

      <div style="position: relative; width: 100%; height: 320px; margin-top: 2rem">
        <canvas
          id="deathChart"
          role="img"
          :aria-label="`Bar chart showing stats for ${death.leading_cause}`"
        >
          Deaths: {{ death.deaths }}, Death Rate: {{ death.death_rate }}, Age-adjusted Rate:
          {{ death.age_adjusted_death_rate }}
        </canvas>
      </div>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const route = useRoute()
const death = ref(null)
let chartInstance = null

async function getDeath(id) {
  const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
  const data = await response.json()
  death.value = data[Number(id) - 1]
  await nextTick()
  await nextTick()
  renderChart()
}

function renderChart() {
  if (!death.value) return

  const canvas = document.getElementById('deathChart')
  if (!canvas) {
    console.warn('Canvas not found')
    return
  }

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  chartInstance = new Chart(canvas, {
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
          backgroundColor: ['#378ADD', '#1D9E75', '#D85A30'],
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Key Statistics — 2021',
          font: { size: 14, weight: '500' },
        },
      },
      scales: {
        y: { beginAtZero: true },
      },
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
.wrapper {
  width: 80vw;
  margin: 2rem auto;
}
h1 {
  text-transform: uppercase;
  margin-bottom: 4px;
}
.subtitle {
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
