#Practica de devOps
El objetivo de esta práctica es crear un entorno productivo donde poder instalar el back de Nodepop. Dicho back se compone de un api rest en nodejs que se alimenta de una base de datos mongodb y de un servidor web nginx encargado de publicar la documentación de los servicios rest y de realizar las funciones de proxy inverso para redirigir las peticiones hacía los servicios del api.

#Arquitectura

##Base de datos

La base de datos se compone de un replica set de 4 nodos de MongoDB 3.0. Tres son nodos ordinarios y el cuarto es un nodo árbitro. De entre los tres nodos ordinarios, uno, será elegido nodo primario y será el encargado de gestionar todas las peticiones de lectura y escritura que provengan del api rest. Los restantes nodos, simplemente, sincronizarán los datos con el nodo primario. En caso de caída del nodo primario, los dos restantes comenzarán un proceso de selección para decidir quién es el nodo primario. La misión del nodo árbitro es acortar al máximo este proceso ya que, mientras no exista un nodo primario seleccionado, no será posible realizar ninguna lectura ni escritura en base de datos.

##Api rest

El api rest se compone de un cluster de servidores express de nodejs. El número de nodos que presentará el cluster dependerá del número de procesadores de la máquina. La gestión de los procesos de nodejs se lleva mediante el software PM2 que nos gestiona el reinicio del servicio en caso de caída de uno de los cluster.

##NGINX

La redirección del tráfico corresponde a NGINX. El servidor web proporciona un proxy inverso que comunica las peticiones al puerto 80 con el api rest y, además, nos sirve para la publicación de las páginas html con la documentación de los servicios.

##DNS

Se utiliza el servicio de la web noip como DNS para la configuración de los host de las diferentes máquinas donde están instaladas las aplicaciones.

#Docker swarm

Un docker es un contenedor Linux que encierra un kernel, un file system y unos protocoles de red. Un docker no puede funcionar por si solo; es un entorno virtualizado que necesita de un S.O para poder ejecutarse. Las principales ventajas frente a una máquina virtual son dos:
* Por un lado, al no ser un sistema operativo completo, resulta bastante más eficiente en el uso de recursos
* Por otro lado, es posible crear repositorios de imágenes docker en la red. Esto facilita mucho la tarea de compartir entornos entre varios miembros de un solo equipo.

A pesar de que un docker no es un sistema operativo completo, cumple con la mayoría de sus posibilidades, permitiéndonos instalar y compartir cualquier tipo de aplicación que hayamos decido meter dentro del contenedor.
Un swarm de docker es un conjunto de máquinas docker que están distribuidas en diferentes servidores. Existe un docker maestro que es el encargado de lanzar las instalaciones de los diferentes docker a través de cada uno de los nodos de swarm. La administración de todas los dockers distribuidos entre todas las máquinas que conforman el swarm se realiza a través del docker maestro. A efectos prácticos, para el administrador de sistemas, es como si solo existiera un único sistemas cuya capacidad es la suma de la capacidades de todos los nodos. 
Los diferentes aplicativos se instalarán en docker que serán distribuidos en un swarm que se compone de tres nodos: un maestro y dos nodos ordinarios. La política de instalación será distribuida, repartiendo los diferentes docker de las aplicaciones entre los dos nodos a fin de que, en caso de caída de un de los nodos del swarm, el otro pueda continuar dando servicio.
A fin de que un reinicio de las maquinas no implique una reconfiguración de los sistemas por una distribución aleatoria de los contenedores, se aplicará un filtrado mediante “affinitiy” para indicar al docker maestra en que máquina deberá ejecutar que docker.

#Instalación

En un principio, no es necesaria la instalación de un docker swarm para duplicar este entorno. Simplemente con tener instalado un [docker engine] (https://docs.docker.com/) y ejecutar el script createCluster.sh ya se descargaran todos los contenedores y se ejecutaran. Ahora, hay que tener en cuenta que los contenedores están configurados para funcionar en base a las direcciones IP de mis servidores. Es necesario que:
*Se reconfigure las IP del replica set de mongo con respecto a las direcciones IP de los servidores donde se instalen los contenedores de la base de datos. Para ello repasar la documentación de mongo con respecto al [replica set] (https://docs.mongodb.org/manual/tutorial/change-hostnames-in-a-replica-set/)

*Se modifique la configuración de la conexión de base de datos del api rest Nodepop. El código se puede encontrar en este mismo repositorio
*Se modifique la configuración del proxy inverso del servidor [nginx]( http://nginx.org/en/docs/http/ngx_http_proxy_module.html)
Todos los dockers se han instalado y configurado en base a un Ubuntu 14.04 LTS. Esto significa que es posible acceder a sus file system a través de la ejecución de una consola bash para poder modificar sus configuraciones según las necesidades de las máquinas host

#Concluiones:
En mi día a día, yo no suelo hacer de dev ops. Mi faceta es más la de desarrollador que la de instalador de aplicaciones. Es por eso que el uso de docker para crear un entorno de trabajo me ha gustado tanto. El hecho de poder cuidar de un sistema de la misma manera que cuido el código, es decir, mediante versiones que puedo guardar, almacenar y compartir como si código en un repositorio de gitHub se tratase, me ha facilitado mucho el trabajo y me ha enseñado un mundo nuevo de posibilidades. Ahora, puedo crear con un mínimo esfuerzo un conjunto de entornos que pueden servirme para crear y probar mis desarrollos, puedo compartirlos con el resto de mi equipo y puedo modificarlos  permitiendo ahorrarme el tedioso trabajo de preparar los entornos de desarrollo que, en  muchas ocasiones son iguales en un 80% y que siempre, por esas pequeñas diferencias, me acaban quitando entre 6 y 8 horas de mi trabajo efectivo. 
Por otro lado, las dudas que me plantea docker sobre su seguridad me lleva a no recomendarlo todavía para su uso en entornos productivos. La máquina de docker se ejecuta como root en los sistemas donde se instala y no podemos olvidarnos de que estamos instalando un kernel de Linux. Si una persona se hace con el control de uno de los contenedores aprovechando un sploit del software instalado en ellos puede tener acceso al sistema host con privilegios de root, lo que es equivalente a darle el control del entorno. El hecho de que la propia página de dockers diga que el uso de dockers es casi seguro equivale a admitir que pueden existir brechas verdaderas de seguridad que una persona con la habilidad suficiente puede aprovechar.
A la hora de la utilización de docker en un entorno productivo es necesario la utilización de sistemas de securizacion a nivel de kernel que limiten las posibilidades del docker engine a aquellas funciones que son estrictamente necesarias para el software que lleva instalado dentro. El problema es que, las posibilidades de docker son tantas y es tan versátil que encontrar una configuración correcta a este respecto no es fácil… o por lo menos escapa a mis conocimientos. He intentado prepara una configuración tanto para AppArmor como para SELinux que limite las posibilidades de docker y en ambos casos, después de varias horas, he acabado por rendirme.
Si alguien lo consigue por favor que me escriba unas líneas y me cuente como lo ha hecho. 

#Entorno de prueba

*[Api rest]( http://dockernodetwo.ddns.net/)

*[Documentación Api](http://dockernodetwo.ddns.net/docs/)
