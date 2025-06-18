# Admin Dashboard

Тестовое приложение: Backend на ASP.NET Core 8 + SQLite, Frontend на React + Tailwind + Axios.

## Данные для входа
Email: admin@mirra.dev
Password: admin123

## Установка и запуск
### Frontend
Перейдите в папку admin_dashboard_front, после чего установите зависимости и запустите проект

```bash
  cd admin_dashboard_front 
  npm i
  npm run dev
```

### Backend
Перейдите в папку AdminDashboard_back, восстановите зависимости, соберите проект и запустите

```bash
 cd AdminDashboard_back
 dotnet restore
 dotnet build
 dotnet run
``` 


### Примеры Curl
#### Авторизация
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mirra.dev","password":"admin123"}'

  Ответ:
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

#### Список клиентов
```bash
curl -X GET http://localhost:5000/api/clients \
  -H "Authorization: Bearer $TOKEN"
```

#### Последние 5 платежей
```bash
curl -X GET "http://localhost:5000/api/payments?take=5" \
  -H "Authorization: Bearer $TOKEN"
```
   
#### Платежи клиента
```bash
   curl -X GET http://localhost:5000/api/payments/client/1 \
  -H "Authorization: Bearer $TOKEN"
```
   
#### Текущий курс
```bash
   curl -X GET http://localhost:5000/api/rate \
  -H "Authorization: Bearer $TOKEN"
```

#### Обновить курс
```bash
   curl -X POST http://localhost:5000/api/rate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"currentRate":12.5}'
```

### Форма входа
  ![image](https://github.com/user-attachments/assets/ade606a5-67ec-4429-8be4-b43bb80b6fc9)

### Админ панель
![image](https://github.com/user-attachments/assets/c581479d-1640-4c2b-8b99-3dbc12f41bdd)

### История платежей клиента
![image](https://github.com/user-attachments/assets/9fdef41a-4a53-4e2d-a240-908eb2f46657)



