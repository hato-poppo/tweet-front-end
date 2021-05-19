import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Tweets',
    component: () => import(/* webpackChunkName: "tweets" */ '@/views/Tweets.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    // App.vue のバンドルファイル（app.js）に含まれる
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // App.vue のバンドルファイル（app.js）に含まれずページ読み込みの際に遅延ロードされるので初期のレンダリングが早くなる
    // 初期表示に必要ないページは遅延ロードにしておいた方が良い
    // また、webpackChunkName の部分はコメントアウトされているがちゃんと意味がある
    // これをつけていない場合は 0.js, 1.js のようなファイル名になる（ブラウザの開発者ツールにて確認可能、ビルド時はどうなるか未確認）
    // あまり気にする必要はない部分であるが、見た目がよろしくないのでちゃんと名前をつけておいた方が良い
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
