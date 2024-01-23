const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
    const notes = await Note.find({user: req.user.id})
    res.json(notes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
})

//Rote 2: Adding new notes
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid Description").isLength({ min: 5 }),
], async (req, res)=>{
    try{
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
        }
    const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);
}catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})

//Rote 3: Updating an existing note
router.put('/updatenote/:id',fetchuser, async (req, res)=>{
    try{
    const {title, description, tag} = req.body;
    const newNote = {

    }
    if(title){
        newNote.title = title
    }
    if(description){
        newNote.description = description
    }
    if(tag){
        newNote.tag = tag
    }

    //Find the note to be updated and update it
    // const note = Note.findByIdAndUpdate();
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note);
}catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

})

//Rote 4: Deleting an existing note
router.delete('/deletenote/:id',fetchuser, async (req, res)=>{
    try{
    const {title, description, tag} = req.body;
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    //Do not allow if its not correct user
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "note has been deleted", note:note});
}catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

})

module.exports = router