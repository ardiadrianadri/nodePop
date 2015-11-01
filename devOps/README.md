#INSTALACION DE LOS SERVIDORES DE NODEPOP

##Prerequisitos:
1. Tener instalado docker [Docker Engine](https://docs.docker.com/installation)

##Descripción:
Partimos del escenario en NodePop es el back de una aplicacion de compra-venta de objetos de segundamano. Como tal, es el nuclo del negocio, dado servicio tanto a plataformas móviles como desktop. En este sentido hemos de procurar una relación calidad/ precio alta poniendo el foco en la disponibilidad del servicio y reduciendo al máximo (dentro de las posibilidades economicas) las horas anuales de caida del servicio.

Para ello vamos a reforzar cada una de las capas con diferentes cluster que garanticen un refuerzo del servicio en caso de caida y un sistema de alarmas que avise de las posibles caídas de los nodos.

###Base de datos:
Para este piloto utilizaremos una base de datos MongoDB con replica set de cuatro nodos:
* tres nodos ordinarios que tendrán como misión la continuidad del servicio de base de datos
* un nodo arbitro que tendrá como misión reducir el tiempo de decision entre la caida de un nodo primario y la elección del nuevo.

