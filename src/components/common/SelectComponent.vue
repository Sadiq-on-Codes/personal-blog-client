<template>
  <div>
    <label class="typo__label">Tagging</label>
    <multiselect 
      v-model="selectedTags"
      placeholder="Search or add a tag"
      label="tag"
      track-by="_id"
      :options="options"
      :multiple="true">
      <template #option="{ option }">
        <div  class="custom-option">
          {{ option.tag }}
        </div>
      </template>
      <template #tag="{ option, remove }">
        <span :style="{ color: option.textColor, backgroundColor: option.bgColor }" class="custom-tag">
          {{ option.tag }}
          <span @click="remove(option)">✖</span>
        </span>
      </template>
    </multiselect>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const selectedTags = ref(props.modelValue);

watch(selectedTags, (newVal) => {
  emit('update:modelValue', newVal);
});

watch(() => props.modelValue, (newVal) => {
  selectedTags.value = newVal;
});
</script>

<style>
.custom-option {
  padding: 5px 10px;
  border-radius: 3px;
}

.multiselect__tags {
  padding: 8px 8px 8px 8px !important;
}

.custom-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 6px;
  margin: 2px;
  border-radius: 3px;
}
</style>
