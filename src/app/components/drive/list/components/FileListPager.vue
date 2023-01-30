<template>
  <div>
    <v-pagination
      v-model="page"
      :length="totalPage"
      total-visible="4"
    />
  </div>
  <v-col class="v-col-8">
    <div class="item-num-selector">
      <i18n-t keypath="displayItemSelection">
        <template v-slot:selector>
          <v-select
            v-model="routeVars.page_size"
            :items="['20', '50', '100']"
            class="selector"
            density="compact"
            prepend-icon=""
          ></v-select>
        </template>
        <template v-slot:total>
          <span>{{ totalCount }}</span>
        </template>
      </i18n-t>
    </div>
  </v-col>
</template>

<script lang="ts" setup>
import {useStore} from "@/core/store";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const store = useStore()
const routeVars = store.routeVars
defineProps<{
  totalPage: number | undefined,
  totalCount: number | undefined,
}>()
const page = ref(Number(routeVars.page_index))
watch(page, (newPage) => {
  routeVars.page_index = String(newPage)
})


</script>

<style scoped>
.selector {
  margin: 15px;
}

.item-num-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  flex-direction: row;
}
</style>
