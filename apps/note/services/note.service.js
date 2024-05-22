
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    getNotes,
    removeNote,
    saveNote,
    getEmptyNote,
    getNoteById,
}

window.bs = notesService

function getNotes() {
    return new Promise((resolve) => {
        resolve(utilService.loadFromStorage(NOTES_KEY))
    })
}

function getNoteById(noteId) {
    const notes = utilService.loadFromStorage(NOTES_KEY)
    const note = notes.find((note) => note.id === noteId)
    return Promise.resolve(note)
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function saveNote(note) {
    return storageService.post(NOTES_KEY, note)
}

function updateNote() {
}

function getEmptyNote() {
    return {
        id: "",
        createdAt: '',
        type: "",
        isPinned: false,
        style: { backgroundColor: "" },
        info: { title: "", todos: [], url: '' },
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)

    if (!notes || !notes.length) {
        notes = [
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
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes
}