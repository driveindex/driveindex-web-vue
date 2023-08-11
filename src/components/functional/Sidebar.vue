<template>
  <v-card>
    <v-navigation-drawer
        expand-on-hover
    >
      <v-list density="comfortable" nav>
        <v-list-item
            :title="authStore.username" prepend-icon="mdi-account-circle"
        />
        <v-divider/>
        <v-list-item
            title="operation example" prepend-icon="mdi-cog"
        />
        <v-list-item
            title="operation example" prepend-icon="mdi-cog"
        />

      </v-list>

      <template v-slot:append>
        <v-list density="comfortable" nav>
          <v-divider style="margin-top: 5px; margin-bottom: 5px"/>
          <v-list-item
              title="client" to="/client" exact prepend-icon="mdi-home"
          />
          <v-list-item
              title="settings" to="/settings" exact prepend-icon="mdi-cogs"
          />
          <v-list-item
          >
            <v-btn
                color="error"
                @click="logout"
                prepend-icon="mdi-logout"
                block
            >
              {{ t('auth.logout') }}
            </v-btn>
          </v-list-item>


        </v-list>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup lang="ts">
import {useAuthStore} from "../../core/store/authStore.ts";
import router from "../../core/router";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const authStore = useAuthStore();


function logout() {
  authStore.logout()
  router.push({name: 'login'})
}
</script>

<style scoped>

</style>