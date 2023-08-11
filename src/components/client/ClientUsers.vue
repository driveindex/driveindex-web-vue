<template>
  <v-sheet>
    <v-row>
      <v-col cols="9">
        <v-list>
          <v-list-item

          >

          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="3" align-self="center">
        <v-btn
            color="primary"
            prepend-icon="mdi-account"
            variant="tonal"
            @click="initMSALAuth()"
            class="clientPanelButton"
        >
          {{ t('client.addAccount') }}
        </v-btn>
        <v-btn
            color="primary"
            prepend-icon="mdi-cog"
            variant="tonal"
            @click="clientManagement()"
            class="clientPanelButton"

        >
          {{ t('client.clientManagement') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {Client} from "../../core/api/client.ts";
import {useRequest} from "alova";
import {MSAurlGetter} from "../../core/api/msal.ts";

const {t} = useI18n()

const props = defineProps<{
  client: Client
}>()

function clientManagement() {
  props.client.user_manage = false
}

function initMSALAuth() {
  const urlPrefix: string = import.meta.env.DI_FRONTEND_URL as string | 'http://localhost:5173/'
  const {data, onSuccess} = useRequest(() =>
      MSAurlGetter(props.client.id, urlPrefix + '/MSALConfirm'))

  onSuccess(() => {
    const url: string = data.value.data
    // open a popup window
    window.open(url, 'MSAL', 'width=500,height=600')
  })
}

</script>

<style scoped>

</style>