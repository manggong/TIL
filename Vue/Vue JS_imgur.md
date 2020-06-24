## imgur

이미지 업로드 저장 서비스

```shell
$ vue create imgur-uploader
$ cd imgur-uploader
$ npm i axios lodash qs
$ vue add router
$ vue add vuex
```



#### 1. 로그인 버튼을 누르면, Imgur OAUTH 페이지로 이동

- src/store/modules/auth.js

```javascript
const actions = {
    login() {
    const ROOT_URL = `https://api.imgur.com`;
    const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
    const queryString = {
      client_id: CLIENT_ID,
      response_type: "token",
    };
    const fullUrl = `${ROOT_URL}/oauth2/authorize?${qs.stringify(queryString)}`;
    window.location.href = fullUrl;
  },
}
```

#### 2. 사용자가 imgur에서 권한을 준다.

- Imgur 로그인 후 `allow` 클릭

#### 3. IMGUR가 AccessToken과 함께 우리 App으로 redirect

- URL에 AccessToken을 받아옴, queryString으로 파싱

#### 4. /oauth2/callback으로 오면, `AuthHandler` 컴포넌트 렌더

- src/components/AuthHandler.vue

```javascript
<template>
  <div>Loggin in...</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthHandler",
  methods: mapActions(["finalizeLogin"]),
  created() {
    this.finalizeLogin(window.location.hash);
  }
};

console.log(window.location.hash);
</script>

<style>
</style>
```

#### 5. `AuthHandler` 컴포넌트에서 action(finalizeLogin) 실행

#### 6. `finalizeLogin`에서 토큰 추출 + state 갱신

####  7. `/`으로 리다이렉트

- src/store/modules/auth.js

```javascript
const actions = {
    finalizeLogin({ commit }, hashString) {
    const queryObject = qs.parse(hashString.replace("#", ""));
    commit("setToken", queryObject.access_token);
    router.push("/");
  },
}
```



### DOCS

- [Sementic UI](https://semantic-ui.com/)
- [imgur api docs](https://apidocs.imgur.com/?version=latest)