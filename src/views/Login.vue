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
                :label="t('auth.username')"
                required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                variant="outlined"
                type="password"
                v-model="password"
                :label="t('auth.password')"
                @keyup.enter="submitCredential"
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
              {{ t('auth.submit') }}
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
import {useRequest} from "alova";
import {useRouter} from "vue-router";
import {useAuthStore} from "../core/store/authStore.ts";

const {t} = useI18n()

let username = ref('')
let password = ref('')

let {
  loading,
  error,
  send,
} = useRequest(() => loginTokenGetter(username.value, password.value), {
  initialData: [],
  immediate: false,
})

const router = useRouter()

const authStore = useAuthStore()

function submitCredential() {
  send().then(result => {
    const {data} = result
    const {token, role} = data.auth
    const {username, nick} = data
    localStorage.setItem('token', token)
    authStore.token = token
    router.push({name: 'client'})

  }).catch(() => {
    error = ref(Error(t('auth.error')))
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