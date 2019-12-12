2019.12.12.



# Ubuntu Linux

## 1. 가상머신

- 가상머신
  - 파티션을 나누지 않고, 동시에 여러 개의 운영체제를 가동 (=중간자적 역활)
- 멀티부팅
  - 하드디스크의 파티션을 분할한 후에, 한번에 하나의 운영체제만 가동시킬 수 있는 환경



- 컴퓨터의 구조 예시
  - H/W + OS = 플랫폼
  - H/W > OS > Vitual Machine Tool > Sub OS > APP



- 프로그래밍 기법

  - 1950년 ~ 1970년 - 절차중심적 (C), (비지니스에 민첩하고 유연하게 대처하지 못함)

  - 1980년 - 정보공학기법 (DBMS)

  - 1990년 - 객제지향기법 (=> reuse 코드의 재사용율을 높임) (Smalltalk) (Java)

  - 2000년 - CBD기법 (기능 컴포넌트)

  - 2005년 - F/W기법 (반복되는 코드를 제공해줌) 

  - 2010년 이후 - functional 프로그래밍 (function = 독립성/ method = 비독립성)

  - 프로그래밍을 하는데 있어서는 개발방법이 중요하다. ( ex. 현대카드의 자바의 코볼화)

    => 언어의 특성을 잘 이해하자

    - 코드의 재사용(reuse)란?
      - 

- 프로그래밍 순서

  - Problem Domain(요구사항 분석)

  - Key Abstraction(후보명, 제거이유, 선택으로 나누고 명사를 추출한다.)

    => 선택가능성이 높다 = 영속성을 가지고 있다. (DB등으로 저장되어 있어야한다.)

  - 추출한 명사(Class Diagram)의 상관관계(동사)를 구한다.

    (ex. 고객은 상품을 구매한다.)

  - 객체지향프로그램의 문제점 : 필요없는 DATA가 같이 생성되어 MEMORY 낭비가 크다.



- 구조적 기법
  - 참조 : https://github.com/manggong/TIL/blob/master/service_security/service_security_20191202.md
  - Web Site
  - Web Application Protocol
  - API
  - Platform dependent (플랫폼 종속성)