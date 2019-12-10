2019.12.10.



# IT 서비스와 보안

## 1. 운영체제 보안



### - Linux 보안

- 임의 생성된 관리자 계정의 존재 여부를 확인
- 관리자 계정은 root가 아닌 다른 이름으로 바꿔서 사용하는 것을 권장

- 크래킹되기 쉬운 패스워드

  - 길이가 너무 짧거나 널(NULL)인 패스워드
  - 사전에 나오는 단어나 이들의 조합 패스워드 (패스워드 사전)
  - 키보드 자판을 일렬순으로 나열한 패스워드
  - 사용자 계정 정보에서 유추 가능한 패스워드

- 크래킹되기 어려운 패스워드

  - 영문자 + 숫자 +특수문자 조합

- 시스템에 로그인할 필요가 없는 사용자는 쉘의 제거

  - /etc/passwd 파일에서 쉘이 정의된 부분을 수정하거나, usermod 명령어를 이용하여 쉘 정보를 변경

  - 웹 사용자 중 시스템에 로그인할 필요가 있는 사용자는 쉘이 부여된 별도의 계정을 사용

  - /bin/false 

    => allows a login, but no shell, no ssh tunnels and no home directory.시스템 로그인은 불가능, FTP 서버 프로그램 같은 프로그램도 불가능쉘이나 SSH와 같은 터널링(원격접속) 그리고 홈디렉토리 사용 불가

  - /sbin/nologin

    => disallows logins completely and returns a polite account unavailable message.로그인 불가, 메시지들은 반환SSH는 사용 불가능하며 FTP 사용 가능



- John the Ripper를 이용한 취약한 패스워드 크래킹

~~~
root@kali:/test# cd /opt ⇐ 작업 디렉터리 이동
root@kali:/opt# wget http://www.openwall.com/john/j/john-1.8.0.tar.gz ⇐ 소스 코드 다운로드
--2019-12-09 06:56:59--  http://www.openwall.com/john/j/john-1.8.0.tar.gz
Resolving www.openwall.com (www.openwall.com)... 195.42.179.202
Connecting to www.openwall.com (www.openwall.com)|195.42.179.202|:80... connected.
HTTP request sent, awaiting response... 302 Moved Temporarily
Location: https://www.openwall.com/john/j/john-1.8.0.tar.gz [following]
--2019-12-09 06:57:00--  https://www.openwall.com/john/j/john-1.8.0.tar.gz
Connecting to www.openwall.com (www.openwall.com)|195.42.179.202|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 5450412 (5.2M) [application/octet-stream]
Saving to: ‘john-1.8.0.tar.gz’

john-1.8.0.tar.gz     4%[                    ] 233.18K  92.7KB/s    

root@kali:/opt# tar xvf john-1.8.0.tar.gz ⇐ 압축 해제
root@kali:/opt# cd john-1.8.0/src ⇐ 소스 디렉터리로 이동
root@kali:/opt/john-1.8.0/src# make clean linux-x86-sse2 ⇐ 소스 코드 빌드

root@kali:/opt/john-1.8.0/src# cd ../run ⇐ 실행 경로로 이동
root@kali:/opt/john-1.8.0/run# ./unshadow /etc/passwd /etc/shadow > myfile ⇐ unshadow
root@kali:/opt/john-1.8.0/run# ./john myfile ⇐ 크래킹
Loaded 4 password hashes with 4 different salts (crypt, generic crypt(3) [?/32])
Press 'q' or Ctrl-C to abort, almost any other key for status
rooter           (rooter)
user22           (user22)
user00           (user00)
toor             (root)
4g 0:00:00:02 100% 1/3 1.408g/s 133.0p/s 135.2c/s 135.2C/s root..Root8
Use the "--show" option to display all of the cracked passwords reliably
Session completed
root@kali:/opt/john-1.8.0/run# ./john --show myfile ⇐ 크래킹 결과 확인
root:toor:0:0:root:/root:/bin/bash
user00:user00:1000:1000:,,,:/home/user00:/usr/sbin/nologin
rooter:rooter:0:1001:,,,:/home/rooter:/bin/bash
user22:user22:1002:1003:,,,:/home/user22:/bin/bash

4 password hashes cracked, 0 left

복잡한 패스워드 생성 후 크래킹 가능 여부 확인
~~~



### - Windows Server 보안

- 파일시스템 체크
  - NTFS 파일 시스템은 FAT 파일 시스템에는 없는 데이터 접근에 대한 감사 기록, 파일 및 디렉터리에 대한 소유권 밀 사용권한을 부여하는 등의 보안 기능을 제고한다.
  - FAT 파일 시스템은 사용할 경우, 비인가자에게 중요한 데이터 및 시스템 파일이 쉽게 노출될 수 있으므로 NTFS 파일 시스템을 사용하도록 한다.
  - 파일 시스템 변경 방법
    - 시작 > 실행 > CMD > Convert 드라이브명:
- 불필요한 공유 제거
  - C$, D$, ADMIN$와 같은 기본 공유는 관리자가 네트워크 상에서 시스템을 관리하기 위해 기본적으로 마련된 것으로 관리 목적으로 사용하지 않는다면 제거해야 한다.
  - 불필요한 공유 디렉토리는 없애고, 필요하다면 공유 디렉토리의 접근 권한에서 Everyone 사용자 그룹을 삭제한다.
  - 공유 확인 방법
    - 시작 > 실행 > 공유폴더 > 공유폴더[로컬] > 공유 확인
- SAM 파일 접근 통제
  - SAM(Security Account Manager) 파일은 계정에 관한 정보를 보관하고 있는 파일로 적절한 접근 통제 및 권한 설정이 필요하다.
  - %systemroot%\system32\config\SAM > 속성 > 보안 탭에서 SAM 파일 접근 권한에 Administrators SYSTEM 그룹만 모든 권한으로 등록한다
- 마지막 사용자 이름 표시 안 함 설정
  - 컴퓨터에 마지막으로 로그인한 사용자의 이름을 표시 할 경우 임의의 사용자가 계정을 확인 후 로그인을 시도 할 수 있으므로, 마지막으로 로그인한 사용자의 이름이 표시되지 않도록 설정해 두어야 한다. (=> 관리자 계정을 변경한 의미가 없어짐)
  - 마지막 사용자 이름 표시 안 함 설정 방법
    - 시작 > 실행 > 로컬 보안 정책(secpol.msc) > 로컬 정책 > 보안 옵션 > 대화명 로그온: 마지막 사용자 이름 표시 안 함 : 사용
- 이동식 디스크 보안 관리
  - 이동식 디스크 자동 실행 옵션이 허용되어 있을 경우 : 'Autorun.inf" 파일에 기록돈 내용이 자동을 실행될 때 악성 코드에 감염이 될 수 있으므로 이동식 디스크를 자동으로 실행되지 않도록 설정한다.
  - 이동식 디스크 자동실행 제한 방법
    - 그룹 정책 개체 편집기(gedit.msd)를 이용 : 로컬 컴퓨터 정책 > 컴퓨터 구성 > 관리 탬플릿 > 시스템 > 자동 실행 사용 안함
    - 레지스트리 수정 : http://suport.microsoft.kb/967715/ko 참고
- 불필요한 서비스 제거
  - 불필요한 정보 제공 및 악의적은 목적으로 사용할 수 있는 서비스는 제거한다.
  - 서버의 목적상 사용하지 않는 서비스를 제거하여 불필요한 부하가 발생하지 않도록 한다.
  - 서비스 확인 및 관리 방법
    - 시작 > 실행 > 서비스(service.msc)
    - 시작 > 관리도구 > 서비스



## 2. 네트워크 보안

### - OSI 7계층

- 물리계층(1계층) : 실제 장치를 연결하기 위한 전기적, 물리적 세부 사항을 정의한 계층
- 데이터 링크 계층(2계층) : 두 지점 간의 신뢰성 있는 전송을 보장 하기위한 계층
- 네트워크 계층(3계층) : 여러 개의 노드를 거칠 때마다 경로를 찾아 주는 역할을 한다. 다양한 길이의 데이터를 네트워크를 통해 전달하고, 전송 계층이 요구하는 서비스 품질 Qos을 위해 기능적, 절차적 수단을 제공한다.
- 전송 계층(4계층) : 양 끝단의 사용자들이 신뢰성 있는 데이터를 주고받게 함으로써 상위 계층이 데이터 전달의 유효성이나 효율성을 신경 쓰지 않게한다
- 세션 계층(5계층) : 양 끝단의 응용 프로세스가 통신을 관리하는 방법을 제공한다.
- 표현 계층(6계층) : 코드 간의 번역을 담당하는 계층으로, 사용자 시스템에서 데이터의 구조를 통일하여 응용프로그램 계층에서 데이터 형식의 차이로 인해 발생하는 부담을 덜어준다.
- 응용 프로그램 계층(7계층) : 응용 프로그램 계층은 응용 프로세스와 직접 관계하여 일반적인 응용 서비스를 수행한다.



### - WINDOWS IP 구성

~~~
이더넷 어댑터 이더넷 2:

   연결별 DNS 접미사. . . . :
   링크-로컬 IPv6 주소 . . . . : fe80::a1aa:bd03:960f:3af6%15
   IPv4 주소 . . . . . . . . . : 70.12.113.160
   서브넷 마스크 . . . . . . . : 255.255.255.0
   기본 게이트웨이 . . . . . . : 70.12.113.1

이더넷 어댑터 VMware Network Adapter VMnet1:

   연결별 DNS 접미사. . . . :
   링크-로컬 IPv6 주소 . . . . : fe80::15bf:6eb5:7d87:dbf2%25
   IPv4 주소 . . . . . . . . . : 192.168.160.1
   서브넷 마스크 . . . . . . . : 255.255.255.0
   기본 게이트웨이 . . . . . . :

이더넷 어댑터 VMware Network Adapter VMnet8:

   연결별 DNS 접미사. . . . :
   링크-로컬 IPv6 주소 . . . . : fe80::7dee:95b6:2b03:b375%26
   IPv4 주소 . . . . . . . . . : 192.168.87.1
   서브넷 마스크 . . . . . . . : 255.255.255.0
   기본 게이트웨이 . . . . . . :

~~~

- 이더넷 어댑터
  - LAN카드 = NIC(Network Interface Controller)
- Ethernet
  - LAN영역에서 사용하는 통신 기술 중 하나
  - LAN영역에서 사용하는 기술 중 사실상 표준 (De Facto Standard) 방식
- IPv4 주소
  - 총 32비트 (0.0.0.0 ~ 255.255.255.255)로 구성된 주소 체계
  - 2^32개의 주소로 표현 가능
- IPv6 주소
  - 총 128비트
  - 2^128개의 주소 표현이 가능
- IP(Internet Protocol)
  - 인터넷 공간에서 자기 PC가 사용하는 고유한 식별자를 의미
- IP주소의 클래스(등급) - IP 주소의 첫번째 자리 범위
  - A클래스 : 1 ~ 126 = 0000 0001 ~ 0111 1110
  - B클래스 : 128 ~ 191 = 1000 0000 ~ 1011 1111
  - C클래스 : 192 ~ 223 = 1100 0000 ~ 1101 1111
- 구글에서 제공하는 DNS 서버의 IP주소 = 8.8.8.8 A클래스
- KT에서 제공하는 DNS 서버의 IP 주소 = 168.126.63.1 → B 클래스
- 127.0.0.1 → 어떤 클래스에도 속하지 않음 ⇒ 자기가 사용하는 LAN 카드 자신을 의미 = 루프백 주소(loopback address)
- 서브넷 마스크(Subnet mask)
  - IP주소를 서브넷 마스크 를 이용해 표기하는 방식
  - IP 주소를 네트워크 ID와 호스트 ID로 구분

~~~
   IP	       Subnet Mask		Network ID		Host ID

10.10.10.10		255.0.0.0	    	10			10.10.10

                                
ex.) 전화                           국번          전화번호
~~~

- 게이트웨이(Gateway) = 라우터(Router) => 각기 다른 네트워크 ID를 사용하는 LAN 영역을 연결

  => S/W 강조                     => H/W 강조

- LAN영역
  - 동일한 네트워크 ID를 공유하는 장치들의 집합
  - 동일한 게이트웨이 주소를 사용하는 장치들의 집합
- 라우팅(routing)
  - 다른 네트워크 ID를 사용하는 LAN 영역을 연결
- 스위칭(switching)
  - LAN영역에서 MAC 주소에 기반한 내부 통신

- MAC 
  - 물리적주소
  - LAN카드에 부여된 주소로 LAN영역에서 내부 통신을 수행하기 위해 필요한 주소

​              => 28-39-26-1C-B0-B1 => 48Bit = OUI + 일련번호 (동일한 맥주소가 나오지 않기 위함)

- DHCP(Dynamic Host Configuration Protocol) => 유동 IP 환경
  - 사용할 IP 주소 범위를 서버에 미리 등록하면, PC 사용자에게 IP 주소, 서브넷 마스크,  게이트웨이 주소, DNS 주소 등을 자동으로 할당해주는 서비스

- DNS (Domian Name System) server
  - 도메인 이름과 IP 주소의 대응 관계를 데이터베이스 형태로 저장해 사용하는 서버

- IP vs Mac

  - IP : 32비트 = 네트워크 ID + 호스트 ID => IP 주소 기반에 라우팅

  - MAC : 48비트 = OUI + 일련번호 => MAC 주소 기반에 스위칭

    

- ARP SPooping 방안

  - ARP Spooping 방안

    - MAC을 Staric하여 사용한다.

      

- ettercap

  - LAN 환경에서 중간자 공격을 수행할 수 있도록 구현한 프로그램
  - GUI 제공
  - 다양한 플러그인 제공



- nmap을 이용한 포트 스캐닝
  - 포트 스캐닝 = 타겟 서버에 포트의 상태를 확인
  - nmap 네트워크에 연결되어 있는 호스트의 정보를 파악하는 도구
    - 네트워크에 연결되어 있는 호스트의 IP, OS
    - 열린포트
    - 서비스하는 소프트웨어 버전
    - 침투 TEST 시 사용
  - TCP open Scan
    - 정상적은 TCP 3-Way Handshaking 과정을 통해서 사용 중인 포트를 확인
    - PORT가 열려 있으면 : SYN > SYN+ACK > ACK
    - PORT가 닫혀 있으면 : SYN > RST/ACK
    - 연결에 대한 로그가 남기  때문에 공격자 입장에서 안전하지 않은 방법
  - Stealth Scan
    - 3-Way Handshaking 과정을 거치지 않기 때문에 로그가 남지 않는다.
    - TCP Half open scan / TCP SYN open scan
    - FIN scan(FIN을 보내서 반대편에 있는 대상의 신호를 확인함 ex. 벨튀), XMAS scan(동시에 보낼 수 없는 것들을 동시에 보냄 FIN,PSH,URG), NULL scan
    - PORT가 열려 있으면 무응답
    - PORT가 닫혀 있으면 RST/ACK

