<template>
  <div>
    <v-container>
      <v-row v-for='tweet in tweets.value' v-bind:key="tweet.id">
        <v-col>
          <tweet-card :tweet="tweet" />
        </v-col>
      </v-row>
      <post-dialog v-model="dialog.show" @onPostHandler="onPost" />
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
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      color="success"
      top
      right
      text
    >
      Posted successfully
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, onMounted,
} from '@vue/composition-api';
import { tweetRequest, Tweet } from '@/scripts/requests/Tweet';
import TweetCard from '@/components/tweets/TweetCard.vue';
import PostDialog from '@/components/tweets/PostDialog.vue';

const requests = () => {
  const tweets = reactive({
    value: [] as Tweet[],
  });
  onMounted(async () => {
    tweets.value = (await tweetRequest().index())?.data;
  });
  return {
    tweets,
  };
};

export default defineComponent({
  components: {
    'tweet-card': TweetCard,
    'post-dialog': PostDialog,
  },
  setup: () => {
    const req = requests();

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

    const snackbar = reactive({
      show: false,
      open: () => {
        snackbar.show = true;
      },
    });

    const onPost = (tweet: Tweet) => {
      req.tweets.value.unshift(tweet);
      snackbar.open();
    };

    return {
      tweets: req.tweets,
      dialog,
      onPost,
      snackbar,
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
