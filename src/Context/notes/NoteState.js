import NoteContext from "./noteContext";
import { useState, } from "react";
import React from "react";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000"
    const initialnotes = []

      const [notes, setNotes] = useState(initialnotes);

      // get all notes
      const getNotes = async ()=>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setNotes(json)
      }
      //Add Note
      const addNote = async (title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });

        const json = await response.json();

        const note = json;
        setNotes(notes.concat(note))
        props.showAlert('success', 'New note added')
      }
      //Delete Note
      const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });

              const newNote = notes.filter((note)=>{return note._id!==id})
              setNotes(newNote)
              props.showAlert('Danger', 'Deleted succesfully')
            }
      //Edit Note
      const editNote = async (id, title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = await response.json(); 

        let newNotes = JSON.parse(JSON.stringify(notes));
        //Logic to edit in client
        for(let index=0;index< newNotes.length; index++){
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote,editNote,getNotes }}>
    {props.children}
    </NoteContext.Provider>
  );
  }
export default NoteState;