<template>
  <div class="add-edit-tag">
    <h2>{{ isEditing ? 'Edit Tag' : 'Add New Tag' }}</h2>
    <form @submit.prevent="handleSubmit">
      <InputComponent
        type="text"
        id="tagName"
        name="tagName"
        label="Tag Name"
        v-model="tagName"
        required
      />
      <InputComponent
        type="color"
        id="bgColor"
        name="bgColor"
        label="Background Color"
        v-model="bgColor"
        required
      />
      <InputComponent
        type="color"
        id="textColor"
        name="textColor"
        label="Text Color"
        v-model="textColor"
        required
      />
      <div class="tag-preview" :style="{ backgroundColor: bgColor, color: textColor }">
        {{ tagName || 'Tag Preview' }}
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <ButtonComponent
        type="submit"
        @click="handleSubmit"
        :disabled="!tagName || !bgColor || !textColor || isLoading"
      >
        {{ isLoading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Tag' : 'Create Tag') }}
      </ButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { createTag, updateTag, fetchTagById } from '@/services/apiServices'

const router = useRouter()
const route = useRoute()

const tagName = ref('')
const bgColor = ref('#FFFFFF')
const textColor = ref('#000000')
const isLoading = ref(false)
const errorMessage = ref('')
const isEditing = ref(false)

onMounted(async () => {
  const tagId = route.query.id
  if (tagId) {
    isEditing.value = true
    try {
      const tag = await fetchTagById(tagId as string)
      tagName.value = tag.tag
      bgColor.value = tag.bgColor
      textColor.value = tag.textColor
    } catch (error) {
      console.error('Error fetching tag:', error)
      errorMessage.value = 'Failed to fetch tag details.'
    }
  }
})

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const tagData = {
      tag: tagName.value,
      bgColor: bgColor.value,
      textColor: textColor.value
    }

    if (isEditing.value) {
      await updateTag(route.query.id as string, tagData)
    } else {
      await createTag(tagData)
    }
    
    router.push('/dashboard/view-tags')
  } catch (error) {
    console.error('Error saving tag:', error)
    errorMessage.value = `Failed to ${isEditing.value ? 'update' : 'create'} tag. Please try again.`
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.add-edit-tag {
  max-width: 400px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tag-preview {
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  margin-top: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
