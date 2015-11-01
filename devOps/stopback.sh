#!/bin/bash
docker stop mongo_four
docker stop mongo_three
docker stop mongo_two
docker stop mongo_one

docker rm mongo_one
docker rm mongo_four
docker rm mongo_three
docker rm mongo_two