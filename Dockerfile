FROM juancr11/node8-yarn:1.0.7
# Installing dependencies
COPY package.json yarn.lock .yarn-cache.* /tmp/
RUN mkdir -p /usr/local/share/.cache/yarn/v1/
RUN tar xzf /tmp/.yarn-cache.tgz -C /usr/local/share/.cache/yarn/v1/ || true
RUN cd /tmp && yarn
RUN rm /tmp/.yarn-cache.tgz || true && cd /usr/local/share/.cache/yarn/v1/ && tar -czf /tmp/.yarn-cache.tgz .
# Copying app files
RUN mkdir /dist
WORKDIR /dist
RUN ln -s /tmp/node_modules
COPY . .
CMD ["yarn", "start"]
