const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'

import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailDetails } from './apps/mail/views/MailDetails.jsx'

import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { EditNote } from './apps/note/cmps/EditNote.jsx'

import { MailCompose } from './apps/mail/views/MailCompose.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { AddBook } from './apps/book/pages/AddBookIndex.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { AddReview } from './apps/book/cmps/AddReview.jsx'

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />}>
                        <Route path="/mail/:mailId" element={<MailDetails />} />
                    </Route>

                    <Route path="/note" element={<NoteIndex />} />
                    <Route path="/note/edit/:noteId" element={<EditNote />} />

                    <Route path="/book" element={<BookIndex />} />
                    <Route element={<AddBook />} path="/book/add" />
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route element={<BookEdit />} path="/book/edit/:bookId" />
                    <Route element={<BookDetails />} path="/book/:bookId" />
                    <Route path="/book/:bookId/review" element={<AddReview />} />
                </Routes>
            </section>
        </Router>
    )
}
