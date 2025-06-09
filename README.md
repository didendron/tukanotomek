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

mysql>`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';`

5. Zaloguj się hasłem `root`

 mysql> `exit`
 
 `mysql -u root -p`

6. Utwórz bazę danych tukanoapp

mysql>`create database tukanoapp;`

7. Przejdź do folderu backend

`cd tukanotomek/backend`

8. Uruchom polecenia
  'pip install -r requirements.txt'
   `python3 manage.py makemigrations`
   `python3 manage.py migrate`
   `python3 manage.py runserver`
9. Przejdź do folderu frontend i uruchom polecenia

    `cd tukanotomek/frontend`
   `npm install`
   `npm start`

10. Otwórz w przeglądarce
    `http://localhost:3000/`


