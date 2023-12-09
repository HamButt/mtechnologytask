import React from 'react'
import NotesCom from '../components/Notes'
import { Link } from 'react-router-dom'
import '../styles/global.css'


function Notes() {

  document.title = "Notes"

  const [createNoteModal, setCreateNoteModal] = React.useState(false);
  const toggle = () => setCreateNoteModal(!createNoteModal)


  return (

    <div>
        <nav className="navbar navbar-expand-lg navbar-light px-4 d-flex justify-content-center justify-content-sm-between">
            <Link className="navbar-brand mt-2" to="/">NotesApp</Link>
            <button onClick={toggle} type="button" className="add-note-button mt-2 py-2 px-4" >Add Note</button>
        </nav>
        <div>
            <NotesCom setCreateNoteModal={setCreateNoteModal} toggle={toggle} createNoteModal={createNoteModal}/>
        </div>
    </div>
  )
}

export default Notes