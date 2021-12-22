import { ddbClient } from './ddb-client'
import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

async function listNotes() {
  const params = {
    TableName: process.env.NOTES_TABLE!,
  }

  try {
    const results = await ddbClient.send(new ScanCommand(params))
    console.log(results)
    const items = (results.Items || []).map((element) => unmarshall(element))
    return items
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default listNotes
