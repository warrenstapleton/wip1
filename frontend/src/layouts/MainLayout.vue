<template>
  <q-layout view='hHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon='menu'
          aria-label='Menu'
          @click='toggleLeftDrawer'
        />
        <q-toolbar-title>
          Mosaic App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model='leftDrawerOpen'
      show-if-above
      bordered
    >
      <q-scroll-area class='fit'>
        <q-list padding class='menu-list'>
          <q-item-label header>Links</q-item-label>
          <q-item v-for='link in essentialLinks'
                  :key='link.title'
                  clickable
                   v-ripple
                  :to='link.link'
          >
            <q-item-section avatar>
              <q-icon :name='link.icon'></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>{{ link.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
// import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

const essentialLinks = [
  {
    title: 'Documentation',
    caption: 'Documentation',
    icon: 'school',
    link: 'documentation'
  },
  {
    title: 'Projects',
    caption: 'Manage Projects',
    icon: 'folder',
    link: 'projects'
  },
  {
    title: 'Editor',
    caption: 'Edit Design',
    icon: 'folder',
    link: 'editor'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
