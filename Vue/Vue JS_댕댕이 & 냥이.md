### 댕댕이 & 냥이



#### - App.vue

~~~vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>댕댕이 & 고냥이</h1>
    <Buttons @dogButtonClicked="getDog" @catButtonClicked="getCat" />
    <DogImage :dogImages="dogImages" />
    <CatImage :catImages="catImages" />
  </div>
</template>

<script>
import axios from "axios";
import DogImage from "./components/DogImage.vue";
import CatImage from "./components/CatImage.vue";
import Buttons from "./components/Buttons.vue";

export default {
  name: "App",
  components: {
    DogImage,
    CatImage,
    Buttons,
  },
  data() {
    return {
      catImages: [],
      dogImages: [],
    };
  },
  methods: {
    getDog() {
      axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then((response) => {
          this.dogImages.push({ id: Date.now(), url: response.data.message });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCat() {
      axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then((response) => {
          this.catImages.push({
            id: response.data[0].id,
            url: response.data[0].url,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

~~~

- v-on = `@` (javascript의 addEventListener)
- v-bind = `:` data를 매핑해준다. => 자식 컴포넌트에게 사용해서 값을 넘겨주면 자식 컴포넌트는 `props`로 값을 받을 수 있다.
- @dogButtonClicked `emit`을 이용하여 자식 컴포넌트에서 부모 컴포넌트로 넘겨준 event



#### - Buttons.vue

~~~vue
<template>
  <div>
    <button @click="dogClicked">가져오라 댕댕이!!!</button>
    <button @click="catClicked">가져오라 냥냥이!!!</button>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  methods: {
    dogClicked() {
      //this.$emit("전파될 이벤트의 이름")
      this.$emit("dogButtonClicked");
    },
    catClicked() {
      //this.$emit("전파될 이벤트의 이름")
      this.$emit("catButtonClicked");
    },
  },
};
</script>

<style></style>

~~~

- `$emit` 를 사용하여 자식컴포넌트에서 발생하는 이벤트를 부모컴포넌트로 보낸준다. 부모컴포넌트에서 이벤트를 받을 때는 자식 컴포넌트에서 정의한 이름으로 `@(v-on)`이용하여 받는다.



#### - DogImage.vue

~~~vue
<template>
  <div>
    <!-- v-for는 키값이 필요하다, v-bind로 키값 연결해줌 -->
    <span v-for="dogImage in dogImages" :key="dogImage.id">
      <img width="300" height="300" :src="dogImage.url" />
    </span>
  </div>
</template>

<script>
export default {
  name: "DogImage",
  props: {
    dogImages: Array,
  },
};
</script>

<style scoped></style>

~~~

- `v-for`를 이용할 때는 `:(v-bind)`를 이용하여 키값을 매핑 해준다.
- `props`를 이용하여 부모 컴포넌트에서 보내준 data를 받을 때는 data의 타입을 지정해 준다.