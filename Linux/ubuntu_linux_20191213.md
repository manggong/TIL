2019.12.13.



# Ubuntu Linux

- 블록체인 싱크로나이즈는 이전 데이터에 대한 변경이 불가함

  => 정보 수정 시 원본이 바뀌는 것이 아닌 다음 블록에 변경내용이 추가 됨( =원본 데이터 불변)

  => 변경된 데이터를 계속 이어붙임 => 위변조 방지

- 블록체인은 기술적 이슈가 아닌 경제적 철학적 이슈이다.

## 1. Ubuntu 설치

### Ubuntu Desktop설치

- edit > image 선택 > Ubuntu 체험하기 > Ubuntu 설치 > swap 생성 > os공간 생성 후 설치

### Ubuntu Desktop 실습 준비

- 계정 root로 변경 > 설정 > 사용자 계정 > 자동로그인 켬 > 오토로그인 계정 설정 > 업데이트 끄기 > 소프트웨어 백업 > 실습 파일 다운로드

  - root로 계정 변경하기

    ```
    sudo su -root
    ubuntu (사용자 패스워드)
    passwd
    root (사용할 패스워드)
    ```

  - 오토로그인 설정

    ```
    gedit /etc/lightdm/lightdm.conf

    > autologin-user=root
    ```

  - root profile 변경

    ```
    gedit /root/.profile

    > # mesg n || true
    ```

  - 소프트웨어 백업

    ```
    cd /etc/apt
    mv sources.list sources.list.bak
    ```

  - 실습 파일 다운로드

    ```
    wget http://download.hanbit.co.kr/ubuntu/16.04/sources.list
    ```



### Ubuntu Server 설치

- Install Ubuntu Server > 언어 설정 > 지역 설정 > 키보드 설정 > 서버이름 설정 > username 설정 > P/W 설정 > 지역확인 > 파티션 설정 > swap영역 설정 > OS파티션 설정 > OS설치 > 프록시 설정 > 업데이트 설정 > 시스템 설정 > 주변기기 설정



### Ubuntu Server 실습 준비

- 사용자 로그인 > sources.list 백업 > 실습파일 다운로드

  - sources.list 백업 

    ~~~
    cd /etc/apt
    ls
    sudo mv sources.list sources.list.bak
    ~~~

  - 실습파일 다운로드

    ~~~
    sudo wget http://download.hanbit.co.kr/ubuntu/16.04/sources.list
    ~~~



### Ubuntu GNOME, WinClient 설치도 위와 동일

