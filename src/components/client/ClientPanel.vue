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
        </div>
      </v-col>
      <v-col cols="3" align-self="center" id="btnGroup">
        <v-btn
            class="clientPanelButton"
            color="success"
            prepend-icon="mdi-content-save"
            variant="tonal">{{ t('client.save') }}
        </v-btn>
        <v-btn
            class="clientPanelButton"
            color="error"
            prepend-icon="mdi-delete"
            variant="tonal">{{ t('client.delete') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

interface client {
  id: string,
  name: string,
  type: string,
  create_at: string,
  modify_at: string,
  detail: {
    client_id: string,
    tenant_id: string,
    end_point: string,
  }
}

const props = defineProps({
  client: {
    type: Object as PropType<client>,
    required: true
  }
})

</script>

<style>
.clientPanelButton {
  padding: 0;
  margin: 2px;
  width: 80%;
}

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