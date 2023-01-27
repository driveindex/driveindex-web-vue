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

    <v-card class="file-list-card">
      <v-row class="row-center" no-gutters>
        <v-col
          class="v-col-12"
          v-for="item in fileList"
          :key="item.name"
        >
          <v-card class="file-info-card">
            <div>
              <v-icon :icon="determineIcon(item.mine_type)"></v-icon>
              {{ item.name }}
            </div>
            <div class="file-detail file-details-hide">
              <div class="detail-item">
                {{timeFormat(item.info.modified_time)}}
              </div>
              <div class="detail-item">
                {{sizeFormat(item.info.size)}}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {CanonicalPath} from "@/core/util/CanonicalPath";
import {useRoute} from "vue-router";
import {computed, reactive, ref, watch, watchEffect} from "vue";

const route = reactive(useRoute())
let queryPath = ref(route.query.path as string)

// Update queryPath when route changes.
watch(route, (newValue) => {
  queryPath.value = newValue.query.path as string
}, {deep: true})


// Path.
let path = computed(() => {
  if (queryPath.value == null) {
    return ['Invalid path']
  }
  const pathArray = ref(CanonicalPath.of(queryPath.value).toBreadcrumbItems())
  for (const obj of pathArray.value) {
    obj.to = route.path + "?path=" + obj.to
  }
  return pathArray.value
})

// File list.
import {getFileListInfo, FileListInfo, ContentItem} from "@/core/requests/apis";

let fileList = ref(Array<ContentItem>())
watchEffect(async () => {
  await getFileListInfo(queryPath.value).then((response: FileListInfo) => {
    fileList.value = response.data.content
  }).catch((error) => {
    // todo: handle possible error
    console.log(error)
  })
  console.log(fileList.value)
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
import {sizeFormat, timeFormat} from "@/core/util/fileDetailParser";
</script>

<style scoped>
.row-center {
  justify-content: center;
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

.file-list-card {
  padding: 1px;
  font-size: 14px;
}

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
