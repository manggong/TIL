## Imgur

이미지 업로드 앱을 만들자!!!



#### 1. Vue router guard

```javascript
router.beforeEach((to, from, next) => {
  //로그인 안하고 접근 불가 페이지로 가려고 한다면
  const authRequiredPages = ["UploadForm"];
  const authRequired = authRequiredPages.includes(to.name);
  const { isLoggedIn } = store.getters;

  if (authRequired && !isLoggedIn) {
    //인증해야 하는데, 로그인 안 했을 때
    next("/");
  } else {
    // 인증해야하는데, 로그인 했을 때
    next();
  }
});
```



#### 2. Axios, Promise

```javascript
uploadImages({ rootState }, event) {
    const fullUrl = `https://api.imgur.com/3/image`;
    const config = {
      headers: { Authorization: `Bearer ${rootState.auth.token}` },
    };
    const images = event.target.files;

    const promises = [];

    images.forEach((image) => {
      const formData = new FormData();
      formData.append("image", image);
        //(url, data, header)
      const promise = axios.post(fullUrl, formData, config);
      promises.push(promise);
    });
	
    // 비동기 작업이 끝날 때 까지
    Promise.all(promises)
      .then(() => {
        router.push({ name: "ImageList" });
      })
      .catch((err) => console.error(err));
  },
```

