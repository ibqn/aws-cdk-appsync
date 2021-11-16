import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import * as AwsCdkAppsync from '../lib/aws-cdk-appsync-stack'

test('Empty Stack', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new AwsCdkAppsync.AwsCdkAppsyncStack(app, 'MyTestStack')
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  )
})
