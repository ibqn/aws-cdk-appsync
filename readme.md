# Welcome to your CDK TypeScript project!

## Note

Can't migrate to CDKv2 due to

> There are no hand-written (L2) constructs for this service yet. However, you can still use the automatically generated L1 constructs, and use this service exactly as you would using CloudFormation directly.

## Getting Started

Bootstrap and deploy this project

```sh
cdk bootstrap
cdk deploy
```

To destroy this project please execute

```sh
cdk destroy
```

## Set up on the client side

install AWS amplify CLI

```sh
npm install -g @aws-amplify/cli
```

Initialize your amplify application configuration with

```sh
amplify init
```

generate code for the AppSync configuration

```sh
amplify add codegen --apiId <api-id>
```

the `<api-id>` can be found in the AppSync console

this should create a similar configuration on the client side of your project

```js
import Amplify from 'aws-amplify'

Amplify.configure({
  aws_appsync_region: 'us-east-1', // Stack region
  aws_appsync_graphqlEndpoint:
    'https://<app-id>.appsync-api.<region>.amazonaws.com/graphql', // AWS AppSync endpoint
  aws_appsync_authenticationType: 'API_KEY', //Primary AWS AppSync authentication type
  aws_appsync_apiKey: '<api-key>', // AppSync API Key
})
```

If you modify the generated documents or your API's schema, you can regenerate the client code anytime with:

```sh
amplify codegen
```

### Query data

Below you can see an example of how data can be queried

```js
import { API } from 'aws-amplify'

const query = `
  query listNotes {
    listNotes {
      id name completed
    }
  }
`

...

async function fetchNotes(){
  const data = await API.graphql({ query })
  console.log('data from GraphQL:', data)
}
```
