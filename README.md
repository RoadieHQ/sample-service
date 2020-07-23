# Sample Service

A sample service for testing build tools, displaying in Backstage, and whatever
else you might need it for.

## Development

First add some secrets to the `.env` file in the root. Then run it locally like this:

```shell
env $(cat .env | xargs) node index.js
```

## Deployment

There is a helm chart for deployment to Kubernetes.
