<script setup lang='ts'>
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template lang='pug'>
input(:placeholder="props.placeholder" :type="props.type" class="p-2 border border-gray-400 rounded" @input="handleChange($event)")
</template>