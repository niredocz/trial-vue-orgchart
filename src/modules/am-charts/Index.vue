<script setup lang='ts'>
import { ref } from 'vue';
import ChartsHierarchy from './ChartsHierarchy.vue';
import ChartsTree from './ChartsTree.vue';

const chart_type = ref<'hierarchy' | 'tree'>('tree')
</script>

<template lang="pug">
.flex.justify-center.gap-4
  button(class="bg-blue-400 py-2 px-5 rounded text-white hover:bg-blue-500" @click="chart_type = 'tree'") Tree
  button(class="bg-blue-400 py-2 px-5 rounded text-white hover:bg-blue-500" @click="chart_type = 'hierarchy'") Hierarchy
ChartsHierarchy(v-if="chart_type === 'hierarchy'")
ChartsTree(v-else-if="chart_type === 'tree'")
</template>