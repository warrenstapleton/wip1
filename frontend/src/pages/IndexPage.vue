<template>
  <q-page class="row items-center justify-evenly">
    <NoteContainer>
      <div class="row items-center justify-between">
        <h3>Your Notes</h3>
        <q-btn round color="positive" icon="add" to="/new"></q-btn>
        <q-btn round color="negative" icon="add"
               @click="doAddJoint('a1', 'b2', 't3')"></q-btn>

      </div>
      <NoteCard v-for="({ title, description}, idx) in notes"
                :key="idx"
                :title="title"
                :description="description"
                @click="router.push(`/note/${idx}`)"/>
      <div v-if="notes.length === 0">You have not created any notes.</div>
      result={{result}}
    </NoteContainer>
  </q-page>
</template>

<script setup lang="ts">

import NoteContainer from 'components/NoteContainer.vue';
import NoteCard from 'components/NoteCard.vue';
import {useNotesStore} from 'stores/notes.js'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia';

const noteStore = useNotesStore();
const {notes} = storeToRefs(noteStore);
const router = useRouter();

import {useMutation, useQuery} from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const { mutate: addJoint } = useMutation(gql`
      mutation createJoint ($jointInput: JointInput!) {
        createJoint (jointInput: $jointInput) {
            _id
        }
      }
    `)

const doAddJoint = (s: string, d: string, t: string) => {
  addJoint({jointInput: {source: s, destination: d, type: t}})
}

const {result} = useQuery(gql`
      query getJoints($limit: Int) {
        getJoints(limit: $limit) {
          _id
          source
          destination
          type
        }
      },
    `,
  {
    limit: 2
  }
)


</script>
