<template>
  <v-app>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>DriveIndex</v-toolbar-title>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
        title="John Leider"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
  </v-app>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const drawer = ref(false)
</script>

<style scoped>

</style>
