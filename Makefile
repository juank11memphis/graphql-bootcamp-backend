# ----------------------------
# RUNNING THE APP LOCALLY
# ----------------------------

local: docker-compose-down init
	ENVIRONMENT=local AWS_REGION=us-east-1 docker-compose up --build -d backend
	$(call copy_yarn_lock_file)
	$(call run_docker_logs)

# ----------------------------
# DOCKER COMMANDS
# ----------------------------

docker-clean-up:
	docker stop mongodb || true
	docker stop mongo-seed || true
	docker stop backend || true
	docker rm mongodb || true
	docker rm mongo-seed || true
	docker rm backend || true

docker-compose-down: docker-clean-up
	docker-compose down --remove-orphans

# ----------------------------
# UTILITY FUNCTIONS
# ----------------------------

init:
	$(call init_yarn_cache)
	$(call create_network)

define create_network
	docker network create graphqlbootcamp || true
endef

define init_yarn_cache
	# Init empty cache file if needed
	if [ ! -f .yarn-cache.tgz ]; then \
		echo "Init empty .yarn-cache.tgz"; \
		tar cvzf .yarn-cache.tgz --files-from /dev/null; \
	fi;
endef

define copy_yarn_lock_file
	# we copy the yarn.lock file back from the container only if it has changed
	docker cp backend:/tmp/yarn.lock ./yarn-tmp.lock
	if ! diff -q yarn.lock yarn-tmp.lock > /dev/null  2>&1; then \
		cp yarn-tmp.lock yarn.lock; \
		docker cp backend:/tmp/.yarn-cache.tgz ./.yarn-cache.tgz; \
	fi;
	rm yarn-tmp.lock
endef

define run_docker_logs
	docker-compose logs -f mongo-seed
	docker-compose logs -f backend
endef

# ----------------------------
# MAKE TARGETS
# ----------------------------

.PHONY: docker-compose-down docker-clean-up init
