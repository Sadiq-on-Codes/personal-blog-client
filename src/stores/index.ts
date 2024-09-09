import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({ selectedContent: '' }),
  getters: {},
  actions: {
    setSelectedContent(selectedContent: string) {
      this.selectedContent = selectedContent
    }
  }
})
