# Java

## 생성자와 생성자 오버로딩

### 생성자 (constructor)

- 객체를 생성할 때 new 키워드와 함께 호출 (객체 생성 외에는 호출할 수 없음)
- 인스턴스를 초기화하는 코드가 구현 됨 (주로 멤버 변수 초기화)
- 반환 값이 없음, 상속되지 않음
- 생성자는 클래스 이름과 동일

### 기본 생성자 (default constructor)

- 하나의 클래스에는 반드시 하나 이상의 생성자가 존재해야 함
- 프로그래머가 생성자를 구현하지 않으면 컴파일러가 생성자 코드를 넣어줌
- 기본 생성자는 매개 변수가 없고, 구현부(body)가 없음
- 만약 클래스에 다른 생성자가 있는 경우 기본 생성자는 제공되지 않음

### 생성자 오버로딩

- 이름은 같지만 매개변수가 다른 생성자
- 생성자를 두 개 이상 구현하는 경우
- 사용하는 코드에서 여러 생성자 중 선택하여 사용할 수 있음
- private 변수도 생성자를 이용하여 초기화를 할 수 있음

```java
package classpart;

public class Student {

	public int studentID;
	public String studentName;
	public String address;

	public Student(String name) {
		studentName = name;
	}

	public Student(int id, String name) {
		studentID = id;
		studentName = name;
		address = "주소 없음";
	}

	public void showStudentInfo() {
		System.out.println(studentName + "," + address);
	}

}
```
