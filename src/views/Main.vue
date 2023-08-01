<template>
  <v-layout>
    <Sidebar/>
    <v-main>
      <BreadcrumbNav/>
      <router-view/>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">

import Sidebar from "../components/functional/Sidebar.vue";
import BreadcrumbNav from "../components/functional/BreadcrumbNav.vue";
</script>

<style scoped>

</style>