<template>
  <div>
    <h1 v-if="death">{{ death.leading_cause }}</h1>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const death = ref(null)
async function getDeath(id) {
  console.log('did i run?')
  const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
  const data = await response.json()
  death.value = data[Number(id) - 1]
}
watch(
  () => route.params.id,
  function (id) {
    getDeath(id)
  },
)
onMounted(function () {
  getDeath(route.params.id)
})
</script>

<style scoped></style>
