<template>
  <router-link :to="DeathPath" class="card">
    <h1>{{ death.leading_cause }}</h1>
    <h2>{{ death.deaths }}</h2>
    <p>{{ id }}</p>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  death: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

const DeathPath = computed(() => {
  return `/dth/${props.death.leading_cause}`
})
</script>

<style scoped>
.card {
  width: 28%;
  height: 500px;
  background-color: aliceblue;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-transform: uppercase;
}
img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
</style>
