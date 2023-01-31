<template>
  <router-view/>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {reactive, watch} from "vue";
import {useStore} from "@/core/store";
import {getLanguage} from "@/core/requests/APIs";
import {useI18n} from "vue-i18n";

const {locale} = useI18n({useScope: 'global'})

const route = reactive(useRoute())
const store = useStore()
console.log(route.name == 'main')

watch(route, () => {
  if (route.name == 'main') {
    store.$patch({
      routeVars: {
        client: route.params.client.toString(),
        account: route.params.account.toString(),
        drive: route.params.drive.toString(),
        path: route.query.path as string,
        password: route.query.password as string,
        sort_by: route.query.sort_by as string,
        asc: route.query.asc as string,
        page_size: store.routeVars.page_size,
        page_index: store.routeVars.page_index,
      }
    })
  }
})


getLanguage().then((res) => {
  sessionStorage.locale = res.data.language
}).catch((err) => {
  store.language = 'zh'
}).finally(() => {
  locale.value = store.language
})


</script>
