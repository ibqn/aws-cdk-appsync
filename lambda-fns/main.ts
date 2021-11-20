import createNote from './create-note'
import deleteNote from './delete-note'
import getNoteById from './get-note-by-id'
import listNotes from './list-notes'
import updateNote from './update-note'
import Note from './note'

type AppSyncEvent = {
  info: {
    fieldName: string
  }
  arguments: {
    noteId: string
    note: Note
  }
}

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case 'getNoteById':
      return await getNoteById(event.arguments.noteId)
    case 'createNote':
      return await createNote(event.arguments.note)
    case 'listNotes':
      return await listNotes()
    case 'deleteNote':
      return await deleteNote(event.arguments.noteId)
    case 'updateNote':
      return await updateNote(event.arguments.note)
    default:
      return null
  }
}
