<template>
  <div>
    <v-container>
      <v-row v-for='tweet in tweets.items.value' v-bind:key="tweet.id">
        <v-col>
          <tweet-card :tweet="tweet" />
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog.show"
        width="500"
      >
        <v-card>
          <v-card-title class="primary white--text" dark>
            Input window
          </v-card-title>

          <v-card-text class="pa-5">
            <v-textarea
              v-model="content"
              label="Please input content."
              hide-details
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog.close()"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              elevation="0"
              @click="postTweet(content)"
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
      @click="dialog.open()"
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
import TweetCard, { Tweet } from '@/components/tweets/TweetCard.vue';

const getTweets = () => {
  const items: any = ref([]);
  const getItems = () => {
    axios.get('http://192.168.10.8:3000/tweets').then((res) => {
      items.value = res.data;
    });
  };
  // const getItems = async () => {
  //   items.value = await axios.get<Tweet[]>('http://192.168.10.8:3000/tweets');
  // };
  onMounted(() => {
    getItems();
  });
  return {
    items,
  };
};

export default defineComponent({
  components: {
    'tweet-card': TweetCard,
  },
  setup: () => {
    const tweets = getTweets();
    const content = ref<string>('');

    // よくあるやりかた
    // const dialog = ref<boolean>(false);
    // const openDialog = () => {
    //   postContent.inputValue = '';
    //   dialog.value = true;
    // };
    // const closeDialog = () => {
    //   dialog.value = false;
    // };

    // うまくいく
    const dialog = reactive({
      show: false,
      open: () => {
        content.value = '';
        dialog.show = true;
      },
      close: () => {
        dialog.show = false;
      },
    });

    // 上手くいかない（初期値がtrueになる）
    // const dialog = {
    //   show: ref<boolean>(false),
    //   open: () => {
    //     postContent.inputValue = '';
    //     dialog.show.value = true;
    //   },
    //   close: () => {
    //     dialog.show.value = false;
    //   },
    // };

    const postTweet = async (text: string) => {
      const params = { user_id: 1, content: text };
      const tweet = await axios.post('http://192.168.10.8:3000/tweets', params);
      tweets.items.value.unshift(tweet.data);
      dialog.close();
    };

    return {
      tweets,
      dialog,
      content,
      postTweet,
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
