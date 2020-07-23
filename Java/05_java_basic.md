# Java

### 참조 자료형 (reference data type)

- 클래스형으로 변수를 선언함

  => String name;

- 기본 자료형은 사용하는 메모리가 정해져 있지만, 참조 자료형은 클래스에 따라 다름

- Student.java

```java
package reference;

public class Student {

	int studentID;
	String studentName;

	Subject korea;
	Subject math;

	public Student(int id, String name) {
		studentID = id;
		studentName = name;

		korea = new Subject();
		math = new Subject();

	}

	public void setKoreaSubject(String name, int score) {
		korea.subjectName = name;
		korea.score = score;
	}

	public void setMathSubject(String name, int score) {
		math.subjectName = name;
		math.score = score;
	}

	public void showStudentScore() {
		int total = korea.score + math.score;
		System.out.println(studentName + total);
	}
}
```

- Subject.java

```java
package reference;

public class Subject {

	String subjectName;
	int score;
	int subjectId;
}
```

- StudentTest.java

```java
package reference;

public class StudentTest {

	public static void main(String[] args) {

		Student studentLee = new Student(100, "Lee");
		studentLee.setKoreaSubject("국어", 100);
		studentLee.setMathSubject("수학", 100);

		Student studentKim = new Student(101, "Kim");
		studentKim.setKoreaSubject("korean", 99);
		studentKim.setMathSubject("math", 98);

		studentLee.showStudentScore();
		studentKim.showStudentScore();
	}
}

```
