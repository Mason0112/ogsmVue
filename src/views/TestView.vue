<template>
  <g-gantt-chart
    chart-start="2021-07-10 00:00"
    chart-end="2021-07-20 23:00"
    precision="day"
    width="600px"
    height="300px"
    :bar-start="'start'"
    :bar-end="'end'"
  >
    <g-gantt-row label="開發階段" :bars="row1Bars" />
    <g-gantt-row label="測試階段" :bars="row2Bars" />
  </g-gantt-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  id: String,
  type: String
})
onMounted(() => {
  console.log("接收到的 id:", props.id)
  console.log("接收到的 type:", props.type)
})
// 第一行：開發階段
const row1Bars = ref([
  {
    start: "2021-07-11 00:00",
    end: "2021-07-14 00:00",
    ganttBarConfig: {
      id: "dev-1",
      label: "功能開發",
      hasHandles: false,
      immobile: true,
      style: {
        background: "#4caf50",
        borderRadius: "5px",
        color: "#fff",
      },
    },
  },
])

// 第二行：測試階段
const row2Bars = ref([
  {
    start: "2021-07-15 00:00",
    end: "2021-07-18 00:00",
    ganttBarConfig: {
      id: "test-1",
      label: "整合測試",
      hasHandles: false,
      immobile: true,
      style: {
        background: "#2196f3",
        borderRadius: "5px",
        color: "#fff",
      },
    },
  },
])
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>