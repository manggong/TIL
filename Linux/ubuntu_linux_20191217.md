2019.12.17.



# Linux

## 셸

### 변수의 기본

- 셸 스크립트에서는 변수를 사용하기 전에 미리 선언하지 않으며, 처음 변수에 값이 할당되면 자동으로 변수가 생성된다.
- 변수에 넣는 모든 값은 문자열로 취급한다. 
- 변수 이름은 대소문자를 구분한다. 즉, $aa라는 변수 이름과 $AA라는 변수 이름은 다르다.
- 변수를 대입할 때 '=' 좌우에는 공백이 없어야 한다.



### 원격

- 텔넷 서버

~~~
apt-get -y install xinetd telnetd # 텔넷 설치
cd /etc/xinetd.d # 텔넷 디렉토리로 이동
touch telnet # 텔넷 파일생성
vi telnet # 텔넷 설정

> service telnet
	{	
		disable = no
		flags = REUSE
		socket_type = stream
		wait = no
		user = root
		server = /usr/sbin/in.telnetd
		log_on_failture += USERID
	} => telnet 안에 입력하기
	
adduser telnet # 텔넷 유저 추가
systemctl restart xinetd # 텔넷 서비스 가동
systemctl enable xinetd # 재부팅해도 텔넷 서비스 유지
systemctl status xinetd # 텔넷 구동 확인
ufw allow 23/tcp # 방화벽 열기
~~~



- SSH 서버

~~~
apt-get -y install openssh-server
systemctl restart ssh
systemctl enable ssh
systemctl status ssh
ufw allow 22/tcp
~~~



### 네임 서버 설치와 운영

- 



### 메모

ex.) Hello.java

응용프로그램 = Hello.java

쉘 = javac

커널 = jvm