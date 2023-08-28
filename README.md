## Порядок запуска

1. Скопировать .env.example файл, переименовать в .env
2. Запустить нужные сервисы через ```docker-compose up -d``` или изменить параметры подключения к существующим сервисам в файлах ```.env``` и ```src/sequelize.json```
3. Установить зависимости проекта через ```yarn```