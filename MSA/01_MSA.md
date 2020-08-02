#MSA

출처: [MSA](https://velog.io/@tedigom/MSA-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-2-MSA-Outer-Architecure)

### Inner architecture

Inner architecture는 내부 서비스와 관련된 architecture(내부의 서비스를 어떻게 쪼갤 것 인가?)

- 서비스를 어떻게 정의할 것인가?

  - ex). 쇼핑몰의 주문하기, 장바구니를 합칠 것인가? 분리할 것인가?(비즈니스, 시스템 특성에 따라 정의되어야 함)
  - 서비스를 정의할 때 비즈니스뿐 아니라, 서비스간의 종속성, 배포 용이성, 장애 대응, 운영 효율성 등이 고려되어야 함

- DB Access구조를 어떻게 설계할 것인가?

  - MicroService가 사용하는 데이터는 일반적으로 일관된 API를 통해서 접근 함. 각 서비스에는 자체의 데이터베이스를 가질 수 있는데, 일부의 비즈니스 트랜잭션은 여러 서비스를 걸쳐 있기 때문에, 각 서비스에 연결된 데이터베이스의 정합성을 보장해 줄 수 있는 방안이 필요함 => DB를 여러개 사용하니까 어떻게 관리하고 보증하는지

- 서비스 내 API를 어떻게 설계할 것인가?

- 논리적인 Component들의 layer를 어떠한 방식으로 설계할 것인가?

### Outer architecture

- External Gateway

  - External Gateway는 전체 서비스 외부로부터 들어오는 접근을 내부 구조를 드러내지 않고 처리하기 위한 요소이다. 사용자 인증(Consumer Identity Provider)과 권한 정책관리(Policy Management)를 수행하며, API Gateway가 여기서 가장 핵심적인 역활을 담당

- Service Mesh

  - Service Mesh는 마이크로서비스 구성 요소간의 네트워크를 제어하는 역활은 한다. 서비스 간에 통신을 하기 위해서는 service discovery, service routing, 트래픽 관리 및 보안 등을 담당하는 요소가 있어야 한다. Service Mesh는 위에 언급된 기능을 모두 수행한다.

- Container Management

  - 컨테이너 기반 어플리케이션 운영은 유연성과 자율성을 가지며, 개발자가 손쉽게 접근 및 운영할 수 있는 인프라 관리 기술이기 때문에 MSA 적합
  - Docker, Kubernetes등등

- Backing Service

  - Backing Service는 어플리케이션이 실해되는 가운데 네트워크를 통해서 사용할 수 있는 모든 서비스를 말한다. (MySQL, 캐쉬시스템, SMTP 등 어플리케이션과 통신하는 리소스들을 지칭하는 포괄적인 개념)

- Telemetry

  - 실시간 원거리 원격가능
  - MSA는 서비스가 많기 때문에 일일이 모니터링하는데 어려움을 겪음 => 이것을 보완하는 역활

- CI/CD Automation
  - CI/CD는 어플리케이션 배포 단계를 자동화하여, 어플리케이션을 보다 짧은 주기로 고객에게 제공하는 방법
