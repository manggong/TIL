# HyperLedger



## first network

### I. 네트워크 구축 준비

- 실행 중인 docker 종료 및 삭제

~~~bash
docker rm -f $(docker ps -aq)
~~~

- tilix 설치 (화면 분할 툴)

~~~bash
apt install tilix
~~~

- tilix 실행

~~~bash
tilix &
~~~



### II. 네트워크 구축

#### 1. 인증서 생성

- (why? 테스트 환경임으로 CA가 없음 / cryptogen이 CA 역활을 함)

~~~
/HLF/fabric-samples/first-network# ../bin/cryptogen generate --config=./crypto-config.yaml
~~~

#### 2. 인증서 확인

~~~bash
tree ctypto-config

crypto-config
├── ordererOrganizations
│   └── example.com
│       ├── ca
│       │   ├── 05336b5a23825e0783dfc5c8c1e5f3b2dbd08e964f7c4fb2065025be44ff43e3_sk
│       │   └── ca.example.com-cert.pem
│       ├── msp
│       │   ├── admincerts
│       │   ├── cacerts
│       │   │   └── ca.example.com-cert.pem
│       │   ├── config.yaml
│       │   └── tlscacerts
│       │       └── tlsca.example.com-cert.pem
│       ├── orderers
│       │   ├── orderer2.example.com
│       │   │   ├── msp
│       │   │   │   ├── admincerts
│       │   │   │   ├── cacerts
│       │   │   │   │   └── ca.example.com-cert.pem
│       │   │   │   ├── config.yaml
│       │   │   │   ├── keystore
│       │   │   │   │   └── 086789df137988c123f5c1927c0d430fef592b17df7d88f849e83bd8e53567c9_sk
│       │   │   │   ├── signcerts
│       │   │   │   │   └── orderer2.example.com-cert.pem
│       │   │   │   └── tlscacerts
│       │   │   │       └── tlsca.example.com-cert.pem
│       │   │   └── tls
│       │   │       ├── ca.crt
│       │   │       ├── server.crt
│       │   │       └── server.key
│       │   ├── orderer3.example.com
│       │   │   ├── msp
│       │   │   │   ├── admincerts
│       │   │   │   ├── cacerts
│       │   │   │   │   └── ca.example.com-cert.pem
│       │   │   │   ├── config.yaml
│       │   │   │   ├── keystore
│       │   │   │   │   └── 788c3654bd7225248129bebb73f93024a2bbc9e73c78e98bb6dce1b1be2c2776_sk
│       │   │   │   ├── signcerts
│       │   │   │   │   └── orderer3.example.com-cert.pem
│       │   │   │   └── tlscacerts
│       │   │   │       └── tlsca.example.com-cert.pem
│       │   │   └── tls
│       │   │       ├── ca.crt
│       │   │       ├── server.crt
│       │   │       └── server.key
│       │   ├── orderer4.example.com
│       │   │   ├── msp
│       │   │   │   ├── admincerts
│       │   │   │   ├── cacerts
│       │   │   │   │   └── ca.example.com-cert.pem
│       │   │   │   ├── config.yaml
│       │   │   │   ├── keystore
│       │   │   │   │   └── 1a323da311ff50b21ccbfd671950535beaf163f30046e0c0c65a0e6ab189834d_sk
│       │   │   │   ├── signcerts
│       │   │   │   │   └── orderer4.example.com-cert.pem
│       │   │   │   └── tlscacerts
│       │   │   │       └── tlsca.example.com-cert.pem
│       │   │   └── tls
│       │   │       ├── ca.crt
│       │   │       ├── server.crt
│       │   │       └── server.key
│       │   ├── orderer5.example.com
│       │   │   ├── msp
│       │   │   │   ├── admincerts
│       │   │   │   ├── cacerts
│       │   │   │   │   └── ca.example.com-cert.pem
│       │   │   │   ├── config.yaml
│       │   │   │   ├── keystore
│       │   │   │   │   └── 4e6093504cc36dc4bffcad0daff7885615bba4b2d448945a7ae8bf77776840de_sk
│       │   │   │   ├── signcerts
│       │   │   │   │   └── orderer5.example.com-cert.pem
│       │   │   │   └── tlscacerts
│       │   │   │       └── tlsca.example.com-cert.pem
│       │   │   └── tls
│       │   │       ├── ca.crt
│       │   │       ├── server.crt
│       │   │       └── server.key
│       │   └── orderer.example.com
│       │       ├── msp
│       │       │   ├── admincerts
│       │       │   ├── cacerts
│       │       │   │   └── ca.example.com-cert.pem
│       │       │   ├── config.yaml
│       │       │   ├── keystore
│       │       │   │   └── fb93862476169ebe9ff2779d7991fed57912437792bf603b056caab3b822a8da_sk
│       │       │   ├── signcerts
│       │       │   │   └── orderer.example.com-cert.pem
│       │       │   └── tlscacerts
│       │       │       └── tlsca.example.com-cert.pem
│       │       └── tls
│       │           ├── ca.crt
│       │           ├── server.crt
│       │           └── server.key
│       ├── tlsca
│       │   ├── 7a68b35de4b1e100d128e30ec6e7958a122ac36609d392118aafa89eb23dc42b_sk
│       │   └── tlsca.example.com-cert.pem
│       └── users
│           └── Admin@example.com
│               ├── msp
│               │   ├── admincerts
│               │   ├── cacerts
│               │   │   └── ca.example.com-cert.pem
│               │   ├── config.yaml
│               │   ├── keystore
│               │   │   └── 866bc2444206588a3338beb6922d13ce237ce0a385c7fa0bb0012b707a779233_sk
│               │   ├── signcerts
│               │   │   └── Admin@example.com-cert.pem
│               │   └── tlscacerts
│               │       └── tlsca.example.com-cert.pem
│               └── tls
│                   ├── ca.crt
│                   ├── client.crt
│                   └── client.key
└── peerOrganizations
    ├── org1.example.com
    │   ├── ca
    │   │   ├── 7cab22b5c35834b41e27056f69f71d6ad231e029ba7acdfd44f2b997346e2aaf_sk
    │   │   └── ca.org1.example.com-cert.pem
    │   ├── msp
    │   │   ├── admincerts
    │   │   ├── cacerts
    │   │   │   └── ca.org1.example.com-cert.pem
    │   │   ├── config.yaml
    │   │   └── tlscacerts
    │   │       └── tlsca.org1.example.com-cert.pem
    │   ├── peers
    │   │   ├── peer0.org1.example.com
    │   │   │   ├── msp
    │   │   │   │   ├── admincerts
    │   │   │   │   ├── cacerts
    │   │   │   │   │   └── ca.org1.example.com-cert.pem
    │   │   │   │   ├── config.yaml
    │   │   │   │   ├── keystore
    │   │   │   │   │   └── c837309e61796e986ff1014e1bf274c7ec5d4ffa9a7883b6ac748d370a284d54_sk
    │   │   │   │   ├── signcerts
    │   │   │   │   │   └── peer0.org1.example.com-cert.pem
    │   │   │   │   └── tlscacerts
    │   │   │   │       └── tlsca.org1.example.com-cert.pem
    │   │   │   └── tls
    │   │   │       ├── ca.crt
    │   │   │       ├── server.crt
    │   │   │       └── server.key
    │   │   └── peer1.org1.example.com
    │   │       ├── msp
    │   │       │   ├── admincerts
    │   │       │   ├── cacerts
    │   │       │   │   └── ca.org1.example.com-cert.pem
    │   │       │   ├── config.yaml
    │   │       │   ├── keystore
    │   │       │   │   └── 4c2fbc1e3f37b2da99520ed765d3c4e0da95bebb0542c3b1d90d017fc0a7b73e_sk
    │   │       │   ├── signcerts
    │   │       │   │   └── peer1.org1.example.com-cert.pem
    │   │       │   └── tlscacerts
    │   │       │       └── tlsca.org1.example.com-cert.pem
    │   │       └── tls
    │   │           ├── ca.crt
    │   │           ├── server.crt
    │   │           └── server.key
    │   ├── tlsca
    │   │   ├── c6699a6272bdb7b68451ccd18554ebc347b96b2d32e1086828a80376ddd1dd76_sk
    │   │   └── tlsca.org1.example.com-cert.pem
    │   └── users
    │       ├── Admin@org1.example.com
    │       │   ├── msp
    │       │   │   ├── admincerts
    │       │   │   ├── cacerts
    │       │   │   │   └── ca.org1.example.com-cert.pem
    │       │   │   ├── config.yaml
    │       │   │   ├── keystore
    │       │   │   │   └── 827c530ac1a2b54aa852e1d74298bd70b75757a6c4f6ff63cccfa84c81fc4a36_sk
    │       │   │   ├── signcerts
    │       │   │   │   └── Admin@org1.example.com-cert.pem
    │       │   │   └── tlscacerts
    │       │   │       └── tlsca.org1.example.com-cert.pem
    │       │   └── tls
    │       │       ├── ca.crt
    │       │       ├── server.crt
    │       │       └── server.key
    │       └── User1@org1.example.com
    │           ├── msp
    │           │   ├── admincerts
    │           │   ├── cacerts
    │           │   │   └── ca.org1.example.com-cert.pem
    │           │   ├── config.yaml
    │           │   ├── keystore
    │           │   │   └── 712a9e80bd60583500075d62cea15400a871b536a9ea971b6c8a1bba151ad35f_sk
    │           │   ├── signcerts
    │           │   │   └── User1@org1.example.com-cert.pem
    │           │   └── tlscacerts
    │           │       └── tlsca.org1.example.com-cert.pem
    │           └── tls
    │               ├── ca.crt
    │               ├── client.crt
    │               └── client.key
    └── org2.example.com
        ├── ca
        │   ├── c2380cb4232f6fc69e5dc9c9951e10b4d03cbabf193c6728dbb9aa312c6a3ab9_sk
        │   └── ca.org2.example.com-cert.pem
        ├── msp
        │   ├── admincerts
        │   ├── cacerts
        │   │   └── ca.org2.example.com-cert.pem
        │   ├── config.yaml
        │   └── tlscacerts
        │       └── tlsca.org2.example.com-cert.pem
        ├── peers
        │   ├── peer0.org2.example.com
        │   │   ├── msp
        │   │   │   ├── admincerts
        │   │   │   ├── cacerts
        │   │   │   │   └── ca.org2.example.com-cert.pem
        │   │   │   ├── config.yaml
        │   │   │   ├── keystore
        │   │   │   │   └── 9f4f47c15b9a1ee2fae483485d35eafc9c1eb7e691f88b3abdabb10eb5632981_sk
        │   │   │   ├── signcerts
        │   │   │   │   └── peer0.org2.example.com-cert.pem
        │   │   │   └── tlscacerts
        │   │   │       └── tlsca.org2.example.com-cert.pem
        │   │   └── tls
        │   │       ├── ca.crt
        │   │       ├── server.crt
        │   │       └── server.key
        │   └── peer1.org2.example.com
        │       ├── msp
        │       │   ├── admincerts
        │       │   ├── cacerts
        │       │   │   └── ca.org2.example.com-cert.pem
        │       │   ├── config.yaml
        │       │   ├── keystore
        │       │   │   └── d979abf589d85c270583e08f50050d497e3e8ce29c821a7ec0ce3f46dbf7a74c_sk
        │       │   ├── signcerts
        │       │   │   └── peer1.org2.example.com-cert.pem
        │       │   └── tlscacerts
        │       │       └── tlsca.org2.example.com-cert.pem
        │       └── tls
        │           ├── ca.crt
        │           ├── server.crt
        │           └── server.key
        ├── tlsca
        │   ├── 1db7ed2191a15c65a826fb2b2858feaf8fa5b4145e39ced573712970868b9b09_sk
        │   └── tlsca.org2.example.com-cert.pem
        └── users
            ├── Admin@org2.example.com
            │   ├── msp
            │   │   ├── admincerts
            │   │   ├── cacerts
            │   │   │   └── ca.org2.example.com-cert.pem
            │   │   ├── config.yaml
            │   │   ├── keystore
            │   │   │   └── 892613679b0102fa35dce47d24c598d39a5f90382ff74071d455f6818190622c_sk
            │   │   ├── signcerts
            │   │   │   └── Admin@org2.example.com-cert.pem
            │   │   └── tlscacerts
            │   │       └── tlsca.org2.example.com-cert.pem
            │   └── tls
            │       ├── ca.crt
            │       ├── server.crt
            │       └── server.key
            └── User1@org2.example.com
                ├── msp
                │   ├── admincerts
                │   ├── cacerts
                │   │   └── ca.org2.example.com-cert.pem
                │   ├── config.yaml
                │   ├── keystore
                │   │   └── a46c17ee8635327d43072909387842808c236443009ae73684fa29359bfce599_sk
                │   ├── signcerts
                │   │   └── User1@org2.example.com-cert.pem
                │   └── tlscacerts
                │       └── tlsca.org2.example.com-cert.pem
                └── tls
                    ├── ca.crt
                    ├── client.crt
                    └── client.key

~~~

#### 3. genesis block 생성

~~~
/HLF/fabric-samples/first-network# FABRIC_CFG_PATH=$PWD
/HLF/fabric-samples/first-network# ../bin/configtxgen -profile TwoOrgsOrdererGenesis -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block

=> ./channel-artifacts/에서 제네시스 블록 확인 가능
~~~

#### 4. 아티팩트 생성

~~~
/HLF/fabric-samples/first-network# export CHANNEL_NAME=mychannel
/HLF/fabric-samples/first-network# ../bin/configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME

=> ./channel-artifacts/에서 channel.tx 확인 가능
~~~

#### 5. Org1과 Org2에 대한 앵커 피어 생성

~~~
/HLF/fabric-samples/first-network# ../bin/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP

/HLF/fabric-samples/first-network# ../bin/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP

=> ./channel-artifacts/에서 Org1MSPanchors.tx 확인 가능
   ./channel-artifacts/에서 Org2MSPanchors.tx 확인 가능
~~~

#### 6. Docker 컨테이너 실행 (네트워크 구축)

~~~
docker-compose -f docker-compose-cli.yaml up -d
~~~

#### 7. 채널 생성을 위해 cli 접속

~~~bash
docker exec -it cli bash
~~~

#### 8. 채널 생성

~~~
cli# export CHANNEL_NAME=mychannel
cli# peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile  /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

=> 채널은 orderer를 이용해서 생성한다.
~~~

#### 9. 피어 가입

- 환경 변수들

~~~
## peer0.org1
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

## peer1.org1
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer1.org1.example.com:8051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt

## peer0.org2
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

## peer1.org2
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer1.org2.example.com:10051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt


~~~

- Peer0.org1 가입

~~~~
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

peer channel join -b $CHANNEL_NAME.block

~~~~

- Peer1.org1 가입

~~~
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer1.org1.example.com:8051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt

peer channel join -b $CHANNEL_NAME.block

~~~

- Peer0.org2 가입

~~~
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

peer channel join -b $CHANNEL_NAME.block

~~~

- Peer1.org2 가입

~~~
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer1.org2.example.com:10051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt

peer channel join -b $CHANNEL_NAME.block

~~~

#### 10. 앵커 피어 설정

- Peer0.org1 환경변수

~~~
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
~~~

- Peer0.org1 앵커 피어 설정

~~~
peer channel create -o orderer.example.com:7050 -c  $CHANNEL_NAME -f ./channel-artifacts/Org1MSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
~~~

- Peer0.org2 환경변수

~~~
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
~~~

- Peer0.org2 앵커 피어 설정

~~~
peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/Org2MSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
~~~



#### 11. 체인코드 디플로이

~~~
## Peer0.org1 환경변수 설정 
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

peer chaincode install -n mycc -v 1.0 -p github.com/chaincode/chaincode_example02/go

## Peer0.org2 환경변수 설정 후
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

peer chaincode install -n mycc -v 1.0 -p github.com/chaincode/chaincode_example02/go

~~~

#### 12. 체인코드 초기화 (instantiate)

~~~
## Peer0.org1 환경변수 설정 
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

peer chaincode instantiate -o orderer.example.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n mycc -v 1.0 -c '{"Args":["init","a", "100", "b","200"]}' -P "AND ('Org1MSP.member','Org2MSP.member')"

~~~

#### 13. Query (world state 조회)

~~~
## Peer0.org1 환경변수 설정 
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

peer chaincode query -C $CHANNEL_NAME -n mycc -c '{"Args":["query","a"]}'

~~~

#### 14. Invoke (Block 생성)

~~~
>peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n mycc --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["invoke","a","b","10"]}'
~~~

- 다른 Peer에서 확인 해 보기

~~~
## Peer1.org2 환경변수 설정 
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer1.org2.example.com:10051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt

>peer chaincode install -n mycc -v 1.0 -p github.com/chaincode/chaincode_example02/go
>peer chaincode query -C mychannel -n mycc -c '{"Args":["query","a"]}'

~~~

