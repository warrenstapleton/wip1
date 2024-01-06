<template>
  <q-page class="row items-center justify-evenly">
    <ProjectContainer>
      <div v-if="editing">
        <q-form @submit="editing = false">
          <q-input v-model="project.name" label="Name" filled></q-input>
          <q-input
            v-model="project.owner"
            label="Description"
            filled
            class="q-mt-sm"
            dense
          ></q-input>
          <q-card flat bordered class="q-mt-sm">
<!--            <q-editor v-model="project.content" min-height="5rem"></q-editor>-->
            <q-checkbox v-model="project.completed"></q-checkbox>
          </q-card>
          <div class="q-mt-md">
            <q-btn class="q-ml-sm" color="positive" type="submit">Done</q-btn>
          </div>
        </q-form>
      </div>
      <div v-else>
        <div v-if="project">
          <div class="row items-center justify-between">
            <h3 class="q-mb-md q-mt-md">{{ project.name }}</h3>
            <div>
              <q-btn
                round
                color="secondary"
                icon="edit"
                @click="editing=true"
              ></q-btn>
              <q-btn
                class="q-ml-sm"
                round
                color="red"
                icon="delete"
                @click="remove"
              ></q-btn>
            </div>
          </div>
          <div>{{ project.owner }}</div>
<!--          <div class="q-mt-md" v-html="project.content"></div>-->
        </div>
      </div>
    </ProjectContainer>
  </q-page>
</template>

<script setup lang="ts">

import ProjectContainer from 'components/ProjectContainer.vue'
import {useProjectsStore} from 'stores/projects'
import {computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';

const router = useRouter()
const route = useRoute()
const projectsStore = useProjectsStore()
const {projects} = storeToRefs(projectsStore)
const projectId = computed(() => parseInt(route.params.id as string))
const project = computed(() => projects.value[projectId.value])
const editing = ref(false)

const remove = () => {
  projects.value.splice(projectId.value, 1)
  router.push('/')
}
</script>
