# Sample Service

A sample service for testing build tools, displaying in Backstage, and whatever
else you might need it for.

## Development

First add some secrets to the `.env` file in the root. Then run it locally like this:

```shell
env $(cat .env | xargs) node index.js
```

## Building and artefact hosting

```shell
docker build . -t roadie/sample-service
docker tag roadie/sample-service:latest registry.digitalocean.com/larder/sample-service:[VERSION]
docker push registry.digitalocean.com/larder/sample-service:[VERSION]
```

## Deployment

There is a helm chart for deployment to Kubernetes.
