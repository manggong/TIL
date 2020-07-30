# Java

## 객체 간 협력

### 객체 간 협력

- 객체 지향 프로그램은 객체를 정의 하고 객체간의 협력을 구현한 프로그램
- ex). 학생이 지하철이나 버스를 타고 학교 가는 과정에서 일어나는 협력

  - `학생`이 `버스`를 탄다.
  - `학생`이 `지하철`을 탄다.
  - 객체 협업

  ```java
  package cooperation;

  public class Student {

    String studentName;
    int grade;
    int money;

    public Student(String studentName, int money) {
      this.studentName = studentName;
      this.money = money;
    }

    public void takeBus(Bus bus) {
      bus.take(1000);
      this.money -= 1000;
    }

    public void takeSubway(Subway subway) {
      subway.take(1200);
      this.money -= 1200;
    }

    public void showInfo( ) {
      System.out.println("studentName is " + studentName + "income: " + money);
    }
  }

  ```
