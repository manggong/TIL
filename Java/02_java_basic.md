# Java

## 함수와 메서드

### 함수(function)

- 하나의 기능을 수행하는 일련의 코드
- 함수는 호출하여 사용하고 기능이 수행된 후 값을 반환 할 수 있음
- 함수로 구현된 기능은 여러 곳에서 호출되어 사용될 수 있음
- 재사용성 용이, 가독성 UP, 디버깅 용이

- 함수 연습
  - class에 함수정의, main에서 함수호출

```java
package classpart;

public class FunctionTest {
	public static int addNum(int num1, int num2) {
		int result;
		result = num1 + num2;
		return result;
	}

	public static void sayHello(String greeting) {
		System.out.println(greeting);
	}

	public static int calcSum() {

		int sum = 0;
		int i;

		for (i = 0; i<=100; i++) {
			sum += i;
		}

		return sum;
	}

	public static void main(String[] args) {
		int n1 = 10;
		int n2 = 20;

		int total = addNum(n1,n2);

		sayHello("안녕하세요");
		int num = calcSum();

		System.out.println(total);
		System.out.println(num);
	}
}
```

### 메서드 (method)

- 객체의 기능을 구현하기 위해 클래스 내부에 구현되는 함수
- 메서드를 구현함으로써 객체의 기능이 구현 됨
- 메서드의 이름은 사용하는 쪽(클라이언트 코드)에 맞게 명명하는 것이 좋음

  => ex) getStudentName()
