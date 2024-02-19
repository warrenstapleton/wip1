import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const editor = ref(null)
  const filter = ref({
    source: new Set(),
    target: new Set(),
  })

  const addSource = (s) => {
    filter.value.source.add(s)
    console.log("addSource: filter=", filter.value)

  }

  const addTarget = (t) => {
    filter.value.target.add(t)
    console.log("addTarget: filter=", filter.value)
  }

  return { editor, filter, addSource, addTarget }
})
