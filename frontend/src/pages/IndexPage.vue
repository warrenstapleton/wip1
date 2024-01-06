<template>
  <q-page class='row items-center justify-evenly'>
    <ProjectContainer>
      <div class='row items-center justify-between'>
        <h3>Your Projects</h3>
        <q-btn round color='positive' icon='add' to='/new'></q-btn>
<!--        <q-btn round color='negative' icon='add'-->
<!--               @click="doAddJoint('a1', 'b2', 't3')"></q-btn>-->

      </div>
      <ProjectCard v-for='({ name, owner, completed}, idx) in projects'
                   :key='idx'
                   :name='name'
                   :owner='owner'
                   :completed='completed'
                   @click='router.push(`/project/${idx}`)' />
      <div v-if='projects.length === 0'>You have not created any projects.</div>
      result={{ result }}
    </ProjectContainer>
  </q-page>
</template>

<script setup lang='ts'>

import ProjectContainer from 'components/ProjectContainer.vue';
import ProjectCard from 'components/ProjectCard.vue';
import { useProjectsStore } from 'stores/projects.js';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const projectStore = useProjectsStore();
const { projects } = storeToRefs(projectStore);
const router = useRouter();

import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';

// const { mutate: addJoint } = useMutation(gql`
//       mutation createJoint ($jointInput: JointInput!) {
//         createJoint (jointInput: $jointInput) {
//             _id
//         }
//       }
//     `);
//
// const doAddJoint = (s: string, d: string, t: string) => {
//   addJoint({ jointInput: { source: s, destination: d, type: t } });
// };

const { result } = useQuery(gql`
      query project {
        projects {
          name
          owner
          completed
        }
      }
    `
);


</script>
