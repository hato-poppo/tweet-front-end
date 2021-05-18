<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-icon
          large
          left
        >
          mdi-twitter
        </v-icon>
        <h1>Twitters</h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'; // NOTE: 書き換え

// NOTE: 全体的に書き換え
export default defineComponent({
  setup: () => {
    // 必要であれば処理を追記
  },
});
</script>
