<template>
  <q-page class="row items-center justify-evenly">
    <NoteContainer>
      <div v-if="editing">
        <q-form @submit="editing = false">
          <q-input v-model="note.title" label="Title" filled></q-input>
          <q-input
            v-model="note.description"
            label="Description"
            filled
            class="q-mt-sm"
            dense
          ></q-input>
          <q-card flat bordered class="q-mt-sm">
            <q-editor v-model="note.content" min-height="5rem"></q-editor>
          </q-card>
          <div class="q-mt-md">
            <q-btn class="q-ml-sm" color="positive" type="submit">Done</q-btn>
          </div>
        </q-form>
      </div>
      <div v-else>
        <div v-if="note">
          <div class="row items-center justify-between">
            <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
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
          <div>{{ note.description }}</div>
          <div class="q-mt-md" v-html="note.content"></div>
        </div>
      </div>
    </Container>

  </q-page>
</template>

<script setup lang="ts">

import NoteContainer from 'components/NoteContainer.vue'
import {useNotesStore} from 'stores/notes'
import {computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';

const router = useRouter()
const route = useRoute()
const notesStore = useNotesStore()
const {notes} = storeToRefs(notesStore)
const noteId = computed(() => parseInt(route.params.id as string))
const note = computed(() => notes.value[noteId.value])
const editing = ref(false)

const remove = () => {
  notes.value.splice(noteId.value, 1)
  router.push('/')
}
</script>
