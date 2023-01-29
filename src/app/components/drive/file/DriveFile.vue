<template>
  <v-row class="row-center" no-gutters>
    <v-col class="v-col-12">
      <v-card class="file-card">
        <v-card-title class="file-card-title">
          <div>
            <v-icon icon="mdi-file"></v-icon>
            {{ data.name }}
          </div>
          <div>
            <v-btn variant="flat" @click.prevent="copyToClipboard">Copy Download Link</v-btn>
            <v-btn @click.prevent="download">Download</v-btn>
          </div>
        </v-card-title>
        <v-card-text class="file-card-main">
          <div>
            <v-icon icon="mdi-file"></v-icon>
          </div>
          {{ data.name }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {FileData} from "@/core/requests/APIs";
import {ref} from "vue";
import {baseURL} from "@/core/requests/";
import {useStore} from "@/core/store";

const store = useStore()
const props = defineProps<{
  fileData: FileData
}>()

const data = ref(props.fileData)

let routeVars = ref(store.routeVars)

function download() {
  window.open(baseURL + '/download?path=' + routeVars.value)
}

// Copy to clipboard.
function copyToClipboard() {
  const el = document.createElement('textarea');
  el.value = baseURL + '/download?path=' + routeVars.value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

</script>

<style scoped>
.file-card {
  height: 500px;
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}

.file-card-title {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-card-main {
  background: rgb(238, 238, 238);
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
}
</style>
