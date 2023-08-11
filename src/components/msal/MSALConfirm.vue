<template>
  <v-container>
    <v-sheet
        class="result"
        :loading="loading"
    >
      <div
          v-if="!isSuccess"
      >
        <div
            v-if="errorStore.error.length == 0"
        >
          {{ t('MSA.confirming') }}
        </div>
        <div
            v-else
        >
          <v-alert
              v-for="err in errorStore.error"
              :key="err"
              type="error"
          >{{ err.error }} {{ err.message }}
          </v-alert>

        </div>
      </div>
      <div
          v-else
      >
        {{ t('MSA.confirmed') }}
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {useRequest} from "alova";
import {MSAConfirmation} from "../../core/api/msal.ts";
import {useRoute} from "vue-router";
import {useErrorStore} from "../../core/store/errorStore.ts";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const {t} = useI18n()

const route = useRoute()
let isSuccess = ref(false)

const code = route.query.code as string | ''
const state = route.query.state as string | ''

const {data, error, onError, onSuccess, loading} = useRequest(() => MSAConfirmation(code, state))

const errorStore = useErrorStore()
onError(event => {
  errorStore.setError(error.value, event.error.response.data['message'], 15)
})

onSuccess(() => {
  if (data.value.code != 200) {
    isSuccess.value = false
    errorStore.setError(Error(data.value.message), 'Error in MS Authentication', 15)
  } else {
    isSuccess.value = true
  }
  // close the window after 10 seconds
  setTimeout(() => {
    window.close()
  }, 10000)
})
</script>

<style scoped>
.result {
  margin: 2%;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>