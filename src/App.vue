<script setup lang="ts">
import {useDisplay} from "vuetify";

const {mobile} = useDisplay();
console.log(mobile.value);
</script>

<template>
    <div class="fill-height">
      <router-view/>
    </div>
</template>

<style scoped>

</style>
