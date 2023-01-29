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
      <v-card class="file-info-card" @click="direct(item.name)">
        <div>
          <v-icon :icon="determineIcon(item.mine_type)"></v-icon>
          {{ item.name }}
        </div>
        <div class="file-detail file-details-hide">
          <div class="detail-item">
            {{ timeFormat(item.info.modified_time) }}
          </div>
          <div class="detail-item">
            {{ sizeFormat(item.info.size) }}
          </div>
        </div>
      </v-card>
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

// Determine icon.
function determineIcon(mineType: string): string {
  if (mineType == 'directory') {
    return 'mdi-folder'
  } else if (mineType == 'application/zip') {
    return 'mdi-zip-box'
  }
  return 'mdi-file'
}

// Format tools.
import {sizeFormat, timeFormat} from "@/core/util/FileDetailParser";
import PasswordInput from "@/app/components/drive/list/PasswordInput.vue";

// Route back to parent directory.

function toParentPath() {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      path: new CanonicalPath(routeVars.value.path).getParentPath()
    }
  })
}

// Direct to clicked item.
function direct(name: string) {
  console.log(name, 'direct')

  router.push({
    path: router.currentRoute.value.path,
    query: {
      path: new CanonicalPath(routeVars.value.path).toChildrenPath(name),
      password: routeVars.value.password
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

.file-detail {
  position: absolute;
  right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-item {
  margin: 0 5px;
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

@media (max-width: 600px) {
  .file-details-hide {
    display: none;
  }
}
</style>
