# graphql-bootcamp

## To run locally

Run `make local`

## To run on Windows

```
docker-compose down --remove-orphans
docker network create graphqlbootcamp || true
docker-compose -f docker-compose-windows.yml up --build -d backend
docker-compose logs -f mongo-seed
docker-compose logs -f backend
```
