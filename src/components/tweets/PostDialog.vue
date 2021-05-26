<template>
  <v-dialog
    v-model="show"
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
          @click="close()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          elevation="0"
          @click="post(content)"
        >
          Tweet
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, watchEffect,
} from '@vue/composition-api';
import { tweetRequest } from '@/scripts/requests/Tweet';

type Props = {
  value: boolean,
}

export default defineComponent({
  props: {
    value: Boolean,
  },
  setup: (props: Props, context) => {
    const content = ref<string>('');

    // 一旦別の変数に格納してからdialogのv-modelに渡さないと以下のような警告が出る（エラーではないが鬱陶しい）
    // [Vue warn]:
    // Avoid mutating a prop directly since the value will be
    //   overwritten whenever the parent component re-renders.
    // Instead, use a data or computed property based on the prop's value.
    // Prop being mutated: "value"
    const show = ref<boolean>(props.value);

    const close = () => {
      show.value = false;
    };

    // watch と watchEffect の違いについて
    // https://qiita.com/doz13189/items/d09cfc6e1ff38621c2cc

    // 親コンポーネントでの変化を子コンポーネントに反映させる為にこの宣言が必要になる
    watch(() => props.value, (newVal, oldVal) => {
      // console.log(`${oldVal} -> ${newVal}`);
      show.value = newVal;
    });

    // watchEffect(() => {
    //   console.log(props.value);
    // });

    // 子コンポーネントでの変化を親コンポーネントに反映させる為にこの宣言が必要になる
    watch(() => show.value, (newVal, oldVal) => {
      // console.log(`${oldVal} -> ${newVal}`);
      context.emit('input', newVal);
    });

    // この場合のアクションは2パターン考えられる
    // 1. 子コンポーネント側でデータを登録し、登録後のデータを親コンポーネントに渡す
    // 2. 親コンポーネントでデータ登録用の処理を宣言し、子コンポーネントで受け取る
    // 1の方が子コンポーネントの独立性が高くなる。
    const post = async (text: string) => {
      const params = { user_id: 1, content: text };
      const response = await tweetRequest().create(params);
      context.emit('onPostHandler', response.data);
      close();
    };
    return {
      show,
      close,
      content,
      post,
    };
  },
});
</script>
