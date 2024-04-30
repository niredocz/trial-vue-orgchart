<script setup lang="ts">
import Input from '../../components/Input.vue';
import Select from '../../components/Select.vue';
import OrgChart from '@balkangraph/orgchart.js';
import { ref, onMounted } from 'vue';

const select_mode = [
  { label: 'Single', value: 'single' },
  { label: 'Multiple', value: 'multiple' }
]

const nodes = ref([
  { id: 1, name: "NIK", value: '0123467788342', img: "https://cdn.balkan.app/shared/2.jpg" },
  { id: 2, pid: 1, name: "No. Passport", value: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
  { id: 3, pid: 1, name: "Asuransi", value: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
  { id: 4, pid: 2, name: "Elliot Patel", value: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
  { id: 5, pid: 2, name: "Lynn Hussain", value: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
  { id: 6, pid: 3, name: "Tanner May", value: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
  { id: 7, pid: 3, name: "Fran Parsons", value: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" },
])


const mytree = (domEl: HTMLElement | null, x: any[]) => {
  if (domEl) {
    var chart = new OrgChart(domEl, {
      nodes: x,
      enableSearch: false,
      nodeMouseClick: OrgChart.action.none,
      nodeBinding: {
        field_0: "name",
        field_1: "value",
        // field_2: "img",
        // img_0: "img"
      },
      nodeMenu: {
        call: {
          text: 'asd',
          onClick: () => callHandler
        }
      },
      collapse: {
        level: 2,
        allChildren: true,
      },
    });

    // OrgChart.templates.ana.field_0 =
    //   '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
    // OrgChart.templates.ana.field_1 =
    //   '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="80" text-anchor="middle">{val}</text>';
    OrgChart.templates.ana.node += '<g class="svg-btn" style="z-index: 9999; cursor: pointer;"><rect  x="133" y="42" width="100" height="30" ></rect>'
      + '<text style="font-size: 12px; z-index: 9999; cursor: pointer;" fill="#fff" x="183" y="62" text-anchor="middle">Muat Lagi</text></g>';
    OrgChart.templates.ana.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" data-ctrl-n-menu-id="{id}">'
      + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
      + '</rect>'
      + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
      + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
      + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
      + '</g>';
    // OrgChart.templates.ana.field_2 =
    //   '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';

    const callHandler = (val: any) => {
      var nodeData = chart.get(val)
      console.log('val', nodeData)
    }

    chart.on('redraw', () => {
      const btns = document.querySelectorAll('.svg-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', (ev: Event) => {
          ev.preventDefault()
          ev.stopPropagation()
          console.log('clicked', i);
        })
      }
    })
  }
}

const tree = ref<HTMLElement | null>(null);
const select_ref = ref('single')
const search_ref = ref('')



onMounted(() => {
  mytree(tree.value, nodes.value);
});
</script>

<template lang="pug">
.w-full.flex.items-center.justify-between.mb-4
  h1 OrgCharts
  .flex.gap-4
    Select(placeholder="Select" v-model="select_ref" :options="select_mode")
    Input(placeholder="Search" v-model="search_ref")
.mb-4
  p select_ref: {{ select_ref }}
  p search_ref: {{ search_ref }}
div(id="tree" ref="tree")
</template>

<style scoped>
#tree {
  width: 100%;
  height: 500px;
}
</style>