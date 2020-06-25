## Imgur App

Imgur를 이용해서 App을 만들자!



#### 1. Cookie setting

- vue-cookies 설치

```shell
$ npm i vue-cookies
```

- Vue 객체에 import (main.js)

```javascript
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
```

- vuex state에 cookie 등록

```javascript
import cookies from "vue-cookies";

const state = {
  token: cookies.get("imgur_token"),
};
```

- router 이름 매핑

```javascript
const routes = [
  {
    path: "/oauth2/callback",
    name: "AuthHandler",
    component: AuthHandler,
  },
]

<router-link :to="{name: 'ImageList'}" class="active item">image uploader</router-link> //HTML에서 이렇게 매핑
```

- axios로 요청 header 설정

```javascript
fetchImages({ rootState, commit }) {
    const fullUrl = `https://api.imgur.com/3/account/me/images`;
    const config = {
      headers: { Authorization: `Bearer ${rootState.auth.token}` },
    };
    axios
      .get(fullUrl, config)
      .then((response) => {
        console.log(response.data.data);
        commit("setImages", response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
```

`rootState` == vuex의 최상단 == index.js

- src/modules/images.js

```javascript
import axios from "axios";

const state = {
  images: [],
};

const getters = {
  allImages: (state) => state.images,
};

const mutations = {
  setImages: (state, images) => {
    return (state.images = images);
  },
};

const actions = {
  // rootState == store/index.js
  fetchImages({ rootState, commit }) {
    const fullUrl = `https://api.imgur.com/3/account/me/images`;
    const config = {
      headers: { Authorization: `Bearer ${rootState.auth.token}` },
    };
    axios
      .get(fullUrl, config)
      .then((response) => {
        console.log(response.data.data);
        commit("setImages", response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  uploadImages() {},
};

export default {
  state,
  getters,
  mutations,
  actions,
};

```

- src/views/ImageList.vue

```javascript
<template>
  <div>
    <div v-for="image in allImages" :key="image.id">
      <img :src="image.link" :alt="image.name" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ImageList",
  computed: mapGetters(["allImages"]),
  methods: mapActions(["fetchImages"]),
  created() {
    this.fetchImages();
  }
};
</script>

<style>
</style>
```

