<template>
  <v-card class="password-card">
    <div class="password-box">
      <v-icon icon="mdi-lock"></v-icon>
      {{ t('needPassword') }}
      <v-text-field
        v-model="password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[(v) => !!v || 'Password is required']"
        :type="showPassword ? 'text' : 'password'"
        class="password-input"
        :label="t('password')"
        @click:append-inner="showPassword = !showPassword"
      />
      <v-btn @click.prevent="submitPassword">{{ t('submit') }}</v-btn>
    </div>
  </v-card>
</template>

<script setup>
// Password-protected file.
import {ref} from "vue";
import {useStore} from "@/core/store";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const store = useStore()
let showPassword = ref(false)
const password = ref('')

function submitPassword() {
  store.routeVars.password = password.value
}
</script>

<style scoped>
.password-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
}

.password-input {
  width: 100%;
}
</style>
