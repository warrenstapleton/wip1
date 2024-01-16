<template>
  <q-page class='row items-center justify-evenly'>
    <ProjectContainer>
      <div v-if='editing'>
        <q-form @submit='update'>
          <q-input v-model='name' label='Name' filled></q-input>
          <q-input
            v-model='owner'
            label='Owner'
            filled
            class='q-mt-sm'
            dense
          ></q-input>
          <q-card flat bordered class='q-mt-sm'>
            <!--            <q-editor v-model="project.content" min-height="5rem"></q-editor>-->
            <q-checkbox v-model='completed'></q-checkbox>
          </q-card>
          <div class='q-mt-md'>
            <q-btn class='q-ml-sm' color='positive' type='submit'>Done</q-btn>
          </div>
        </q-form>
      </div>
      <div v-else>
        <div v-if='project'>
          <div class='row items-center justify-between'>
            <h3 class='q-mb-md q-mt-md'>{{ project.name }}</h3>
            <div>
              <q-btn
                round
                color='secondary'
                icon='edit'
                @click='editing=true'
              ></q-btn>
              <q-btn
                class='q-ml-sm'
                round
                color='red'
                icon='delete'
                @click='remove'
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

<script setup lang='ts'>

import ProjectContainer from 'components/ProjectContainer.vue';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { Project } from 'components/models';
import { Maybe } from 'graphql/jsutils/Maybe';

const router = useRouter();
const route = useRoute();
const editing = ref(false);

const { result } = useQuery(gql`
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
  }
);

const name = ref('');
const owner = ref('');
const completed = ref(false);

watch(result, () => {
  name.value = result.value.project.name;
  owner.value = result.value.project.owner;
  completed.value = result.value.project.completed;
});

const project = computed(() =>
  result?.value?.project ?? {});

const DELETE_PROJECT = gql`
      mutation deleteProject($id: String) {
        deleteProject(id: $id) {
          id
        }
      }
    `;

const { mutate: deleteProject, error: deleteError } = useMutation(DELETE_PROJECT);

const remove = async () => {
  await deleteProject({ id: route.params.id });
  if (deleteError) {
    console.log('warren: deleteProject error=', deleteError);
  }
  router.push('/');
};

const UPDATE_PROJECT = gql`
       mutation updateProject($id: String, $input: InputProject!) {
         updateProject(id: $id, input: $input) {
           id
         }
       }
    `;

const { mutate: updateProject, error: updateError } = useMutation(
  UPDATE_PROJECT,
  () => ({
    variables: {
      id: route.params.id,
      input: InputProject{ name.value, owner.value, completed.value }
    }
  }
}));

const update = async () => {
  console.log('warren: update project=', route.params.id,name.value,owner.value,completed.value);

  const r = await updateProject();
  if (updateError) {
    console.log('warren: updateProject error=', updateError);
  }
  console.log('warren: update r=', r);
  editing.value = false;
  router.push('/');
};
</script>
