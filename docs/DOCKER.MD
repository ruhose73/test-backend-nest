# Тестовое задание Backend Node

## Установка и запуск внутри докера

В папке проекта выполните команду: `docker compose build` и `docker compose up`

Как только контейнер запуститься, необходимо перейти в  
папку с бекапом базы данных с помощью `cd migration-pg`

Поместите образ восстановления в контейнер в папку home  
`docker cp migration-custom.backup test-backend-postgres-1:/home`

Запустите CLI контейнера и выполните команду восстановления базы  
`pg_restore -U postgres -d test_backend /home/migration-custom.backup`

Либо выполните `sudo docker exec 8fb7263eee38 pg_restore -U postgres -d test_backend /home/migration-custom.backup`

где:

* `<8fb7263eee38>` — ID контейнера с базой данных.
* `<postgres>` — имя пользователя базы данных;
* `<test_backend>` — имя базы данных.
* `/home/migration-custom.backup` — Путь до файла `migration-custom.backup`

## Сервера

* Сервер API локальный: `http://localhost:5000`
* Сервер локальный документации: `http://localhost:5000/docs`
* Сервер API: `http://51.250.11.190:5000`
* Сервер документации: `http://51.250.11.190:5000/docs/`
