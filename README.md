# Sistema de Registro de Motores Industriais (MySQL + JWT)

Aplicacao full-stack para cadastro, listagem, edicao e exclusao de motores industriais com autenticacao propria (JWT), backend em Express e banco MySQL.

## Tecnologias

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Banco: MySQL
- Auth: bcryptjs + JWT

## Estrutura

appvscode/
- backend/
- frontend/
- database/

## 1) Banco MySQL

1. Abra o MySQL Workbench (ou terminal mysql).
2. Execute `database/schema_mysql.sql`.

Esse script cria:
- `users`
- `motores` (com `user_id` e chave estrangeira)

## 2) Backend (Express + MySQL)

1. Copie `backend/.env.example` para `backend/.env`.
2. Preencha com os dados do seu MySQL e JWT:
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

3. Instale dependencias e rode:

```bash
cd backend
npm install
npm run dev
```

API em `http://localhost:4000`.

## 3) Frontend (React)

1. Copie `frontend/.env.example` para `frontend/.env.local`.
2. Ajuste `VITE_API_URL` se necessario.

3. Instale dependencias e rode:

```bash
cd frontend
npm install
npm run dev
```

Interface em `http://localhost:5173`.

## Endpoints principais

Auth:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protegida)

Motores (protegidas por JWT):
- `POST /motores`
- `GET /motores`
- `GET /motores?data=YYYY-MM-DD`
- `PUT /motores/:id`
- `DELETE /motores/:id`

## Exemplo de autenticacao

### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "nome": "Brendo",
  "email": "brendo@email.com",
  "password": "123456"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "brendo@email.com",
  "password": "123456"
}
```

### Rota protegida
```http
GET /motores
Authorization: Bearer <token>
```

## Observacoes

- Cada usuario enxerga apenas os proprios registros de motor.
- Se trocar schema ou dependencias, rode `npm install` novamente no backend/frontend.
