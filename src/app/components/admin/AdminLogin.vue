<template>
  <v-container class="page-center">
    <v-card class="row-center" variant="outlined">
      <div style="font-size: 28px">
        {{ t('login') }}
      </div>
      <div class="password-input">
        <v-text-field
          v-model="password"
          :label="t('password')"
          :rules="[(v) => !!v || 'Login is required']"
          class="login-input"
        />
      </div>
      <div>
        <v-btn @click.prevent="submitPassword">{{ t('submit') }}</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {adminLogin} from "@/core/requests/APIs";

const {t} = useI18n()
const router = useRouter()
const password = ref('')

function submitPassword() {
  adminLogin(password.value).then((res) => {
    if (res.code == 200) {
      localStorage.token = res.data.token
      router.push('/admin/panel')
    } else {
      // Wrong password or connection lost.
      alert('Wrong password')
    }
  })
}
</script>

<style scoped>
.password-input {
  width: 70%;
}

.row-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  padding: 10px;
}

.page-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}
</style>
