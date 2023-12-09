/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import '../styles/global.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import {BASE_URL} from '../config/Config'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CREATE_NOTE, DELETE_NOTE, FETCH_ALL_NOTES, FETCH_NOTE, FILTER_NOTES, UPDATE_NOTE } from '../config/Endpoints';


function Notes({createNoteModal,setCreateNoteModal,toggle}) {

  const [notes, setNotes] = React.useState([])
  const [openDialouge, setOpenDialouge] = React.useState(false);
  const [noteId, setNoteId] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [reqData, setReqData] = React.useState({
    'title': "",
    'content': "",
  })
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  React.useEffect(()=>{
    axios.get(`${BASE_URL}${FETCH_ALL_NOTES}`)
    .then((res) => {
      setNotes(res.data.notes.reverse())
    }).catch((err) => {
        console.log(err.message);
        setError(true)
    })
  },[])

  const deleteQuote = (note_id) => {
    axios.delete(`${BASE_URL}${DELETE_NOTE}`, {data : { id: noteId }})
    .then((res) => {
      if(res.status === 200){
        const updatedNotes = notes.filter((note) => note_id !== note._id);
        setNotes(updatedNotes); 
        setOpenDialouge(false)
        Swal.fire({
          title: "Deleted!",
          text: "Your Note is deleted successfully!",
          icon: "success"
        });
      }
      }).catch((err) => {
          setError(true)
      })
  }

  const addNote = (e)=>{
    e.preventDefault();
    setLoading(true)
    axios.post(`${BASE_URL}${CREATE_NOTE}`, reqData)
    .then((res) => {
      console.log(res.data.savedNote);
      if(res.status === 200){
        setCreateNoteModal(false)
        setLoading(false)
        Swal.fire({
          title: "Thank you!",
          text: "Your Note has been added successfully!",
          icon: "success"
        });
      }
    }).catch((err) =>{
      setError(true)
      setLoading(false)
      setCreateNoteModal(false)
    })
  }

  const handleInputs = (e) => {
    const value = e.target.value
    const name = e.target.name
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const fetchNoteData = (note_id) => {
    toggleUpdateModal()
    axios.get(`${BASE_URL}${FETCH_NOTE}${note_id}`)
    .then((res) => {
      const { title, content } = res.data.singleNote;
      setReqData({ title, content });
      setNoteId(note_id)
      }).catch((err) => {
        setError(true)
      })
    }

  const updateNote = () => {
    
    const noteToUpdate = {
      id: noteId,
      title: reqData.title,
      content: reqData.content
    }

    axios.put(`${BASE_URL}${UPDATE_NOTE}`, {noteToUpdate})
    .then((res) => {
      if(res.status === 200){
        setLoading(true)
        setUpdateModal(false)
        setLoading(false)
        Swal.fire({
          title: "Thank you!",
          text: "Your Note is Updated successfully!",
          icon: "success"
        });
        setNotes(notes)
    }}).catch((err) => {
      setError(true)  
    })
  }

  const handleFilter = (event) => {
    const selectedType = event.target.value;
    try {
      axios.get(`${BASE_URL}${FILTER_NOTES}${selectedType}`)
      .then((response) =>{
        setNotes(response.data.filteredNotes);
      }).catch((err) => {
        console.log(err);
      })
      setFilter(selectedType);
    } catch (error) {
        setError(true)
    }
  };

  return (

    <>
      <div className="filter-notes d-flex align-items-center">
        <p className='sort'>Sort:</p>
        <select name="note_type" id='note-type' value={filter} onChange={handleFilter}>
          <option value="" disabled defaultValue>All Notes</option>
          <option className='filter-option' value="motivational note">Motivational Notes</option>
          <option className='filter-option' value="funny note">Funny Notes</option>
        </select>
      </div>

      <div className='notes-section d-flex align-items-start justify-content-center py-4'>
        <div className="d-flex align-items-center flex-column">
            {notes.map((note,index)=>{
            return (
                  <div key={note._id} className="notes border mt-4 p-3">
                    <div className="title-and-delete d-flex justify-content-between align-items-start">
                      <p style={{fontFamily:"Poppins",fontSize:"20px"}}>{note.title}</p>
                        <Button className='p-0 m-0 ' style={{textTransform:'capitalize',fontSize:'15px',border:"none"}} size='small' variant="outlined"
                        onClick={() => { setOpenDialouge(true); setNoteId(note._id) }}> Delete </Button>
                    </div>
                    <div>
                      <Dialog
                          open={openDialouge}
                          onClose={() => setOpenDialouge(false)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-note"
                        >
                          <DialogTitle id="alert-dialog-title"> {"This will delete your note"} </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this note?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setOpenDialouge(false)}>Cancel</Button>
                            <Button onClick={() => deleteQuote(noteId)}> I'm sure</Button>
                          </DialogActions>
                      </Dialog>
                    </div>
                    <p style={{fontFamily:"Poppins",fontSize:"16px"}} >{note.content}</p>
                    <Button className='p-0 m-0 ' style={{textTransform:'capitalize',fontSize:'15px',border:"none"}} size='small' variant="outlined"
                      onClick={() => fetchNoteData(note._id)}> Edit </Button>
                  </div>
              )})}
        </div>

       {/* CREATE MODAL */}

        <Modal isOpen={createNoteModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Note</ModalHeader>
            <ModalBody>
            <form id="noteForm"  className="d-flex flex-column align-items-left justify-content-center">
                <label htmlFor="title">Title</label>
                <input value={reqData.title} onChange={handleInputs} className="p-2 title" type="text"  placeholder="Title" name="title" required />
                <label htmlFor="note">Note</label>
                <textarea value={reqData.content} onChange={handleInputs} className="p-2 note" type="text" placeholder="Type your Note..." name="content" required cols="30" rows="5"></textarea>
            </form>
            </ModalBody>
            <ModalFooter>
              <input onClick={addNote} id="modal-add-note-button" className='py-2 px-4' style={{backgroundColor: loading ? "grey" : "rgb(2, 2, 68)"}} disabled={loading ? true : false} type="submit" value={loading ? "Adding..." : "Add Note"} />
            </ModalFooter>
        </Modal>

        {/* Edit MODAL */}

        <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
            <ModalHeader toggle={toggleUpdateModal}>Update Note</ModalHeader>
            <ModalBody>
            <form id="editNoteForm"  className="d-flex flex-column align-items-left justify-content-center">
                <label htmlFor="title">Title</label>
                <input value={reqData.title} onChange={handleInputs} className="p-2 title" type="text" placeholder="Title" name="title" required />
                <label htmlFor="note">Note</label>
                <textarea value={reqData.content} onChange={handleInputs} className="p-2 note" type="text" placeholder="Type your Note..." name="content" required cols="30" rows="5"></textarea>
            </form>
            </ModalBody>
            <ModalFooter>
              <input onClick={updateNote} id="modal-add-note-button" className='py-2 px-4' style={{backgroundColor: loading ? "grey" : "rgb(2, 2, 68)"}} disabled={loading ? true : false} type="submit" value={loading ? "Updating..." : "Update Note"} />
            </ModalFooter>
        </Modal>

      </div>

      {/* ERROR HANDLING DIALOGE */}

      <Dialog
          open={error}
          onClose={() => setError(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-note"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Something went wrong please check the connection
            </DialogContentText>
          </DialogContent>
      </Dialog>
    </>
  )
}

export default Notes