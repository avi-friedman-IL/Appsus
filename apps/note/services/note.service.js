
import { storageService } from "../../../services/async-storage.service.js"


const notesInitial = [
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

const NOTES_KEY = 'notesDB'
const notes = storageService.loadFromStorage(NOTES_KEY) || []
createNotes()

export const notesService = {
    getNotes,
    removeNote,
    addNote,
}

window.bs = notesService

// function getNotes() {
//     return storageService.loadFromStorage(NOTES_KEY)
// }

function getNotes() {
    return new Promise((resolve) => {
        resolve(storageService.loadFromStorage(NOTES_KEY))
    })
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function addNote(note) {
    return storageService.post(NOTES_KEY, note)
}

function updateNote() {
}

function createNotes() {
    if (!notes.length) {
        storageService.saveToStorage(NOTES_KEY, notesInitial)
    }
    // storageService.saveToStorage(NOTES_KEY, notesInitial)
}