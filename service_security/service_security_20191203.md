2019. 12. 03.



# IT서비스와 보안

## 1. 보안 약점과 취약점

- 보안 약점(Weakness)
  - 문제가 발생 할 수 있는 <u>원인</u> (내재된 문제) => CWE (발견된 원인을 볼 수 있는 곳)

- 보안 취약점(unabilty)
  - 문제점의 <u>결과</u> (공격자가 사용한 SQL 코드 등) => CVE (제품들의 문제점)



## 2. HTTP의 인증 방식



### - HTTP 기본인증 방식 (Basic Authentication)

```
        Client ----------------------------------------------------------> Server
               Get / HTTP/ 1.1
               <----------------------------------------------------------
                                                HTTP/ 1.1 401 Unauthorized
                  WWW-Authenticate: Basic realm="Acess to the staging site"
 Ask user =>   ---------------------------------------------------------->
               GET / HTTP/1.1
               Authorization: Basic YWxhZGTphkpvcGVuc2VzYWlI
               <----------------------------------------------------------  <= Check 
                                                           HTTP/1.1 200 Ok     credentials
                                                                        or
                                                    HTTP/1.1 403 Forbidden
```

