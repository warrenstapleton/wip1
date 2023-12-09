<template>
<q-card
  flat
  bordered
  class="q-mb-sm cursor-pointed"
  >
  <q-card-section class="q-pt-xs">
    <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
    <div class="text-caption text-gray">
      {{ description }}
    </div>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">

import {onMounted} from 'vue';

export interface Props {
  title: string,
  description: string
}

const props = defineProps<Props>()

</script>

<style scoped>

</style>
