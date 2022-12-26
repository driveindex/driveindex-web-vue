<template>
  <v-container>
    <v-row align-content="center" no-gutters>
      <v-responsive max-width="800">
        <v-card>
          <v-breadcrumbs :items="path.toBreadcrumbItems()">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-card>
      </v-responsive>
    </v-row>
  </v-container>
</template>

<script>
import {CanonicalPath} from "@/core/util/CanonicalPath";

export default {
  name: "Drive",
  data: () => ({
    path: CanonicalPath.of("/simple/test/path"),
    list: []
  })
}
</script>

<style scoped>

</style>
