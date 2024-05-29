const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { About } from "./views/About.jsx";
import { Home } from "./views/Home.jsx";

import { MailIndex } from "./apps/mail/views/MailIndex.jsx";
import { MailDetails } from "./apps/mail/views/MailDetails.jsx";

import { NoteIndex } from "./apps/note/views/NoteIndex.jsx";
import { EditNote } from "./apps/note/cmps/EditNote.jsx";

import { BookIndex } from "./apps/book/views/BookIndex.jsx";
import { BookDetails } from "./apps/book/cmps/BookDetails.jsx";
import { BookEdit } from "./apps/book/cmps/BookEdit.jsx";
import { AddBook } from "./apps/book/cmps/AddBook.jsx";

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
          <Route element={<BookEdit />} path="/book/edit/:bookId" />
          <Route element={<BookDetails />} path="/book/:bookId" />
        </Routes>
      </section>
    </Router>
  );
}
