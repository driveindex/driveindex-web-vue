<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="8" class="loginForm">
        <v-form>
          <v-row justify="center">
            <v-img
                src="/vite.svg"
                id="logo"
            ></v-img>
          </v-row>
          <v-row>
            <v-text-field
                variant="outlined"
                type="text"
                v-model="username"
                :label="t('login.username')"
                required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                variant="outlined"
                type="password"
                v-model="password"
                :label="t('login.password')"
                required
            ></v-text-field>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-btn
                id="loginButton"
                color="#4CAF50"
                @click="submitCredential"
                block
                :loading="loading"
            >
              {{ t('login.submit') }}
            </v-btn>
            <v-alert
                v-if="error"
                type="warning"
                title=""
                :text="error.message"
                id="alert"
            >
            </v-alert>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {loginTokenGetter} from "../core/api/auth.ts";

const {t} = useI18n()

let username = ref('')
let password = ref('')

import {useRequest} from "alova";

let {
  loading,
  error,
  send,
} = useRequest(() => loginTokenGetter(username.value, password.value), {
  initialData: [],
  immediate: false,
})

import {useRouter} from "vue-router";
const router = useRouter()
function submitCredential() {
  send().then(result => {
    const {data} = result
    const {token, role} = data.auth
    const {username, nick} = data
    localStorage.setItem('token', token)
    router.push({path: '/'})

  }).catch(() => {
    error = ref(Error(t('login.error')))
  })
}
</script>

<style scoped>
#logo {
  margin-top: 20px;
  margin-bottom: 20px;
  max-height: 100px;
  max-width: 100px;
  border-radius: 50px;
  border: 1px solid #F0F0F0;
}

.loginForm {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #F0F0F0;
  padding: 10% 5% 10% 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#loginButton {
  color: #F0F0F0;
  font-weight: bold;
}

#alert {
  margin-top: 10px;
}
</style>