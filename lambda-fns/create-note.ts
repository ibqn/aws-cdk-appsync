import Note from './note'
import { v4 as uuid } from 'uuid'
import { formatISO as format } from 'date-fns'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

const ddbClient = new DynamoDBClient({ region: process.env.REGION! })

async function createNote(note: Note) {
  if (!note.id) {
    note.id = uuid()
  }

  const date = new Date()

  if (!note.createdAt) {
    note.createdAt = format(date)
  }

  note.updatedAt = note.createdAt

  const params = {
    TableName: process.env.NOTES_TABLE!,
    Item: marshall(note),
  }

  try {
    const results = await ddbClient.send(new PutItemCommand(params))
    console.log('results', results)
    return note
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default createNote
