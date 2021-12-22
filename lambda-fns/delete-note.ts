import { ddbClient } from './ddb-client'
import { DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

async function deleteNote(noteId: string) {
  const params = {
    TableName: process.env.NOTES_TABLE!,
    Key: marshall({
      id: noteId,
    }),
  }

  try {
    const results = await ddbClient.send(new DeleteItemCommand(params))
    console.log(results)
    return noteId
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default deleteNote
