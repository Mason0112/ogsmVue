<template>
  <g-gantt-chart
    :chart-start="chartStart"
    :chart-end="chartEnd"
    precision="month"
    width="1200px"
    height="600px"
    :bar-start="'start'"
    :bar-end="'end'"
  >
    <g-gantt-row
      v-for="(row, index) in rows"
      :key="index"
      :label="row.label"
      :bars="row.bars"
    />
  </g-gantt-chart>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosapi from "@/plugins/axios";

const props = defineProps({
  dashboardCode: String,
  versionCode: String,
});

const rows = ref([]);
const chartStart = ref("");
const chartEnd = ref("");

onMounted(async () => {
  try {
    const res = await axiosapi.get(
      `/gant/get/${props.dashboardCode}/${props.versionCode}`
    );
    const ganttData = res.data;
    console.log("🚀 Gantt Data:", ganttData);

    // 自動設定 row 資料（每一筆一 row）
    rows.value = ganttData.map((item) => ({
      label: item.labelName,
      bars: [item],
    }));

    // 轉為 Date 物件
    const startDates = ganttData.map((item) => new Date(item.start));
    const endDates = ganttData.map((item) => new Date(item.end));

    const minStart = new Date(Math.min(...startDates));
    const maxEnd = new Date(Math.max(...endDates));

    // 🔽 對齊季度邏輯
    const getQuarterAlignedStartMinusOneMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-based
      const quarterStartMonth = Math.floor(month / 3) * 3;

      // -1 個月
      const targetMonth = quarterStartMonth - 1;
      if (targetMonth < 0) {
        return new Date(year - 1, 11, 1); // 前一年 12 月
      } else {
        return new Date(year, targetMonth, 1);
      }
    };

    const getQuarterAlignedEnd = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-based
      const quarterEndMonth = Math.floor(month / 3) * 3 + 2;
      return new Date(year, quarterEndMonth + 1, 0); // 月底
    };

    const finalStart = getQuarterAlignedStartMinusOneMonth(minStart);
    const finalEnd = getQuarterAlignedEnd(maxEnd);

    // 格式 yyyy-MM-dd HH:mm
    const format = (date) => {
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} 00:00`;
    };

    chartStart.value = format(finalStart);
    chartEnd.value = format(finalEnd);

    console.log("⏱ Chart 範圍:", chartStart.value, "→", chartEnd.value);
  } catch (err) {
    console.error(
      "API 錯誤：",
      err.response?.status,
      err.response?.data || err.message
    );
  }
});
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
::v-deep(.g-upper-timeunit) {
  background-color: #d7f4f7 !important; 
  color: #37474f !important; 
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid #cfd8dc;
}
::v-deep(.g-timeunits-container .g-timeunit) {
  background-color:  #e8f5e9 !important; 
  color: #1b5e20 !important;           
  font-weight: bold;
  font-size: 14px;
  border-right: 1px solid #c8e6c9 !important;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
