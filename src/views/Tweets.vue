<template>
  <div>
    <v-container>
      <v-row v-for='tweet in tweets.value' v-bind:key="tweet.id">
        <v-col>
          <tweet-card :tweet="tweet" />
        </v-col>
      </v-row>
      <post-dialog v-model="dialog.show" @onPostHandler="unshift" />
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
import PostDialog from '@/components/tweets/PostDialog.vue';

const requests = () => {
  const ipAddress = '192.168.10.8';
  const tweets = reactive({
    value: [] as Tweet[],
  });
  const getTweets = async () => {
    tweets.value = (await axios.get<Tweet[]>(`http://${ipAddress}:3000/tweets`))?.data;
  };
  // const postTweet = async (text: string) => {
  //   const params = { user_id: 1, content: text };
  //   const reqponse = await axios.post<Tweet>(`http://${ipAddress}:3000/tweets`, params);
  //   tweets.value.unshift(reqponse.data);
  // };
  onMounted(() => {
    getTweets();
  });
  return {
    tweets,
    // getTweets,
    // postTweet,
  };
};

export default defineComponent({
  components: {
    'tweet-card': TweetCard,
    'post-dialog': PostDialog,
  },
  setup: () => {
    const req = requests();
    // const content = ref<string>('');

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
        // content.value = '';
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

    const unshift = (tweet: Tweet) => {
      req.tweets.value.unshift(tweet);
    };

    return {
      tweets: req.tweets,
      dialog,
      unshift,
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
