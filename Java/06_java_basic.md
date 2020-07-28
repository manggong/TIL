# Java

## 정보은닉 (information hiding)

### 접근 제어자 (access modifier)

- 변수, 메서드, 생성자에 대한 접근 권한 지정
- `public`, `private`, `protected`, 아무것도 안 쓰는 경우 (기본 접근 제어자)
- private을 사용하면 클래스 외부에서는 접근 할 수 없음

### 정보 은닉 (information hiding)

- 외부에서 클래스 내부의 정보에 접근하지 못하도록 함 (private 키워드를 활용)
- private 변수를 외부에서 접근하게 하려면 public 메서드 제공함 (클래스 내부 데이터를 잘못 사용하는 오류를 방지할 수 있음)
- `private`을 사용하여 `get`메서드만 제공하면 read only로 정보 수정을 불가능하게 함
- `private`을 사용하여 `set`메서드에 조건을 줄 수 있음

- MyDate.java

```java
package hiding;

public class MyDate {

	private int day;
	private int month;
	private int year;

	private boolean isValid = true;

	public void setDay(int day) {
		this.day = day;
	}

	public int getDay() {
		return day;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		if (month < 1 || month > 12) {
			isValid = false;
		} else {
			this.month = month;
		}
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public void showDate() {
		if (isValid) {
			System.out.println(year + "년" + month + "월" + day + "일");
		} else {
			System.out.println("잘못된 날짜 입니다.");
		}
	}

}

```

- MyDateTest.java

```java
package hiding;

public class MyDateTest {

	public static void main(String[] args) {

		MyDate date = new MyDate();

		date.setYear(2020);
		date.setMonth(77);
		date.setDay(100);

		date.showDate();

	}
}
```
