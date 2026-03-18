<template>
  <div>
    <h2>{{ death.leading_cause }}</h2>
    <p>Year: {{ death.year }}</p>
    <p>Deaths: {{ death.deaths }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const death = ref(null)
async function getDeath(id) {
  console.log('did i run?')
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await response.json()
  death.value = data
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
