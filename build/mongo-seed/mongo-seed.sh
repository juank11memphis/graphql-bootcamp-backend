#!/bin/bash
# setup-es.sh

echo 'seeding data into our database...'

mongoimport --host mongodb --port 27017 --db movies --collection actors --type json --file data/actors.json --jsonArray
mongoimport --host mongodb --port 27017 --db movies --collection movies --type json --file data/movies.json --jsonArray

echo 'data seeding complete...'
