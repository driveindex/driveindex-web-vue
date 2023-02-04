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
        <v-list :selected="panel" nav select-strategy="single-independent" @update:selected="selectPanel">
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
import {ref} from "vue";
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

function selectPanel(clickItem: any) {
  if (clickItem.length > 0) {
    panel.value[0] = clickItem[0]
    router.push('/admin/panel/' + clickItem[0])
  }
}
</script>

<style scoped>
.main-frame {
  height: 100vh;
  overflow: auto;
}
</style>
