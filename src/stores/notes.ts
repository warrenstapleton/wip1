import { defineStore } from 'pinia';
import { ref } from 'vue';
import {INote} from 'components/models';



export const useNotesStore = defineStore('counter', () => {
  const notes = ref<INote[]>([
  ])
  const addNote = (note: INote) => { notes.value.push( note )}
  return { notes, addNote }
});
