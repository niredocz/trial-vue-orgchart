<script setup lang="ts">
import Input from '../../components/Input.vue';
import Select from '../../components/Select.vue';

import { ref, onBeforeUnmount, onMounted } from 'vue';
import * as am5index from "@amcharts/amcharts5/index";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const select_mode = [
  { label: 'Single', value: 'single' },
  { label: 'Multiple', value: 'multiple' }
]

const select_ref = ref('single')
const search_ref = ref('')
const chartdiv = ref(null);
let root: any = null;

// Define static data
const maxLevels = 1;
const maxNodes = 3;
const maxValue = 100;
const initialData = {
  id: 1,
  name: "NIK",
  value: 180,
  children: [
    {
      id: 2,
      name: "No. Passport",
      value: 80,
      children: []
    },
    {
      id: 3,
      name: "Asuransi",
      value: 80,
      children: []
    },
    {
      id: 4,
      name: "No. HP",
      value: 80,
      children: [
        {
          id: 5,
          name: "Asuransi",
          value: 40,
          children: []
        },
        {
          id: 6,
          name: "Asuransi",
          value: 40,
          children: []
        }
      ]
    }
  ]
};

const initializeChart = (element: HTMLElement, data: any) => {
  root = am5index.Root.new(element);
  root.setThemes([
    am5themes_Animated.new(root),
  ]);

  am5index.Circle.new(root, {
    radius: 0
  });

  // Create zoomable container
  var container = root.container.children.push(
    am5index.Container.new(root, {
      width: am5index.percent(100),
      height: am5index.percent(100),
      layout: root.verticalLayout
    })
  );

  var series = container.children.push(
    am5hierarchy.Tree.new(root, {
      singleBranchOnly: false,
      downDepth: 1,
      initialDepth: 5,
      topDepth: 0,
      valueField: "value",
      categoryField: "name",
      childDataField: "children"
    })
  );
  series.labels.template.setAll({
    fontSize: 20,
    fill: am5index.color(0x550000),
    text: "{name}"
  });
  series.circles.template.setAll({
    radius: 40
  });

  series.outerCircles.template.setAll({
    // radius: 20
    strokeWidth: 2,
  });

  series.nodes.template.setAll({
    draggable: false,
    toggleKey: 'none'
  });

  series.data.setAll([data]);
  series.set("selectedDataItem", series.dataItems[0]);
}

const addNode = (data: any, parentId: number, newNode: any) => {
  if (data.id === parentId) {
    data.children.push(newNode);
    return true
  }

  for (const child of data.children) {
    if (addNode(child, parentId, newNode)) {
      return true
    }
  }
  return false
};

const addNewNode = () => {
  const new_node = {
    id: 7,
    name: "New Node",
    value: 20
  }

  // const new_data = initialData.children.push(new_node)
  addNode(initialData, 4, new_node)

  // Update chart
  if (root) {
    // chartdiv.value = null;
    root.dispose();
    // Create new chart
    initializeChart(chartdiv.value as any, initialData);
  }

}

onMounted(() => {
  initializeChart(chartdiv.value as any, initialData);
})

onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>

<template lang="pug">
.w-full.flex.items-center.justify-between.my-4
  h1 Am Charts (Tree Chart)
  .flex.gap-4
    button(class="min-w-56 text-sm bg-blue-400 py-2 px-5 rounded text-white hover:bg-blue-500" @click="addNewNode") Add New Nodes
    Select(placeholder="Select" v-model="select_ref" :options="select_mode")
    Input(placeholder="Search" v-model="search_ref")
.mb-4
  p select_ref: {{ select_ref }}
  p search_ref: {{ search_ref }}

  <div ref="chartdiv" id="chartdiv"></div>
</template>

<style scoped>
#chartdiv {
  width: 100%;
  height: 550px;
}
</style>