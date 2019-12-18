class Service:
    secret = "hello"
    def setname(self, name):
        self.name = name
    def sum(self, a, b):
        result = a + b
        print("%s님 %s + %s = %s 입니다."  %(self.name, a, b, result))

pey = Service()

pey.setname("홍길동")

print(pey.sum(1,4))

