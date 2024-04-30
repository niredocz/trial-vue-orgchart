<script setup lang='ts'>

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>
<template lang='pug'>
select(class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :placeholder="props.placeholder" @change="handleChange($event)")
  option(v-for="option in props.options" :value="option.value") {{ option.label }}
</template>