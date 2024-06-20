# API de Gestión de Vinoteca

Esta API permite gestionar Dominaciones de Origen, vinos y usuarios proporcionando endpoints para crear, leer, actualizar y eliminar. Está construida con Node.js, Express y MongoDB.

## Instalación


1. Instala las dependencias:
    ```sh
    npm install
    ```

2. Instala las dependencias de desarrollo:
    ```sh
    npm install -D
    ```

3. Inicia el servidor:
    ```sh
    npm run dev
    ```
    
El servidor estará disponible en `http://localhost:3000`.

4. Se conecta a la BBDD

## Endpoints

### Usuarios

#### Obtener todos los Usuarios
- **URL:** `/api/v1/user`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los usuarios en la base de datos siempre y cuando seas el admin.

#### Crear un nuevo usuario
- **URL:** `/api/v1/user`
- **Método:** `POST`
- **Descripción:** Crea un nuevo usuario en la base de datos.
- **Cuerpo de la solicitud:**
    ```json
    {
        "userName": "Nombre del usuario",
        "password": "Contraseña del usuario",
        "rol": "Rol del usuario"
    }
    ```

#### Actualizar un usuario
- **URL:** `/api/v1/user/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de un usuario existente en la base de datos siempre y cuando seas el admin.
- **Parámetros de la URL:**
    - `id`: ID del usuario a actualizar.
- **Cuerpo de la solicitud:**
    ```json
    {
        "rol": "Nuevo rol del usuario"
    }
    ```

#### Eliminar un usuario
- **URL:** `/api/v1/user/delete/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina cualquier usuario existente de la base de datos si eres el admin.
- **Parámetros de la URL:**
    - `id`: ID del Usuario a eliminar.
- **Autentificación:** Se requiere el token del administrador para su validación.

#### Eliminarse a si mismo como usuario
- **URL:** `/api/v1/user/delete-me/:id`
- **Método:** `DELETE`
- **Descripción:** Un usuario puede eliminarse a si mismo.
- **Parámetros de la URL:**
    - `id`: ID del Usuario a eliminar.
- **Autentificación:** Se requiere el token del usuario para su validación.

### Dominaciones de Origen

#### Obtener todas las D.O
- **URL:** `/api/v1/winery`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todas las D.O en la base de datos.

#### Crear una nueva D.O
- **URL:** `/api/v1/winery`
- **Método:** `POST`
- **Descripción:** Crea una nueva D.O en la base de datos siempre y cuando seas el admin.
- **Cuerpo de la solicitud:**
    ```json
    {
        "wineryName": "Nombre de la D.O",
        "wines": "Nombres de los vinos que pertenecen a la D.O"
    }
    ```

#### Actualizar una D.O
- **URL:** `/api/v1/winery/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de una D.O existente en la base de datos siempre y cuando seas el admin.
- **Parámetros de la URL:**
    - `id`: ID de la D.O a actualizar.
- **Cuerpo de la solicitud:**
    ```json
    {
        "wineryName": "Nuevo nombre de la D.O",
        "wines": "Nuevo vino a añadir o actualizar"
    }
    ```

#### Eliminar una D.O
- **URL:** `/api/v1/winery/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina una D.O existente de la base de datos siempre y cuando seas el admin.
- **Parámetros de la URL:**
    - `id`: ID de la D.O a eliminar.

### Vinos

#### Obtener todos los Vinos
- **URL:** `/api/v1/wine`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los vinos en la base de datos.

#### Crear un nuevo Vino
- **URL:** `/api/v1/wine`
- **Método:** `POST`
- **Descripción:** Crea un nuevo vino en la base de datos siempre y cuando seas el admin.
- **Cuerpo de la solicitud:**
    ```json
    {
        "wineName": "Nombre del vino",
        "year": "Año de la cosecha del vino",
        "wineries": "Nombre de la D.O a la que pertenece el vino"
    }
    ```

#### Actualizar un Vino
- **URL:** `/api/v1/wine/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de un vino existente en la base de datos siempre y cuando seas el admin.
- **Parámetros de la URL:**
    - `id`: ID del vino a actualizar.
- **Cuerpo de la solicitud:**
    ```json
    {
        "wineName": "Nuevo nombre del vino",
        "year": "Nuevo año de la cosecha",
        "wineries": "Nueva D.O a añadir o actualizar"
    }
    ```

#### Eliminar un Vino
- **URL:** `/api/v1/wine/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un vino existente de la base de datos siempre y cuando seas el admin.
- **Parámetros de la URL:**
    - `id`: ID del vino a eliminar.

## Manejo de Errores

- **Ruta no encontrada:**
    - **URL:** `*`
    - **Método:** `ALL`
    - **Descripción:** Cualquier ruta no definida devolverá un error 404 con el mensaje "Route not found".

- **Manejador de errores genérico:**
    Cualquier error inesperado devolverá un error 500 con el mensaje "Unexpected error".
