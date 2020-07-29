# Java

## this

### this의 역활

- 자신의 메모리를 가리킴
- 생성자에서 다른 생성자를 호출 함

  - 생성자에서 다른 생성자를 호출

    ```java
    public Person() {
      this("이름 없음",1)
    }

    public Person(String name, int age){

      this.name = name;
      this.age = age;
    }
    ```

- 인스턴스 자신의 주소를 반환
