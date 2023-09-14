![alt-text](docs/assets/headline.png "CC BY-NC-SA 4.0")

## Test docs link
- [Features testing](docs/feature-testing.md) - Features testing
- [Absolute link](https://roadie.roadie.so/docs/default/Component/sample-service-2/feature-testing/) - Absolute link to another page
- [Read me](README.md) - Read me document
- [Link to sibling](./LINK_ME.md) - Link to a markdown file outside the techdocs repo

# Sample Service

A sample service for testing build tools, displaying in Backstage, and whatever
else you might need it for.

## Development

First add some secrets to the `.env` file in the root. See the `.env.sample` file for suggestions
of required environment variables.

Then run it locally like this:

```
yarn dev
```

## Building, packaging and deployment

The sample-service is designed to be deployed on multiple platforms. For example,
kubernetes via Helm and AWS Lambda.
Some non ASCII code .भारत .网络

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
test