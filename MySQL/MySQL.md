# MySQL



### 1. MySQL 5.7 설치

~~~shell
apt update
sudo apt install mysql-server-5.7
~~~



### 2. MySQL 비밀번호 초기화

~~~shell
sudo mysql
update mysql.user set plugin='mysql_native_password' where user='root';
update mysql.user set authentication_string=PASSWORD('new_password') where user='root';
flush privileges;
quit
~~~



### 3. MySQL 재실행

~~~shell
sudo service mysql restart
~~~



### 4. MySQL 언어셋 설정

~~~shell
mysql -u root -p
sudo vim /etc/mysql/my.cnf
~~~

- my.cnf에 넣어 주기

~~~
[client]
default-character-set = utf8

[mysqld]
init_connect = SET collation_connection = utf8_general_ci
init_connect = SET NAMES utf8
character-set-server = utf8
collation-server = utf8_general_ci

[mysqldump]
default-character-set = utf8

[mysql]
default-character-set = utf8
~~~



### 5. MySQL 재실행

~~~shell
sudo service mysql restart

mysql -u root -p
~~~



