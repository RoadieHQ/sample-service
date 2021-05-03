![headline](docs/assets/headline.png)

## Test docs link
- [Features testing](feature-testing.md) - Futures testing
- 
# Sample Service

A sample service for testing build tools, displaying in Backstage, and whatever
else you might need it for.

## Development

First add some secrets to the `.env` file in the root. See the `.env.sample` file for suggestions
of required environment variables.

Then run it locally like this:

```shell
yarn start
curl :3000/
```

## Building, packaging and deployment

The sample-service is designed to be deployed on multiple platforms. For example,
kubernetes via Helm and AWS Lambda.

### Helm

Docker images are automatically built and pushed to Docker Hub by a GitHub action when
new code is merged into the `master` branch.

The image will be tagged with the version in the `package.json`.

The repo name on Docker Hub is `roadiehq/sample-service`.

There is a [helm chart for deployment to Kubernetes](https://github.com/RoadieHQ/helm-charts/tree/master/sample-service).

### AWS Lambda

Pre-requisites:

 1. Install the aws cli (For homebrew, use: `brew install awscli`).
 2. Authenticate using an access token and secret with `aws configure`.

```shell
yarn run deploy:lambda
```

To invoke it via the API Gateway trigger,

```shell
curl https://6b2w0lh8p3.execute-api.eu-west-1.amazonaws.com/default/sample-service
```
