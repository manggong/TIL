### Vue

#### I. Vuex

모든 컴포넌트가 공유하는 중립데이터

~~~bash
$ vue add vuex

$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   package-lock.json
        modified:   package.json
        modified:   src/main.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/store/

no changes added to commit (use "git add" and/or "git commit -a")
~~~



- store/index.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      //data 저장소 ~= Vue객체의 Data
  },
  getters: {
	  // data에 대한 조회 ~= Vue객체의 computerd    
  },
  mutations: {
      // data를 변경시키는 로직 ~= Vue객체의 methods (동기적)
      setdata(stateOfStore){
          
      }
  },
  actions: {
      // data를 변경시키는 로직 + 비동기적 요소 ~= Vue객체의 methods (비동기적)
  },
  modules: {
  }
})

```

- 다른 component에서 state값 호출하는 방법 : `this.$store.state.데이터명`
- mutations 안에 정의된 함수를 호출하는 방법 : `this$store.commit("함수명")`
  - 첫번째 인자 : `state`
  - 두번째 인자 : `component data(payload)`

- actions 
  - 첫번째 인자 : `context` = `vuex Object`
  - 두번째 인자 : `event`



#### II. Vuex Logic

1. 자식 컴포넌트에서 `event`가 발생한다.
2.  동기일 때
   1. `$store.commit()`로 자식 컴포넌트에서 Mutation함수를 호출한다.
   2. vuex getters에서 값을 저장한다.
   3. 다른 자식컴포넌트에서 `import { mapGetters } from "vuex";`로 getters값을 불러와서 computed에서 사용한다.
3.  비동기일 때
   1. `$store.dispach()`로 자식컴포넌트에서 Actions함수를 호출한다.
   2.  Actions 함수안에서 commit을 이용하여 Mutation함수로 Data에 값을 넣어준다.
   3. 다른 자식컴포넌트에서 `import { mapGetters } from "vuex";`로 getters값을 불러와서 computed에서 사용한다.

