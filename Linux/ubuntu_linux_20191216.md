2019.12.16.



# Linux



### Linux 시스템 종료 명령어

~~~
poweroff

shutdown -P now

halt -p

init 0
~~~



### 가상 콘솔 접속하기

- 키보드에서 ctrl + alt +f2, f3 등을 같이 누르면 가상 콘솔에 접속된다.



### 명령어를 이용하여 시스템 재부팅하기

- 가상 콘솔에 접속하여 root계정으로 명령을 내리고 ubuntu 계정에서 확인한다.

~~~
shutdown -h 5
> 현재시간 기준 5분 후 종료

shutdown -k 5
> 현지시간 기준 5분 후  root를 제외한 모든 사용자 로그아웃 됨

~~~



 ### 부팅방법 설정

- Linux는 부팅 시 GUI로 부팅할 것 인지, CLI로 부팅 할 것 인지 선택할 수 있다.
- 런레벨 확인 (부팅모드 확인)

~~~
ls -l /lib/systemd/system/default.target
> 부팅타겟 확인 가능
~~~

- 텍스트 모드로 부팅

~~~
ln -sf/lib/systemd/system/multi-user.target /lib/systemd/system/default.target
ls -l /lib/systemd/system/default.target
~~~



### vi 편집기

- vim 설치

~~~
apt-get install vim
~~~

- vi 에디터 종료하기
  - :w - 현재 변경사항 저장
  - :wq - 현재 변경사항 저장 후 나가기
  - :q! - 저장하지 않고 나가기
  - :q - 나가기 (변경사항이 있다면 오류가 발생하고 나가지지 않음)
  - :!bash - (편집 상태를 그래도 두고 bash 쉘 실행, 재진입하려면 exit 입력 후 엔터)
  - ZZ - 현재 변경사항 저장 후 나가기
- 입렵 모드 전화 후 글자 입력하기
  - i - 명령 모드에서 입력 모드로 전환(현재커서의 위치에서)
  - I - 명령 모드에서 입력 모드로 전환(현재 커서 줄의 맨앞 위치에)
  - a - 명령 모드에서 입력 모드로 전환(현재 커서의 바로 뒤 위치에)
  - A - 명령 모드에서 입력 모드로 전환(현재 커서 줄의 맨뒤 위치에)



### Linux 기본 명령어

- ls : 파일목록 보기
- cd : 디렉토리 이동
- pwd : 현재위치 확인
- rm : 삭제
- cp : 복사
- touch : 빈 텍스트 파일 생성
- mv : 이동
- mkdir : 디렉토리 생성
- rmdir  : 디렉토리 삭제
- cat : 파일내용 출력





- 메모

  - 엔진과 API의 차이

    API는 코드 보따리 , 엔진은 내가 짠 코드를 구동시켜 주는 장비

    엔진 안에도 기본 API가 있음

    인터페이스 = 어플리케이션의 구조를 셋팅 해줌(ex. 빈 도시락 통)

    Apache - Tomcat - 구현체 - Web Container

    

    Web Container vs Web Server

    웹컨테이너는 CGI 이해자

    

    웹서버는 HTTP 이해자

    

    플랫폼 독립성

    

    느리면서 정확하고 

    국내보다는 국제적이면서

    모두가 공유 할 수 있는 것