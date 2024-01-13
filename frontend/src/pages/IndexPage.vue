<template>
  <q-page class='row items-center justify-evenly'>
    <ProjectContainer>
      <div class='row items-center justify-between'>
        <h3>Your Projects</h3>
        <q-btn round color='positive' icon='add' to='/new'></q-btn>
<!--        <q-btn round color='negative' icon='add'-->
<!--               @click="doAddJoint('a1', 'b2', 't3')"></q-btn>-->

      </div>
      <ProjectCard  v-for='project in projects'
                   :key='project.id'
                   :name='project.name'
                   :owner='project.owner'
                   :completed='project.completed'
                    @click='router.push(`/project/${project.id}`)' ></ProjectCard>
      <div v-if='projects.length === 0'>You have not created any projects.</div>
    </ProjectContainer>
  </q-page>
</template>

<script setup lang='ts'>

import ProjectContainer from 'components/ProjectContainer.vue';
import ProjectCard from 'components/ProjectCard.vue';
// import { useProjectsStore } from 'stores/projects.js';
import { useRouter } from 'vue-router';
// import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

// const projectStore = useProjectsStore();
// const { projects } = storeToRefs(projectStore);
const router = useRouter();

import { useQuery } from '@vue/apollo-composable';
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
      query projects {
        projects {
          id
          name
          owner
          completed
        }
      }
    `
);

const projects = computed(() => result?.value?.projects ?? [])

watch(result, value => {
  console.log('warren: result.value=',value)
})

</script>
