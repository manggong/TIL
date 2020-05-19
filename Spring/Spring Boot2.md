# Spring



### JPA

- 쿼리문을 생성하지않고 메소드를 만들어서 사용 함

- 조회 메소드를 만들 때 메소드 이름은 반드 시 `findBy`로 시작 함



### 람다식

- Function Interface (함수형 인터페이스)

추상 메소드(abstract)가 한개만 있는 인터페이스, 함수형 인터페이스는 람다식으로 표현 할 수 있음

=> 인자랑 리턴 타입이 중요함!!!

~~~java
orElseThrow( ()-> new RuntimeException() );

Supplier 추상메소드

get() : T
~~~



### Spring Boot MVC

- UserRestController.java

~~~java
@RestController
public class UserRestController {
@Autowired
private UserRepository userRepository;
@PostMapping("/users")
public User create(@RequestBody User user) {
return userRepository.save(user);
}
@RequestMapping(value = "/users/{id}")
public User getUser(@PathVariable Long id) {
return userRepository.findById(id)
.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
}
@RequestMapping(value="/users", produces = { "application/json" })
public List<User> getUsers() {
return userRepository.findAll();
}
~~~

 @pathvariable = URI 중 일부를 변수로 선언가능



### React 모드 설정

- .env.name `REACT_APP_~` prefix를 붙여 줌



### Redux

- 예측 가능한 상태변수
- State Mangement

- 구성요소
  - Store - 저장소
  - Action - 요청 (ex. counter app 증가, 감소 기능)
  - Dispatcher - Action을 Store에  전달
  - Reducer - Store에 저장된 상태변수를 변경

- index.html -> index.js -> App.js