# Spring

POJO 기반



#### 특징

- 컨테이너 역활
  - 스프링 컨테이너는 자바 객체의 라이프 사이클을 관리
- DI 지원
- AOP 지원
- POJO 지원
- 트랜잭션 처리를 위한 일괄된 방법을 지원
- 영속성과 관련된 다양한 API 지원



#### IoC의 개념

- IoC(제어권의 역전)이란, 객체의 생성, 라이프 사이클의 관리까지 모든 객체에 대한 제어권이 바뀌었다는 것을 의미한다.
- 개발자는 클래스만 생성하고 객체 생성은 프레임워크에게 맡김



#### IoC 컨테이너



#### IoC 분류

- DI
  - 디펜던시 인젝션은 크게 세터 인젝션(getter setter), 메소드 인젝션으로 나눔
- 빈 - 스프링이 관리하는 객체 (컨테이너가 생성하는 객체)
- 빈 팩토리 - 빈을 생성해주는 컨테이너역활을 함, 최상위 인터페이스
- 애플리케이션 컨텍스트 -  빈 팩토리의 확장 (동일한 기능과 추가적인 기능 제공)
- 메타데이터 - 스프링 설정 XML(Spring Configuration XML) - 객체 생성을 하지 못함으로 프레임워크에게 클래스의 위치를 가르쳐 주어야 함 (컨테이너와 개발자의 소통수단)



#### Interface vs Class

- 클래스를 사용해서 코드를 작성하면 런타임 교체 시 소스를 다 수정하고 다시 결재를 받고 배포도 다시 해야함 > 코드의 유연성이 떨어짐
- 코드 작성 시 구현체 보다는 인터페이스를 이용해서 유연성을 올리자
- 코드를 수정하지말고 xml을 수정해서 기능을 유연하게 교체 할 수 있음 > 교체의 여지가 있는 기능은 코드에 적지말고 XML에 기술

#### bean

~~~~xml
<bean id="hello" class ="myspeing.di.xml.Hello">
	<property name="name" value="Spring" />
    <property name="printer" ref="printer" />
</bean>

<bean id="printer"
      class="myspring.di.xml.StringPrinter" />
~~~~

세터 인젝션

- 빈 프로퍼티의 네임은 겟 메소드에 대한 내용을 정의하는 것
- value는 메소드의 인자로 넘어가는 값
- ref는 bean 안의 다른 객체를 잠조 함
- name은 카멜케이스로 적음

- 인터페이스는 bean으로 선언하지 않음



#### 실습 - 전략(1) XML 설정 단독 사용

XML 설정파일 공유의 문제가 있음 => 개발 모드에서는 좋지 않은 방법 => 운영에서는 편함

- 세터 인젝션 테스트

~~~java
package myspring.di.xml.test;

// static import : static method를 import 해 준다.
import static org.junit.Assert.*;
import org.junit.Test;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.GenericXmlApplicationContext;

import myspring.di.xml.Hello;
import myspring.di.xml.Printer;

public class HelloBeanTest {

	@Test
	public void helloBean() {
		// 1. Spring Bean Container 객체 생성
		BeanFactory factory = new GenericXmlApplicationContext("config/spring_beans.xml");
		// 2. Container에게 Bean을 요청
		Hello hello = (Hello)factory.getBean("hello");
		Hello hello2 = factory.getBean("hello", Hello.class);
		// 3. Bean이 Singleton 객체인지 확인 해 보기
		System.out.println(hello == hello2);
		//assertSame() 메소드를 사용해서 주소 비교
		assertSame(hello, hello2);
		//assertEquals() 메소드를 사용해서 값을 비됴
		assertEquals("Hello spring", hello.sayHello());
		
		hello.print();
		
		//stringPrinter Bean을 요청
		Printer printer = factory.getBean("strPrinter", Printer.class);
		assertEquals("Hello spring", printer.toString());
	}

}
~~~



#### Junit

- 단위테스트를 지원해 주는 프레임워크
- 함수와 메소드에 대한 테스트 케이스를 작성하는 절차



#### Scope

- Singleton - Default 객체를 하나만 생성 이후에는 같은 객체를 사용
- Prototype - 매 요청 마다 객체를 새로 생성
- Request - 요청 후 다음 페이지로 넘어갈 때 까지 살아있음
- Session - 요청 후 브라우저 종료 시 까지 객체가 살아있음



- 컨스트럭터 인젝션 테스트

~~~java
package myspring.di.xml.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import myspring.di.xml.Hello;
import myspring.di.xml.Printer;

// SpringJUnit4ClassRunner는 TestCase를 실행 해주면서
// Spring컨테이너 역활을 하는 Application을 생성 해 준다.
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:config/spring_beans.xml")
public class HelloBeanSpringTest {
	@Autowired
	@Qualifier("helloC")
	Hello hello;
	
	@Autowired
	@Qualifier("conPrinter")
	Printer printer;
	
	
	@Test
	public void helloBean() {
		System.out.println(hello.sayHello());
		hello.print();
	}
}

~~~



#### Spring TestContext Framework


@RunWith(SpringJUnit4ClassRunner.class)

- SpringJUnit4ClassRunner는 TestCase를 실행 해주면서 Spring컨테이너 역활을 하는 ApplicationContext 객체를 생성 해 준다.



@ContextConfiguration(locations = "`classpath:`config/spring_beans.xml")

- bean 경로를 입력해 준다



@Autowired

- 변수와 bean과 매핑
- 의존하는 객체를 찾아서 주입해줌

@Qualifier 

- bean 상 id 값 지정

단축키 

alt + shift + L :  리턴 타입 자동지정



#### 실습 - 전략(2) Annotation과 XML설정 혼용해서 사용 (XML 최소화)

- 세터 인젝션

- XML

~~~xml
<context:component-scan base-package="myspring.di.annot"></context:component-scan>
~~~

- Bean 등록 Annotation

~~~java
package myspring.di.annot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// <bean id="helloA" class="xxx.Hello">
@Component("helloA")
public class Hello {
	// <property name="name" value="어노테이션" />
	@Value("어노테이션")
	String name;
	
	// <property name="printer" ref="stringPrinter" />
	@Autowired
	@Qualifier("stringPrinter")
	Printer printer;
	
	List<String> names;

	public Hello() {
		System.out.println("헬로우 디폴트 컨스트럭트 호출됨" +  this.getClass().getName());
	}

	public Hello(String name, Printer printer) {
		System.out.println("오버로딩된 컨스트럭터를 호출됨");
		this.name = name;
		this.printer = printer;
	}

	public List<String> getNames() {
		return this.names;
	}

	public void setNames(List<String> list) {
		this.names = list;
	}

	public String sayHello() {
		return "Hello " + name;
	}

	public void print() {
		this.printer.print(sayHello());
	}

}
~~~

@Component

@Value

@Autowired

@Scope

- 컨스트럭터 인젝션

~~~java
package myspring.di.annot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("helloA")
public class Hello {
	String name;

	Printer printer;
	
	List<String> names;

	public Hello() {
		System.out.println("헬로우 디폴트 컨스트럭트 호출됨" +  this.getClass().getName());
	}
	
	@Autowired
	public Hello(@Value("어노테이션")String name, @Qualifier("stringPrinter") Printer printer) {
		System.out.println("오버로딩된 컨스트럭터를 호출됨");
		this.name = name;
		this.printer = printer;
	}

	public List<String> getNames() {
		return this.names;
	}

	public void setNames(List<String> list) {
		this.names = list;
	}

	public String sayHello() {
		return "Hello " + name;
	}

	public void print() {
		this.printer.print(sayHello());
	}

}

~~~



#### 실습 - 전략(3)  설정을 클래스에 한다 (XML 사용 X) = Spring Boot

~~~java
package myspring.di.xml.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import myspring.di.xml.ConsolePrinter;
import myspring.di.xml.Hello;
import myspring.di.xml.Printer;
import myspring.di.xml.StringPrinter;

@Configuration
public class HelloBeanConfig {

	@Bean
	public Hello hello() {
		Hello hello = new Hello();
		hello.setName("자바 컨피그");
		hello.setPrinter(stringPrinter());
		return hello;
	}
	
	@Bean
	public Printer stringPrinter() {
		Printer printer =  new StringPrinter();
		return printer;
	}
	
	@Bean
	public Printer consolePrinter() {
		Printer printer = new ConsolePrinter();
		return printer;	
	}
}

~~~

@Configuration

@ComponentScan (= <context:component-scan />)

@Bean



#### Oracle DB 생성

- start C:\spring\sql_oracle\scott.sql (scott user 생성)
- conn scott/tiger (scott user로 변경)
- start C:\spring\sql_oracle\user.sql
- start C:\spring\sql_oracle\student.sql