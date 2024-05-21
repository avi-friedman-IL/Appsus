
// var notesDB = []
import { storageService } from "../../../services/storage.service.js"
const NOTES_KEY = 'notesDB'


const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: 'rgb(173,173,215)'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: 'rgb(173,173,215)'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]

export const notesService = {
    getNotes,
    deleteNote,
}

window.bs = notesService

function getNotes() {
    return storageService.loadFromStorage(NOTES_KEY)
}

function createNote() { }

function deleteNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function updateNote() {
}

function createNotes() {
    storageService.saveToStorage(NOTES_KEY, notes)
}
createNotes()