# Spring



#### DI (Dependency Injection)

- 객체 생성관리에 대한 주도권이 바뀜 (개발자 => 프레임워크)
- 클래스 간의 의존관계를 Bean XML을 이용하여 연결 함
- 장점
- 코드가 단순해짐
  - 컴포넌트 간 결합도가 제거 됨



#### JDBC (Java Database Connectivity)

개발자는 인터페이스를 보고 코딩을 함 => (특정 DB에 종속되지 않음) 플랫폼 중립적



1. Vender에서 제공하는 Driver Class를 생성
   - Class.forName( `"oracle.jdbc.driver.OracleDriver"` ); => DB 벤더에서 제공하는 드라이브 클래스를 찾아서 생성을 해야 함 (DB 교체 시 문자열만 바꾸면 됨  /Path 지정만 해주면 됨)
2. Connection 생성
   - Connection con = DriverManager.getConnection(`url`, `user`, `pass`);
   - `url`="jdbc:oracle:thin:@IP:port:SID"
3. Statement 생성
   - Statement는 SQL문을 DB에 전송하는 역활을 담당하는 객체
   - Statement stmt = con.`createStatement()`; => factory method
4. SQL 실행 및 결과처리
   - stmt.`executeQuery`( query ): Resultset => Select
   - stmt.`executeUpdate`( query ): int => Insert, Update, Delete

~~~java
ResultSet rs = stmt.excuteQuery("SELECT * FROM users");

while(rs.next()){ // EOF와 만나면 false 리턴
    String userid = rs.getString("userid") // 컬럼명에 들어 있는 값을 가져옴
    String addr = rs.getString(2) // 컬럼 인덱스 참조
}
~~~

5. Resource 반납
   - Statement, Connection 의 `close()`메서드를 호출



#### 실습

~~~~java
package jdbc.user.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import jdbc.user.vo.UserVO;

public class UserDAO {
	String url = "jdbc:oracle:thin:@192.168.2.30:1521:xe";
	String user = "hr";
	String pass = "hr";

	public UserDAO() {
		//1. Driver class loading
		try {
			Class.forName("oracle.jdbc.OracleDriver");
			System.out.println("Driver loading OK!!");
		} catch (ClassNotFoundException e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}		
	}
	public Connection getConnection() throws SQLException {
		return DriverManager.getConnection(url, user, pass);
	}
	
	public void close(Statement stmt, Connection con) throws SQLException {
		if (stmt != null) stmt.close();
		if (con != null) con.close();
	}
	
	//update 하는 메서드
	public int updateUser(UserVO user) {
		String sql = "update users set name = ?, gender = ?, city = ? where userid = ?";
		Connection con = null;
		PreparedStatement stmt = null;
		int updateCnt = 0;
		try {
			con = getConnection();
			//auto commit 해제
			con.setAutoCommit(false);
			stmt = con.prepareStatement(sql);
			stmt.setString(1, user.getName());
			stmt.setString(2, Character.toString(user.getGender()));
			stmt.setString(3, user.getCity());
			stmt.setString(4, user.getUserid());
			updateCnt = stmt.executeUpdate();
			//커밋
			con.commit();
		}catch(SQLException e) {
			//롤백
			try {
				con.rollback();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			e.printStackTrace();
		}finally {
			try {
				close(stmt,con);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return updateCnt;
	}
	
	//userid를 입력 받아서 1개의 row를 반환하는 메서드
	public UserVO getUser(String userid) {
		String sql = "select * from users where userid = ?";
		Connection con = null;
		PreparedStatement stmt = null;
		UserVO user = null;
		try {
			con = getConnection();
			stmt = con.prepareStatement(sql);
			stmt.setString(1, userid);
			ResultSet rs =  stmt.executeQuery();
			if(rs.next()) {
				user = new UserVO(rs.getString("userid"), 
						          rs.getString("name"), 
						          rs.getString("gender").charAt(0), 
						          rs.getString("city"));
				
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				close(stmt,con);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return user;
	}
	//전체 row를 반환하는 메서드
	public List<UserVO> getUsers() {
		String sql = "select * from users order by userid";
		Connection con = null;
		PreparedStatement stmt = null;
		UserVO user = null;
		List<UserVO> userList = new ArrayList<>();
		try {
			con = getConnection();
			stmt = con.prepareStatement(sql);
			ResultSet rs =  stmt.executeQuery();
			while(rs.next()) {
				user = new UserVO(rs.getString("userid"), 
						          rs.getString("name"), 
						          rs.getString("gender").charAt(0), 
						          rs.getString("city"));
				userList.add(user);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				close(stmt,con);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return userList;
	}//getUserList
	
	
}

~~~~



#### MyBatis

- SQL 그대로 이용하면서 JDBC의 단점을 보완
- VO 객체 중심으로 개발 가능
- 영속성
- SQL 작성과 관리 또는 검토를 DBA가 아닌 다른 사람에게 맡길 수 있음



#### Connection Pooling

- 많은 요청을 처리하기 위해서 미리 커넥션을 만들어 둠



#### apache DBCP

- spring_beans.xml

~~~xml
<bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
		<property name="driverClassName" value="oracle.jdbc.OracleDriver" />
		<property name="url" value="jdbc:oracle:thin:@192.168.2.30:1521:xe" />
		<property name="username" value="scott" />
		<property name="password" value="tiger" />
	</bean>
~~~



#### MyBatis

- spring_beans.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">

	<!-- StringPrinter 클래스를 Bean으로 등록 -->
	<bean id= "strPrinter" class= "myspring.di.xml.StringPrinter" />
	<!-- ConsolePrinter 클래스를 Bean으로 등록 -->
	<bean id="conPrinter" class="myspring.di.xml.ConsolePrinter"/>
	
	<!-- Hello 클래스를 Bean으로 등록 -->
	<bean id="hello" class="myspring.di.xml.Hello" scope="singleton">
		<!-- setName("spring") -->
		<property name="name" value="spring"/>
		<!-- setPrinter(new StringPrinter()) -->
		<property name="printer" ref="strPrinter" />
	</bean>
	
	<!-- Hello 클래스를 Bean으로 등록 : Constructor Injection-->
	<bean id="helloC" class="myspring.di.xml.Hello">
		<constructor-arg index="0" value="생성자" />
		<constructor-arg index="1" ref="conPrinter" />
		<!-- setNames() -->
		<property name="names" >
			<list>
				<value>자바</value>
				<value>자바스크립트</value>
				<value>씨뿔뿔</value>
				<value>자바</value>
			</list>
		</property>
	</bean>
	<!-- Component Scanning 설정-->
	<context:component-scan base-package="myspring.di.annot"></context:component-scan>
	<!-- Properties file 설정 -->
	<context:property-placeholder location="classpath:config/db.properties"/>
	
	<!-- Database -->
	<bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
		<property name="driverClassName" value="${db.driver}" />
		<property name="url" value="${db.url}" />
		<property name="username" value="${db.username}" />
		<property name="password" value="${db.password}" />
	</bean>
	
	<!-- SQLSessionFactoryBean 설정 -->
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"/>
		<property name="configLocation" value="classpath:config/SqlMapConfig.xml"/>
		<property name="mapperLocations">
			<list>
				<value>classpath:config/UserMapper.xml</value>
				<value>classpath:config/StudentMapper.xml</value>
			</list>
		</property>
	</bean>
	
	<!-- SqlSessionTemplate 설정 -->
	<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
		<constructor-arg ref="sqlSessionFactory"/>
	</bean>
</beans>

~~~

