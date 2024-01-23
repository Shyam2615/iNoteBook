import React from 'react';
import { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const context = useContext(noteContext);
  const {notes, getNotes, editNote} = context;
  const [note, setNote] = useState({id:"",etitle:"", edescription: "", etag: ""});
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
  }
  else{
    navigate('/login')
  }
  }, []);

  const updatenote = (currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('success', 'updated notes')
}  

const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <div>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body container" >
      <label htmlFor="title" className="form-label my-2">Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter title" value={note.etitle} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control my-2" id="edescription" name="edescription" rows="1" value={note.edescription} onChange={onChange} minLength={5} required></textarea>
          <label htmlFor="tag" className="form-label">Tag</label>
          <textarea className="form-control my-2" id="etag" name="etag" rows="1" value={note.etag} onChange={onChange}></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update note</button>
      </div>
    </div>
  </div>
</div>
    <AddNote showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
  Edit note
</button>
      <div className="row">
        <h2>Your notes</h2>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note)=>{
          return <Noteitem key={note._id} updatenote={updatenote} note={note}/>;
        })}
      </div>
    </div>
  );
}
