#!/bin/bash
docker commit mongo_one ardiadrianadri/mongo_node_one:$1
docker commit mongo_two ardiadrianadri/mongo_node_two:$1
docker commit mongo_three ardiadrianadri/mongo_node_three:$1
docker commit mongo_four ardiadrianadri/mongo_node_four:$1