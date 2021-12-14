import * as AWS from 'aws-sdk'
import Note from './note'
import { formatISO as format } from 'date-fns'

type KeyofNote = keyof Note

const docClient = new AWS.DynamoDB.DocumentClient()

type Params = {
  TableName: string
  Key: AWS.DynamoDB.DocumentClient.Key
  ExpressionAttributeValues: any
  ExpressionAttributeNames: any
  UpdateExpression: string
  ReturnValues: string
}

async function updateNote(note: Partial<Note>) {
  let params: Params = {
    TableName: process.env.NOTES_TABLE!,
    Key: {
      id: note.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: '',
    ReturnValues: 'UPDATED_NEW',
  }

  const date = new Date()
  note.updatedAt = format(date)

  let prefix = 'set '
  let attributes = Object.keys(note)

  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i]
    if (attribute !== 'id') {
      params['UpdateExpression'] +=
        prefix + '#' + attribute + ' = :' + attribute
      params['ExpressionAttributeValues'][':' + attribute] =
        note[attribute as KeyofNote]
      params['ExpressionAttributeNames']['#' + attribute] = attribute
      prefix = ', '
    }
  }

  console.log('params: ', params)

  try {
    await docClient.update(params).promise()
    return note
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default updateNote
