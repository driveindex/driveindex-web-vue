<template>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();
const params = router.currentRoute.value.params;
console.log(params);

</script>

<style scoped>

</style>