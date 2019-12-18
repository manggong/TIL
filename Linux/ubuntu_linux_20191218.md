2019.12.18.



# Linux

## 1. 네임 서버

### 네임 서버 개요

- 실제 원하는 서버에 접근하려면 URL을 해당 컴퓨터의 IP 주소로 변환시켜야 하는데, 바로 이일을 네임서버 또는 DNS서버가 담당한다.
- ex.) www.nate.com -> 120.50.131.112



### 네임 서버 확인하기

~~~
nslookup
server
www.nate.com       # 120.50.131.112
www.kernel.com     # 149.20.4.69
www.sogang.ac.kr   # 163.239.1.17
exit
~~~

