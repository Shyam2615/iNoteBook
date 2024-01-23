import React, {useState} from 'react';
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description: "", tag: ""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert('success', 'Notes added')
        setNote({title:"", description: "", tag: ""});
    }  

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container">
        <h2 className='my-2'>Add Your notes</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label my-2">Title</label>
          <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" onChange={onChange} value={note.title} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control my-2" id="description" name="description" rows="3" onChange={onChange} minLength={5} required value={note.description}></textarea>
          <label htmlFor="tag" className="form-label">Tag</label>
          <textarea className="form-control my-2" id="tag" name="tag" rows="3" onChange={onChange} value={note.tag}></textarea>
          <button type="button" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add note</button>
        </div>
      </div>
    </div>
  );
}
