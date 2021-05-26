<template>
  <v-card
    class="mx-auto"
    color="success"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-avatar color="grey darken-3 mr-2">
      <v-img
        class="elevation-6"
        alt="ME"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      ></v-img>
      </v-avatar>
      {{ tweet.user_account_name }}
    </v-card-title>
    <v-card-subtitle>
        @{{ tweet.user_name }}・{{ tweet.created_at }}
    </v-card-subtitle>
    <v-card-text class="headline font-weight-bold white--text">
        {{ tweet.content }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from '@vue/composition-api';
import { Tweet } from '@/scripts/requests/Tweet';

export default defineComponent({
  props: {
    tweet: Object as PropType<Tweet>,
  },
});
</script>
