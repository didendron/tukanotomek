# Tukanotomek

# Technologia

MySql 8.0.42

# Instalacja
1. Sklonuj repozytorium

`git clone git@github.com:didendron/tukanotomek.git`

2. Zainstaluj Mysql

`sudo apt install mysql-server`

3. Uruchom serwer

`sudo systemctl start mysql.service`

4. Zmień hasło

`sudo mysql`
`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

5. Zaloguj się hasłem `root`

 mysql> `exit`


