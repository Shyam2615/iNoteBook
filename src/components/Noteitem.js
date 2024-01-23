import React from "react";
import noteContext from "../Context/notes/noteContext";
import { useContext } from "react";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { note, updatenote } = props;
  const { deleteNote } = context;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={()=>{
                deleteNote(note._id);
              }}
            ></i>
            <i className="fa-solid fa-pen-to-square" onClick={()=>{updatenote(note)}}></i>
          </div>
            {/* <p className="card-text">{note.tag} </p> */}
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
