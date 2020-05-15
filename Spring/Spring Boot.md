# Spring Boot



### 기본설정

- 환경변수 등록 (application.properties)

~~~shell
server.port=8085

vega2k.name=\uAE38\uB3D9 
vega2k.age=${random.int(1,100)} 
vega2k.fullName=${vega2k.name} \uD64D
~~~

- 환경변수 불러오기

~~~java
package manggong.myspringboot.runner;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements ApplicationRunner {
	@Value("${vega2k.name}")// 환경변수를 가지고오는 어노테이션
	private String name;
	
	@Value("${vega2k.age}")
	private int age;
	
	@Value("${vega2k.fullName}")
	private String fullName;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("환경변수 Name : " + name);
		System.out.println("환경변수 age : " + age);
		System.out.println("환경변수 fullName : " + fullName);
	}
}

~~~

@Value



#### properties 우선순위

1. 유저 홈 디렉토리에 있는 spring-boot-dev-tools.properties 
2. 테스트에 있는 @TestPropertySource 
3. @SpringBootTest 애노테이션의 properties 애트리뷰트 
4. 커맨드 라인 아규먼트 
5. SPRING_APPLICATION_JSON (환경 변수 또는 시스템 프로퍼티)에 들어있는 프로퍼티 
6. ServletConfig 파라미터 
7. ServletContext 파라미터 
8. java:comp/env JNDI 애트리뷰트 
9. System.getProperties() 자바 시스템 프로퍼티 
10. OS 환경 변수
11. RandomValuePropertySource 
12. JAR 밖에 있는 특정 프로파일용 application properties 
13. JAR 안에 있는 특정 프로파일용 application properties 
14. JAR 밖에 있는 application properties 
15. JAR 안에 있는 application properties 
16. @PropertySource 
17. 기본 프로퍼티 (SpringApplication.setDefaultProperties)



#### Logger

debug/ info/ warn/ error

- Logger 설정(application.properties)

~~~shell
#logging
logging.path=logs
~~~

- Logger 사용

~~~java
package manggong.myspringboot.runner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements ApplicationRunner {
	private Logger logger = LoggerFactory.getLogger(MyRunner.class);
	
	@Value("${vega2k.name}")// 환경변수를 가지고오는 어노테이션
	private String name;
	
	@Value("${vega2k.age}")
	private int age;
	
	@Value("${vega2k.fullName}")
	private String fullName;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		logger.debug("환경변수 Name : " + name);
		logger.debug("환경변수 age : " + age);
		logger.info("환경변수 fullName : " + fullName);
	}
}

~~~



#### 자동 서버 리로드

- pom.xml

~~~xml
<dependency> 
<groupId>org.springframework.boot</groupId> 
<artifactId>spring-boot-devtools</artifactId> 
</dependency>
~~~

