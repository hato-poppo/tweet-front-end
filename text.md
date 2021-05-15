# Vue.js によるフロントエンド開発研修

## 仕様

## 前提条件

Vue.js 2.x

以下のツール類を必ず使用すること

* Vue CLI
* Vuetify
* axios
* Composition API

### Vue CLI

Vue公式の開発用ツール
プロジェクト作成に使用する

### Vuetify

マテリアルデザインのガイドラインに沿ったコンポーネントを用意してくれているUIフレームワーク
コンポーネント実装の生産性が上がるので使用する

https://vuetifyjs.com/ja/getting-started/installation/

### AXIOS

APIとの通信に使用する  
公式がこれ使えって言ってたはず

### Composition API

Vue.jsでのコンポーネントの実装方法の一つ。 
Vue.js 3.x より標準機能として追加される。  
  
Vue.js 2.x + TypeScript では「Class Style Component」が主流であったが諸々の事情により Vue.js 3.x からは「Options API」か「Composition API」が主流となる。  
標準は「Options API」であるが、TypeScriptとの親和性は「Composition API」の方が高く、記述が関数ベースという点や部分的であるがアロー関数が使えるという点からこちらを採用する。  
  
Vue.js 3.x からは標準で使えるが Vue.js 2.x には入っていないので、専用のパッケージをインストールする必要がある

[Vue Composition APIとTypeScriptの組み合わせ - 雑食日誌](https://keinumata.hatenablog.com/entry/vue-compare-options-and-composition)

## 参考

* [TypeScriptの規約](https://typescript-jp.gitbook.io/deep-dive/styleguide)
  * Airbnbでもファイル名はキャメルだった

## プロジェクト作成

### フォルダ作成＆必要パッケージ導入

```sh
$ mkdir tweet-front-end
$ npm install -D @vue/cli
$ npm install vue
```

### プロジェクト作成コマンド実行

```sh
$ vue create .
```

以下のように選択する  
今使わないけど一応入れとくかー的なノリで入れてるやつもあるので整理する

```sh
Vue CLI v4.5.12
? Generate project in current directory? Y

? Please pick a preset: 
  Default ([Vue 2] babel, eslint) 
  Default (Vue 3 Preview) ([Vue 3] babel, eslint) 
❯ Manually select features

? Check the features needed for your project: 
  ◉ Choose Vue version
  ◉ Babel
  ◉ TypeScript
  ◯ Progressive Web App (PWA) Support
  ◉ Router
  ◉ Vuex
  ◉ CSS Pre-processors
  ◉ Linter / Formatter
  ◉ Unit Testing
  ◉ E2E Testing

? Choose a version of Vue.js that you want to start the project with
❯ 2.x 
  3.x (Preview)

? Use class-style component syntax? (Y/n) n

? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n) Y

? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) Y

? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): 
❯ Sass/SCSS (with dart-sass) 
  Sass/SCSS (with node-sass) 
  Less 
  Stylus

? Pick a linter / formatter config: 
  ESLint with error prevention only 
❯ ESLint + Airbnb config 
  ESLint + Standard config 
  ESLint + Prettier 
  TSLint (deprecated) 

? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯ ◉ Lint on save
  ◯ Lint and fix on commit (requires Git)

? Pick a unit testing solution: 
❯ Mocha + Chai 
  Jest

? Pick an E2E testing solution: 
❯ Cypress (Chrome only) 
  Nightwatch (WebDriver-based) 
  WebdriverIO (WebDriver/DevTools based)

? Where do you prefer placing config for Babel, ESLint, etc.? 
❯ In dedicated config files 
  In package.json

? Save this as a preset for future projects? (y/N) y

? Save preset as: tutorial

? Pick the package manager to use when installing dependencies: 
  Use Yarn 
❯ Use NPM
```

一覧
```sh
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, TS, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Choose a version of Vue.js that you want to start the project with 2.x
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Airbnb
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Pick an E2E testing solution: Cypress
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? Yes
? Save preset as: tutorial
```

### 備考

Lib Sass (Node Sass) は非推奨になった
https://sass-lang.com/blog/libsass-is-deprecated


### 動作確認

この時点でプロジェクト作成が完了するので、一旦起動してみる

```sh
$ npm run serve
```

以下のURLでブラウザからアクセス
```sh
http://localhost:58080
http://192.168.33.10:8080
```

### パッケージ追加

Vuetify と Composition API と AXIOS が必要

#### Vuetify

```sh
$ vue add vuetify

? Choose a preset: 
❯ Default (recommended) 
  Preview (Vuetify 3 + Vite) 
  Prototype (rapid development) 
  V3 (alpha) 
  Configure (advanced)
```

#### 動作確認

開発サーバー起動

```sh
$ npm run serve
```

→ 画面が「Welcome to Vuetify」に変化していることを確認

#### AXIOS

```sh
$ npm install axios
```

# Composition API

```sh
$ npm install @vue/composition-api
```

main.ts と App.vue の書き換えが必要

書き換えたら動作確認する

また、ページを追加する為にrouter のindex.ts を編集する必要がある
https://nogson2.hatenablog.com/entry/2018/11/30/103808


ページを追加
親コンポーネント、子コンポーネントを作成
APIとの通信を確認
