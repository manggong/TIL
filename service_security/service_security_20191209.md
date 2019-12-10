2019.12.09.

# IT서비스와 보안

## 1. 정보보안

### - 보안의 3요소

- 기밀성(Confidentiality)
  - 인가된 사용자만 정보 자산에 접근할 수 있는 것
- 무결성(Integrity)
  - 적절한 권한을 가진 사용자에 의해 인가된 방법으로만 정보를 변경할 수 있도록 하는 것
- 가용성(Availability)
  - 정보 자산에 대해 적절한 시간에 접근 가능한 것을 의미

### - 시스템 보안

- 계정과 패스워드 관리
  - 적절한 권한을 가진 사용자를 식별하기 귀한 가장 기본적인 인증 수간
  - 시스템에서는 계정과 패스워드 관리가 보안의 시작
- 세션관리
  - 사용자와 시스템 도는 두 시스템 간의 활성화된 접속에 대한관리
  - 일정 시간이 지날 경우 적절히 세션을 종료하고, 비인가자에 의한 세션 가로채기를 통제
- 접근제어
  - 시스템이 네트워크 안에서 다른 시스템으로부터 적절히 보호될 수 있도록 네트워크 관점에서 접근을 통제
- 권한관리
  - 시스템의 각 사용자가 적절한 권한으로 적절한 정보 자산에 접근할 수 있도록 통제
- 로그관리
  - 시스템 내부 혹은 네트워크를 통한 외부에서 시스템에 영향을 미칠 경우 해당 사항을 기록
- 취약점 관리
  - 시스템은 계정과 패스워드 관리, 세션 관리, 접근 제어, 권한 관리 등을 충분히 잘 갖추고도 보안적인 문제가 발생할 수 있음
  - 이는 시스템 자체의 결함에 의한 것으로 이결함을 체계적으로 관리하는 것이 취약점 관리이다.

## 2. 계정과 패스워드 관리

### - 인증수단

- 계정은 시스템에 접근하는 가장 기본적인 방법
- 기본 구성 요소는 아이디와 패스워드
- 식별(Identification)이란 아이디라는 문자열을 통해 그 자신이 누군인지 확인하는 과정
- 아이디만으로는 정확한 식별이 어려워 인증을 위한 다른 무언가(패스워드)를 요청

### - 패스워드 보안의 4가지 인증 방법

- 알고있는 것 (Something You Know) : 군대의 암구어처럼 머릿속에 기억하고 있는 정보를 이용해 인증을 수행하는 방법(ex. 패스워드), 지식기반

- 가지고 있는 것 (Something You Have) : 신분증이나 OTP(One Time Password)장치 등을 통해 인증을 수행하는 방법 (ex. 출입카드)

- 스스로의 모습 (Something You Are) : 홍채와 같은 생체 정보를 통해 인증을 수행하는 방법 (ex. 지문인식, 서체)

- 위치하는 곳 (Something You Are) : 현재 접속을 시도하는 위치의 적절성을 확인하는 방법 (ex. 콜백, FDS)

### - Windows 계정 관리

```
C:\Users\myanj>net user ? ⇐ 명령어 사용법
이 명령에 대한 구문:

NET USER
[username [password | *] [options]] [/DOMAIN]
         username {password | *} /ADD [options] [/DOMAIN]
         username [/DELETE] [/DOMAIN]
         username [/TIMES:{times | ALL}]
         username [/ACTIVE: {YES | NO}]


C:\Users\myanj>net user /help ⇐ 명령어 상세 도움말
이 명령에 대한 구문:

NET USER
[username [password | *] [options]] [/DOMAIN]
         username {password | *} /ADD [options] [/DOMAIN]
         username [/DELETE] [/DOMAIN]
         username [/TIMES:{times | ALL}]
         username [/ACTIVE: {YES | NO}]

NET USER는 컴퓨터에 사용자 계정을 만들고 기존 사용자 계정을 수정합니다.
스위치 없이 이 명령을 사용하면 컴퓨터의 모든 사용자 계정이 나열됩니다.
사용자 계정 정보는 사용자 계정 데이터베이스에 저장되어 있습니다.

username     추가하거나 삭제, 수정 또는 조회할 사용자 계정의 이름입니다.
             사용자 계정의 이름은 최대 20자까지
             지정할 수 있습니다.
password     사용자 계정에 대한 암호를 지정하거나 변경합니다.
             암호 길이는 NET ACCOUNTS 명령의 /MINPWLEN 옵션에 설정된
             최소 길이를 충족해야 합니다. 암호에는 최대 14자까지
             지정할 수 있습니다.
*            암호에 대한 프롬프트를 생성합니다. 암호 프롬프트에
             암호를 입력하면 화면에 암호가 표시되지 않습니다.
/DOMAIN      현재 도메인의 도메인 컨트롤러에서 작업을
             수행합니다.
/ADD         사용자 계정을 사용자 계정 데이터베이스에 추가합니다.
/DELETE      사용자 계정 데이터베이스에서 사용자 계정을 제거합니다.

옵션          다음과 같습니다.

   옵션                        설명
      --------------------------------------------------------------------
   /ACTIVE:{YES | NO}         계정을 활성화하거나 비활성화합니다.
                              계정이 활성화되어 있지 않으면 사용자가 서버에
                              액세스할 수 없습니다. 기본값은 YES입니다.
   /COMMENT:"text"            사용자 계정에 대한 설명을
                              입력합니다. 텍스트는 따옴표로
                              묶습니다.
   /COUNTRYCODE:nnn           운영 체제 국가 코드를 사용하여
                              사용자의 도움말 및 오류 메시지에 대해 지정된
                              언어 파일을 구현합니다. 0 값은
                              기본 국가 코드를 나타냅니다.
   /EXPIRES:{date | NEVER}    날짜가 설정되어 있는 경우 계정이 만료됩니다.
                              NEVER는 계정에 시간 제한을 설정하지
                              않습니다. 만료 날짜는 mm/dd/yy(yy)와 같은
                              형식으로 지정합니다. 월에는 숫자, 영어 단어
                              또는 세 자리 약자를 사용할 수 있습니다.
                              연도에는 두 자리 또는 네 자리 숫자를 사용할 수 있습니다.
                              날짜는 공백 없이 슬래시(/)를 사용하여
                              구분합니다.
   /FULLNAME:"name"           사용자 이름이 아닌 사용자의 전체
                              이름입니다. 이름은 따옴표로
                              묶습니다.
   /HOMEDIR:경로 이름         사용자 홈 디렉터리의 경로를 설정합니다.
                              이 옵션은 해당 경로가 있어야 사용할 수 있습니다.
   /PASSWORDCHG:{YES | NO}    사용자가 자신의 암호를 변경할 수 있는지 여부를
                              지정합니다. 기본값은 YES입니다.
   /PASSWORDREQ:{YES | NO}    사용자 계정에 암호를 지정해야 하는지 여부를
                              지정합니다. 기본값은 YES입니다.
   /LOGONPASSWORDCHG:{YES|NO} 다음에 로그온할 때 사용자가 암호를
                              변경해야 하는지 여부를 지정합니다. 기본값은 NO입니다.
   /PROFILEPATH[:path]        사용자의 로그온 프로필 경로를 설정합니다.
   /SCRIPTPATH:pathname       사용자의 로그온 스크립트
                              위치입니다.
   /TIMES:{times | ALL}       로그온 시간입니다. TIMES는
                              요일[-day][,day[-day]],시간[-time][,time[-time]]과 같은 형식으로 나타내며
                              1시간 단위로 증가하도록 제한됩니다.
                              요일에는 전체 단어나 약어를 사용할 수 있습니다.
                              시간에는 12시간 또는 24시간 표기법을
                              사용할 수 있습니다.12시간 표기법에서는 am, pm, a.m. 또는
                              p.m.을 사용합니다. ALL은 사용자가 언제든지 로그온할 수 있음을 나타내며
                              값을 입력하지 않으면 사용자가 로그온할 수 없음을 나타냅니다.
                              요일과 시간은 쉼표로 구분하여 입력하고
                              요일과 시간 항목이 여러 개인 경우에는
                              세미콜론으로 구분합니다.
   /USERCOMMENT:"텍스트"      관리자가 계정에 대한 사용자 설명을 추가하거나
                              변경할 수 있습니다.
   /WORKSTATIONS:{computername[,...] | *}
                              사용자가 네트워크에 로그온할 수 있는 컴퓨터를
                              최대 8개까지 나열합니다. /WORKSTATIONS에 목록을
                              지정하지 않거나 별표(*)를 지정하면 사용자는 어느
                              컴퓨터에서나 네트워크에 로그온할 수 있습니다.

NET HELP 명령 | MORE는 한 번에 한 화면씩 도움말을 표시합니다.



C:\Users\myanj>net user ⇐ 윈도우 사용자 계정 확인

\\M1304INS에 대한 사용자 계정

-------------------------------------------------------------------------------
Administrator            DefaultAccount           Guest
myanj                    student                  WDAGUtilityAccount
명령을 잘 실행했습니다.


C:\Users\myanj>net localgroup ⇐  윈도우 사용자 그룹 확인

\\M1304INS에 대한 별칭

-------------------------------------------------------------------------------
*__vmware__
*Access Control Assistance Operators
*Administrators
*Backup Operators
*Cryptographic Operators
*Device Owners
*Distributed COM Users
*Event Log Readers
*Guests
*Hyper-V Administrators
*IIS_IUSRS
*Network Configuration Operators
*Performance Log Users
*Performance Monitor Users
*Power Users
*Remote Desktop Users
*Remote Management Users
*Replicator
*System Managed Accounts Group
*Users
명령을 잘 실행했습니다.


C:\Users\myanj>net localgroup administrators
별칭     administrators
설명     컴퓨터 도메인에 모든 액세스 권한을 가진 관리자입니다.

구성원

-------------------------------------------------------------------------------
Administrator
myanj
명령을 잘 실행했습니다.

```

- 관리자 계정 관리
  - Administrator 계정은 Administrators 그룹에서 삭제할 수 없지만, 계정 이름을 변경하거나 "계정 사용 안 함"으로 설정 가능
  - Administrator 계정은 기본적으로 제공되는 계정으로 계정 명이 잘 알려져 있어 패스워드 추측 공격이 가능 => Administrator 계정의 이름을 변경하거나, "계정 사용 안 함"으로 설정하는 것이 안전
  - 계정 이름 변경 방법
    - 로컬 사용자 및 그룹 관리 콘솔 실행(lusrgr.msc) > Administrator 계정 선택 > F2 (또는 마우스 오른쪽 클릭 후 이름 바꾸기 메뉴 선택) > 새 이름 입력
  - "계정 사용 안 함" 설정 방법
    - 로컬 사용자 및 그룹 관리 콘솔 실행(lusrmgr.msc) > Administrator 계정 선택 > 마우스 오른쪽 클릭 후 속성 메뉴 선택 > "계정 사용 안 함" 선택 후 확인 버튼 클릭
    - 명령 프롬포트 > NET USER administrator / ACTIVE:NO

* Guest 계정 관리
  - Guest 계정은 암호를 필요로 하지 않아 보안상 취약
  - Guest 계정이 활성화되어 있을 경우에 Guest 계정으로 로그인하여 시스템 정보를 탈취하거나 관리자 그룹에 등록하여 권한상승과 같은 악성행위를 시도할 수 있으므로, Guest 계정을 "계정 사용 안함"으로 설정하는 것이 안전 (기본적으로 "계정 사용 안 함"으로 설정되어 있음)
  - "계정 사용 안 함" 설정 방법
    - 로컬 사용자 및 그룹 관리 콘솔 실행(lusrmgr.msc) > Guest 계정 선택 > 마우스 오른쪽 클릭 후 속성 메뉴 선택 > "계정 사용 안 함" 선택후 확인 버튼 클릭
    - 명령 프로포트 > NET USER guest /ACTIVE:NO

- 불필요한 계정 관리

  - 사용하지 않는 계정, 불필요한 계정, 의심스러운 계정이 있는지 점검하고, 사용하지 않는 계정은 삭제

  - 임시로 생성한 계정이나, 퇴사자의 계정은 악용 될 수 있으므로 찾아서 삭제하고, 만약 증적을 남겨야 하는 경우에는 "계정 사용 안 함"으로 설정

  - "계정 사용 안 함"설정 방법

    - 로컬 사용자 및 그룹 관리 콘솔 시행(lusrmgr.msc) > 불필요한 계정 선택 > 마우스 오른쪽 클릭 후 속성 메뉴 선택 > "계정 사용 안 함"선택 후 확인 버튼 클릭

    - 명령 프롬포트 > NET USER username / ACTIVE:NO

* 계정 잠금 임계값 설정

  - 사용자 계정을 잠금으로 설정하는 실패한 로그인 시도 횟수를 설정하며, 5회 설정을 권고한다.
  - 잠금 설정된 계정은 관리자가 다시 설정하거나 계정의 잠금 기간이 만료될 때까지는 사용할 수 없다.
  - 계정 잠금 임계값 설정 방법
    - 시작 > 실행 > 로컬 보안 정책[sectol.msc] > 계정 정책 > 계정 잠금 정책 > 계정 잠금 임계값 : 5번의 잘못된 로그온 시도

- 계정 잠금 기간 설정
  - 자동으로 잠금 해제될 때까지 잠김 계정이 잠심 상태로 유지되는 시간(분)을 결정하며, 60분 설정을 권고한다.
  - 계정 잠금 기간을 0으로 설정하면 계정은 관리자가 명시적으로 잠금 해제할 때까지 잠김 상태를 유지한다.
  - 계정 잠금 기간 설정 방법
    - 시작 > 실행 > 로컬 보안 정책(sectol.msc) > 계정 정책 > 계정 잠금 정책 > 계정 잠금 기간 정책 : 60분

### - Windows 패스워드 관리

- 암호 정책의 세부 정책들을 확인하고 설정
- 암호 정책 확인 및 설정 방법 : 시작 > 실행 > 로컬 보안 정책(secpol.msc) > 계정 정책 > 암호 정책
  - 암호는 복잡성을 만족해야 함 : 사용
  - 최근 암호 기억 : 최근 12개의 암호 기억
  - 최대 암호 사용 기간 : 60일
  - 최소 암호 길이 : 8문자
  - 최소 암호 사용 기간 : 1일 (특정 비밀번호의 사용 빈도를 낮춤)
  - 해독 가능한 암호화를 사용하여 암호 저장 : 사용 안 함 (시스템 간의 연동을 할 때 사용 함)

### - Linux 계정 관리

- /etc/passwd

  - 계정 목록을 저장하고 있는 파일

    ```
                     root : x : 0 : 0 : root : /root : /bin/bash
    ```

    - 사용자 계정
    - 패스워드가 암호화되어 shadow 파일에 저장되어 있음
    - 사용자 번호(UID : User ID)
    - 그룹번호(GID : Group ID)
    - 사용자 이름
    - 사용자의 홈 디렉터리 (일반 사용자는 /home 디렉터리 하위에 위치)
    - 사용자의 쉘(shell)

* 파일 접근 권한

  ```
              drwxr-xr-x 2 root root 4096 Nov 10 17:26 alternatives
  ```

  - 파일에 대한 접근 권한
  - 해당 파일에 링크되어 있는 파일의 개수
  - 해당 파일을 생성한 계정
  - 해당 파일을 생성한 계정이 속한 그룹

* 파일에 대한 접근 권한

  - 파일속성 : d
  - 파일 소유자 권한 : rwx
  - 그룹 권한 : r-x
  - 일반(other) 권한 : r-x

* 파일 및 디렉터리 기본 권한

  - 기본 생성 최고 권한에서 umask 값을 뺀 값

  - 기본 생성 최고 권한 : 파일은 666, 디렉터리는 777
  
    
  
* 시스템에 로그인할 필요가 없는 사용자는 쉘을 제거

  * /etc/passwd 파일에서 쉘이 정의된 부분을 수정하거나, usermod 명령어를 이용하여 쉘 정보를 변경

  * 웹 사용자 중 시스템에 로그인할 필요가 있는 사용자는 쉘이 부여된 별의 계정을 사용

    

- Shadow 패스워드 이용

  - /etc/passwd 파일은 일반 사용자가 읽을 수 있으므로 위험

  - 암호화한 패스워드와 유효기간 등을 /etc/shadow 파일에 저장하고, root 계정만 읽을 수 있도록 제한

  - 패스워드에 대한 보안 정책 적용이 가능

    ```
                root : $1$9L~L0oTwd : 12751 : 0 : 99999 : 7 : : :
    ```

    - 사용자계정
    - 암호화된 사용자의 패스워드
    - 1970년 1월 1일부터 마지막으로 패스워드를 변경한 날까지의 일자 수
    - 패스워드를 변경하기 전에 패스워드를 사용한 기간
    - 패스워드를 변경하지 않고 사용할 수 있는 기한
    - 패스워드 변경기한 만료 완전 사용며칠 전부터 경고메시지를 보여줄지를 설정
    - 계정에 대한 사용 제한을 설정하고 며칠 후에 완전히 사용을 정지할지 설정
    - 1970년 1월 1일부터 계정이 완전 사용 정지된 날까지의 일자 수
    - 관리자가 임의로 사용할 수 있는 부분

### - PASSWD 파일

- shadow 파일 사용 안함

```
root@kali:/etc# pwunconv
root@kali:/etc# cat /etc/passwd | grep root
root:$6$xhM1CJI.$opnnLHSL4M5H/mAP8eBK1WJcH/xwHoUe636gK92o0fqlBXc3uIje2FMoDvN2dIqGMaJbociP/Xn8oHgl7MiGf/:0:0:root:/root:/bin/bash
```

- user00 계정 생성 및 패스워드 확인

```
root@kali:/etc# adduser user00 ⇐ user00 계정을 생성
Adding user `user00' ...
Adding new group `user00' (1000) ...
Adding new user `user00' (1000) with group `user00' ...
Creating home directory `/home/user00' ...
Copying files from `/etc/skel' ...
새 UNIX 암호 입력: user00
새 UNIX 암호 재입력: user00
passwd: 암호를 성공적으로 업데이트했습니다
user00의 사용자의 정보를 바꿉니다
새로운 값을 넣거나, 기본값을 원하시면 엔터를 치세요
	이름 []:
	방 번호 []:
	직장 번화번호 []:
	집 전화번호 []:
	기타 []:
Is the information correct? [Y/n]
root@kali:/etc# cat /etc/passwd | grep user00
user00:$6$xgJeJrpI$l8ODhW4S4dzrkLTlx0YYoW1VaShde65q4hUDaIPv1mQnSm5n.VQHtJGREvlxwnHSIHhtXzoUccsjcPj8SWUlo.:1000:1000:,,,:/home/user00:/bin/bash


root@kali:/etc# su - user00 ⇐ user00으로 전환
user00@kali:~$ pwd ⇐ 현재 디렉터리 확인
/home/user00
user00@kali:~$ cat /etc/passwd | grep user00
user00:$6$xgJeJrpI$l8ODhW4S4dzrkLTlx0YYoW1VaShde65q4hUDaIPv1mQnSm5n.VQHtJGREvlxwnHSIHhtXzoUccsjcPj8SWUlo.:1000:1000:,,,:/home/user00:/bin/bash
user00@kali:~$ cat /etc/passwd | grep root
root:$6$xhM1CJI.$opnnLHSL4M5H/mAP8eBK1WJcH/xwHoUe636gK92o0fqlBXc3uIje2FMoDvN2dIqGMaJbociP/Xn8oHgl7MiGf/:0:0:root:/root:/bin/bash

⇒ /etc/passwd 파일을 모든 사용자가 읽을 수 있으므로 계정 정보가 노출될 가능성이 높다.
```

- shadow 파일 확인

```
user00@kali:~$ exit
logout
root@kali:/etc# pwconv
root@kali:/etc# cat /etc/passwd | grep root
root:x:0:0:root:/root:/bin/bash
root@kali:/etc# su - user00
user00@kali:~$ cat /etc/passwd | grep root
root:x:0:0:root:/root:/bin/bash
user00@kali:~$ cat /etc/passwd | grep user00
user00:x:1000:1000:,,,:/home/user00:/bin/bash
user00@kali:~$ cat /etc/shadow | grep root
cat: /etc/shadow: 허가 거부
```

- 관리자 계정 관리

  - 임의 생성된 관리자 계정의 존재 여부를 확인

  - 관리자 계정은 root가 아닌 다른 이름으로 바꿔서 사용하는 것을 권장

  - 사용자 UID 변경

    - /etc/passwd 파일에서 생성한 계정의 UID를 "0"으로 변경

      ```
      vi /etc/passwd
      ```
