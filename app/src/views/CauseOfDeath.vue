<template>
  <div class="text">
    <h1>Deaths in 2021</h1>
  </div>
  <div class="container">
    <DeathCards v-for="(mon, index) in death" :key="index" :death="mon" :id="index + 1" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DeathCards from '../components/DeathCards.vue'

const death = ref([])

async function getDeath() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
    const data = await response.json()
    death.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getDeath()
})
</script>

<style scoped>
.text {
  text-align: center;
}
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
