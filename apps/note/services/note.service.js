
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    query,
    getDefaultFilter,
    getNotes,
    removeNote,
    addNote,
    updateNote,
    saveNote,
    getEmptyNote,
    getNoteById,
}

window.bs = notesService

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => {
                    const titleMatch = regExp.test(note.info.title)
                    const textMatch = regExp.test(note.info.txt);
                    const todosMatch = note.info.todos && note.info.todos.some(todo => regExp.test(todo.txt));
                    return titleMatch || textMatch || todosMatch;
                })
            }
            return notes
        })
}

function getDefaultFilter(filterBy = { title: '' }) {
    return { title: filterBy.title }
}


function getNotes() {
    return new Promise((resolve) => {
        resolve(utilService.loadFromStorage(NOTES_KEY))
    })
}

function getNoteById(noteId) {
    const note = storageService.get(NOTES_KEY, noteId)
    return Promise.resolve(note)
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function saveNote(note) {
    let savedNote
    if (note.id) savedNote = updateNote(note)
    else savedNote = addNote(note)
    return Promise.resolve(savedNote)
}

function addNote(note) {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    notes = [...notes, note]
    note['id'] = utilService.makeId()
    utilService.saveToStorage(NOTES_KEY, notes)
    return note
}

function updateNote(note) {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    notes = notes.map(n => n.id === note.id ? note : n)
    utilService.saveToStorage(NOTES_KEY, notes)
    return notes
}

function getEmptyNote() {
    return {
        style: { backgroundColor: "" },
        info: { txt: '', title: "", todos: [], url: '' },
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
                isPinned: false,
                style: {
                    backgroundColor: "#e2f6d3",
                    font: '',
                },
                info: {
                    title: 'Work',
                    txt: 'Fullstack Me Baby!',
                    url: {
                        image: '',
                        video: '',
                        audio: '',
                    },
                    todos: [],
                },
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteAudio',
                isPinned: false,
                style: {
                    backgroundColor: '',
                    font: '',
                },
                info: {
                    title: 'Bobi and Me',
                    txt: '',
                    url: {
                        image: '',
                        video: '',
                        audio: 'https://www.computerhope.com/jargon/m/example.mp3',
                    },
                    todos: [],
                },

            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '',
                    font: '',
                },
                info: {
                    title: 'Get my stuff together',
                    txt: '',
                    url: {
                        image: '',
                        video: '',
                        audio: '',
                    },
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 },
                    ],
                },
            },
            {
                id: 'n104',
                createdAt: 1112225,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#F1948A',
                    font: '',
                },
                info: {
                    title: 'Bobi',
                    txt: '',
                    url: {
                        image: 'https://image.petmd.com/files/styles/978x550/public/2022-10/pug-dog-breed.jpeg?w=1080&q=75',
                        video: '',
                        audio: '',
                    },
                    todos: [],
                },

            },
            {
                id: 'n105',
                createdAt: 1112226,
                type: 'NoteImg',
                isPinned: true,
                style: {
                    backgroundColor: '#F1948A',
                    font: '',
                },
                info: {
                    title: 'Bobi and Me',
                    txt: '',
                    url: {
                        image: 'https://www.dogster.com/wp-content/uploads/2024/02/pug-dog-standing-on-grass-at-the-park_MVolodymyr_Shutterstock.jpg',
                        video: '',
                        audio: '',
                    },
                    todos: [],
                },

            },
            {
                id: 'n106',
                createdAt: 1112227,
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: '#F1948A',
                    font: '',
                },
                info: {
                    title: 'Bunny',
                    txt: '',
                    url: {
                        image: '',
                        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        audio: '',
                    },
                    todos: [],
                },

            },
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    console.log(notes)
    return notes
}