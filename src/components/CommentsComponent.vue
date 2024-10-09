<template>
  <div class="mt-12">
    <h3 class="text-2xl font-semibold mb-4">Comments</h3>
    <div v-for="comment in comments" :key="comment._id" class="mb-4 p-4 bg-gray-100 rounded-lg">
      <div v-if="editingComment !== comment._id">
        <h4 class="font-semibold">{{ comment.name }}</h4>
        <p>{{ comment.content }}</p>
        <small class="text-gray-500">{{ new Date(comment.createdAt).toLocaleString() }}</small>
        <div class="mt-2">
          <button @click="startEditing(comment)" class="text-blue-500 mr-2">Edit</button>
          <button @click="deleteCommentHandler(comment._id)" class="text-red-500">Delete</button>
        </div>
      </div>
      <form v-else @submit.prevent="updateCommentHandler(comment._id)">
        <input v-model="editedComment.name" class="w-full p-2 mb-2 border rounded" required>
        <textarea v-model="editedComment.content" class="w-full p-2 mb-2 border rounded" rows="3" required></textarea>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
        <button @click="cancelEditing" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </form>
    </div>
    
    <!-- Comment form -->
    <form @submit.prevent="submitComment" class="mt-8">
      <input 
        v-model="newComment.name" 
        placeholder="Your Name" 
        required
        class="w-full p-2 mb-4 border rounded"
      >
      <textarea 
        v-model="newComment.content" 
        placeholder="Your Comment" 
        required
        class="w-full p-2 mb-4 border rounded"
        rows="4"
      ></textarea>
      <button 
        type="submit" 
        class="bg-[--color-post-primary] text-white px-4 py-2 rounded hover:bg-opacity-90"
      >
        Submit Comment
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchComments, createComment, updateComment, deleteComment } from '@/services/apiServices'
import type { Comment } from '@/types'

const props = defineProps<{
  postId: string
}>()

const comments = ref<Comment[]>([])
const newComment = ref<any>({ name: '', content: '' })
const editingComment = ref<string | null>(null)
const editedComment = ref({ name: '', content: '' })

const loadComments = async () => {
  try {
    comments.value = await fetchComments(props.postId)
  } catch (err) {
    console.error('Error fetching comments:', err)
  }
}

const submitComment = async () => {
  try {
    await createComment({
      postId: props.postId,
      name: newComment.value.name,
      content: newComment.value.content
    })
    newComment.value = { name: '', content: '' }
    await loadComments()
  } catch (err) {
    console.error('Error submitting comment:', err)
  }
}

const startEditing = (comment: Comment) => {
  editingComment.value = comment._id
  editedComment.value = { name: comment.name, content: comment.content }
}

const cancelEditing = () => {
  editingComment.value = null
  editedComment.value = { name: '', content: '' }
}

const updateCommentHandler = async (id: string) => {
  try {
    await updateComment(id, editedComment.value.name, editedComment.value.content)
    editingComment.value = null
    await loadComments()
  } catch (err) {
    console.error('Error updating comment:', err)
  }
}

const deleteCommentHandler = async (id: string) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    try {
      await deleteComment(id)
      await loadComments()
    } catch (err) {
      console.error('Error deleting comment:', err)
    }
  }
}

onMounted(loadComments)
</script>
