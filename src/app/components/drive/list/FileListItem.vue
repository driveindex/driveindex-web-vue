<template>
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
</template>

<script setup lang="ts">
import {ContentItem} from "@/core/requests/APIs";
defineProps<{
  item: ContentItem
}>()

// Format tools.
import {sizeFormat, timeFormat} from "@/core/util/FileDetailParser";
import {CanonicalPath} from "@/core/util/CanonicalPath";

// Determine icon.
function determineIcon(mineType: string): string {
  if (mineType == 'directory') {
    return 'mdi-folder'
  } else if (mineType == 'application/zip') {
    return 'mdi-zip-box'
  }
  return 'mdi-file'
}

// Direct to clicked item.
import {useRouter} from "vue-router";
import {useStore} from "@/core/store";
import {ref} from "vue";

const store = useStore()
const routeVars = ref(store.routeVars)
const router = useRouter()

function direct(name: string) {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      path: new CanonicalPath(routeVars.value.path).toChildrenPath(name),
      password: routeVars.value.password
    }
  })
}
</script>

<style scoped>
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
