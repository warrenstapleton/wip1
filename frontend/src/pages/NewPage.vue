<template>
  <q-page padding>
    <NoteContainer>
      <h3>New Note</h3>
      <q-form @submit="submit">
        <q-input class="q-mt-sm" outlined v-model="note.title" label="Title"></q-input>
        <q-input
          class="q-mt-sm"
          outlined
          v-model="note.description"
          label="Description"
          dense></q-input>
        <q-card flat bordered class="q-mt-sm">
          <q-editor v-model="note.content" min-height="5rem"></q-editor>
        </q-card>
        <div class="q-mt-sm">
          <q-btn color="negative" to="/" type="reset">Cancel</q-btn>
          <q-btn color="positive" class="q-ml-sm" type="submit">Create</q-btn>
        </div>
      </q-form>
    </NoteContainer>
  </q-page>
</template>

<script setup lang="ts">

import NoteContainer from 'components/NoteContainer.vue'
import {useNotesStore} from 'stores/notes';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import {Note} from 'components/models';
import {storeToRefs} from 'pinia';


const notesStore = useNotesStore();
const {notes} = storeToRefs(notesStore);
const router = useRouter();

const note = ref(new Note())
const submit = () => {
  notes.value.unshift(note.value)
  router.push('/')
  note.value = new Note()
}

</script>
