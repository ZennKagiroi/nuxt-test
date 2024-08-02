<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Doubled Count: {{ counterStore.doubledCount }}</p>
    <button @click="counterStore.increment">Increment</button>
    <button @click="counterStore.decrement">Decrement</button>
    
    <Card :ua01Data="ua01Data" />

    <!-- <div v-for="card in ua01Data" :key="card">
      {{ card }}
    </div> -->
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counterStore";
import { useSelectedCardList } from "@/stores/SelectedCardList";

const counterStore = useCounterStore();
const cardList = useSelectedCardList();

const ua01Data = [
  {
    count: 0,
    key: false,
    color: "Blue",
    parallel: false,
    rarity: "C",
    trigger: null,
  },
  {
    count: 0,
    key: false,
    color: "Blue",
    parallel: false,
    rarity: "C",
    trigger: null,
  },
  {
    count: 0,
    key: false,
    color: "Blue",
    parallel: false,
    rarity: "U",
    trigger: null,
  },
  {
    count: 0,
    key: false,
    color: "Blue",
    parallel: false,
    rarity: "R",
    trigger: null,
  },
  {
    count: 0,
    key: false,
    color: "Blue",
    parallel: false,
    rarity: "SR",
    trigger: null,
  },
  {
    count: 0,
    key: false,
    color: "Blue",
    parallel: true,
    rarity: "SR★",
    trigger: null,
  },
];
</script>
