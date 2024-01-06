import { defineStore } from 'pinia';
import { ref } from 'vue';
import {IProject} from 'components/models';



export const useProjectsStore = defineStore('project', () => {
  const projects = ref<IProject[]>([
  ])
  const addProject = (project: IProject) => { projects.value.push( project )}
  return { projects, addProject }
});
