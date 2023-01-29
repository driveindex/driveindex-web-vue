<template>
  <v-card class="password-card">
    <div class="password-box">
      <v-icon icon="mdi-lock"></v-icon>
      This entry is password-protected.
      <v-text-field
        class="password-input"
        v-model="password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>
      <v-btn @click.prevent="submitPassword">submit</v-btn>
    </div>
  </v-card>
</template>

<script setup>
// Password-protected file.
import {ref} from "vue";
import {useStore} from "@/core/store";

const store = useStore()
const showPassword = ref(false)
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
