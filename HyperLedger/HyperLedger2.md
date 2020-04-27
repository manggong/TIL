# HyperLedger



## I. Basic network CA 등록



### 

~~~

~~~

CA(인증기관) : 신원확인



MSP(멤버쉽 서비스) : 권한/ 역활

pee에 chaincode를 install하려고 한다.



local msp :  사용자의 역활을 알려 줌 (사용자의 권한)

channel msp : 채널 수준에서 관리 및 참여 권한을 정의 함



crypto-config = msp의 집합



MSP의 종류 

- 조직
- 관리자 (피어들 중에서)
- 머쉰



msp 작성 시 파일들의 위치로 권한을 식별 함 => 디렉토리 잘 파악해야 함

머쉰 msp는 어떠한 머신인지 식별하는 함 (ex. peer 머신이 orderer 머신 msp를 가져 갈 수 없음)



아마도 외부의 사용자들의 정보를 네트워크 상에서 식별하기 위해서 msp를 쓰는 것 같고 그 개인키를 바탕으로 권한을 나누고 있음 => 피어 조직의 관리자랑 일반 피어랑 개인키가 다름



endorsor => 