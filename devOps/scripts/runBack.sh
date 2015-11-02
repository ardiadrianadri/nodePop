#!/bin/bash
docker run -d --name mongo_four -p 27020:27020 ardiadrianadri/mongo_node_four:1.0.4
docker run -d --name mongo_three -p 27019:27019 --link mongo_four:mongo_four ardiadrianadri/mongo_node_three:1.0.4
docker run -d --name mongo_two -p 27018:27018 --link mongo_four:mongo_four --link mongo_three:mongo_three ardiadrianadri/mongo_node_two:1.0.4
docker run -d --name mongo_one -p 27017:27017 --link mongo_four:mongo_four --link mongo_three:mongo_three --link mongo_two:mongo_two ardiadrianadri/mongo_node_one:1.0.7