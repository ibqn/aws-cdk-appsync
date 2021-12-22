import { ddbClient } from './ddb-client'
import { GetItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

async function getNoteById(noteId: string) {
  const params = {
    TableName: process.env.NOTES_TABLE!,
    Key: marshall({ id: noteId }),
  }

  try {
    const result = await ddbClient.send(new GetItemCommand(params))
    const item = unmarshall(result.Item || {})
    return item
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default getNoteById
