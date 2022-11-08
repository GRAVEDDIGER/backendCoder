#CODERHOUSE
##DESAFIO API RESTful

### Backend:

El Backend de la aplicacion esta conformado por 3 archivos.
*1 server.js que abre el servidor en el puerto 8080 y usa los middlewares que necesita para funcionar
*2 storage.js que es un manejador de archivos el cual permite las aplicaciones basicas del CRUD.
\*3 productroutes.js Contiene las rutas y provee la funcionalidad a la api.
El Backend se encuentra cargado en glitch
https://graceful-octagonal-perigee.glitch.me/

#### Storage.js

Claves:
products = []; (array de productos)
count = 0;( numero de items en el array )
file = file || ""; (Archivo donde se realizara el intercambio de datos )
version = 0; (Deje esto para realizar un control de versiones a futuro)
maxId = 0; (Numero mas alto de ID en la base de datos )
Metodos:
getAll() Trae todos los productos de la base de datos
getById() Trae el objeto del ID especificado o devuelve un objeto con un error
loadFile() lee el contenido de la base de datos y lo carga al objeto en products[]
addProduct() Agrega un nuevo elemento al array y lo guarda en el archivo fisico
saveFile() Guarda el contenido en el archivo
deleteById() Elimina el objeto del Id correspondiente
deleteAll() Borra todos los elementos de la base de datos
modifyById() Sobreescribe el objeto que se pasa a la funcion en el ID especificado

#### ProductoRoutes.JS

GET /PRODUCTOS USA getAll() para traer todos los registros
GET /PRODUCTOS/:ID USA getByID() para traer el objeto que se corresponde al ID
GET /PRODUCTORANDOM Devuelve un producto al azar
POST /PRODUCTOS USA addProduct() Para agregar un nuevo registro a la base de datos
PUT /PRODUCTOS/:ID USa modifyById() Para modificar el registro que coincide con el id pasado
DELETE /PRODUCTOS/:ID Elimina el registro que coincide con ID usando deleteById()

#### Server.JS

Abre un servidor en el puerto 8080

### Front End:

El frontend fue realizado en vanilla JS HTML y CSS No utiliza Css Framework alguno.
para acceder al FrontEnd puede hacer Click en el siguiente enlace
https://chic-fox-0a42d0.netlify.app/
