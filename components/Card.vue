<template>
  <div v-for="card in ua01Data" :key="card">
    {{ card }}
    <button @click="nav(card.rarity)">이동</button>
  </div>
</template>

<script setup>
const props = defineProps({
    ua01Data: Object,
});

const nav = (rarity) => {
    navigateTo(`/login-${rarity}`)
}
</script>
