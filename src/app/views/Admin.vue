<template>
  <router-view/>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useStore} from "@/core/store";
import {checkToken} from "@/core/requests/APIs";
const router = useRouter()
const {t} = useI18n()
const token = localStorage.token
if(token == undefined) {
  router.push('/admin/login')
}else{
  checkToken(token).then((res) => {
    if(res.code == 200) {
      router.push('/admin/panel')
    }else{
      router.push('/admin/login')
    }
  }).catch((err) => {
    router.push('/admin/login')
  })
}

</script>

<style scoped>

</style>
