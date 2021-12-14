import * as AWS from 'aws-sdk'
import Note from './note'
import { v4 as uuid } from 'uuid'
import { formatISO as format } from 'date-fns'

const docClient = new AWS.DynamoDB.DocumentClient()

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
    Item: note,
  }

  try {
    await docClient.put(params).promise()
    return note
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default createNote
