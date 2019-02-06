#!/bin/bash
# setup-es.sh

echo 'seeding data into our database...'

mongoimport --host mongodb --port 27017 --db movies --collection user-roles --type json --file data/user-roles.json --jsonArray
mongoimport --host mongodb --port 27017 --db movies --collection users --type json --file data/users.json --jsonArray

echo 'data seeding complete...'
