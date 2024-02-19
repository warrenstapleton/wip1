<template>
  <q-page class='row no-wrap justify-center'>
  <h1>Welcome</h1>
  </q-page>
</template>

<script setup lang='ts'>

import { useRouter } from 'vue-router';
import { computed, ref, onMounted, watch } from 'vue';

const router = useRouter();

import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';

const columns = [
  {
    name: 'name',
    label: 'Name',
    required: true,
    align: 'left',
    field: 'name',
    sortable: true
  },
  {
    name: 'owner',
    label: 'Owner',
    field: 'owner',
    required: true,
    align: 'left',
    sortable: true
  },
  {
    name: 'completed',
    label: 'Completed',
    field: 'completed',
    required: true,
    align: 'left',
    sortable: true
  }
];

const tableRef = ref();
const selected = ref([]);
const filter = ref('');

function getSelectedString() {
  return selected.value.length === 0 ? '' : `${selected.value.length > 1 ? 's' : ''} selected of ${result.value.projects.length}`;
}

function onRowClick(evt: any, row: any) {
  console.log('warren onRowClick evt=', evt,'  row=',row);
  router.push(`/project/${row.id}`);
}

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 2,
  rowsNumber: 0 // total, returned from server
});

// function fetchfromServer(startRow: number, count: number, filter: any, sortBy: () => {}, descending: boolean) {
//
// }

const { loading, result, variables } = useQuery(gql`
      query getProjects($page: Int, $limit: Int) {
        projects(page: $page, limit: $limit) {
          projects {
            id
            name
            owner
            completed
          }
          paginator {
            page
            total
          }
        }
      }
    `,
    {
      page: 1,
      limit: pagination.value.rowsPerPage
    },
    {
      fetchPolicy: 'no-cache',
      // fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    }
  );

function onRequest(props: any) {
  console.log('warren onRequest=', props);
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;
  variables.value.page = page;
  variables.value.limit = pagination.value.rowsPerPage
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
}

const projects = ref([])
watch(result, () => {
  console.log("warren: result changed to ", result.value)
  if (result.value) {
    projects.value = result.value.projects.projects
    pagination.value.rowsNumber = result.value.projects.paginator.total
    console.log("warren: updated pagination to ", pagination)
  }
})

</script>

<style lang='sass'>
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #00b4ff

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #00b4ff

  /* this will be the loading indicator */

  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3

  thead tr:first-child th
    top: 0
    z-index: 1

  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */

  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
