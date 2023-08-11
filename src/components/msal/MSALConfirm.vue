<template>
  CONFIRM
</template>

<script setup lang="ts">
import {useRequest} from "alova";
import {onMounted} from "vue";
import {MSAConfirmation} from "../../core/api/msal.ts";
import {useRoute} from "vue-router";

onMounted(() => {
  // MS is using a # separator in the URL, which is not supported by Vue Router
  // So parse the URL manually
  const route = useRoute()

  const code = route.query.code as string | ''
  const state = route.query.state as string | ''

  useRequest(()=>MSAConfirmation(code, state))

})

</script>

<style scoped>

</style>