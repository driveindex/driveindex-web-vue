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
            @click="initMSALAuth()"
        >
          {{ t('client.addAccount') }}
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
import {createMSALInstance, Options} from "../../core/msal/configGen.ts";
import {signIn} from "../../core/msal/authPopup.ts";
import {Client} from "../../core/api/client.ts";

const {t} = useI18n()

const props = defineProps<{
  client: Client
}>()

function clientManagement() {
  props.client.user_manage = false
}

function initMSALAuth() {
  const option: Options = {
    clientId: props.client.detail.client_id,
    authority_area: props.client.detail.end_point as 'cn' | 'global' | 'us_gov',
    redirectUri: '/MSALconfirm',
    postLogoutRedirectUri: '/MSALLogout',
  }
  signIn(createMSALInstance(option))
}

</script>

<style scoped>

</style>