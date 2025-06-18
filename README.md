# Admin Dashboard

Тестовое приложение: Backend на ASP.NET Core 8 + SQLite, Frontend на React + Tailwind + Axios.

## Данные для входа
Email: admin@mirra.dev
Password: admin123

### Примеры Curl
#### Авторизация
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mirra.dev","password":"admin123"}'

  Ответ:
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

#### Список клиентов
curl -X GET http://localhost:5000/api/clients \
  -H "Authorization: Bearer $TOKEN"

#### Последние 5 платежей
   curl -X GET "http://localhost:5000/api/payments?take=5" \
  -H "Authorization: Bearer $TOKEN"
   
#### Платежи клиента
   curl -X GET http://localhost:5000/api/payments/client/1 \
  -H "Authorization: Bearer $TOKEN"
   
#### Текущий курс
   curl -X GET http://localhost:5000/api/rate \
  -H "Authorization: Bearer $TOKEN"

#### Обновить курс
   curl -X POST http://localhost:5000/api/rate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"currentRate":12.5}'

