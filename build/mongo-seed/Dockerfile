FROM mongo:latest
COPY ./mongo-seed/data data
COPY ./mongo-seed/mongo-seed.sh mongo-seed.sh
COPY ./wait-for-it.sh wait-for-it.sh
RUN chmod +x mongo-seed.sh
RUN chmod +x wait-for-it.sh
