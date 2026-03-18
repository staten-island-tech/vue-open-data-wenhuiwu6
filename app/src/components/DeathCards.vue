<template>
  <div class="card">
    <h2>{{ death.leading_cause }}</h2>
    <h3>{{ id }}</h3>
  </div>
</template>

<script setup>
defineProps({
  death: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
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
