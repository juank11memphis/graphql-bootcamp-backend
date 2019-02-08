FROM juancr11/node8-yarn:1.0.7
# Copying app files
RUN mkdir /dist
COPY package.json yarn.lock /dist/
WORKDIR /dist
RUN yarn
COPY . .
CMD ["yarn", "start"]
