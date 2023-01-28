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

    <DriveList :fileList="fileList" :query-path="queryPath"/>
  </v-container>
</template>

<script setup lang="ts">
import DriveList from "@/app/components/drive/list/DriveList.vue";
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
import {getFileListInfo, FileListInfo, ContentItem} from "@/core/requests/APIs";

let fileList = ref(Array<ContentItem>())
watchEffect(async () => {
  await getFileListInfo(queryPath.value).then((response: FileListInfo) => {
    fileList.value = response.data.content
  }).catch((error) => {
    // todo: handle possible error
    console.log(error)
  })
})
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
</style>
