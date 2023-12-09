<template>
  <q-page class="row items-center justify-evenly">
    <Container>
      <div class="row items-center justify-between">
        <h3>Your Notes</h3>
        <q-btn round color="positive" icon="add" to="/new"></q-btn>
      </div>
      <NoteCard v-for="({ title, description}, idx) in notes"
                :key="idx"
                :title="title"
                :description="description"
                @click="router.push(`/note/${idx}`)"/>
      <div v-if="notes.length === 0">You have not created any notes.</div>
    </Container>
  </q-page>
</template>

<script setup lang="ts">

import Container from 'components/NoteContainer.vue';
import NoteCard from 'components/NoteCard.vue';
import {useNotesStore} from 'stores/notes.js'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia';

const noteStore = useNotesStore();
const {notes} = storeToRefs(noteStore);
const router = useRouter();

</script>
