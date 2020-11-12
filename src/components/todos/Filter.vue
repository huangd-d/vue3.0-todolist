<template>
  <p class="filters">
    <span
      v-for="item in items"
      @click="$emit('update:modelValue', item.value)"
      :class="{ selected: modelValue === item.value }"
      :key="item.value"
      >{{ item.label }}</span
    >
  </p>
</template>

<script>
export default {
  props: ["items", "modelValue"],
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.filters > span {
  margin: 5px;
  border: 1px solid transparent;
}
.filters > span.selected {
  border-color: red;
}
</style>