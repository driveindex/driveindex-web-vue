<template>
  <v-card class="file-list-card">

    <v-row class="row-center" no-gutters>
      <v-col class="v-col-12" v-if="hasParentDirectory">
        <v-card class="file-info-card" @click.prevent="toParentPath">
          <div>
            <v-icon icon="mdi-arrow-up-bold"></v-icon>
            ...
          </div>
        </v-card>
      </v-col>
      <v-row class="row-center empty-list" no-gutters v-if="fileList.length == 0">
        <v-icon icon="mdi-cloud-question" style="font-size: 50px"></v-icon>
        <div>OOPS, No result found with given path</div>
      </v-row>
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
</template>

<script setup lang="ts">
import {computed} from "vue";
import {ContentItem} from "@/core/requests/APIs";
import {CanonicalPath} from "@/core/util/CanonicalPath";

const props = defineProps<{
  queryPath: string,
  fileList: Array<ContentItem>
}>()

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
import { useRouter} from "vue-router";
const router = useRouter()
function toParentPath() {
  // todo: the path will contain slash and not encoded to %2F, if %2F is used, the path will be encoded to %252F
  router.push({path: router.currentRoute.value.path, query: {path: new CanonicalPath(props.queryPath).getParentPath()}})
}
</script>

<style scoped>

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

.empty-list {
  width: 100%;
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 600px) {
  .file-details-hide {
    display: none;
  }
}
</style>
