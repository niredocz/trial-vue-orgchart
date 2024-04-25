<script setup lang="ts">
import { ref } from 'vue'

const menu = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Org Charts',
    path: '/org-charts',
  }
]

const menu_ref = ref(menu)
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4 border-b border-black pb-4">
      <div class="text-3xl">Logo</div>

      <div class="flex gap-4">
        <div v-for="item in menu_ref" :key="item.name">
          <router-link class="router-link" :to="item.path">{{ item.name }}</router-link>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<style lang="sass" scoped>
.router-link
  @apply hover:underline
  
</style>