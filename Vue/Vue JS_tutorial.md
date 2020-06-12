# Vue JS



## I. 핵심



### 1. SPA

Single Page Application



\- HTTP는 요청, 응답의 구조를 가지고 있기 때문에 페이지 전환없이(새로운 요청 응답 없이) UI 변화

\- 이전에는 어떻게?

1. adobe flash 이용

\- 왜?

1. 사용자 편의성

2. 서버 리소스 절약



### 2. MVVM

Model-ViewModel-View : Model이 바뀌면 View가 자동으로 바뀜

\- MVC(Model-Control-View) : 요청에대한 응답만 처리해 주는 전통적인 방법



### 3. Declarative Programming

선언적 프로그래밍

<-> 명령형 프로그래밍 (Imperative Programming)



\- 명령형(절차적) : 변화를 단계적으로 명령

 \- Vanilla Javascript DOM 조작 (버튼 생성 => 이벤트 리스너 => 이벤트 핸들링)

\- 선언형 : 변화를 선언(그림 그리기)

 \- 프레임워크를 통한 조작



## II. Vue JS의 요소



### 1. Directive(지시자)



\- `v-for`: 배열과 같은 데이터를 순회

\- `v-if` : 조건부 랜더링 (조건이 참일 때)

\- `v-else` : 조건부 랜더링

\- `v-on`: `이벤트` = `함수` : 이벤트 바인딩 (`addEventListener()`)

\- `v-model` : 양방향 데이터 바인딩 (data - tag 안 data)

\- `v-bind`:`class`={`classname`:`boolean`} : 태그랑 바인드

\- `v-text`: 데이터 렌더(innerText) == {{ }}

\- `v-html`: 데이터 렌더(innnerHTML)



### 2. Vue Instance(객체)



\- `new Vue({})`

\- `el: '#app'`: 마운트 포인트

\- `data: {}`: 관리할 데이터

\- `methods: {}`: 함수

\- `computed: {}`: 함수화된 데이터