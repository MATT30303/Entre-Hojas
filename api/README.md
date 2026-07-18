# Entre Hojas API

Express + TypeScript API using an MVC-style structure:

- `models/`: database queries and SQL only.
- `services/`: resource rules and not-found handling.
- `controllers/`: HTTP request/response handling.
- `routes/`: URL-to-controller mapping.

## Setup

1. Import `entreHojas.sql` into MySQL (it creates the `mydb` database).
2. Copy `.env.example` to `.env` and set the MySQL credentials.
3. Run `pnpm dev` from this directory.

The health check is `GET /health`. All application endpoints are under `/api`.

## CRUD endpoints

| Resource | Base path |
| --- | --- |
| Clientes | `/api/clientes` |
| Plantas | `/api/plantas` |
| Imágenes | `/api/imagenes` |
| Órdenes | `/api/ordenes` |
| Usuarios | `/api/usuarios` |
| Detalles de orden | `/api/orden-detalles` |

The first five use the usual CRUD routes: `GET /`, `POST /`, `GET /:id`, `PATCH /:id`, and `DELETE /:id`.

Plant searches:

- `GET /api/plantas/:id` returns every plant field plus its `imagenes` array.
- `GET /api/plantas/familia/:familia` returns `{ id, name, price, image, discount, label }` for each matching plant. `image` is the first image registered for that plant and `discount` is currently `0`, because the database has no discount field.
- `/api/productos` is an alias for `/api/plantas`, including both searches.

`orden_detalle` has a composite key in the schema, so a single detail is addressed as:

`/api/orden-detalles/:ordenId/:plantaId`

`POST /api/plantas` example:

```json
{
  "nombre": "Monstera deliciosa",
  "precio": 22500,
  "stock": 8,
  "familia": "Araceae"
}
```

The `plantas` API preserves the database field name `tamaño`; send that exact JSON key when using it.
