# Invites Server

## Getting started

- Use [pipenv](https://pipenv-fork.readthedocs.io/en/latest/index.html) as package manager
- Use `pipenv install` to install the dependencies listed on `Pipfile`
- Run the server with `pipenv run uvicorn src.server:app --reload`
- Run `docker-compose up` to init a Cassandra server (Optional)
