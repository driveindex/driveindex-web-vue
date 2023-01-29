<template>
  <router-view/>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {reactive, watch} from "vue";
import {useStore} from "@/core/store";

const route = reactive(useRoute())
const store = useStore()
watch(route, () => {
  store.$patch({
    routeVars: {
      client: route.params.client.toString(),
      account: route.params.account.toString(),
      drive: route.params.drive.toString(),
      path: route.query.path as string,
      password: route.query.password as string,
      sort_by: route.query.sort_by as string,
      asc: route.query.asc as string,
      page_size: route.query.page_size as string,
      page_index: route.query.page_index as string,
    }
  })
})
</script>
