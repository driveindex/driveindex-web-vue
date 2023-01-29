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
    <v-card class="password-card" v-if="showPasswordInput">
      <div class="password-box">
        <v-icon icon="mdi-lock"></v-icon>
        This file is password-protected.
        <v-text-field
          class="password-input"
          v-model="password"
          :rules="[(v) => !!v || 'Password is required']"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-btn @click.prevent="submitPassword">submit</v-btn>
      </div>
    </v-card>
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

const props = defineProps<{
  queryPath: string,
  fileList: FileListInfo,
  loadCard: boolean
}>()

const displayList = computed(() => {
  return props.fileList.data.content == undefined ? [] : props.fileList.data.content
})

// Check if there is parent directory.
const hasParentDirectory = computed(() => {
  return !new CanonicalPath(props.queryPath).isRoot()
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

// Route back to parent directory.
import {useRouter} from "vue-router";

const router = useRouter()

function toParentPath() {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      path: new CanonicalPath(props.queryPath).getParentPath()
    }
  })
}

// Direct to clicked item.
function direct(name: string) {
  console.log(name, 'direct')
  router.push({
    path: router.currentRoute.value.path,
    query: {
      path: new CanonicalPath(props.queryPath).toChildrenPath(name)
    }
  })
}

// Password-protected file.
const showPassword = ref(false)
const showPasswordInput = computed(() => {
  return props.fileList.code == -4001
})
const password = ref('')
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

@media (max-width: 600px) {
  .file-details-hide {
    display: none;
  }
}
</style>
