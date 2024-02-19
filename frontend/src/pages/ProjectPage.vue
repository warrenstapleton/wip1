<template>
  <q-page class='row items-center justify-evenly'>
    <ProjectContainer>
      <div v-if='editing'>
        <q-form @submit='update'>
          <q-input :readonly="false" v-model='result.project.name' label='Name' filled></q-input>
          <q-input
            v-model='project.owner'
            label='Owner'
            filled
            class='q-mt-sm'
            dense
          ></q-input>
          <q-card flat bordered class='q-mt-sm'>
            <!--            <q-editor v-model="project.content" min-height="5rem"></q-editor>-->
            <q-checkbox v-model='project.completed'></q-checkbox>
          </q-card>
          <div class='q-mt-md'>
            <q-btn class='q-ml-sm' color='positive' type='submit'>Done</q-btn>
          </div>
        </q-form>
      </div>
      <div v-else>
        <div v-if='!loading'>
          <div class='col items-center justify-between'>
            <h3 class='q-mb-md q-mt-md'>{{ result.project.name }}</h3>
            <div>owner: {{ result.project.owner }}</div>
            <div>Completed: <q-checkbox v-model='result.project.completed' :readonly='true'></q-checkbox></div>
            <div>
              <q-btn
                round
                color='secondary'
                icon='edit'
                @click='editing = true'
              ></q-btn>
              <q-btn
                class='q-ml-sm'
                round
                color='red'
                icon='delete'
                @click='confirm = true'
              ></q-btn>
            </div>
          </div>
          <!--          <div class="q-mt-md" v-html="project.content"></div>-->
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="warning" text-color="white" />
                <span class="q-ml-sm">Permanently delete project '{{result.project.name}}'?</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Delete" color="primary" v-close-popup @click='remove'/>
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>
      </div>
    </ProjectContainer>
  </q-page>
</template>

<script setup lang='ts'>

import ProjectContainer from 'components/ProjectContainer.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { Dialog } from 'quasar';

const router = useRouter();
const route = useRoute();
const editing = ref(false);
const confirm = ref(false);

const project = ref({
  name: '',
  owner: '',
  completed: false
});

const { result, loading } = useQuery(gql`
      query project($id: ID!) {
        project(id: $id) {
          id
          name
          owner
          completed
        }
      }
    `,
  {
    id: route.params.id
  },
  {
    fetchPolicy: 'no-cache'
  }
);


const edit = () => {
  editing.value = true
  project.value.name = result.value.project.name
  project.value.owner = result.value.project.owner
  project.value.completed = result.value.project.completed
}

const DELETE_PROJECT = gql`
      mutation deleteProject($id: String) {
        deleteProject(id: $id) {
          id
        }
      }
    `;

const { mutate: deleteProject } = useMutation(DELETE_PROJECT);

const remove = async () => {
  await deleteProject({ id: route.params.id });
  router.back()
};

const UPDATE_PROJECT = gql`
       mutation updateProject($id: String, $input: InputProject!) {
         updateProject(id: $id, input: $input) {
           id
         }
       }
    `;

const { mutate: updateProject } = useMutation(
  UPDATE_PROJECT,
  () => ({
    variables: {
      id: route.params.id,
      input: {
        name: project.value.name,
        owner: project.value.owner,
        completed: project.value.completed
      }
    }
  }));

const update = async () => {
  await updateProject();
  editing.value = false;
  router.back()
};
</script>
