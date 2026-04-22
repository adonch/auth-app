# 📘 Технічне завдання (ТЗ)

## 1. Архітектура та стек

### Frontend

- React (рекомендовано Vite для збірки)
- React Router — навігація
- Context API або Zustand — управління станом авторизації
- Стилізація:
  - CSS Modules **або**
  - Styled Components (з використанням CSS-змінних)

### Backend

- Node.js + Express.js

### База даних

- PostgreSQL
- ORM:
  - Prisma **або**
  - Sequelize

### Авторизація

- JWT (JSON Web Tokens) **або**
- Сесії (express-session + HttpOnly cookies)

### Безпека

- Хешування паролів: `bcrypt` / `argon2`
- Rate limiting для API авторизації
- `helmet` для HTTP-заголовків

---

## 1.2 Структура бази даних (PostgreSQL)

### Таблиця `Users`

| Поле          | Тип                        | Опис           |
| ------------- | -------------------------- | -------------- |
| id            | UUID (PK)                  | Ідентифікатор  |
| email         | VARCHAR (Unique, Not Null) | Email          |
| password_hash | VARCHAR (Not Null)         | Хеш пароля     |
| first_name    | VARCHAR                    | Ім’я           |
| last_name     | VARCHAR                    | Прізвище       |
| avatar_url    | VARCHAR                    | Аватар         |
| created_at    | TIMESTAMP                  | Дата створення |
| updated_at    | TIMESTAMP                  | Дата оновлення |

---

### Таблиця `ActivityLogs`

| Поле        | Тип                  | Опис                         |
| ----------- | -------------------- | ---------------------------- |
| id          | UUID (PK)            | Ідентифікатор                |
| user_id     | UUID (FK → Users.id) | Користувач                   |
| action      | VARCHAR              | Дія (LOGIN, PASSWORD_CHANGE) |
| device_info | VARCHAR              | Пристрій                     |
| location    | VARCHAR              | Локація                      |
| created_at  | TIMESTAMP            | Час                          |

---

## 1.3 API Endpoints (Express)

### Авторизація `/api/auth`

- `POST /login`
  - Перевірка email/пароля
  - Повертає токен / встановлює cookie
  - Логує дію

- `POST /logout`
  - Очищає сесію / cookie

---

### Користувач `/api/user`

- `GET /profile`
  - Дані користувача (без пароля)

- `PUT /profile`
  - Оновлення:
    - first_name
    - last_name
    - avatar_url

- `PUT /password`
  - Приймає:
    - oldPassword
    - newPassword
  - Перевірка + оновлення + лог

- `PUT /email`
  - Приймає:
    - newEmail
    - password
  - Перевірка + зміна

- `GET /activity`
  - Історія активності

---

## 1.4 Frontend архітектура (React)

### Маршрути

- `/login` — публічний
- `/app` — захищений layout
  - `/dashboard`
  - `/profile`
  - `/security`

---

### Глобальний стан (AuthContext)

```js
{
  user: User | null,
  isLoading: boolean,
  login: Function,
  logout: Function,
  updateUser: Function
}
```
