<template>
  <v-container>
    <v-card>
      <v-card-title style="font-size:25px;font-weight: bold">{{ t('basicSettings') }}</v-card-title>
      <v-card-subtitle>{{ t('basicSettingsPrompt') }}</v-card-subtitle>
      <v-divider style="margin: 5px"/>
      <v-card class="form-card">
        <v-card-title>{{ t('driveManage')}}</v-card-title>
        <v-list>

        </v-list>
      </v-card>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n()

</script>

<style scoped>
.form-card{
  margin:5px;
}
</style>
