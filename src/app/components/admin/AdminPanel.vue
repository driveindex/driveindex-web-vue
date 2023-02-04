<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>DriveIndex</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list v-model:selected="panel" nav>
          <v-list-item
            v-for="{val, title} in items"
            :key="val"
            :title="title"
            :value="val"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="main-frame">
        <v-card-text>
          <router-view/>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const {t} = useI18n()
const router = useRouter()
let drawer = ref(false)
const items = [
  {val: 'basic', title: t('basicSettings')},
  {val: 'password', title: t('passwordSettings')},
]
let panel = ref([items[0].val])
watch(panel, (val) => {
  console.log(val)
  router.push('/admin/panel/'+val[0])
})
</script>

<style scoped>
.main-frame {
  height: 100vh;
  overflow: auto;
}
</style>
