# Java

### 객체란?

- 의사나 행위가 미치는 대상 (사전적 의미)
- 구체적, 추상적 데이터의 단위
  - ex) 사람, 자동차, 주문, 생산, 관리

### 객체 지향 프로그래밍 이란?

- 객체 지향 프로그래밍(Object Oriented Programming: OOP)

  - 객체를 기반으로 하는 프로그래밍
  - 객체를 정의하고, 객체의 기능을 구현하며, 객체간의 협력(cooperation)을 구현

- 절차 지향 프로그래밍(Procedural Programming)

  - 시간이나 사건의 흐름에 따른 구현
  - C 언어

- 학교가는 과정을 구현한 절차 지향 프로그래밍

  - 절차 지향 프로그래밍

    => 일어난다 -> 씻는다 -> 밥을 먹는다 -> 버스를 탄다 -> 요금을 지불한다 -> 학교에 도착

  - 객체 지향 프로그래밍

    => 학생, 밥, 버스, 학교 / 먹는다, 탄다, 간다

### 클래스란?

- 객체를 코드로 구현한 것
- 객체 지향 프로그래밍의 가장 기본 요소
- 객체의 청사진 (blueprint)

### 멤버변수, 메소드

- 멤버변수

  - 객체가 가지는 속성을 변수로 표현
  - 클래스의 멤버변수
  - member varible, property, attribute

- 메서드

  - 객체의 기능을 구현
  - method, member function

### java로 학생 class 만들어보기

- Student.java

```java
package classpart;

public class Student {

	public int studentID;
	public String studentName;
	public String address;

	public void showStudentInfo() {
		System.out.println(studentName + "," + address);
	}

}
```

- StudentTest.java (클래스를 확인할 때는 메인함수로 테스트하지 말고 Test class를 따로 만들어 줍니다.)

```java
package classpart;

public class StudentTest {

	public static void main(String[] args) {

		Student studentKim = new Student();
		studentKim.studentName = "jihwan";
		studentKim.address = "이천";

		studentKim.showStudentInfo();
	}
}

> jihwan, 이천
```
