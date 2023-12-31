# backend_ts_zod_jest

## Description:

API REST de tareas con authenticacion, implementando Node.js, Express.js, Typescript, Json Web Token, Bcrypt, MongoDB, Swagger, Zod, Cookie-parser, Jest y Supertest.

Todos los end-points de task tienen un middleware donde se verifica el token, los end-points de Auth y task tienen un middleware de Zod para validacion de datos.

Con Swagger se implemento un endpoint mas donde esta la  documentacion de la Api Rest


## Installation:

Para empezar, es necesario instalar las dependencias. Puede hacerlo ejecutando el siguiente comando en su terminal: Este comando instalará automáticamente todas las dependencias requeridas para el proyecto. Asegúrese de tener Node.js y npm (Node Package Manager) instalados en su máquina antes de ejecutar este comando.

```
npm install
```
### Archivo .env
1. Afuera de src crear un archivo .env y agregar lo siguiente
```
PORT=
MONGODB_URI=
JWT_SECRET=
```
- En PORT el numero de puerto donde quieres que se ejecute el servidor
- En MONGODB_URI la url de mongoDb para que se conecte a tu base de datos
- En JWT_SECRET tu codigo secreto para jwt

## Ejecutar el backend
Una vez que se completa la instalación, puede ejecutar el backend de la aplicación con el siguiente comando:

```
npm run dev
```
## MongoDB Schemas

### User
```
{
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    }
}
```
### Task

```
{
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}
```

## Zod Schemas
### Auth signin validation body

```
{
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
}
```
### Auth signup validation body
```
{
    body: z.object({
        username: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(6)
    })
}
```

### created task validation
```
{
    body: z.object({
        title: z.string().min(4).max(18),
        description: z.string().min(12).max(78),
    })
}
```

### Deleted task validation
```
{
    params: z.object({
        id: z.string().min(6)
    })
}
```

### Update task validation
```
{
    body: z.object({
        title: z.string().min(4).max(18),
        description: z.string().min(12).max(78),
        status: z.boolean().optional()
    }),
    params: z.object({
        id: z.string().min(6)
    })
}
```
### Patch task validation
```
{
    body: z.object({
        status: z.boolean()
    })
}
```

## Swagger
- En esta ruta encontraras mas informacion de la API REST
```
http://localhost:{PORT}/docs
```

## End-points 
Estos son los endpoints que utiliza la aplicación, donde se pueden realizar diversas consultas:

### Registrarse
```
localhost:{.evn}/v1/api/signup
```
1. Post: signup user
2. Body
```
{
    "username": "",
    "email": "",
    "password":""
}
```
- Se optiene un status 200 si todo salio bien en caso contrario devulve un status 400.
- Si hay algun error en la solicitud del end-point sera validado por Zod antes de llegar a la ruta principal, si no hay errores en los datos ingresados pasara a la ruta principal en caso contrario se obtendra un status code 400 y el mensaje de error un array

### iniciar seccion
```
localhost:{.env}/v1/api/signin
```
1. Post: signin
2. Body
```
{
    "email": "",
    "password":""
}
```
- Los datos ingresados seran validos por Zod, si todo salio bien parasara a la ruta principal en caso contrario se obtendra un arreglo con el error y un status code 400.
- Se obtendra un objecto con el _id, username, email y el token del usuario, en caso contrario se obtendra un status code 400 y un objecto con el mesnaje de error

### Task
```
localhost:{.env}/v1/api/task
```
1. Post: created task
2. Authentication Bearer
```
La ruta pasara por un middleware donde espera el token del usuario que trata de crear la tarea.
Se obtendra un status code 401 si el token no es valido en caso contrario pasara por otro middleware donde validara los datos ingresados.
```
3. Body
```
{
    "title": "",
    "description":""
}
```
- Los datos ingresados seran validados por Zod, si no hay ningun error en los datos ingresados pasaran a la ruta principal, en caso contrario devolvera un arreglo con el error y un status code 400.
- Se obtendra un status code 201 y un objeto con la tarea creada en caso contrario un status code 404 y un objeto con el error.
4. GET: Obtener todas las tareas del usuario registrado
- Se obtendra un arreglo con todas las tareas que tiene el usuario
```
Ejemplo
[
    {
        "title": "first task",
        "description: "first task",
        "status": false,
        userId: "3h2b44b2424h324h2"
    }
]
```
5. GET/:id (Obtener una tarea por id)
```
{
    "title": "first task",
    "description: "first task",
    "status": false,
    userId: "3h2b44b2424h324h2"
}
```
6. PUT/:id (Actualizar la tarea segun el id)
```
{
    "title": "",
    "description": "",
    "status": false/true
}
```
- El status es opcional

7. PATCH/:id (Actualizar solo el status de la tarea por id)
```
{
    "status": false/true
}
```
8. DELETE/:id (Eliminar una tarea por id) 
- Se obtendra un status code 200 si la tarea se elimino en caso contrario se obtendra un status code 404
