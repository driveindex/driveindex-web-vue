<template>
  <v-row class="row-center" no-gutters>
    <v-col class="v-col-12" v-if="hasParentDirectory">
      <v-card class="file-info-card" @click.prevent="toParentPath">
        <div>
          <v-icon icon="mdi-arrow-up-bold"></v-icon>
          ...
        </div>
      </v-card>
    </v-col>
    <PasswordInput class="password-card" v-if="showPasswordInput"/>
    <v-col
      v-else
      class="v-col-12"
      v-for="item in displayList"
      :key="item.name"
    >
      <DriveListItem :item="item"/>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {FileListInfo} from "@/core/requests/APIs";
import {CanonicalPath} from "@/core/util/CanonicalPath";
import {useStore} from "@/core/store";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()
const routeVars = ref(store.routeVars)

const props = defineProps<{
  fileList: FileListInfo,
  loadCard: boolean
}>()

let displayList = computed(() => {
  return props.fileList.data.content
})


// Check if there is parent directory.
const hasParentDirectory = computed(() => {
  return !new CanonicalPath(routeVars.value.path).isRoot()
})

import PasswordInput from "@/app/components/drive/list/PasswordInput.vue";
import DriveListItem from "@/app/components/drive/list/FileListItem.vue";

// Route back to parent directory.

function toParentPath() {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      path: new CanonicalPath(routeVars.value.path).getParentPath()
    }
  })
}

// Show password input.
const showPasswordInput = computed(() => {
  return props.fileList.code == -4001
})
</script>

<style scoped>
.file-info-card {
  margin: 5px;
  padding: 5px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password-card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  margin: 5px;
  height: 500px;
}
</style>
