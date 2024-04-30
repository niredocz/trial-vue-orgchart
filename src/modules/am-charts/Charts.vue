<script setup lang="ts">
import Input from '../../components/Input.vue';
import Select from '../../components/Select.vue';

import { ref, onBeforeUnmount, onMounted } from 'vue';
import * as am5index from "@amcharts/amcharts5/index";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Moonrise from "@amcharts/amcharts5/themes/Moonrise";

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
  name: "NIK",
  value: 2000,
  children: [
    {
      name: "No. Passport",
      value: 1050,
      children: []
    },
    {
      name: "Asuransi",
      value: 1890,
      children: []
    },
    {
      name: "No. HP",
      value: 1890,
      children: [
        {
          name: "Asuransi",
          value: 1590,
          children: []
        },
        {
          name: "Asuransi",
          value: 1590,
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
    am5themes_Moonrise.new(root)
  ]);

  // Create zoomable container
  const zoomableContainer = root.container.children.push(
    am5index.ZoomableContainer.new(root, {
      width: am5index.percent(100),
      height: am5index.percent(100),
      wheelable: false,
      pinchZoom: false,
    }));

  const zoomTools = zoomableContainer.children.push(am5index.ZoomTools.new(root, {
    target: zoomableContainer
  }));

  // Create series
  const series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 10,
    nodePadding: 20,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
  }));

  // Arrow bullet between nodes
  series.linkBullets.push((root: any, source: any) => {
    const bullet = am5index.Bullet.new(root, {
      locationX: 0.4,
      autoRotate: true,
      autoRotateAngle: 180,
      sprite: am5index.Graphics.new(root, {
        fill: source.get("fill"),
        centerY: am5index.percent(50),
        centerX: am5index.percent(50),
        draw: function (display) {
          display.moveTo(0, -6);
          display.lineTo(16, 0);
          display.lineTo(0, 6);
          display.lineTo(3, 0);
          display.lineTo(0, -6);
        }
      })
    });

    // bullet.animate({
    //   key: "locationX",
    //   to: -0.1,
    //   from: 1.1,
    //   duration: Math.random() * 500 + 1000,
    //   loops: Infinity,
    //   easing: am5index.ease.quad
    // });

    return bullet;
  });

  series.labels.template.set("minScale", 0);

  // Set data
  // generateLevel(data, "", 0);
  series.data.setAll([data]);
  series.set("selectedDataItem", series.dataItems[0]);

  // function generateLevel(data: any, name: any, level: any) {
  //   for (var i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
  //     let nodeName = name + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
  //     let child;
  //     if (level < maxLevels) {
  //       child = {
  //         name: nodeName + level,
  //         value: 0,
  //         children: []
  //       }

  //       if (level > 0 && Math.random() < 0.5) {
  //         child.value = Math.round(Math.random() * maxValue);
  //       } else {
  //         child.children = [];
  //         generateLevel(child, nodeName + i, level + 1)
  //       }
  //     }
  //     else {
  //       child = {
  //         name: name + i,
  //         value: Math.round(Math.random() * maxValue)
  //       }
  //     }
  //     data.children.push(child);
  //   }

  //   level++;
  //   return data;
  // }

  series.appear(1000, 100);
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
.w-full.flex.items-center.justify-between.mb-4
  h1 Am Charts
  .flex.gap-4
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
  height: 500px;
}
</style>