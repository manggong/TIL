import sys  

option = sys.argv[1]   

if option == '-a':
    memo = sys.argv[2]
    f = open('memo.txt','a')
    f.write(memo)
    f.write('\n')
    f.close()
elif option == '-v':
    f = open('memo.txt')
    memo = f.read()
    f.close()
    print(memo)


"""
파이썬 메모장 만들기
-a를 이용하여 입력을 받고 -v를 이용하여 출력 함
"""