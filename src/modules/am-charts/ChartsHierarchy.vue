<script setup lang="ts">
import Input from '../../components/Input.vue';
import Select from '../../components/Select.vue';

import { ref, onBeforeUnmount, onMounted } from 'vue';
import * as am5index from "@amcharts/amcharts5/index";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import am5themes_Moonrise from "@amcharts/amcharts5/themes/Moonrise";

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
// const initialData = {
//   name: "NIK",
//   value: 10,
//   children: [
//     {
//       name: "No. Passport",
//       value: 10,
//       children: []
//     },
//     {
//       name: "Asuransi",
//       value: 10,
//       children: []
//     },
//     {
//       name: "No. HP",
//       value: 10,
//       children: [
//         {
//           name: "Asuransi",
//           value: 10,

//         },
//         {
//           name: "Asuransi",
//           value: 10,

//         }
//       ]
//     }
//   ]
// };

const initialData = {
  name: "Root",
  value: 0,
  children: [
    {
      id: 1,
      label: "NIK",
      name: "317123456789004",
      children: [
        {
          id: 2,
          label: "Nama Lengkap",
          name: "Eko Pujianto",
          children: []
        },
        {
          id: 3,
          label: "Jenis Kelamin",
          name: "Perempuan",
          children: []
        },
        {
          id: 4,
          label: "Agama",
          name: "Islam",
          children: []
        },
        {
          id: 5,
          label: "No. HP",
          name: "083866817535",
          children: []
        }
      ]
    },
    // {
    //   label: "NIK",
    //   name: "317123456789003",
    //   children: [
    //     {
    //       label: "Tgl. Lahir",
    //       name: "9 Mei 2004",
    //     },
    //     {
    //       label: "Kebangsaan",
    //       name: "Indonesia",
    //     },
    //     {
    //       label: "Pekerjaan",
    //       name: "IT Programmer",
    //       children: [
    //         {
    //           label: "Jenis Pekerjaan",
    //           name: "Full Time",
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
}

const initializeChart_deprecated = (element: HTMLElement, data: any) => {
  root = am5index.Root.new(element);
  root.setThemes([
    am5themes_Animated.new(root),
    // am5themes_Moonrise.new(root)
  ]);

  am5index.Circle.new(root, {
    radius: 0
  });

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
    initialDepth: 2,
    nodePadding: 50,
    // minRadius: 10,
    // maxRadius: am5index.percent(10),
    // centerStrength: 1,
    // manyBodyStrength: -1,
    valueField: "label",
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

const initializeChart = (element: HTMLElement, data: any) => {
  root = am5index.Root.new(element)
  root.setThemes([
    am5themes_Animated.new(root)
  ])

  // Create wrapper container
  var container = root.container.children.push(
    am5index.Container.new(root, {
      width: am5index.percent(100),
      height: am5index.percent(100),
      layout: root.verticalLayout
    })
  )

  // Create series
  var series = container.children.push(
    am5hierarchy.ForceDirected.new(root, {
      singleBranchOnly: false,
      downDepth: 1,
      topDepth: 1,
      maxRadius: 50,
      minRadius: 50,
      valueField: "label",
      categoryField: "name",
      childDataField: "children",
      idField: "name",
      linkWithStrength: 0.3,
      linkWithField: "linkWith",
      manyBodyStrength: -15,
      centerStrength: 0.5
    })
  )

  series.labels.template.setAll({
    fontSize: 20,
    fill: am5index.color(0x550000),
    text: "{value}: [bold]{name}[/]"
  });
  series.nodes.template.set("tooltipText", "{value}: [bold]{name}[/]");

  series.data.setAll([data])
  series.set("selectedDataItem", series.dataItems[0])
  series.appear(1000, 100)
}

const addNode = (data: any, parentId: any, newNode: any) => {
  if (data.id === parentId) {
    // Create a copy of the data object to avoid mutating the original
    const newData = { ...data };

    // If 'children' property does not exist, initialize it
    if (!newData.children) {
      newData.children = [];
    }

    // Push the new node(s) into the 'children' array
    if (Array.isArray(newNode)) {
      newData.children.push(...newNode);
    } else {
      newData.children.push(newNode);
    }

    return newData; // Return the modified data object
  }

  if (data.children) {
    // Recursively call addNode on each child node
    for (const child of data.children) {
      const updatedChild = addNode(child, parentId, newNode);
      if (updatedChild) {
        // If a child node was updated, return the modified data object
        return { ...data, children: data.children.map((c: any) => c === child ? updatedChild : c) };
      }
    }
  }

  return null; // Return null if parent ID is not found
};


const addNewNode = () => {
  const new_node = [
    {
      label: 'New Node',
      name: 'New Node',
    }, {
      label: 'New Node 2',
      name: 'New Node 2',
    }
  ]

  // const new_data = initialData.children.push(new_node)
  addNode(initialData, 5, new_node)

  // Update chart
  if (root) {
    // chartdiv.value = null;
    root.dispose();
    // Create new chart
    initializeChart(chartdiv.value as any, initialData);
  }

}

onMounted(() => {
  initializeChart(chartdiv.value as any, initialData)
})

onBeforeUnmount(() => {
  if (root) root.dispose()
})
</script>

<template lang="pug">
.w-full.flex.items-center.justify-between.my-4
  h1 Am Charts (Hierarchy Chart)
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
  height: 500px;
}
</style>