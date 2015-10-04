#API REST de NodePop:

##Configuracion del back
Los parametros configurables del back se encuentran en el fichero utils/config.js. Dichos parámetros son los siguientes:

* **uri:** Uri para la conexion con la base de datos. Por defecto mongodb://localhost:27017/nodePop
* **defaultLanguage:** Idioma por defencto del api. En la actualidad el api rest soporta dos idiomas:
  * Español (es)
  * Ingles (en)
 * **logConfig.dir:** Directorio donde se almacenan los logs del servidor
 * **logConfig.file:** Nombre del fichero donde se almacenan los logs. El fichero de logs cambia cada 24h. Para evitar que los ficheros se pisen los unos a los otros en recomendable inserta la fecha como parte del nombre del fichero. Para insertar la fecha simplemente hay que añadir la mascara %DATE%
 * **security.secret:** Cadena utilizada para encriptar el token de jwt
 * **security.expire:** Número de minutos que tarda la sesión del usuario en caducar
 * **CORS.allowOrigins:** Listado de dominios a los que se le permite el acceso al api. El caracter asterisco sirve para permitir el acceso al api rest desde cualquier dominio
 * **CORS.allowMethods:** Metodos HTTP a los que se da acceso al api desde otro dominio
 * **CORS.allowHeaders:** Listado de cabeceras que tiene que llevar las peticiones desde otros dominios para acceder al api
 * **token.devicesAllowed:** Listado de dispositivos sobre los que se permiten almacenar token push 

##Instrucciones npm
* **npm start:** Arranca el api en modo producción 
* **npm run dev:** Arranca el api en modo desarrollo
* **npm test:** Lanza las pruebas unitarias
* **npm run devDebug:** Arranca el api en modo desarrollo para debgu
* **npm run testDebug:** Lanza las pruebas unitarias para debug