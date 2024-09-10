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
        <div :style="{ color: option.textColor, backgroundColor: option.bgColor }" class="custom-option">
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
    <pre class="language-json"><code>{{ selectedTags }}</code></pre>
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

<style scoped>
.custom-option {
  padding: 5px 10px;
  border-radius: 3px;
}

.custom-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  margin: 2px;
  border-radius: 3px;
}
</style>
