<template>
  <v-container>
    <v-row class="row-center" no-gutters>
      <v-card
        border
        class="rounded-lg card-fill"
      >
        <v-card-actions class="breadcrumb">
          <v-breadcrumbs :items="path">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-card class="file-list-card" :loading="loadCard">
      <DriveList :fileList="fileList"
                 :loadCard="loadCard"
      />
      <v-row class="row-center empty-list" no-gutters
             v-if="show404 && !loadCard">
        <v-icon icon="mdi-cloud-question" style="font-size: 50px"></v-icon>
        <div>OOPS, No result found with given path</div>
      </v-row>
      <DriveFile v-if="showFile" :fileData="fileData"/>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import DriveList from "@/app/components/drive/list/DriveList.vue";
import {CanonicalPath} from "@/core/util/CanonicalPath";
import {useRoute} from "vue-router";
import {computed, reactive, Ref, ref} from "vue";
import {useStore} from "@/core/store";

const store = useStore()
const route = reactive(useRoute())
let routeVars = ref(store.routeVars)

// Path.
let path = computed(() => {
  if (routeVars.value.path == null) {
    return ['Invalid path']
  }
  const pathArray = ref(new CanonicalPath(routeVars.value.path).toBreadcrumbItems())
  for (const obj of pathArray.value) {
    obj.to = route.path + "?path=" + obj.to
  }
  return pathArray.value
})

// File list.
// If the return value mine_type is not a directory, display the file.
import {getFileListInfo, FileListInfo, FileData, ContentItem} from "@/core/requests/APIs";
import DriveFile from "@/app/components/drive/file/DriveFile.vue";

const fileList = ref({
  data: {
    content: Array<ContentItem>()
  }
} as FileListInfo)
const fileData: Ref<FileData> = ref({} as FileData)
const showFile: Ref<boolean> = ref(false)
const show404: Ref<boolean> = ref(false)
const loadCard = ref(true)

async function requestInfo() {
  await getFileListInfo(routeVars.value).then((response) => {
    console.log(response, 'response')
    if (response.code === -4001) {
      fileList.value = response as FileListInfo
      return
    }
    if (response.code === -4002) {
      show404.value = true
      return
    }
    if (response.data.mine_type == "directory") {
      fileList.value = response as FileListInfo
      console.log('fileList', fileList.value)
    } else {
      showFile.value = true
      fileData.value = response as FileData
      console.log(response)
    }
  }).catch((error) => {
    // todo: handle possible error
    console.log(error)
  }).finally(() => {
    loadCard.value = false
  })
}

const rPath = ref(routeVars.value.path)
requestInfo()
store.$subscribe(async (mutation, state) => {
  loadCard.value = true
  fileList.value = {
    data: {
      content: Array<ContentItem>()
    }
  } as FileListInfo
  fileData.value = {} as FileData
  showFile.value = false
  await requestInfo()
})


</script>

<style scoped>
.row-center {
  justify-content: center;
}

.file-list-card {
  padding: 1px;
  font-size: 14px;
}

.card-fill {
  width: 100%;
  height: 50px;
  margin: 0 0 2% 0;
}

.breadcrumb {
  padding: 0;
  justify-content: flex-start;
  align-items: center;
}

.empty-list {
  width: 100%;
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
