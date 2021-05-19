<template>
  <div>
    <v-container>
      <v-row v-for='tweet in tweets.items.value' v-bind:key="tweet.id">
        <v-col>
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

            <v-card-subtitle justify="end">
              @{{ tweet.user_name }}・{{ tweet.created_at }}
            </v-card-subtitle>

            <v-card-text class="headline font-weight-bold white--text">
              {{ tweet.content }}
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="primary white--text" dark>
          Input window
        </v-card-title>

        <v-card-text class="pa-5">
          <v-textarea
            v-model="postContent.inputValue"
            label="Please input content."
            hide-details
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            elevation="0"
            @click="postTweet()"
          >
            Tweet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
    <v-btn
      class="tweet-button"
      fab
      dark
      large
      color="primary"
      @click="openDialog()"
    >
      <v-icon dark>
        mdi-pencil-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, onMounted,
} from '@vue/composition-api';
import axios from 'axios';

const getTweets = () => {
  const items: any = ref([]);
  const getItems = () => {
    axios.get('http://192.168.10.8:3000/tweets').then((res) => {
      items.value = res.data;
    });
  };
  onMounted(() => {
    getItems();
  });
  return {
    items,
  };
};

export default defineComponent({
  setup: () => {
    const tweets = getTweets();
    const postContent = reactive({
      inputValue: '' as string,
    });
    const dialog = ref<boolean>(false);
    const openDialog = () => {
      postContent.inputValue = '';
      dialog.value = true;
    };
    const closeDialog = () => {
      dialog.value = false;
    };
    const postTweet = async () => {
      const params = { user_id: 1, content: postContent.inputValue };
      const tweet = await axios.post('http://192.168.10.8:3000/tweets', params);
      tweets.items.value.unshift(tweet.data);
      dialog.value = false;
    };
    const openEditDialog = (tweet: any) => {
      postContent.inputValue = tweet.content;
      dialog.value = true;
    };
    return {
      tweets,
      dialog,
      openDialog,
      closeDialog,
      postContent,
      postTweet,
      openEditDialog,
    };
  },
});
</script>

<style scoped>
.tweet-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
