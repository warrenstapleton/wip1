<template>
  <q-page padding>
    <ProjectContainer>
      <h3>New Project</h3>
      <q-form @submit='submit'>
        <q-input class='q-mt-sm' outlined v-model='project.name' label='Name'></q-input>
        <q-input
          class='q-mt-sm'
          outlined
          v-model='project.owner'
          label='Owner'
          dense></q-input>
        <q-card flat bordered class='q-mt-sm'>
          <!--          <q-editor v-model="project.owner" min-height="5rem"></q-editor>-->
          <q-checkbox v-model='project.completed'></q-checkbox>
        </q-card>
        <div class='q-mt-sm'>
          <q-btn color='negative' to='/' type='reset'>Cancel</q-btn>
          <q-btn color='positive' class='q-ml-sm' type='submit'>Create</q-btn>
        </div>
      </q-form>
    </ProjectContainer>
  </q-page>
</template>

<script setup lang='ts'>

import ProjectContainer from 'components/ProjectContainer.vue';
// import { useProjectsStore } from 'stores/projects';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Project } from 'components/models';
// import { storeToRefs } from 'pinia';
import { useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';


// const projectsStore = useProjectsStore();
// const { projects } = storeToRefs(projectsStore);
const router = useRouter();

const project = ref(new Project());

const ADD_PROJECT = gql`
      mutation addProject($input: InputProject!) {
        addProject(input: $input) {
          name
          owner
          completed
        }
      }
    `;

const { mutate: addProject} = useMutation(ADD_PROJECT);

const submit = async () => {
  const r = await addProject(
    {
      input: {
        name: project.value.name,
        owner: project.value.owner,
        completed: project.value.completed
      }
    }
  );
  router.push('/');
  project.value = {
    name: '',
    owner: '',
    completed: false
  }
};

</script>
