<template>
  <v-sheet>
    <v-row>
      <v-col cols="9">

      </v-col>
      <v-col cols="3" align-self="center">
        <v-btn
          color="primary"
          prepend-icon="mdi-account"
          variant="tonal"
          @click="initMSALprocess()"
        >
          {{ t('client.addAccount')}}
        </v-btn>
        <v-btn
            color="primary"
            prepend-icon="mdi-cog"
            variant="tonal"
            @click="clientManagement()"
        >
          {{ t('client.clientManagement') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {Client} from "./ClientPanel.vue";
import {createMSALConfig} from "../../core/msal/configGen.ts";

const {t} = useI18n()

const props = defineProps<{
  client: Client
}>()

function clientManagement() {
  props.client.user_manage = false
}

function initMSALAuth(){
  const option: Opt = {

  }
  createMSALConfig()
}

</script>

<style scoped>

</style>