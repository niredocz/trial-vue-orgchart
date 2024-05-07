<script setup lang="ts">
import Input from '../../components/Input.vue';
import Select from '../../components/Select.vue';

import { Chart } from 'highcharts-vue'

import { ref, onBeforeUnmount, onMounted } from 'vue';

const select_mode = [
  { label: 'Single', value: 'single' },
  { label: 'Multiple', value: 'multiple' }
]

const select_ref = ref('single')
const search_ref = ref('')
const chartdiv = ref(null);
let root: any = null;

// Define static data
const chartOptions = {
  
}

onMounted(() => {

})

onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});

</script>

<template lang="pug">
.w-full.flex.items-center.justify-between.mb-4
  h1 HighCharts
  .flex.gap-4
    Select(placeholder="Select" v-model="select_ref" :options="select_mode")
    Input(placeholder="Search" v-model="search_ref")
.mb-4
  p select_ref: {{ select_ref }}
  p search_ref: {{ search_ref }}

  <highcharts :options="chartOptions"></highcharts>
  //- <div ref="chartdiv" id="chartdiv"></div>
</template>

<style scoped>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>