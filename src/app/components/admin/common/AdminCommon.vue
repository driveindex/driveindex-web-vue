<template>
<v-container>
  <v-row>
    {{ t('login') }}
    <v-text-field
      v-model="password"
      :rules="[(v) => !!v || 'Login is required']"
      class="login-input"
      :label="t('password')"
    />
    <v-btn @click.prevent="submitPassword">{{ t('submit') }}</v-btn>
  </v-row>
</v-container>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useStore} from "@/core/store";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {adminLogin} from "@/core/requests/APIs";
const {t} = useI18n()
const router = useRouter()
const password = ref('')

function submitPassword() {
  adminLogin(password.value).then((res) => {
    if(res.code == 200) {
      localStorage.token = res.data.token
      router.push('/admin/panel')
    }else {
      alert('Wrong password')
    }
  })
}
</script>

<style scoped>

</style>
