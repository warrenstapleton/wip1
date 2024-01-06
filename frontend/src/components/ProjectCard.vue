<template>
<q-card
  flat
  bordered
  class="q-mb-sm cursor-pointed"
  >
  <q-card-section class="q-pt-xs">
    <div class="text-h5 q-mt-sm q-mb-xs">{{ props.name }}</div>
    <div class="text-h5 q-mt-sm q-mb-xs">{{ props.owner }}</div>
    <div class="text-caption text-gray">
      {{ props.completed }}
    </div>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">

export interface Props {
  name: string,
  owner: string
  completed: boolean
}

const props = defineProps<Props>()

</script>

<style scoped>

</style>
