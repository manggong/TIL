## Firebase

1. `Firebase` 홈페이지 접속 후 `Project` 생성
2. 개발 콘솔에서 `Database` 메뉴 이용해서 DB 생성
3. 개발 콘솔에서`Cloud Storage` 활성화
   - 보안정책 기본값으로 설정
4. `Firebase-tools` 설치

```shell
npm -g install firebase-tools
firebase --version
firebase login
firebase use --add // 별칭지정, firebase project 안에서 실행 할 것!!! 생성한 프로젝트 리스트 보임
```

5. `Firebase emulator`

```shell
firebase serve --only hosting
✔  hosting: Local server: http://localhost:5000
```

6. `Firebase SDK` 등록

```html
<script src="/__/firebase/7.15.1/firebase-app.js"></script>
<script src="/__/firebase/7.15.1/firebase-auth.js"></script>
<script src="/__/firebase/7.15.1/firebase-storage.js"></script>
<script src="/__/firebase/7.15.1/firebase-messaging.js"></script>
<script src="/__/firebase/7.15.1/firebase-firestore.js"></script>
<script src="/__/firebase/7.15.1/firebase-performance.js"></script>
<script src="/__/firebase/init.js"></script> //firebase에 프로젝트의 위치를 알려줌
// 위의 CDN이 있는 곳에서 firbese use --add 명령어 사용 가능
```

7. `Firebase init` 확인

```javascript
if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
var firebaseConfig = {
  "projectId": "mychat-27f04",
  "databaseURL": "https://mychat-27f04.firebaseio.com",
  "storageBucket": "mychat-27f04.appspot.com",
  "locationId": "us-central",
  "apiKey": "YOUR_API_KEY",
  "authDomain": "mychat-27f04.firebaseapp.com",
  "messagingSenderId": "823556055840"
};
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}
```

8. 함수정의
9. Data Modeling



#### Firebase REST Doc

- [REST API Doc](https://firebase.google.com/docs/reference/rest/database)