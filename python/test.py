f = open('text.txt', 'a')
f.write("Life is too short")
f.write("\n")
f.write("you need java")
f.close()


f = open('text.txt', 'r')
body = f.read()
f.close()

body = body.replace('java', 'python')

f = open('text.txt', 'w')
f.write(body)
f.close()