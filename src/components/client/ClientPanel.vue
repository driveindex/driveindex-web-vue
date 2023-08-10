<template>
  <v-sheet>
    <v-row>
      <v-col cols="9">
        <div style="margin: 5px">
          <v-text-field
              class="inputGroup"
              v-model="client['id']"
              label="ID"
              hide-details="auto"
              variant="outlined"
              disabled
          />
          <v-text-field
              class="inputGroup"
              v-model="client['name']"
              label="Name"
              hide-details="auto"
              variant="outlined"
          />
          <v-text-field
              class="inputGroup"
              v-model="client['type']"
              label="Type"
              hide-details="auto"
              variant="outlined"
          />
          <v-text-field
              class="inputGroup"
              v-model="client['detail']['client_id']"
              label="Client ID"
              hide-details="auto"
              variant="outlined"
          />
          <v-text-field
              class="inputGroup"
              v-model="client['detail']['tenant_id']"
              label="Tenant ID"
              hide-details="auto"
              variant="outlined"
          />
          <v-text-field
              class="inputGroup"
              v-model="client['detail']['end_point']"
              label="End Point"
              hide-details="auto"
              variant="outlined"
          />
          <v-text-field
              class="inputGroup"
              v-model="client['detail']['client_secret']"
              label="Client Secret"
              :placeholder="placeholder"
              hide-details="auto"
              variant="outlined"
              required
          />
        </div>
      </v-col>
      <v-col cols="3" align-self="center" id="btnGroup">
        <v-btn
            class="clientPanelButton"
            color="success"
            prepend-icon="mdi-content-save"
            @click="saveClient()"
            :loading="saveLoading || modifyLoading"
            variant="tonal">{{ t('client.save') }}
        </v-btn>
        <v-btn
            class="clientPanelButton"
            color="error"
            prepend-icon="mdi-delete"
            variant="tonal"
            @click="deleteClient()"
        >{{ t('client.delete') }}
        </v-btn>
        <v-btn
            class="clientPanelButton"
            color="primary"
            prepend-icon="mdi-microsoft-azure"
            variant="tonal"
            @click="userManagement()"
        >{{ t('client.accountManagement') }}

        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useRequest} from "alova";
import {
  Client,
  clientCreator,
  clientDeleter,
  clientModifier,
  ModifiedClientInfo,
  NewClientInfo,
  supportedEndPoints
} from "../../core/api/client.ts";
import {useRouter} from "vue-router";

const {t} = useI18n()

const props = defineProps<{
  client: Client
}>()

let placeholder: string
if (props.client.new) {
  // New client
  placeholder = t('client.newClientSecret')
} else {
  // Modified client
  placeholder = t('client.modifyClientSecret')
}

const {
  data: saveData,
  loading: saveLoading,
  error: saveError,
  send: saveSend
} = useRequest((d: NewClientInfo) => clientCreator(d), {
  immediate: false
})

const {
  data: modifyData,
  loading: modifyLoading,
  error: modifyError,
  send: modifySend
} = useRequest((d: ModifiedClientInfo) => clientModifier(d), {
  immediate: false
})

const {
  data: deleteData,
  loading: deleteLoading,
  error: deleteError,
  send: deleteSend
} = useRequest((client_id: string) => clientDeleter(client_id), {
  immediate: false
})

const router = useRouter()

function saveClient() {
  if (props.client.new) {
    const newClient: NewClientInfo = {
      name: props.client.name,
      type: props.client.type,
      data: {
        azure_client_id: props.client.detail.client_id,
        azure_client_secret: props.client.detail.client_secret,
        tenant_id: props.client.detail.tenant_id,
        end_point: props.client.detail.end_point as supportedEndPoints,
      }
    }
    saveSend(newClient).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })

  } else {
    const modifyClient: ModifiedClientInfo = {
      client_id: props.client.id,
      client_type: props.client.type,
      data: {
        client_secret: props.client.detail.client_secret,
        name: props.client.name,
      }
    }
    modifySend(modifyClient).then((result) => {
      console.log(result)
    })
  }
}

function deleteClient() {
  deleteSend(props.client.id).then((result) => {
    console.log(result)
    router.push('/client')
  })
}

function userManagement() {
  props.client.user_manage = true
}

</script>

<style scoped>
#btnGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inputGroup {
  margin: 7px;
}
</style>